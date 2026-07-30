import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { JoiaDiamondVisual } from "@/components/site/JoiaDiamondVisual";
import { ActionLink } from "@/components/site/ActionLink";
import { PainSection } from "@/components/home/PainSection";
import { ChallengeSelector } from "@/components/home/ChallengeSelector";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { MethodSection } from "@/components/home/MethodSection";
import { ScannerSection } from "@/components/home/ScannerSection";
import { CasesSection } from "@/components/home/CasesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const TITLE = "JoIA Soluções Empresariais — De gargalos operacionais a crescimento";
const DESC =
  "A JoIA identifica gargalos e constrói sistemas, automações e soluções digitais sob medida para transformar perdas operacionais em eficiência, controle e escala.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const TAGS = ["PROCESSOS", "SISTEMAS", "AUTOMAÇÃO", "IA", "DADOS", "OBSERVABILIDADE"];
const EASE = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section className="surface-night relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-12%] h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--deep) 90%, transparent) 0%, transparent 66%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--night))" }}
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } }}
        >
          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold/70" />
            <p className="label-mono text-gold">Estratégia, tecnologia e execução</p>
          </motion.div>

          <motion.h1
            variants={item}
            transition={{ duration: 0.75, ease: EASE }}
            className="mt-6 max-w-[18ch] text-[clamp(2.35rem,1.5rem+3.3vw,4.15rem)] leading-[1.06] font-bold tracking-[-0.035em] text-on-dark text-balance"
          >
            O dinheiro que sua empresa deixa na mesa pode{" "}
            <span className="editorial text-gold">virar crescimento.</span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-on-dark-soft sm:text-lg"
          >
            A JoIA identifica gargalos e constrói sistemas, automações e soluções digitais
            sob medida para transformar perdas operacionais em eficiência, controle e escala.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ActionLink to="/contato" variant="gold">
              Descobrir oportunidades <ArrowRight size={16} />
            </ActionLink>
            <ActionLink to="/solucoes" variant="outline-light">
              Conhecer nossas soluções
            </ActionLink>
          </motion.div>

          <motion.p
            variants={item}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-8 max-w-md border-l border-gold/40 pl-4 text-sm leading-relaxed text-on-dark-soft"
          >
            Não vendemos tecnologia por vender. Construímos o que o seu negócio precisa para
            funcionar melhor.
          </motion.p>

          <motion.ul
            variants={item}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line-dark pt-5"
          >
            {TAGS.map((t) => (
              <li
                key={t}
                className="label-mono text-[0.6rem] tracking-[0.2em] text-on-dark-soft/55"
              >
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative order-first lg:order-last">
          <JoiaDiamondVisual className="mx-auto aspect-square w-[min(70vw,22rem)] lg:w-full lg:max-w-[30rem]" />
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <PainSection />
      <ChallengeSelector />
      <SolutionsSection />
      <MethodSection />
      <ScannerSection />
      <CasesSection />
      <AboutSection />
      <FinalCTA />
    </>
  );
}
