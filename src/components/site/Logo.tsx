import { Link } from "@tanstack/react-router";
import markAsset from "@/assets/joia-mark.png.asset.json";
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
      className={cn("group flex items-center gap-3 focus-gold rounded-sm", className)}
    >
      <img
        src={markAsset.url}
        alt=""
        aria-hidden="true"
        width={40}
        height={29}
        className="h-8 w-auto shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.6rem] not-italic leading-none tracking-tight",
            tone === "dark" ? "text-on-dark" : "text-ink",
          )}
        >
          JoIA
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-1 font-mono text-[0.5rem] tracking-[0.22em] uppercase",
              tone === "dark" ? "text-on-dark-soft" : "text-ink-soft",
            )}
          >
            Soluções Empresariais
          </span>
        )}
      </span>
    </Link>
  );
}
