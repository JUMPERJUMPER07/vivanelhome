type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 pl-1">
      {/* Eyebrow com linha decorativa */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-[var(--brand-primary)] to-transparent" />
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--brand-primary)]">
          {eyebrow}
        </p>
      </div>

      {/* Título */}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--brand-text)] md:text-4xl">
        {title}
      </h2>

      {/* Linha decorativa abaixo do título */}
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-[var(--brand-primary)]/60 to-transparent" />

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--brand-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
