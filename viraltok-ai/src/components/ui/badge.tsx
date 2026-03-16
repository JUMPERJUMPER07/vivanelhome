import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/90", className)}>
      {children}
    </span>
  );
}
