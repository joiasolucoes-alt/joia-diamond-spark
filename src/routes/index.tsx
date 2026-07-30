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
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section className="surface-night relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-10%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--deep) 85%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } }}
        >
          <motion.p variants={item} transition={{ duration: 0.7, ease: EASE }} className="label-mono text-gold">
            Estratégia, tecnologia e execução
          </motion.p>

          <motion.h1
            variants={item}
            transition={{ duration: 0.8, ease: EASE }}
            className="h-display mt-6 max-w-[16ch] text-on-dark"
          >
            O dinheiro que sua empresa deixa na mesa pode{" "}
            <span className="editorial text-gold">virar crescimento.</span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-lead mt-8 max-w-xl text-on-dark-soft"
          >
            A JoIA identifica gargalos e constrói sistemas, automações e soluções digitais
            sob medida para transformar perdas operacionais em eficiência, controle e escala.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <ActionLink to="/contato" variant="gold">
              Descobrir oportunidades no meu negócio <ArrowRight size={16} />
            </ActionLink>
            <ActionLink to="/solucoes" variant="outline-light">
              Conhecer nossas soluções
            </ActionLink>
          </motion.div>

          <motion.p
            variants={item}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 max-w-lg border-l border-gold/50 pl-4 text-sm leading-relaxed text-on-dark-soft"
          >
            Não vendemos tecnologia por vender. Construímos o que o seu negócio precisa para
            funcionar melhor.
          </motion.p>

          <motion.ul
            variants={item}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TAGS.map((t) => (
              <li key={t} className="label-mono text-[0.65rem] text-on-dark-soft/60">
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative order-first lg:order-last">
          <JoiaDiamondVisual className="mx-auto aspect-square w-[min(78vw,26rem)] lg:w-full lg:max-w-[34rem]" />
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
