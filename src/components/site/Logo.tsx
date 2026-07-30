import { Link } from "@tanstack/react-router";
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
        "group inline-flex min-h-11 min-w-11 items-center rounded-sm transition-opacity hover:opacity-90 focus-gold",
        className,
      )}
    >
      <img
        src="/joia-mark.png"
        alt=""
        aria-hidden="true"
        width={50}
        height={34}
        className="h-9 w-auto shrink-0 object-contain transition-transform duration-500 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
