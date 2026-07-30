import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";

const OPTIONS = [
  {
    id: "organizar",
    label: "Organizar minha operação",
    text: "Precisamos entender processos, responsabilidades, indicadores e pontos de perda antes de escolher ferramentas.",
    deliveries: [
      "Diagnóstico operacional",
      "Mapeamento de processos",
      "Indicadores",
      "Dashboards",
      "Plano de melhoria",
    ],
  },
  {
    id: "automatizar",
    label: "Automatizar tarefas",
    text: "Conectamos sistemas e eliminamos atividades repetitivas que consomem tempo da equipe.",
    deliveries: ["Workflows", "Integrações", "n8n", "IA aplicada", "Automação de rotinas"],
  },
  {
    id: "construir",
    label: "Construir uma solução digital",
    text: "Transformamos ideias, processos e necessidades do negócio em produtos digitais sob medida.",
    deliveries: ["Sistemas web", "SaaS", "Portais internos", "Aplicações", "Landing pages"],
  },
  {
    id: "monitorar",
    label: "Monitorar minha tecnologia",
    text: "Criamos visibilidade sobre infraestrutura, aplicações, serviços e experiência operacional.",
    deliveries: ["Monitoração", "Observabilidade", "Zabbix", "Grafana", "Indicadores técnicos"],
  },
];

export function ChallengeSelector() {
  const [active, setActive] = useState(OPTIONS[0].id);
  const current = OPTIONS.find((o) => o.id === active)!;

  return (
    <section id="desafios" className="surface-deep section-pad relative overflow-hidden scroll-mt-24">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative">
        <Reveal>
          <Eyebrow>// Ponto de partida</Eyebrow>
          <h2 className="h-section mt-5 max-w-2xl text-on-dark">
            Qual desafio trouxe você{" "}
            <span className="editorial text-gold">até aqui?</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            role="tablist"
            aria-label="Selecione o seu desafio"
            className="flex flex-col gap-3"
          >
            {OPTIONS.map((o) => {
              const isActive = o.id === active;
              return (
                <button
                  key={o.id}
                  role="tab"
                  id={`tab-${o.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${o.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(o.id)}
                  onKeyDown={(e) => {
                    const i = OPTIONS.findIndex((x) => x.id === active);
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive(OPTIONS[(i + 1) % OPTIONS.length].id);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive(OPTIONS[(i - 1 + OPTIONS.length) % OPTIONS.length].id);
                    }
                  }}
                  className={[
                    "focus-gold group relative flex min-h-16 items-center justify-between gap-4 rounded-lg border px-6 py-5 text-left transition-all duration-400",
                    isActive
                      ? "border-gold bg-night/60 text-on-dark"
                      : "border-line-dark text-on-dark-soft hover:border-on-dark-soft hover:text-on-dark",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className={[
                        "h-2 w-2 rotate-45 transition-colors",
                        isActive ? "bg-gold" : "bg-on-dark-soft/50",
                      ].join(" ")}
                    />
                    <span className="text-base font-semibold tracking-tight">{o.label}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className={isActive ? "text-gold" : "opacity-0 transition-opacity group-hover:opacity-60"}
                  />
                  {isActive && (
                    <span className="sr-only">(selecionado)</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-line-dark bg-night/50 p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                id={`panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="label-mono text-gold">{current.label}</p>
                <p className="text-lead mt-5 text-on-dark">{current.text}</p>
                <p className="label-mono mt-10 text-on-dark-soft">Entregáveis relacionados</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {current.deliveries.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line-dark px-4 py-2 text-sm text-on-dark-soft"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <ActionLink to="/contato" variant="outline-light">
                    Falar sobre esse desafio
                    <ArrowRight size={16} />
                  </ActionLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
