"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, LoaderCircle, Sparkles, WandSparkles } from "lucide-react";
import { generateVideoRender } from "@/lib/mock-data";
import { AiVideoSuggestion, ScriptPackage, VideoRenderConfig, VideoRenderResult } from "@/types/domain";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/field";
import { VideoPreview } from "@/components/feature/video-preview";

const initialConfig: VideoRenderConfig = {
  format: "TikTok",
  voice: "Feminina",
  visualStyle: "Neon",
  duration: "30s",
  quality: "Full HD",
};

export function VideoGenerator({ pack }: { pack: ScriptPackage }) {
  const [activePack, setActivePack] = useState<ScriptPackage>(pack);
  const [config, setConfig] = useState<VideoRenderConfig>(initialConfig);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [musicLevel, setMusicLevel] = useState<"Baixo" | "Medio" | "Alto">("Baixo");
  const [goal, setGoal] = useState("Ganhar alcance e aumentar comentarios qualificados.");
  const [progress, setProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [result, setResult] = useState<VideoRenderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  const localResult = useMemo(() => generateVideoRender(activePack, config), [activePack, config]);

  useEffect(() => {
    if (!isRendering) return;
    const timer = setInterval(() => {
      setProgress((current) => {
        const next = current + 12;
        if (next >= 100) {
          clearInterval(timer);
          setIsRendering(false);
          return 100;
        }
        return next;
      });
    }, 350);
    return () => clearInterval(timer);
  }, [isRendering]);

  const createWithAi = async () => {
    setError(null);
    setAiMessage(null);
    setIsGeneratingAi(true);

    try {
      const response = await fetch("/api/video/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaId: activePack.ideaId,
          goal,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message ?? "Falha ao gerar roteiro com IA");
      }

      const suggestion = payload.suggestion as AiVideoSuggestion;
      setActivePack(suggestion.pack);
      setConfig(suggestion.config);
      setAiMessage("IA aplicada: roteiro e configuracao atualizados automaticamente.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao gerar roteiro com IA");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const startRender = async () => {
    setError(null);
    setResult(null);
    setProgress(0);
    setIsRendering(true);
    setIsExporting(true);

    try {
      const response = await fetch("/api/video/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: activePack.scriptTitle,
          hook: activePack.hook,
          duration: config.duration,
          format: config.format,
          quality: config.quality,
          voice: config.voice,
          narrationText: [activePack.hook, ...activePack.scenes, activePack.cta].join(" "),
          musicEnabled,
          musicLevel,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message ?? "Falha ao exportar video");
      }

      setResult({
        ...localResult,
        fileName: payload.fileName ?? localResult.fileName,
        estimatedSize: payload?.sizeBytes ? `${(payload.sizeBytes / 1024 / 1024).toFixed(1)} MB` : localResult.estimatedSize,
        quality: payload.quality ?? localResult.quality,
        downloadUrl: payload.downloadUrl ?? localResult.downloadUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao exportar video");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card className="space-y-4">
          <div className="rounded-xl border border-cyan-200/20 bg-cyan-300/5 p-3">
            <p className="text-xs uppercase tracking-wide text-cyan-200">Assistente IA</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Descreva o objetivo e deixe a IA montar roteiro + preset ideal.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Objetivo do video" />
              <Button onClick={createWithAi} className="gap-2" disabled={isGeneratingAi}>
                {isGeneratingAi ? <LoaderCircle size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Criar com IA
              </Button>
            </div>
            {aiMessage ? <p className="mt-2 text-xs text-emerald-200">{aiMessage}</p> : null}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Roteiro ativo</p>
            <p className="mt-1 text-sm font-medium">{activePack.scriptTitle}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{activePack.hook}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Formato</label>
              <Select value={config.format} onChange={(e) => setConfig((prev) => ({ ...prev, format: e.target.value as VideoRenderConfig["format"] }))}>
                <option className="bg-slate-900">TikTok</option>
                <option className="bg-slate-900">Reels</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Narracao</label>
              <Select value={config.voice} onChange={(e) => setConfig((prev) => ({ ...prev, voice: e.target.value as VideoRenderConfig["voice"] }))}>
                <option className="bg-slate-900">Feminina</option>
                <option className="bg-slate-900">Masculina</option>
                <option className="bg-slate-900">Sem narracao</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Estilo visual</label>
              <Select value={config.visualStyle} onChange={(e) => setConfig((prev) => ({ ...prev, visualStyle: e.target.value as VideoRenderConfig["visualStyle"] }))}>
                <option className="bg-slate-900">Neon</option>
                <option className="bg-slate-900">Minimalista</option>
                <option className="bg-slate-900">Cinematico</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Duracao</label>
              <Select value={config.duration} onChange={(e) => setConfig((prev) => ({ ...prev, duration: e.target.value as VideoRenderConfig["duration"] }))}>
                <option className="bg-slate-900">20s</option>
                <option className="bg-slate-900">30s</option>
                <option className="bg-slate-900">45s</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-[var(--muted)]">Qualidade de imagem</label>
              <Select value={config.quality} onChange={(e) => setConfig((prev) => ({ ...prev, quality: e.target.value as VideoRenderConfig["quality"] }))}>
                <option className="bg-slate-900">HD</option>
                <option className="bg-slate-900">Full HD</option>
                <option className="bg-slate-900">2K</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Trilha de fundo</label>
              <Select value={musicEnabled ? "Ligada" : "Desligada"} onChange={(e) => setMusicEnabled(e.target.value === "Ligada")}>
                <option className="bg-slate-900">Ligada</option>
                <option className="bg-slate-900">Desligada</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Intensidade da trilha</label>
              <Select value={musicLevel} onChange={(e) => setMusicLevel(e.target.value as "Baixo" | "Medio" | "Alto")} disabled={!musicEnabled}>
                <option className="bg-slate-900">Baixo</option>
                <option className="bg-slate-900">Medio</option>
                <option className="bg-slate-900">Alto</option>
              </Select>
            </div>
          </div>

          <Button className="w-full gap-2" onClick={startRender} disabled={isRendering || isExporting}>
            {isRendering ? <LoaderCircle size={16} className="animate-spin" /> : <WandSparkles size={16} />}
            {isRendering || isExporting ? `Renderizando... ${progress}%` : "Gerar video agora"}
          </Button>
          <div className="h-2 w-full rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-[linear-gradient(90deg,var(--brand),var(--brand-2))]" style={{ width: `${progress}%` }} />
          </div>
        </Card>

        <VideoPreview pack={activePack} />
      </div>

      {error ? (
        <Card className="border-rose-300/30">
          <p className="text-sm text-rose-200">{error}</p>
        </Card>
      ) : null}

      {result && progress >= 100 ? (
        <Card className="space-y-2 border-emerald-300/30">
          <p className="flex items-center gap-2 text-emerald-200">
            <CheckCircle2 size={16} />
            Video gerado com sucesso
          </p>
          <p className="text-sm">{result.fileName}</p>
          <p className="text-sm text-[var(--muted)]">
            {config.format} - {result.quality} - {result.estimatedSize} - {result.scenes} cenas - trilha {musicEnabled ? musicLevel : "off"} - pronto as {result.readyAt}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <LinkButton href={`/calendar?ideaId=${activePack.ideaId}`} className="gap-2">
              <Sparkles size={14} />
              Salvar video no calendario
            </LinkButton>
            {result.downloadUrl ? (
              <a
                href={result.downloadUrl}
                download={result.fileName}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
              >
                Baixar MP4
              </a>
            ) : null}
            <Button variant="secondary" onClick={startRender}>
              Gerar nova versao
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
