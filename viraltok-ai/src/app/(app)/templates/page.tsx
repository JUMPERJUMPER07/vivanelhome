import { TemplateCard } from "@/components/feature/template-card";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/mock-data";

export default function TemplatesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold">Biblioteca de templates</h2>
        <p className="text-sm text-[var(--muted)]">Modelos prontos para acelerar hooks, roteiros e CTAs.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((item) => (
          <TemplateCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
