import { IdeaCard } from "@/components/feature/idea-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDailyIdeas } from "@/lib/mock-data";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function IdeasPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const niche = typeof params.niche === "string" ? params.niche : undefined;
  const language = typeof params.language === "string" ? params.language : undefined;
  const tone = typeof params.tone === "string" ? params.tone : undefined;
  const audience = typeof params.audience === "string" ? params.audience : undefined;
  const template = typeof params.template === "string" ? params.template : undefined;
  const ideas = getDailyIdeas({ niche, language, tone, audience });

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold">Ideias virais do dia</h2>
        <p className="text-sm text-[var(--muted)]">Selecionamos ideias com base no seu nicho, tom e sinais de tendencia.</p>
        <div className="flex flex-wrap gap-2">
          <Badge>{niche ?? "Sugestoes gerais"}</Badge>
          <Badge>{language ?? "Portuguese"}</Badge>
          <Badge>{tone ?? "Mix de tons"}</Badge>
          <Badge>{audience ?? "Publico amplo"}</Badge>
          {template ? <Badge>Template: {template}</Badge> : null}
        </div>
      </Card>
      <div className="grid gap-4 xl:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
