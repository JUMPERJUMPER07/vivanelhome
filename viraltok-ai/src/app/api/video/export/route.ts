import { NextRequest, NextResponse } from "next/server";
import { exportVerticalVideo, listExportedVideos } from "@/lib/server/video-export";

export const runtime = "nodejs";

const durationMap: Record<string, number> = {
  "20s": 20,
  "30s": 30,
  "45s": 45,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title = String(body?.title ?? "Video Viral");
    const hook = String(body?.hook ?? "Gancho");
    const duration = String(body?.duration ?? "30s");
    const format = body?.format === "Reels" ? "Reels" : "TikTok";
    const quality = body?.quality === "2K" ? "2K" : body?.quality === "HD" ? "HD" : "Full HD";
    const voice = body?.voice === "Masculina" ? "Masculina" : body?.voice === "Sem narracao" ? "Sem narracao" : "Feminina";
    const narrationText = typeof body?.narrationText === "string" ? body.narrationText : `${title}. ${hook}`;
    const musicEnabled = body?.musicEnabled !== false;
    const musicLevel = body?.musicLevel === "Alto" ? "Alto" : body?.musicLevel === "Medio" ? "Medio" : "Baixo";
    const durationSeconds = durationMap[duration] ?? 30;

    const output = await exportVerticalVideo({
      title,
      hook,
      durationSeconds,
      format,
      quality,
      voice,
      narrationText,
      musicEnabled,
      musicLevel,
    });

    return NextResponse.json({
      ok: true,
      fileName: output.filename,
      downloadUrl: output.publicUrl,
      sizeBytes: output.sizeBytes,
      quality,
      format,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Falha ao exportar video" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const videos = await listExportedVideos();
    return NextResponse.json({ ok: true, videos });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Falha ao listar videos" },
      { status: 500 },
    );
  }
}
