import { TemplateItem } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";

export function TemplateCard({ item }: { item: TemplateItem }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <Badge className="bg-cyan-400/20 text-cyan-100">{item.winRate} win rate</Badge>
      </div>
      <p className="text-xs uppercase text-[var(--muted)]">{item.category}</p>
      <p className="text-sm text-white/90">{item.description}</p>
      <LinkButton variant="secondary" href={`/ideas?template=${encodeURIComponent(item.name)}`}>
        Usar template
      </LinkButton>
    </Card>
  );
}
