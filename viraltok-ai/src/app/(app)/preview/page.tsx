import { ScriptPanel } from "@/components/feature/script-panel";
import { VideoGenerator } from "@/components/feature/video-generator";
import { VideoLibrary } from "@/components/feature/video-library";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { generateScriptPackage } from "@/lib/mock-data";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PreviewPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const rawIdeaId = params.ideaId;
  const ideaId = typeof rawIdeaId === "string" ? rawIdeaId : undefined;
  const pack = generateScriptPackage(ideaId);

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-4 bg-[linear-gradient(120deg,rgba(29,233,182,0.16),rgba(69,165,255,0.12))] p-5 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-wide text-cyan-100">Studio IA de Video</p>
            <h2 className="mt-1 text-2xl font-semibold">Criacao assistida para TikTok e Reels</h2>
            <p className="mt-2 text-sm text-white/80">Roteiro, hook, legenda, CTA, exportacao e biblioteca em um unico fluxo.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/15 bg-black/15 p-3">
              <p className="text-xs text-[var(--muted)]">Formato</p>
              <p className="text-base font-semibold">9:16</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/15 p-3">
              <p className="text-xs text-[var(--muted)]">Motor</p>
              <p className="text-base font-semibold">Assistente IA</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/15 p-3">
              <p className="text-xs text-[var(--muted)]">Idea ID</p>
              <p className="text-base font-semibold">{pack.ideaId}</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/15 p-3">
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-base font-semibold">Pronto para gerar</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-4">
        <ScriptPanel pack={pack} />
        <VideoGenerator pack={pack} />
        <VideoLibrary />
      </div>
      <div className="flex flex-wrap gap-3">
        <LinkButton href={`/calendar?ideaId=${pack.ideaId}`}>Salvar no calendario</LinkButton>
        <LinkButton href="/ideas" variant="secondary">
          Voltar para ideias
        </LinkButton>
      </div>
    </div>
  );
}
