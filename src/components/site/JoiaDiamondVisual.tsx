import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Parallax amplitude expressed in SVG user units, so it scales with the artwork. */
const TILT_X = 16;
const TILT_Y = 12;
const SPRING = { stiffness: 90, damping: 22, mass: 0.6 } as const;
/** Shared loop period so every repeating pulse keeps the same rhythm. */
const CYCLE = 7;


const OUTLINE = "M120 180 L480 180 L520 262 L300 486 L80 262 Z";

const CROWN_TOP = [120, 210, 300, 390, 480];
const GIRDLE = [80, 170, 300, 430, 520];

const crownFacets: string[] = [];
CROWN_TOP.forEach((cx, i) => {
  const left = GIRDLE[i];
  const right = GIRDLE[i + 1];
  if (left !== undefined) crownFacets.push(`M${cx} 180 L${left} 262`);
  if (right !== undefined && i < CROWN_TOP.length - 1)
    crownFacets.push(`M${cx} 180 L${right} 262`);
});

const girdleLine = "M80 262 L520 262";
const pavilion = GIRDLE.slice(1, 4).map((x) => `M${x} 262 L300 486`);
const pavilionEdges = [`M80 262 L300 486`, `M520 262 L300 486`];

/* internal circuit tracks — gold, "active" data paths */
const circuits = [
  "M300 262 L300 330 L360 330 L360 392",
  "M300 262 L300 306 L232 306 L232 372",
  "M170 262 L170 300 L214 300",
  "M430 262 L430 300 L386 300",
  "M300 180 L300 226 L246 226",
  "M300 180 L300 214 L356 214",
];

const nodes = [
  [360, 392],
  [232, 372],
  [214, 300],
  [386, 300],
  [246, 226],
  [356, 226],
  [300, 262],
];

const scatter = [
  [46, 96],
  [128, 60],
  [230, 96],
  [402, 64],
  [520, 118],
  [566, 214],
  [40, 220],
  [58, 380],
  [140, 470],
  [470, 430],
  [556, 340],
  [300, 552],
  [176, 540],
  [430, 528],
];

const fragments = [
  "M28 150 L96 150",
  "M504 120 L568 120",
  "M20 300 L62 340",
  "M540 300 L580 262",
  "M120 520 L188 520",
  "M410 556 L482 556",
];

export function JoiaDiamondVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /* normalized pointer offset (-1..1) — motion values, so no React re-renders */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  /* artwork size ratio: keeps the parallax proportional on every screen */
  const scale = useMotionValue(0);

  const sx = useSpring(useTransform([px, scale], ([p, s]: number[]) => p * TILT_X * s), SPRING);
  const sy = useSpring(useTransform([py, scale], ([p, s]: number[]) => p * TILT_Y * s), SPRING);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // artwork viewBox is 600 units wide -> px per unit
    const ro = new ResizeObserver(([entry]) => {
      scale.set(entry.contentRect.width / 600);
    });
    ro.observe(el);

    if (reduce || !window.matchMedia("(pointer: fine)").matches) {
      return () => ro.disconnect();
    }

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        px.set(Math.max(-1, Math.min(1, dx)));
        py.set(Math.max(-1, Math.min(1, dy)));
      });
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, [reduce, px, py, scale]);

  const draw = (delay: number, duration = 0.9) =>
    reduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration, delay, ease: EASE },
            opacity: { duration: 0.35, delay, ease: "linear" as const },
          },
        };

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.svg
        viewBox="0 0 600 600"
        className="h-full w-full overflow-visible [will-change:transform]"
        style={reduce ? undefined : { x: sx, y: sy }}
      >

        <defs>
          <linearGradient id="joia-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gold-light)" />
            <stop offset="55%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-light)" />
          </linearGradient>
          <linearGradient id="joia-face" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.16" />
            <stop offset="60%" stopColor="var(--deep-2)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--night)" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="joia-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.30" />
            <stop offset="70%" stopColor="var(--gold)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="joia-clip">
            <path d={OUTLINE} />
          </clipPath>
          <filter id="joia-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* 1. technical grid */}
        <g opacity="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={60 + i * 60}
              y1="30"
              x2={60 + i * 60}
              y2="570"
              stroke="var(--line-dark)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="20"
              y1={60 + i * 60}
              x2="580"
              y2={60 + i * 60}
              stroke="var(--line-dark)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* 2. scattered points — dispersion */}
        {scatter.map(([x, y], i) => (
          <motion.circle
            key={`s${i}`}
            cx={x}
            cy={y}
            r="2.4"
            fill="var(--on-dark-soft)"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? { opacity: 0.22 } : { opacity: [0, 0.85, 0.22] }}
            transition={{ duration: 2.2, delay: i * 0.04, ease: EASE }}
          />
        ))}

        {/* 3. interrupted lines / fragments */}
        {fragments.map((d, i) => (
          <motion.path
            key={`f${i}`}
            d={d}
            stroke="var(--line-dark)"
            strokeWidth="1.5"
            fill="none"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: EASE }}
          />
        ))}

        {/* inner glow */}
        <motion.ellipse
          cx="300"
          cy="300"
          rx="190"
          ry="190"
          fill="url(#joia-glow)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
        />

        {/* 4. faceted fill */}
        <motion.path
          d={OUTLINE}
          fill="url(#joia-face)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        />

        {/* depth: offset ghost wireframe (2.5D) */}
        <motion.path
          d={OUTLINE}
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          transform="translate(10 12)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        {/* 5. outline drawn */}
        <motion.path
          d={OUTLINE}
          fill="none"
          stroke="url(#joia-gold)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={draw(0.65, 1.3)}
        />

        {/* soft bloom of the outline */}
        <path
          d={OUTLINE}
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.35"
          strokeWidth="5"
          filter="url(#joia-soft)"
        />

        {/* 6. internal facets */}
        <g stroke="url(#joia-gold)" strokeWidth="2" fill="none" strokeOpacity="0.9">
          {[girdleLine, ...crownFacets, ...pavilion, ...pavilionEdges].map((d, i) => (
            <motion.path
              key={`fa${i}`}
              d={d}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={draw(1.35 + i * 0.05, 0.7)}
            />
          ))}
        </g>

        {/* white support lines */}
        <g clipPath="url(#joia-clip)">
          {["M80 320 L520 320", "M110 400 L490 400"].map((d, i) => (
            <motion.path
              key={`w${i}`}
              d={d}
              stroke="var(--on-dark)"
              strokeOpacity="0.14"
              strokeWidth="1"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.9 + i * 0.1, ease: EASE }}
            />
          ))}
        </g>

        {/* 7-8. circuits + gold pulses */}
        <g clipPath="url(#joia-clip)">
          {circuits.map((d, i) => (
            <g key={`c${i}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="var(--on-dark)"
                strokeOpacity="0.22"
                strokeWidth="1.4"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 2 + i * 0.08, ease: EASE }}
              />
              {!reduce && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--gold-light)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.18 0.82"
                  initial={{ strokeDashoffset: 1, opacity: 0 }}
                  animate={{ strokeDashoffset: [1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1.6,
                    delay: 2.4 + i * 0.14,
                    repeat: Infinity,
                    repeatDelay: CYCLE - 1.6,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {/* 11. connection nodes */}
        {nodes.map(([x, y], i) => (
          <motion.g
            key={`n${i}`}
            initial={reduce ? false : { opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.3 + i * 0.07, ease: EASE }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <circle cx={x} cy={y} r="7" fill="var(--gold)" opacity="0.12" />
            <circle
              cx={x}
              cy={y}
              r="3.4"
              fill="var(--night)"
              stroke="var(--gold)"
              strokeWidth="1.6"
            />
          </motion.g>
        ))}

        {/* subtle standing activity */}
        {!reduce && (
          <motion.circle
            cx="300"
            cy="300"
            r="150"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.16, 0], scale: [0.9, 1.1, 1.2] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: CYCLE - 3.2,
              delay: 3.2,
              ease: EASE,
            }}
            style={{ transformOrigin: "300px 300px" }}
          />
        )}
      </motion.svg>
    </div>
  );
}

export function JoiaDiamondMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <path d={OUTLINE} fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinejoin="round" />
      <g stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="3" fill="none">
        {[girdleLine, ...crownFacets, ...pavilion].map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {!reduce && (
        <motion.path
          d={OUTLINE}
          fill="none"
          stroke="var(--gold-light)"
          strokeWidth="6"
          pathLength={1}
          strokeDasharray="0.15 0.85"
          animate={{ strokeDashoffset: [1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
