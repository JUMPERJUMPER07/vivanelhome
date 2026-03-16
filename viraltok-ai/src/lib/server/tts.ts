import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

type VoiceMode = "Masculina" | "Feminina";

const VOICE_MAP: Record<VoiceMode, string> = {
  Masculina: "echo",
  Feminina: "nova",
};

export async function synthesizeNarration(params: {
  text: string;
  voice: VoiceMode;
  filePrefix: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY nao configurada para gerar narracao.");
  }

  const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
  const client = new OpenAI({ apiKey });
  const tmpDir = path.join(process.cwd(), "public", "exports", "tmp");
  await fs.mkdir(tmpDir, { recursive: true });

  const fileName = `${params.filePrefix}-${Date.now()}.mp3`;
  const outputPath = path.join(tmpDir, fileName);

  const speech = await client.audio.speech.create({
    model,
    voice: VOICE_MAP[params.voice],
    input: params.text.slice(0, 4000),
    response_format: "mp3",
  });

  const buffer = Buffer.from(await speech.arrayBuffer());
  await fs.writeFile(outputPath, buffer);

  return { outputPath };
}
