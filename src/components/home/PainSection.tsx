import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { RefreshCw, FileSpreadsheet, UserRound, Unplug, GaugeCircle, EyeOff } from "lucide-react";
import { Eyebrow } from "@/components/site/ActionLink";

const PAINS = [
  {
    icon: RefreshCw,
    title: "Retrabalho constante",
    text: "A mesma informação é digitada, conferida e corrigida várias vezes ao longo do dia.",
    headline: "O retrabalho consome o que",
    emphasis: "ninguém mede.",
  },
  {
    icon: FileSpreadsheet,
    title: "Planilhas e mensagens desconectadas",
    text: "O que a empresa sabe está espalhado entre arquivos, conversas e memórias individuais.",
    headline: "Informação espalhada também é",
    emphasis: "perda operacional.",
  },
  {
    icon: UserRound,
    title: "Processos dependentes de pessoas específicas",
    text: "Quando alguém falta, o processo trava — porque ele nunca saiu da cabeça de quem executa.",
    headline: "Quando o processo mora em alguém,",
    emphasis: "ele não escala.",
  },
  {
    icon: Unplug,
    title: "Sistemas que não conversam",
    text: "Cada ferramenta guarda um pedaço da verdade e alguém precisa unir tudo manualmente.",
    headline: "Ferramentas isoladas criam",
    emphasis: "trabalho invisível.",
  },
  {
    icon: GaugeCircle,
    title: "Decisões sem indicadores",
    text: "A decisão é tomada pela percepção, porque o número confiável chega tarde ou não chega.",
    headline: "Sem indicadores, toda decisão",
    emphasis: "chega atrasada.",
  },
  {
    icon: EyeOff,
    title: "Tecnologia sem visibilidade",
    text: "Ninguém sabe se o ambiente está saudável até o momento em que ele para.",
    headline: "O problema aparece quando já virou",
    emphasis: "parada.",
  },
];

export function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const selectPain = useCallback(
    (index: number, jump = false) => {
      const nextIndex = Math.max(0, Math.min(PAINS.length - 1, index));
      setActiveIndex(nextIndex);
      emblaApi?.scrollTo(nextIndex, jump || Boolean(reduce));
    },
    [emblaApi, reduce],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduce || !window.matchMedia("(min-width: 80rem)").matches) return;

    const nextIndex = Math.min(PAINS.length - 1, Math.floor(progress * PAINS.length));
    setActiveIndex((current) => {
      if (current !== nextIndex) emblaApi?.scrollTo(nextIndex, Boolean(reduce));
      return nextIndex;
    });
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const activePain = PAINS[activeIndex];
  const ActiveIcon = activePain.icon;

  return (
    <section
      id="dores"
      ref={sectionRef}
      className={
        reduce
          ? "surface-soft relative scroll-mt-24"
          : "surface-soft relative scroll-mt-24 xl:h-[600svh]"
      }
      aria-labelledby="pain-section-title"
    >
      <div
        className={[
          "flex min-h-[100svh] items-center overflow-hidden py-20 sm:py-24",
          reduce ? "relative" : "relative xl:sticky xl:top-0",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[-8vw] -translate-y-1/2 font-mono text-[clamp(12rem,34vw,40rem)] leading-none text-ink/[0.025]"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </div>

        <div className="shell relative">
          <div className="grid min-h-[17rem] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeIndex}`}
                initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <Eyebrow tone="muted">
                  // {String(activeIndex + 1).padStart(2, "0")} — {activePain.title}
                </Eyebrow>
                <h2 id="pain-section-title" className="h-section mt-5 max-w-xl text-ink">
                  {activePain.headline}{" "}
                  <span className="editorial text-ink-soft">{activePain.emphasis}</span>
                </h2>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${activeIndex}`}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-w-xl items-start gap-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-white text-gold">
                  <ActiveIcon size={23} strokeWidth={1.35} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-lead text-ink-soft">{activePain.text}</p>
                  <p className="mt-4 font-mono text-xs tracking-[0.14em] text-ink-soft/80 uppercase">
                    <span className="xl:hidden">Deslize o card para explorar</span>
                    <span className="hidden xl:inline">
                      Role para avançar · deslize para explorar
                    </span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 sm:mt-12">
            <div ref={emblaRef} className="overflow-hidden touch-pan-y">
              <div className="-ml-4 flex">
                {PAINS.map((pain, index) => {
                  const Icon = pain.icon;
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={pain.title}
                      className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_70%] lg:flex-[0_0_52%] xl:flex-[0_0_46%]"
                    >
                      <motion.article
                        animate={
                          reduce
                            ? undefined
                            : {
                                opacity: isActive ? 1 : 0.48,
                                scale: isActive ? 1 : 0.965,
                                y: isActive ? 0 : 12,
                              }
                        }
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                          "relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-xl border p-6 transition-[background-color,border-color,box-shadow] duration-500 sm:min-h-[19rem] sm:p-8",
                          isActive
                            ? "border-gold/50 bg-white shadow-[0_24px_70px_-42px_rgba(3,7,19,0.45)]"
                            : "border-line-light bg-soft",
                        ].join(" ")}
                      >
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gold"
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{ duration: reduce ? 0 : 0.5 }}
                        />

                        <div className="flex items-start justify-between">
                          <span className="label-mono text-ink-soft/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Icon
                            className="text-gold"
                            size={30}
                            strokeWidth={1.25}
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <h3 className="h-card max-w-md text-ink">{pain.title}</h3>
                          <p className="mt-3 max-w-md text-[0.975rem] leading-relaxed text-ink-soft">
                            {pain.text}
                          </p>
                        </div>
                      </motion.article>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-x-4 sm:flex sm:gap-6">
              <div
                className="col-start-1 row-start-1 h-px flex-1 overflow-hidden bg-line-light"
                role="progressbar"
                aria-label="Progresso dos problemas operacionais"
                aria-valuemin={1}
                aria-valuemax={PAINS.length}
                aria-valuenow={activeIndex + 1}
              >
                <motion.div
                  className="h-full origin-left bg-gold"
                  animate={{ scaleX: (activeIndex + 1) / PAINS.length }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                />
              </div>

              <div className="col-span-2 row-start-2 mt-2 flex items-center justify-center sm:mt-0">
                {PAINS.map((pain, index) => (
                  <button
                    key={pain.title}
                    type="button"
                    onClick={() => selectPain(index)}
                    aria-label={`Mostrar ${pain.title}`}
                    aria-current={index === activeIndex ? "step" : undefined}
                    className="focus-gold group flex h-11 w-11 items-center justify-center rounded-full"
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "h-2 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "w-8 bg-gold"
                          : "w-2 bg-line-light group-hover:bg-gold/50",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              <span className="col-start-2 row-start-1 min-w-16 text-right font-mono text-xs tracking-[0.14em] text-ink-soft">
                {String(activeIndex + 1).padStart(2, "0")} / {String(PAINS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
