import { CalendarBoard } from "@/components/feature/calendar-board";
import { IdeaCard } from "@/components/feature/idea-card";
import { TrendCard } from "@/components/feature/trend-card";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { calendarPosts, trends, viralIdeas } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="bg-[linear-gradient(125deg,rgba(69,165,255,0.15),rgba(29,233,182,0.13))] p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-100">Visao geral</p>
          <h2 className="mt-1 text-2xl font-semibold">Operacao diaria de videos virais</h2>
          <p className="mt-2 text-sm text-white/80">Acompanhe criacao, tendencias, exportacao e agendamento em tempo real.</p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-cyan-300/25">
          <p className="text-sm text-[var(--muted)]">Ideias virais hoje</p>
          <p className="text-3xl font-semibold">12</p>
          <p className="text-xs text-emerald-200">+3 vs ontem</p>
        </Card>
        <Card className="border-emerald-300/25">
          <p className="text-sm text-[var(--muted)]">Videos prontos para publicar</p>
          <p className="text-3xl font-semibold">4</p>
          <p className="text-xs text-emerald-200">2 em TikTok, 2 em Reels</p>
        </Card>
        <Card className="border-indigo-300/25">
          <p className="text-sm text-[var(--muted)]">Media de retencao (mock)</p>
          <p className="text-3xl font-semibold">41.8%</p>
          <p className="text-xs text-emerald-200">Meta: 45%</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <IdeaCard idea={viralIdeas[0]} />
        <TrendCard trend={trends[0]} />
      </div>

      <CalendarBoard posts={calendarPosts} />

      <div className="flex flex-wrap gap-3">
        <LinkButton href="/ideas">Ir para gerador de ideias</LinkButton>
        <LinkButton href="/preview?ideaId=idea-1" variant="secondary">
          Gerar roteiro e preview
        </LinkButton>
      </div>
    </div>
  );
}
