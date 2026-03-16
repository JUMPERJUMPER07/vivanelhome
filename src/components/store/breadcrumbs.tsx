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
    <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--brand-muted)]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-[var(--brand-orange)]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-[var(--brand-text)]" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={14} />}
          </div>
        );
      })}
    </nav>
  );
}
