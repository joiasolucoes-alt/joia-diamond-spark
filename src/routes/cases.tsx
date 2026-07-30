import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { CaseMockup } from "@/components/site/CaseMockup";
import { CASES } from "@/lib/site";

const TITLE = "Projetos e cases — JoIA Soluções Empresariais";
const DESC =
  "Projetos reais da JoIA em dados e gestão, sistemas web sob medida e presença digital, descritos sem métricas inventadas.";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/cases" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/cases" }],
  }),
  component: Cases,
});

const VARIANTS = ["data", "system", "site"] as const;

function CaseBlock({ index }: { index: number }) {
  const c = CASES[index];
  const [open, setOpen] = useState(index === 0);

  return (
    <article
      id={c.slug}
      className="scroll-mt-28 border-t border-line-light py-14 first:border-t-0"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className={index % 2 === 1 ? "lg:order-last" : ""}>
          <CaseMockup variant={VARIANTS[index % 3]} />
        </div>
        <div>
          <p className="label-mono text-gold">{c.category}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {c.name}
          </h2>
          <p className="text-body mt-4 max-w-lg text-ink-soft">{c.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {c.deliveries.map((d) => (
              <li
                key={d}
                className="rounded-full border border-line-light bg-white px-3 py-1.5 text-xs text-ink-soft"
              >
                {d}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`detalhes-${c.slug}`}
            className="focus-gold mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-line-light px-5 text-sm font-semibold text-ink transition-colors hover:border-gold"
          >
            {open ? <Minus size={16} className="text-gold" /> : <Plus size={16} className="text-gold" />}
            {open ? "Ocultar detalhes" : "Ver detalhes do projeto"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`detalhes-${c.slug}`}
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Contexto", c.context],
                ["Desafio", c.challenge],
                ["Abordagem", c.approach],
                ["Solução construída", c.solution],
                ["Áreas envolvidas", c.areas.join(" · ")],
                ["Tecnologias e capacidades", c.capabilities.join(" · ")],
              ].map(([k, v]) => (
                <div key={k as string} className="bg-white p-7">
                  <dt className="label-mono text-ink-soft/70">{k}</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 rounded-lg border border-gold/40 bg-gold/5 p-5 text-[0.95rem] text-ink-soft">
              <span className="label-mono text-gold">Situação atual — </span>
              {c.status}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function Cases() {
  return (
    <>
      <section className="surface-night relative overflow-hidden pt-40 pb-24">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>// Projetos e cases</Eyebrow>
            <h1 className="h-display mt-6 max-w-[16ch] text-on-dark">
              Problemas reais. Soluções construídas para a{" "}
              <span className="editorial text-gold">realidade.</span>
            </h1>
            <p className="text-lead mt-8 max-w-2xl text-on-dark-soft">
              Descrevemos aqui o que foi construído e como chegamos até lá. Não publicamos
              números, porcentagens ou resultados financeiros sem dados confirmados junto ao
              cliente.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-soft section-pad">
        <div className="shell">
          {CASES.map((_, i) => (
            <CaseBlock key={CASES[i].slug} index={i} />
          ))}
        </div>
      </section>

      <section className="surface-deep section-pad relative overflow-hidden">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative text-center">
          <Reveal>
            <h2 className="h-section mx-auto max-w-3xl text-on-dark">
              Seu próximo projeto pode começar com uma{" "}
              <span className="editorial text-gold">conversa.</span>
            </h2>
            <ActionLink to="/contato" variant="gold" className="mt-10">
              Encontrar oportunidades <ArrowRight size={16} />
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
