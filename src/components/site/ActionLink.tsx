import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "gold" | "outline-dark" | "outline-light" | "ghost-gold";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 focus-gold min-h-12";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-gold-light shadow-[0_10px_30px_-12px_oklch(0.7274_0.1176_89.55/0.7)] hover:-translate-y-0.5",
  "outline-dark":
    "border border-line-light text-ink hover:border-gold hover:text-ink hover:-translate-y-0.5",
  "outline-light":
    "border border-line-dark text-on-dark hover:border-gold hover:text-gold-light hover:-translate-y-0.5",
  "ghost-gold": "text-gold hover:text-gold-light",
};

export function ActionLink({
  to,
  href,
  hash,
  variant = "gold",
  className,
  children,
  external,
}: {
  to?: string;
  href?: string;
  hash?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to as string} hash={hash} className={cls}>
      {children}
    </Link>
  );
}

export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "muted";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label-mono",
        tone === "gold" ? "text-gold" : "text-ink-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}
