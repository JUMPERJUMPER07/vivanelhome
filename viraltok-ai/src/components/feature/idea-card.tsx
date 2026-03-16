import { TrendingUp } from "lucide-react";
import { ViralIdea } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";

export function IdeaCard({ idea }: { idea: ViralIdea }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{idea.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{idea.hook}</p>
        </div>
        <Badge className="bg-emerald-400/20 text-emerald-100">{idea.score}/100</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge>{idea.niche}</Badge>
        <Badge>{idea.language}</Badge>
        <Badge className="bg-blue-400/15 text-blue-100">{idea.estimatedViews}</Badge>
      </div>
      <p className="flex items-center gap-1 text-sm text-[var(--muted)]">
        <TrendingUp size={14} /> {idea.trendReason}
      </p>
      <div className="flex gap-2">
        <LinkButton href={`/preview?ideaId=${idea.id}`}>Gerar roteiro e video</LinkButton>
        <LinkButton variant="secondary" href={`/calendar?ideaId=${idea.id}`}>
          Salvar no calendario
        </LinkButton>
      </div>
    </Card>
  );
}
