type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 pl-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--brand-text)] md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--brand-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
