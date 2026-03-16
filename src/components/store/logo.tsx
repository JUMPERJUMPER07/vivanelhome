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
        "inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-3 py-2 shadow-[0_14px_35px_rgba(91,33,182,0.16)] backdrop-blur",
        compact ? "text-lg" : "text-xl md:text-2xl",
      )}
      aria-label="Voltar para a pagina inicial da VivanelHOME"
    >
      <span className="font-display font-black tracking-tight text-[var(--brand-orange)]">
        Vivanel
      </span>
      <span className="rounded-[1.1rem] bg-[linear-gradient(135deg,#111111,#6d28d9)] px-2 py-1 font-display font-black leading-none text-white shadow-sm">
        HOME
      </span>
    </Link>
  );
}
