import { CalendarBoard } from "@/components/feature/calendar-board";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { calendarPosts, getIdeaById } from "@/lib/mock-data";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CalendarPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const rawIdeaId = params.ideaId;
  const ideaId = typeof rawIdeaId === "string" ? rawIdeaId : undefined;

  const posts = !ideaId
    ? calendarPosts
    : [
        {
          id: "cal-new",
          title: getIdeaById(ideaId).title,
          date: "2026-03-12",
          channel: "TikTok" as const,
          status: "Rascunho" as const,
        },
        ...calendarPosts,
      ];

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold">Calendario de postagem</h2>
        <p className="text-sm text-[var(--muted)]">Planejamento semanal com status de cada conteudo.</p>
      </Card>
      <CalendarBoard posts={posts} />
      <LinkButton href="/ideas" variant="secondary">
        Gerar nova ideia
      </LinkButton>
    </div>
  );
}
