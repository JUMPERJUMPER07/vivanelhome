import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-3">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-[var(--brand-primary)]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[var(--brand-text)]" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={12} className="opacity-30" />}
          </div>
        );
      })}
    </nav>
  );
}
