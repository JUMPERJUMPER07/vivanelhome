import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx(
        "group relative flex items-center gap-2 transition-all active:scale-95",
        compact ? "text-xl" : "text-2xl md:text-3xl",
      )}
      aria-label="VivanelHOME"
    >
      <div className="flex items-center gap-1">
        <span className="font-black tracking-tighter text-current drop-shadow-sm">
          Vivanel
        </span>
        <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] px-2.5 py-1 shadow-[0_0_15px_rgba(139,92,246,0.3)] ring-1 ring-white/20">
          <span className="text-[0.75em] font-black leading-none text-white tracking-[0.2em] uppercase">
            HOME
          </span>
        </div>
      </div>
      
      {/* Luz sutil de fundo ao passar o mouse */}
      <div className="absolute -inset-2 bg-[var(--brand-primary)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
