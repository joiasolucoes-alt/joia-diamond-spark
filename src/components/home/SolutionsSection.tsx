import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Check,
  Compass,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { JoiaDiamondMark } from "@/components/site/JoiaDiamondVisual";
import { PILLARS } from "@/lib/site";

export const PILLAR_ICONS = {
  compass: Compass,
  layers: Layers,
  workflow: Workflow,
  activity: Activity,
} as const;

const PILLAR_NARRATIVE: Record<
  string,
  {
    lead: string;
    emphasis: string;
    code: string;
    atmosphere: string;
  }
> = {
  estrategia: {
    lead: "Clareza para transformar",
    emphasis: "complexidade em direção.",
    code: "DIREÇÃO",
    atmosphere:
      "radial-gradient(circle at 18% 34%, rgba(204, 163, 57, 0.2), transparent 34%), radial-gradient(circle at 82% 72%, rgba(38, 63, 112, 0.28), transparent 42%)",
  },
  sistemas: {
    lead: "Sistemas que acompanham",
    emphasis: "o jeito real de operar.",
    code: "ESTRUTURA",
    atmosphere:
      "radial-gradient(circle at 76% 24%, rgba(204, 163, 57, 0.18), transparent 32%), radial-gradient(circle at 22% 78%, rgba(44, 76, 132, 0.3), transparent 44%)",
  },
  automacao: {
    lead: "Automação que devolve tempo",
    emphasis: "para o que importa.",
    code: "MOVIMENTO",
    atmosphere:
      "radial-gradient(circle at 52% 18%, rgba(204, 163, 57, 0.22), transparent 31%), radial-gradient(circle at 84% 78%, rgba(36, 64, 118, 0.32), transparent 40%)",
  },
  observabilidade: {
    lead: "Visibilidade para agir",
    emphasis: "antes que tudo pare.",
    code: "CONTROLE",
    atmosphere:
      "radial-gradient(circle at 82% 48%, rgba(204, 163, 57, 0.2), transparent 34%), radial-gradient(circle at 14% 30%, rgba(48, 79, 139, 0.28), transparent 42%)",
  },
};

const ORBIT_RADIUS_X = 40;
const ORBIT_RADIUS_Y = 39;
const CHANGE_INTERVAL = 5600;
const EASE = [0.22, 1, 0.36, 1] as const;

type Pillar = (typeof PILLARS)[number];

function getOrbitPoint(index: number, activeIndex: number) {
  const angle = (index - activeIndex) * 90 - 90;
  const radians = (angle * Math.PI) / 180;
  return {
    angle,
    left: 50 + Math.cos(radians) * ORBIT_RADIUS_X,
    top: 50 + Math.sin(radians) * ORBIT_RADIUS_Y,
  };
}

function PillarDetails({
  pillar,
  icon: Icon,
  compact = false,
}: {
  pillar: Pillar;
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-gold">
          <Icon size={22} strokeWidth={1.35} aria-hidden="true" />
        </span>
        <span className="font-mono text-[0.62rem] tracking-[0.18em] text-on-dark-soft">
          {String(PILLARS.indexOf(pillar) + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <h3
        className={
          compact ? "mt-6 text-2xl font-semibold text-on-dark" : "h-card mt-7 text-on-dark"
        }
      >
        {pillar.title}
      </h3>
      <p className="mt-4 text-[0.96rem] leading-relaxed text-on-dark-soft">{pillar.description}</p>

      <ul className="mt-6 grid gap-x-5 gap-y-2 sm:grid-cols-2">
        {pillar.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-relaxed text-on-dark-soft"
          >
            <Check size={14} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-line-dark pt-6">
        <ActionLink
          to="/solucoes"
          hash={pillar.id}
          variant="ghost-gold"
          className="px-0 py-0 text-sm"
        >
          Explorar este pilar
          <ArrowRight size={15} aria-hidden="true" />
        </ActionLink>
      </div>
    </>
  );
}

function DynamicHeading({
  activeIndex,
  id,
  compact = false,
}: {
  activeIndex: number;
  id: string;
  compact?: boolean;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const pillar = PILLARS[activeIndex];
  const narrative = PILLAR_NARRATIVE[pillar.id];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pillar.id}
        initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(7px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -12, filter: "blur(5px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.36, ease: EASE }}
      >
        <Eyebrow>// O que construímos · {narrative.code}</Eyebrow>
        <h2
          id={id}
          className={[
            "mt-5 max-w-4xl text-on-dark",
            compact ? "text-[2.25rem] leading-[0.98] font-semibold sm:text-5xl" : "h-section",
          ].join(" ")}
        >
          {narrative.lead} <span className="editorial text-gold">{narrative.emphasis}</span>
        </h2>
      </motion.div>
    </AnimatePresence>
  );
}

function AmbientLayer({ activeIndex }: { activeIndex: number }) {
  const reducedMotion = Boolean(useReducedMotion());
  const pillar = PILLARS[activeIndex];
  const narrative = PILLAR_NARRATIVE[pillar.id];

  return (
    <>
      <div
        className="grid-tech pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pillar.id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: narrative.atmosphere }}
          initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE }}
        />
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] bottom-[-0.24em] font-mono text-[clamp(14rem,31vw,34rem)] leading-none text-white/[0.018]"
        animate={reducedMotion ? undefined : { opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {String(activeIndex + 1).padStart(2, "0")}
      </motion.div>
    </>
  );
}

function OrbitStage({
  activeIndex,
  onSelect,
  onPauseChange,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  onPauseChange: (paused: boolean) => void;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="relative mx-auto aspect-[1.12/1] w-full max-w-[36rem]"
      onPointerEnter={() => onPauseChange(true)}
      onPointerLeave={() => onPauseChange(false)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[14%] rounded-full border border-gold/15 shadow-[0_0_90px_rgba(204,163,57,0.08)]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[23%] rounded-full border border-dashed border-gold/25"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[31%] rounded-full border border-line-dark"
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_16px_var(--gold)]" />
      </motion.div>

      {PILLARS.map((pillar, index) => {
        const point = getOrbitPoint(index, activeIndex);
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={`connector-${pillar.id}`}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-px w-[39%] origin-left"
            animate={{ rotate: point.angle, opacity: isActive ? 0.85 : 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold/55 via-gold/25 to-transparent" />
            {!reducedMotion ? (
              <motion.span
                className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]"
                animate={{ x: ["0%", "4300%"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.8,
                  delay: index * 0.45,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </motion.div>
        );
      })}

      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/25 bg-night/85 shadow-[0_0_80px_rgba(204,163,57,0.16)] backdrop-blur-md"
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.035, 1],
                boxShadow: [
                  "0 0 60px rgba(204,163,57,0.10)",
                  "0 0 95px rgba(204,163,57,0.22)",
                  "0 0 60px rgba(204,163,57,0.10)",
                ],
              }
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <JoiaDiamondMark className="w-28" />
        <span className="absolute -bottom-7 font-mono text-[0.56rem] tracking-[0.22em] text-gold">
          JoIA · NÚCLEO
        </span>
      </motion.div>

      {PILLARS.map((pillar, index) => {
        const Icon = PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS];
        const point = getOrbitPoint(index, activeIndex);
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={pillar.id}
            type="button"
            aria-pressed={isActive}
            aria-controls="active-pillar-detail"
            onClick={() => onSelect(index)}
            className={[
              "focus-gold absolute z-20 w-[10.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 text-left backdrop-blur-md transition-colors",
              isActive
                ? "border-gold bg-gold text-night shadow-[0_16px_48px_-20px_rgba(204,163,57,0.75)]"
                : "border-line-dark bg-night/80 text-on-dark hover:border-gold/55",
            ].join(" ")}
            animate={{
              left: `${point.left}%`,
              top: `${point.top}%`,
              scale: isActive ? 1.06 : 0.94,
              opacity: isActive ? 1 : 0.72,
            }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE }}
          >
            <span className="flex items-center gap-2">
              <Icon size={16} strokeWidth={1.4} aria-hidden="true" />
              <span
                className={[
                  "font-mono text-[0.57rem] tracking-[0.14em]",
                  isActive ? "text-night/65" : "text-gold",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
            <span className="mt-2 block text-xs leading-snug font-semibold">{pillar.title}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function DesktopExperience({
  activeIndex,
  onSelect,
  onPauseChange,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  onPauseChange: (paused: boolean) => void;
  reducedMotion: boolean;
}) {
  const activePillar = PILLARS[activeIndex];
  const ActiveIcon = PILLAR_ICONS[activePillar.icon as keyof typeof PILLAR_ICONS];

  return (
    <div className="flex h-[100svh] min-h-[47rem] items-start pt-28 pb-6">
      <div className="shell relative">
        <div className="flex items-end justify-between gap-10">
          <DynamicHeading activeIndex={activeIndex} id="solutions-orbit-title" />
          <div className="mb-2 flex shrink-0 items-center gap-4">
            <div
              className="h-px w-24 overflow-hidden bg-line-dark"
              role="progressbar"
              aria-label="Progresso dos pilares"
              aria-valuemin={1}
              aria-valuemax={PILLARS.length}
              aria-valuenow={activeIndex + 1}
            >
              <motion.div
                className="h-full origin-left bg-gold"
                animate={{ scaleX: (activeIndex + 1) / PILLARS.length }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
              />
            </div>
            <span className="font-mono text-xs tracking-[0.16em] text-on-dark-soft">
              {String(activeIndex + 1).padStart(2, "0")} / 04
            </span>
          </div>
        </div>

        <div
          className="mt-7 grid items-center gap-10"
          style={{ gridTemplateColumns: "minmax(0, 1.12fr) minmax(22rem, 0.88fr)" }}
        >
          <OrbitStage
            activeIndex={activeIndex}
            onSelect={onSelect}
            onPauseChange={onPauseChange}
            reducedMotion={reducedMotion}
          />

          <div
            className="relative min-h-[31rem] overflow-hidden rounded-2xl border border-line-dark bg-night/65 p-8 shadow-[0_28px_90px_-55px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            onPointerEnter={() => onPauseChange(true)}
            onPointerLeave={() => onPauseChange(false)}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/80 to-transparent"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activePillar.id}
                id="active-pillar-detail"
                role="region"
                aria-labelledby={`orbit-pillar-${activePillar.id}`}
                initial={
                  reducedMotion ? false : { opacity: 0, x: 24, filter: "blur(7px)", scale: 0.985 }
                }
                animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
                exit={
                  reducedMotion
                    ? undefined
                    : { opacity: 0, x: -18, filter: "blur(5px)", scale: 0.99 }
                }
                transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE }}
              >
                <span id={`orbit-pillar-${activePillar.id}`} className="sr-only">
                  Pilar ativo: {activePillar.title}
                </span>
                <PillarDetails pillar={activePillar} icon={ActiveIcon} />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-2 text-center font-mono text-[0.58rem] tracking-[0.17em] text-on-dark-soft/65 uppercase">
          Role para mover a órbita · clique para explorar · a composição avança automaticamente
        </p>
      </div>
    </div>
  );
}

function MobileExperience({
  activeIndex,
  onSelect,
  emblaRef,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  emblaRef: (node: HTMLElement | null) => void;
  reducedMotion: boolean;
}) {
  return (
    <div className="shell relative py-24 sm:py-28">
      <div className="relative pr-14">
        <DynamicHeading activeIndex={activeIndex} id="solutions-mobile-title" compact />
        <motion.div
          aria-hidden="true"
          className="absolute top-0 right-0 w-16 opacity-75"
          animate={reducedMotion ? undefined : { rotate: [0, 8, 0, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <JoiaDiamondMark className="w-full" />
        </motion.div>
      </div>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-on-dark-soft">
        Arraste para navegar entre os pilares. Cada movimento reorganiza o sistema ao redor do
        diamante.
      </p>

      <div ref={emblaRef} className="mt-10 overflow-hidden touch-pan-y">
        <div className="-ml-4 flex">
          {PILLARS.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS];
            const isActive = index === activeIndex;

            return (
              <div key={pillar.id} className="min-w-0 flex-[0_0_91%] pl-4 sm:flex-[0_0_72%]">
                <motion.article
                  aria-label={`${String(index + 1).padStart(2, "0")} de 04 — ${pillar.title}`}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: isActive ? 1 : 0.45,
                          scale: isActive ? 1 : 0.965,
                          y: isActive ? 0 : 12,
                        }
                  }
                  transition={{ duration: 0.42, ease: EASE }}
                  className={[
                    "relative h-full min-h-[36rem] overflow-hidden rounded-2xl border p-6 backdrop-blur-lg sm:p-8",
                    isActive
                      ? "border-gold/60 bg-night/80 shadow-[0_24px_70px_-38px_rgba(204,163,57,0.45)]"
                      : "border-line-dark bg-night/45",
                  ].join(" ")}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gold"
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.45 }}
                  />
                  <PillarDetails pillar={pillar} icon={Icon} compact />
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          {PILLARS.map((pillar, index) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Mostrar ${pillar.title}`}
              aria-current={index === activeIndex ? "step" : undefined}
              className={[
                "focus-gold h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-9 bg-gold" : "w-2 bg-line-dark hover:bg-gold/55",
              ].join(" ")}
            />
          ))}
        </div>
        <span className="font-mono text-xs tracking-[0.15em] text-on-dark-soft">
          {String(activeIndex + 1).padStart(2, "0")} / 04
        </span>
      </div>
    </div>
  );
}

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const interactionAtRef = useRef(Date.now());
  const pausedRef = useRef(false);
  const scrollLockUntilRef = useRef(0);
  const visibleRef = useRef(false);
  const reducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const { scrollYProgress } = useScroll({
    target: desktopScrollRef,
    offset: ["start start", "end end"],
  });

  const selectPillar = useCallback(
    (index: number) => {
      interactionAtRef.current = Date.now();
      scrollLockUntilRef.current = Date.now() + 1400;
      setActiveIndex(Math.max(0, Math.min(PILLARS.length - 1, index)));
      const emblaRoot = emblaApi?.rootNode();
      if (emblaRoot?.offsetParent !== null) {
        emblaApi?.scrollTo(index, reducedMotion);
      }
    },
    [emblaApi, reducedMotion],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const desktopScroller = desktopScrollRef.current;
    if (
      !desktopScroller ||
      desktopScroller.offsetParent === null ||
      Date.now() < scrollLockUntilRef.current
    ) {
      return;
    }

    const nextIndex = Math.min(PILLARS.length - 1, Math.floor(progress * PILLARS.length));
    interactionAtRef.current = Date.now();
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      if (emblaApi.rootNode().offsetParent === null) return;
      interactionAtRef.current = Date.now();
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const emblaRoot = emblaApi?.rootNode();
    if (emblaRoot?.offsetParent !== null) {
      emblaApi?.scrollTo(activeIndex, reducedMotion);
    }
  }, [activeIndex, emblaApi, reducedMotion]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const mobileViewport = window.matchMedia("(max-width: 79.999rem)");
    let frame = 0;
    const syncMobileCarousel = () => {
      if (!mobileViewport.matches) return;
      frame = window.requestAnimationFrame(() => {
        emblaApi.reInit();
        emblaApi.scrollTo(activeIndexRef.current, true);
      });
    };

    mobileViewport.addEventListener("change", syncMobileCarousel);
    syncMobileCarousel();
    return () => {
      mobileViewport.removeEventListener("change", syncMobileCarousel);
      window.cancelAnimationFrame(frame);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    let frame = 0;
    const keepActiveSlideAligned = () => {
      frame = window.requestAnimationFrame(() => {
        emblaApi.scrollTo(activeIndexRef.current, true);
      });
    };

    emblaApi.on("resize", keepActiveSlideAligned);
    return () => {
      emblaApi.off("resize", keepActiveSlideAligned);
      window.cancelAnimationFrame(frame);
    };
  }, [emblaApi]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) interactionAtRef.current = Date.now();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      if (
        !visibleRef.current ||
        pausedRef.current ||
        document.hidden ||
        Date.now() - interactionAtRef.current < CHANGE_INTERVAL
      ) {
        return;
      }

      interactionAtRef.current = Date.now();
      setActiveIndex((current) => (current + 1) % PILLARS.length);
    }, 900);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const handlePauseChange = useCallback((paused: boolean) => {
    pausedRef.current = paused;
    if (!paused) interactionAtRef.current = Date.now();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="surface-deep relative overflow-clip scroll-mt-24"
      aria-label="Pilares de soluções da JoIA"
    >
      <AmbientLayer activeIndex={activeIndex} />

      <div
        ref={desktopScrollRef}
        className="relative hidden xl:block"
        style={{ height: reducedMotion ? "auto" : "400svh" }}
      >
        <div className={reducedMotion ? "relative" : "sticky top-0"}>
          <DesktopExperience
            activeIndex={activeIndex}
            onSelect={selectPillar}
            onPauseChange={handlePauseChange}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      <div className="relative xl:hidden">
        <MobileExperience
          activeIndex={activeIndex}
          onSelect={selectPillar}
          emblaRef={emblaRef}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
}
