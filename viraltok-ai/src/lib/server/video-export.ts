import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { synthesizeNarration } from "@/lib/server/tts";

interface ExportInput {
  title: string;
  hook: string;
  durationSeconds: number;
  format: "TikTok" | "Reels";
  quality: "HD" | "Full HD" | "2K";
  voice: "Masculina" | "Feminina" | "Sem narracao";
  narrationText?: string;
  musicEnabled?: boolean;
  musicLevel?: "Baixo" | "Medio" | "Alto";
}

function safeName(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 42);
}

function escapeText(input: string) {
  return input.replace(/'/g, "\\'").replace(/:/g, "\\:").slice(0, 120);
}

function getResolution(quality: ExportInput["quality"]) {
  if (quality === "2K") return { size: "1440x2560", videoBitrate: "8500k" };
  if (quality === "Full HD") return { size: "1080x1920", videoBitrate: "5500k" };
  return { size: "720x1280", videoBitrate: "2800k" };
}

export async function exportVerticalVideo({
  title,
  hook,
  durationSeconds,
  format,
  quality,
  voice,
  narrationText,
  musicEnabled = true,
  musicLevel = "Baixo",
}: ExportInput) {
  if (!ffmpegPath) {
    throw new Error("FFmpeg nao encontrado no ambiente.");
  }
  const ffmpegBinary = ffmpegPath;

  const publicDir = path.join(process.cwd(), "public");
  const exportDir = path.join(publicDir, "exports");
  await fs.mkdir(exportDir, { recursive: true });

  const stamp = Date.now();
  const filename = `${safeName(title) || "video-viral"}-${format.toLowerCase()}-${stamp}.mp4`;
  const outputPath = path.join(exportDir, filename);
  const drawTitle = escapeText(title);
  const drawHook = escapeText(hook);
  const resolution = getResolution(quality);
  let narrationPath: string | null = null;
  const musicVolume = musicLevel === "Alto" ? 0.22 : musicLevel === "Medio" ? 0.15 : 0.09;

  if (voice !== "Sem narracao" && narrationText?.trim()) {
    const narration = await synthesizeNarration({
      text: narrationText,
      voice,
      filePrefix: safeName(title) || "narracao",
    });
    narrationPath = narration.outputPath;
  }

  const filter = [
    "drawbox=x=40:y=1180:w=1000:h=600:color=black@0.35:t=fill",
    `drawtext=text='${drawTitle}':fontcolor=white:fontsize=54:x=60:y=1240`,
    `drawtext=text='${drawHook}':fontcolor=0x8EF9E6:fontsize=36:x=60:y=1330`,
    `drawtext=text='Formato ${format} - ${quality}':fontcolor=0xC9D6F5:fontsize=30:x=60:y=1770`,
  ].join(",");

  const musicInput =
    "sine=frequency=130:sample_rate=44100:duration=" +
    `${durationSeconds},volume=${musicVolume},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo`;

  let args: string[] = [];
  if (musicEnabled && narrationPath) {
    args = [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=#111a2e:s=${resolution.size}:d=${durationSeconds}`,
      "-i",
      narrationPath,
      "-f",
      "lavfi",
      "-i",
      musicInput,
      "-vf",
      filter,
      "-filter_complex",
      "[2:a][1:a]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=300[ducked];" +
        "[1:a][ducked]amix=inputs=2:duration=longest:dropout_transition=2[aout]",
      "-map",
      "0:v:0",
      "-map",
      "[aout]",
      "-t",
      String(durationSeconds),
      "-c:v",
      "libx264",
      "-b:v",
      resolution.videoBitrate,
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      outputPath,
    ];
  } else if (musicEnabled && !narrationPath) {
    args = [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=#111a2e:s=${resolution.size}:d=${durationSeconds}`,
      "-f",
      "lavfi",
      "-i",
      musicInput,
      "-vf",
      filter,
      "-shortest",
      "-c:v",
      "libx264",
      "-b:v",
      resolution.videoBitrate,
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      outputPath,
    ];
  } else if (narrationPath) {
    args = [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=#111a2e:s=${resolution.size}:d=${durationSeconds}`,
      "-i",
      narrationPath,
      "-vf",
      filter,
      "-af",
      "apad",
      "-t",
      String(durationSeconds),
      "-c:v",
      "libx264",
      "-b:v",
      resolution.videoBitrate,
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      outputPath,
    ];
  } else {
    args = [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=#111a2e:s=${resolution.size}:d=${durationSeconds}`,
      "-f",
      "lavfi",
      "-i",
      "anullsrc=r=44100:cl=stereo",
      "-vf",
      filter,
      "-shortest",
      "-c:v",
      "libx264",
      "-b:v",
      resolution.videoBitrate,
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      outputPath,
    ];
  }

  await new Promise<void>((resolve, reject) => {
    const proc = spawn(ffmpegBinary, args, { windowsHide: true });
    let stderr = "";

    proc.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    proc.on("error", (error) => reject(error));
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `FFmpeg saiu com codigo ${code}`));
    });
  });

  const fileStats = await fs.stat(outputPath);
  if (narrationPath) {
    await fs.unlink(narrationPath).catch(() => undefined);
  }

  return {
    filename,
    filePath: outputPath,
    publicUrl: `/exports/${filename}`,
    sizeBytes: fileStats.size,
  };
}

export async function listExportedVideos() {
  const exportDir = path.join(process.cwd(), "public", "exports");
  await fs.mkdir(exportDir, { recursive: true });
  const files = await fs.readdir(exportDir);

  const mapped = await Promise.all(
    files
      .filter((name) => name.toLowerCase().endsWith(".mp4"))
      .map(async (name) => {
        const absolute = path.join(exportDir, name);
        const stat = await fs.stat(absolute);
        return {
          fileName: name,
          publicUrl: `/exports/${name}`,
          sizeBytes: stat.size,
          updatedAt: stat.mtime.toISOString(),
        };
      }),
  );

  return mapped.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}
