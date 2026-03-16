import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { generateScriptPackage, getIdeaById } from "@/lib/mock-data";
import { AiVideoSuggestion, VideoRenderConfig } from "@/types/domain";

export const runtime = "nodejs";

const allowedConfig: {
  [K in keyof VideoRenderConfig]: readonly VideoRenderConfig[K][];
} = {
  format: ["TikTok", "Reels"],
  voice: ["Masculina", "Feminina", "Sem narracao"],
  visualStyle: ["Neon", "Minimalista", "Cinematico"],
  duration: ["20s", "30s", "45s"],
  quality: ["HD", "Full HD", "2K"],
};

const defaultConfig: VideoRenderConfig = {
  format: "TikTok",
  voice: "Feminina",
  visualStyle: "Neon",
  duration: "30s",
  quality: "Full HD",
};

function pickAllowed<K extends keyof VideoRenderConfig>(
  key: K,
  value: unknown,
  fallback: VideoRenderConfig[K],
): VideoRenderConfig[K] {
  const typed = typeof value === "string" ? value : "";
  return (allowedConfig[key] as readonly string[]).includes(typed) ? (typed as VideoRenderConfig[K]) : fallback;
}

function safeSuggestion(value: unknown, fallback: AiVideoSuggestion): AiVideoSuggestion {
  const raw = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const packRaw = typeof raw.pack === "object" && raw.pack !== null ? (raw.pack as Record<string, unknown>) : {};
  const cfgRaw = typeof raw.config === "object" && raw.config !== null ? (raw.config as Record<string, unknown>) : {};

  const scenes =
    Array.isArray(packRaw.scenes) && packRaw.scenes.length > 0
      ? packRaw.scenes.filter((item): item is string => typeof item === "string").slice(0, 6)
      : fallback.pack.scenes;

  const hashtags =
    Array.isArray(packRaw.hashtags) && packRaw.hashtags.length > 0
      ? packRaw.hashtags.filter((item): item is string => typeof item === "string").slice(0, 8)
      : fallback.pack.hashtags;

  return {
    pack: {
      ideaId: fallback.pack.ideaId,
      scriptTitle: typeof packRaw.scriptTitle === "string" ? packRaw.scriptTitle : fallback.pack.scriptTitle,
      hook: typeof packRaw.hook === "string" ? packRaw.hook : fallback.pack.hook,
      scenes,
      caption: typeof packRaw.caption === "string" ? packRaw.caption : fallback.pack.caption,
      cta: typeof packRaw.cta === "string" ? packRaw.cta : fallback.pack.cta,
      hashtags,
    },
    config: {
      format: pickAllowed("format", cfgRaw.format, fallback.config.format),
      voice: pickAllowed("voice", cfgRaw.voice, fallback.config.voice),
      visualStyle: pickAllowed("visualStyle", cfgRaw.visualStyle, fallback.config.visualStyle),
      duration: pickAllowed("duration", cfgRaw.duration, fallback.config.duration),
      quality: pickAllowed("quality", cfgRaw.quality, fallback.config.quality),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, message: "Configure OPENAI_API_KEY no .env para usar IA real." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const ideaId = typeof body?.ideaId === "string" ? body.ideaId : undefined;
    const goal = typeof body?.goal === "string" ? body.goal : "Maximizar retencao e comentarios.";

    const base = generateScriptPackage(ideaId);
    const idea = getIdeaById(ideaId);
    const fallback: AiVideoSuggestion = {
      config: defaultConfig,
      pack: base,
    };

    const client = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const response = await client.responses.create({
      model,
      temperature: 0.7,
      input: [
        {
          role: "system",
          content:
            "Voce e especialista em roteiros virais curtos para TikTok/Reels. Responda apenas JSON valido, sem markdown.",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                `Nicho: ${idea.niche}\nIdioma: ${idea.language}\nObjetivo: ${goal}\n` +
                `Base do roteiro:\nTitulo: ${base.scriptTitle}\nHook: ${base.hook}\n` +
                "Gere um objeto JSON com este formato: " +
                '{"pack":{"scriptTitle":"...","hook":"...","scenes":["..."],"caption":"...","cta":"...","hashtags":["#..."]},' +
                '"config":{"format":"TikTok|Reels","voice":"Masculina|Feminina|Sem narracao",' +
                '"visualStyle":"Neon|Minimalista|Cinematico","duration":"20s|30s|45s","quality":"HD|Full HD|2K"}}',
            },
          ],
        },
      ],
    });

    const rawText = response.output_text?.trim();
    if (!rawText) {
      return NextResponse.json({ ok: false, message: "IA nao retornou conteudo." }, { status: 500 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    const suggestion = safeSuggestion(parsed, fallback);

    return NextResponse.json({ ok: true, suggestion });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Falha no assistente IA" },
      { status: 500 },
    );
  }
}
