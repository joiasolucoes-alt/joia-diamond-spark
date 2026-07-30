import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
  withTagline = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  withTagline?: boolean;
}) {
  return (
    <Link
      to="/"
      hash=""
      aria-label="JoIA Soluções Empresariais — ir para o topo da home"
      className={cn(
        "group inline-flex items-center focus-gold rounded-sm transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Wordmark
        tone={tone}
        withTagline={withTagline}
        className="[&_svg]:transition-transform [&_svg]:duration-500 group-hover:[&_svg]:-translate-y-0.5"
      />
    </Link>
  );
}
