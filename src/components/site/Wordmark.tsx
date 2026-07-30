import { cn } from "@/lib/utils";

/**
 * Crisp vector mark: faceted brilliant-cut diamond with circuit tracks.
 * Replaces the raster logo so the brand stays sharp at any size.
 */
export function JoiaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        {/* crown + pavilion outline */}
        <path d="M8 4 H40 L46 17 L24 46 L2 17 Z" strokeWidth="2.4" />
        {/* girdle */}
        <path d="M2 17 H46" strokeWidth="1.4" opacity="0.85" />
        {/* crown facets */}
        <path d="M14 4 L8.6 17 M24 4 L16.4 17 M24 4 L31.6 17 M34 4 L39.4 17" strokeWidth="1.2" opacity="0.7" />
        {/* pavilion facets */}
        <path d="M8.6 17 L24 46 M16.4 17 L24 46 M31.6 17 L24 46 M39.4 17 L24 46" strokeWidth="1.2" opacity="0.7" />
        {/* circuit tracks */}
        <path d="M46 17 H54 V9 H60" strokeWidth="1.4" opacity="0.9" />
        <path d="M40 4 H52 V12" strokeWidth="1.4" opacity="0.6" />
      </g>
      <circle cx="60" cy="9" r="2.4" fill="currentColor" />
      <circle cx="52" cy="12" r="1.8" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function Wordmark({
  tone = "dark",
  size = "md",
  withTagline = true,
  className,
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
}) {
  const mark = size === "lg" ? "h-9" : size === "sm" ? "h-6" : "h-7";
  const text =
    size === "lg" ? "text-[2.35rem]" : size === "sm" ? "text-[1.35rem]" : "text-[1.75rem]";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <JoiaMark className={cn(mark, "w-auto shrink-0 text-gold")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif not-italic leading-[0.9] tracking-[-0.01em]",
            text,
            tone === "dark" ? "text-on-dark" : "text-ink",
          )}
        >
          Jo<span className="text-gold">IA</span>
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-[0.45em] font-mono text-[0.5rem] leading-none tracking-[0.28em] uppercase",
              tone === "dark" ? "text-on-dark-soft" : "text-ink-soft",
            )}
          >
            Soluções Empresariais
          </span>
        )}
      </span>
    </span>
  );
}
