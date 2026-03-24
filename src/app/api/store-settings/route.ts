import { apiError, apiOk } from "@/lib/api-response";
import { readStoreSettings, updateStoreSettings } from "@/lib/store-settings";

export async function GET() {
  try {
    const settings = await readStoreSettings();
    return apiOk({ settings });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao carregar configuracoes.", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      whatsappUrl?: string;
      instagramUrl?: string;
      tiktokUrl?: string;
    };

    const settings = await updateStoreSettings(body);
    return apiOk({ settings });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Erro ao salvar configuracoes.", 500);
  }
}
