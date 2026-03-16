"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Clapperboard, CreditCard, Flame, Home, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/ideas", label: "Gerador de ideias", icon: Lightbulb },
  { href: "/templates", label: "Templates", icon: Sparkles },
  { href: "/trends", label: "Tendencias", icon: Flame },
  { href: "/preview", label: "Preview video", icon: Clapperboard },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/billing", label: "Planos e billing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-white/10 bg-[#0d1628] px-4 py-4 lg:min-h-screen lg:w-72 lg:border-r lg:border-b-0">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-[linear-gradient(130deg,var(--brand),var(--brand-2))]" />
        <div>
          <p className="text-sm text-[var(--muted)]">SaaS</p>
          <p className="text-lg font-semibold">ViralTok AI</p>
        </div>
      </div>
      <nav className="grid gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                active ? "bg-white/15 text-white" : "text-[var(--muted)] hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
