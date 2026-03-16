"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clapperboard, Download, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExportedVideo {
  fileName: string;
  publicUrl: string;
  sizeBytes: number;
  updatedAt: string;
}

export function VideoLibrary() {
  const [videos, setVideos] = useState<ExportedVideo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/video/export");
      const payload = await response.json();
      if (!response.ok || !payload?.ok) throw new Error(payload?.message ?? "Falha ao carregar videos");
      const list = payload.videos as ExportedVideo[];
      setVideos(list);
      if (list.length > 0) setSelected((prev) => prev ?? list[0].publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const current = useMemo(() => videos.find((item) => item.publicUrl === selected) ?? videos[0], [videos, selected]);

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Clapperboard size={18} />
          Visualizador de videos
        </h3>
        <Button variant="secondary" className="gap-2" onClick={loadVideos} disabled={loading}>
          <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
          Atualizar lista
        </Button>
      </div>

      {error ? <p className="text-sm text-rose-200">{error}</p> : null}
      {!error && videos.length === 0 ? <p className="text-sm text-[var(--muted)]">Nenhum video exportado ainda.</p> : null}

      {current ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3">
            <video key={current.publicUrl} controls className="mx-auto aspect-[9/16] max-h-[520px] w-auto rounded-xl">
              <source src={current.publicUrl} type="video/mp4" />
            </video>
          </div>
          <div className="space-y-2">
            {videos.map((video) => (
              <button
                key={video.publicUrl}
                type="button"
                onClick={() => setSelected(video.publicUrl)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                  current.publicUrl === video.publicUrl
                    ? "border-cyan-300/50 bg-cyan-200/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <p className="truncate">{video.fileName}</p>
                <p className="text-xs text-[var(--muted)]">
                  {(video.sizeBytes / 1024 / 1024).toFixed(1)} MB - {new Date(video.updatedAt).toLocaleString("pt-BR")}
                </p>
              </button>
            ))}
            <a
              href={current.publicUrl}
              download={current.fileName}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
            >
              <Download size={14} />
              Download do selecionado
            </a>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
