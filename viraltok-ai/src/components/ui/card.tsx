import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(23,34,58,0.92),rgba(14,22,39,0.95))] p-5 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
