/** Abstract interface mockups — no invented screens, data or metrics. */
export function CaseMockup({
  variant,
  image,
  imageAlt,
}: {
  variant: "data" | "system" | "site";
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line-dark bg-night">
        <div className="absolute inset-0 p-3">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-md border border-line-dark bg-deep">
            <div className="flex items-center gap-1.5 border-b border-line-dark px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-gold/80" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
            </div>
            <img
              src={image}
              alt={imageAlt ?? ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full bg-deep object-contain object-top"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line-dark bg-night">
      <div className="grid-tech absolute inset-0 opacity-60" />
      <svg viewBox="0 0 480 300" className="relative h-full w-full" aria-hidden="true">
        <rect
          x="16"
          y="16"
          width="448"
          height="268"
          rx="8"
          fill="var(--deep)"
          fillOpacity="0.55"
          stroke="var(--line-dark)"
        />
        <line x1="16" y1="48" x2="464" y2="48" stroke="var(--line-dark)" />
        <circle cx="34" cy="32" r="3.5" fill="var(--gold)" opacity="0.8" />
        <circle cx="48" cy="32" r="3.5" fill="var(--on-dark)" opacity="0.25" />
        <circle cx="62" cy="32" r="3.5" fill="var(--on-dark)" opacity="0.25" />

        {variant === "data" && (
          <g>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={36 + i * 138}
                y={68}
                width="122"
                height="58"
                rx="6"
                fill="var(--night)"
                stroke="var(--line-dark)"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <rect
                key={`b${i}`}
                x={48 + i * 138}
                y={86}
                width="52"
                height="6"
                rx="3"
                fill="var(--gold)"
                opacity="0.8"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <rect
                key={`c${i}`}
                x={48 + i * 138}
                y={102}
                width="80"
                height="5"
                rx="2.5"
                fill="var(--on-dark)"
                opacity="0.18"
              />
            ))}
            <rect
              x="36"
              y="142"
              width="260"
              height="122"
              rx="6"
              fill="var(--night)"
              stroke="var(--line-dark)"
            />
            {[38, 62, 44, 78, 56, 92, 70].map((h, i) => (
              <rect
                key={`bar${i}`}
                x={54 + i * 32}
                y={248 - h}
                width="16"
                height={h}
                rx="3"
                fill={i % 3 === 1 ? "var(--gold)" : "var(--deep-2)"}
                opacity={i % 3 === 1 ? 0.9 : 1}
              />
            ))}
            <rect
              x="312"
              y="142"
              width="132"
              height="122"
              rx="6"
              fill="var(--night)"
              stroke="var(--line-dark)"
            />
            <polyline
              points="326,238 352,214 378,224 404,186 430,196"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
            />
            {[
              [326, 238],
              [352, 214],
              [378, 224],
              [404, 186],
              [430, 196],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.6" fill="var(--gold-light)" />
            ))}
          </g>
        )}

        {variant === "system" && (
          <g>
            <rect
              x="36"
              y="68"
              width="96"
              height="196"
              rx="6"
              fill="var(--night)"
              stroke="var(--line-dark)"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={50}
                y={88 + i * 26}
                width={i === 1 ? 58 : 68}
                height="7"
                rx="3.5"
                fill={i === 1 ? "var(--gold)" : "var(--on-dark)"}
                opacity={i === 1 ? 0.9 : 0.16}
              />
            ))}
            {[0, 1, 2].map((col) => (
              <g key={col}>
                <rect
                  x={148 + col * 106}
                  y="68"
                  width="94"
                  height="196"
                  rx="6"
                  fill="var(--night)"
                  stroke="var(--line-dark)"
                />
                <rect
                  x={160 + col * 106}
                  y="82"
                  width="46"
                  height="6"
                  rx="3"
                  fill="var(--gold)"
                  opacity="0.7"
                />
                {[0, 1, 2].map((row) => (
                  <rect
                    key={row}
                    x={160 + col * 106}
                    y={100 + row * 46}
                    width="70"
                    height="34"
                    rx="4"
                    fill="var(--deep)"
                    stroke="var(--line-dark)"
                    opacity={col === 1 && row === 0 ? 1 : 0.7}
                  />
                ))}
              </g>
            ))}
          </g>
        )}

        {variant === "site" && (
          <g>
            <rect x="36" y="68" width="200" height="14" rx="7" fill="var(--gold)" opacity="0.85" />
            <rect
              x="36"
              y="94"
              width="260"
              height="9"
              rx="4.5"
              fill="var(--on-dark)"
              opacity="0.18"
            />
            <rect
              x="36"
              y="112"
              width="212"
              height="9"
              rx="4.5"
              fill="var(--on-dark)"
              opacity="0.12"
            />
            <rect x="36" y="142" width="104" height="30" rx="15" fill="var(--gold)" opacity="0.9" />
            <rect
              x="152"
              y="142"
              width="104"
              height="30"
              rx="15"
              fill="none"
              stroke="var(--line-dark)"
            />
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={36 + i * 142}
                y="200"
                width="128"
                height="64"
                rx="6"
                fill="var(--night)"
                stroke="var(--line-dark)"
              />
            ))}
            <rect
              x="312"
              y="68"
              width="132"
              height="104"
              rx="6"
              fill="var(--deep-2)"
              opacity="0.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
