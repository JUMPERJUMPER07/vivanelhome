import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-slate-950 font-semibold hover:opacity-90",
  secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/15",
  ghost: "bg-transparent text-[var(--muted)] hover:text-white",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function LinkButton({ href, className, variant = "primary", children }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
