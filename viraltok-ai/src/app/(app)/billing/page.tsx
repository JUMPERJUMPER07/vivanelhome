"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  { name: "Starter", price: "R$49", features: ["30 ideias/mes", "Preview basico", "1 workspace"], highlight: false },
  { name: "Pro", price: "R$149", features: ["Ideias ilimitadas", "Templates premium", "Calendario completo"], highlight: true },
  { name: "Scale", price: "R$349", features: ["Multi-equipe", "Automacoes mockadas", "Prioridade"], highlight: false },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("Pro");

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">Planos e billing (mockado)</h2>
          <p className="text-sm text-[var(--muted)]">Checkout e cobranca simulados para o MVP.</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-100">Plano atual: {currentPlan}</Badge>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.highlight ? "border-cyan-300/40" : ""}>
            <p className="text-sm text-[var(--muted)]">{plan.name}</p>
            <p className="my-2 text-3xl font-semibold">
              {plan.price}
              <span className="text-sm text-[var(--muted)]">/mes</span>
            </p>
            <ul className="space-y-2 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-300" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-4 w-full"
              variant={currentPlan === plan.name || plan.highlight ? "primary" : "secondary"}
              onClick={() => setCurrentPlan(plan.name)}
            >
              Selecionar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
