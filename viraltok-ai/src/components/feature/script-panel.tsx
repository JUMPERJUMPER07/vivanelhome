import { ScriptPackage } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ScriptPanel({ pack }: { pack: ScriptPackage }) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Roteiro viral gerado</p>
        <h2 className="text-xl font-semibold">{pack.scriptTitle}</h2>
      </div>
      <div>
        <p className="text-xs text-[var(--muted)]">Hook</p>
        <p className="text-sm">{pack.hook}</p>
      </div>
      <div>
        <p className="text-xs text-[var(--muted)]">Cenas</p>
        <ul className="mt-1 space-y-1 text-sm">
          {pack.scenes.map((scene) => (
            <li key={scene} className="rounded-lg bg-white/5 px-2 py-1">
              {scene}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs text-[var(--muted)]">Legenda</p>
        <p className="text-sm">{pack.caption}</p>
      </div>
      <div>
        <p className="text-xs text-[var(--muted)]">CTA</p>
        <p className="text-sm">{pack.cta}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {pack.hashtags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Card>
  );
}
