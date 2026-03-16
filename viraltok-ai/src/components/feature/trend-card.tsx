import { Flame } from "lucide-react";
import { TrendItem } from "@/types/domain";
import { Card } from "@/components/ui/card";

export function TrendCard({ trend }: { trend: TrendItem }) {
  return (
    <Card className="space-y-2">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <Flame size={16} className="text-orange-300" />
        {trend.topic}
      </h3>
      <p className="text-sm text-emerald-200">{trend.momentum}</p>
      <p className="text-sm text-[var(--muted)]">{trend.nicheFit}</p>
      <p className="rounded-xl bg-white/5 p-2 text-sm">{trend.action}</p>
    </Card>
  );
}
