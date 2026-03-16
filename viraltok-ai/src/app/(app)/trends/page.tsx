import { TrendCard } from "@/components/feature/trend-card";
import { Card } from "@/components/ui/card";
import { trends } from "@/lib/mock-data";

export default function TrendsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold">Radar de tendencias</h2>
        <p className="text-sm text-[var(--muted)]">Insights mockados com os formatos que estao acelerando no TikTok.</p>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {trends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
}
