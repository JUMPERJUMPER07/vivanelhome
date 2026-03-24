import { promises as fs } from "fs";
import path from "path";
import { defaultStoreSettings, type StoreSettings } from "@/lib/store";
import { isSupabaseConfigured } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const storageDir = path.join(process.cwd(), "storage");
const settingsFilePath = path.join(storageDir, "store-settings.json");
const settingsRowId = "main";

type SupabaseStoreSettingsRow = {
  id: string;
  whatsapp_url: string;
  instagram_url: string;
  tiktok_url: string;
};

function sanitizeSettings(input: Partial<StoreSettings>): StoreSettings {
  return {
    whatsappUrl: input.whatsappUrl?.trim() || defaultStoreSettings.whatsappUrl,
    instagramUrl: input.instagramUrl?.trim() || defaultStoreSettings.instagramUrl,
    tiktokUrl: input.tiktokUrl?.trim() || defaultStoreSettings.tiktokUrl,
  };
}

async function ensureStorageDir() {
  await fs.mkdir(storageDir, { recursive: true });
}

async function readSettingsFromFile() {
  try {
    const content = await fs.readFile(settingsFilePath, "utf8");
    return sanitizeSettings(JSON.parse(content) as Partial<StoreSettings>);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultStoreSettings;
    }

    throw error;
  }
}

async function writeSettingsToFile(settings: StoreSettings) {
  await ensureStorageDir();
  await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), "utf8");
  return settings;
}

export async function readStoreSettings() {
  if (!isSupabaseConfigured()) {
    return readSettingsFromFile();
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .eq("id", settingsRowId)
    .maybeSingle();

  if (error) {
    throw new Error(`Erro ao carregar configuracoes da loja: ${error.message}`);
  }

  if (!data) {
    return defaultStoreSettings;
  }

  const row = data as SupabaseStoreSettingsRow;

  return sanitizeSettings({
    whatsappUrl: row.whatsapp_url,
    instagramUrl: row.instagram_url,
    tiktokUrl: row.tiktok_url,
  });
}

export async function updateStoreSettings(input: Partial<StoreSettings>) {
  const settings = sanitizeSettings(input);

  if (!isSupabaseConfigured()) {
    return writeSettingsToFile(settings);
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("store_settings").upsert({
    id: settingsRowId,
    whatsapp_url: settings.whatsappUrl,
    instagram_url: settings.instagramUrl,
    tiktok_url: settings.tiktokUrl,
  });

  if (error) {
    throw new Error(`Erro ao salvar configuracoes da loja: ${error.message}`);
  }

  return settings;
}
