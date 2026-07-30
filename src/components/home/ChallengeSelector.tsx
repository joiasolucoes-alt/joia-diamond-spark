import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Blocks,
  Check,
  ChevronDown,
  ListChecks,
  type LucideIcon,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";

type Challenge = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  eyebrow: string;
  description: string;
  signals: string[];
  steps: Array<{
    title: string;
    description: string;
  }>;
  deliverables: string[];
  expectedResult: string;
  ctaLabel: string;
  ctaMicrocopy: string;
  icon: LucideIcon;
  proof?: {
    name: string;
    slug: string;
    description: string;
  };
};

const CHALLENGES: Challenge[] = [
  {
    id: "organizar",
    number: "01",
    title: "Organizar minha operação",
    shortDescription: "Estruturar processos, responsabilidades e indicadores.",
    eyebrow: "01 — Organizar minha operação",
    description:
      "Transforme uma operação que depende de improvisos em processos claros, mensuráveis e preparados para crescer.",
    signals: [
      "Tarefas importantes estão concentradas em poucas pessoas.",
      "Os mesmos problemas reaparecem todas as semanas.",
      "Não está claro quem é responsável por cada etapa.",
      "As decisões são tomadas sem indicadores confiáveis.",
    ],
    steps: [
      {
        title: "Diagnosticar",
        description: "Entendemos processos, responsabilidades, ferramentas e pontos de perda.",
      },
      {
        title: "Estruturar",
        description: "Definimos fluxos, responsáveis, indicadores e prioridades.",
      },
      {
        title: "Evoluir",
        description: "Criamos uma rotina prática de acompanhamento e melhoria contínua.",
      },
    ],
    deliverables: [
      "Diagnóstico operacional",
      "Mapeamento de processos",
      "Matriz de responsabilidades",
      "Indicadores",
      "Dashboard",
      "Plano de melhoria",
    ],
    expectedResult:
      "Mais clareza para decidir, menos retrabalho e uma operação capaz de crescer com consistência.",
    ctaLabel: "Quero organizar minha operação",
    ctaMicrocopy: "Vamos entender seu cenário e indicar um próximo passo possível.",
    icon: ListChecks,
    proof: {
      name: "H2O Distribuidora",
      slug: "h2o-distribuidora",
      description: "Estruturação de dados, indicadores e apoio à evolução dos processos de gestão.",
    },
  },
  {
    id: "automatizar",
    number: "02",
    title: "Automatizar tarefas",
    shortDescription: "Reduzir atividades manuais, erros e retrabalho.",
    eyebrow: "02 — Automatizar tarefas",
    description:
      "Elimine atividades repetitivas e conecte etapas da operação para ganhar velocidade, consistência e capacidade de escala.",
    signals: [
      "A equipe copia e transfere informações manualmente entre ferramentas.",
      "Tarefas repetitivas consomem tempo que poderia ser usado em atividades estratégicas.",
      "Erros operacionais acontecem por digitação, esquecimento ou falta de padronização.",
      "Solicitações ficam paradas entre pessoas, planilhas e mensagens.",
    ],
    steps: [
      {
        title: "Mapear",
        description: "Identificamos tarefas repetitivas, regras, exceções e dependências.",
      },
      {
        title: "Priorizar",
        description:
          "Selecionamos as automações com melhor relação entre impacto, esforço e risco.",
      },
      {
        title: "Automatizar",
        description: "Implementamos, documentamos e acompanhamos os fluxos automatizados.",
      },
    ],
    deliverables: [
      "Diagnóstico de automação",
      "Mapa de oportunidades",
      "Workflows automatizados",
      "Integrações",
      "Regras e validações",
      "Documentação operacional",
    ],
    expectedResult:
      "Menos trabalho manual, menos erros e mais tempo para a equipe se concentrar no que realmente exige decisão humana.",
    ctaLabel: "Quero automatizar minhas tarefas",
    ctaMicrocopy: "Vamos identificar onde a automação pode gerar valor primeiro.",
    icon: Workflow,
  },
  {
    id: "construir",
    number: "03",
    title: "Construir uma solução digital",
    shortDescription: "Transformar uma necessidade em um produto funcional.",
    eyebrow: "03 — Construir uma solução digital",
    description:
      "Transforme uma necessidade do negócio em uma solução digital útil, intuitiva e preparada para evoluir.",
    signals: [
      "As ferramentas disponíveis não atendem bem ao processo da empresa.",
      "Planilhas e soluções improvisadas chegaram ao limite.",
      "Informações importantes estão espalhadas em diferentes sistemas.",
      "Existe uma ideia de produto, portal ou sistema, mas falta um caminho claro para executá-la.",
    ],
    steps: [
      {
        title: "Descobrir",
        description: "Entendemos usuários, objetivos, regras de negócio e restrições.",
      },
      {
        title: "Prototipar",
        description:
          "Organizamos fluxos e validamos a experiência antes de ampliar o investimento.",
      },
      {
        title: "Construir",
        description: "Desenvolvemos, integramos, testamos e planejamos a evolução da solução.",
      },
    ],
    deliverables: [
      "Diagnóstico do produto",
      "Jornada do usuário",
      "Arquitetura da solução",
      "Protótipo",
      "MVP ou sistema web",
      "Integrações",
      "Documentação",
    ],
    expectedResult:
      "Uma solução alinhada ao processo real do negócio, com uma experiência clara para o usuário e uma base sustentável para evoluir.",
    ctaLabel: "Quero construir uma solução digital",
    ctaMicrocopy: "Vamos transformar sua necessidade em um caminho de produto viável.",
    icon: Blocks,
    proof: {
      name: "MasterFlow",
      slug: "masterflow",
      description:
        "Plataforma web sob medida para organizar e acompanhar fluxos comerciais e operacionais.",
    },
  },
  {
    id: "monitorar",
    number: "04",
    title: "Monitorar minha tecnologia",
    shortDescription: "Acompanhar sistemas, riscos e disponibilidade.",
    eyebrow: "04 — Monitorar minha tecnologia",
    description:
      "Tenha visibilidade sobre sistemas, integrações e riscos para agir antes que pequenas falhas se tornem grandes problemas.",
    signals: [
      "Problemas são percebidos somente quando um cliente ou usuário reclama.",
      "Não existe uma visão centralizada da saúde dos sistemas.",
      "Falhas recorrentes são corrigidas sem que a causa seja acompanhada.",
      "A gestão não tem informações claras sobre disponibilidade, incidentes e prioridades técnicas.",
    ],
    steps: [
      {
        title: "Inventariar",
        description:
          "Mapeamos sistemas, integrações, dependências, responsáveis e pontos críticos.",
      },
      {
        title: "Observar",
        description: "Definimos indicadores, alertas e painéis adequados à operação.",
      },
      {
        title: "Acompanhar",
        description: "Estruturamos rotinas para incidentes, manutenção e evolução técnica.",
      },
    ],
    deliverables: [
      "Inventário tecnológico",
      "Mapa de dependências",
      "Indicadores de saúde",
      "Painel de monitoramento",
      "Alertas",
      "Fluxo de incidentes",
      "Plano de manutenção",
    ],
    expectedResult:
      "Mais previsibilidade, respostas mais rápidas e decisões técnicas baseadas em informações confiáveis.",
    ctaLabel: "Quero monitorar minha tecnologia",
    ctaMicrocopy: "Vamos identificar os pontos críticos que precisam de visibilidade.",
    icon: Activity,
  },
];

const DESKTOP_GRID_STYLE = {
  gridTemplateColumns: "minmax(0, 38fr) minmax(0, 62fr)",
};

function ChallengePanelContent({ challenge }: { challenge: Challenge }) {
  return (
    <div>
      <header>
        <p className="label-mono text-gold">{challenge.eyebrow}</p>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-on-dark sm:text-2xl">
          {challenge.description}
        </p>
      </header>

      <section className="mt-9 border-t border-line-dark pt-8">
        <h3 className="text-xl font-semibold tracking-tight text-on-dark">
          Isso se parece com o seu cenário?
        </h3>
        <ul className="mt-5 grid gap-x-7 gap-y-4 xl:grid-cols-2">
          {challenge.signals.map((signal) => (
            <li
              key={signal}
              className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-on-dark-soft"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold">
                <Check size={11} strokeWidth={2} aria-hidden="true" />
              </span>
              {signal}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-9 border-t border-line-dark pt-8">
        <p className="label-mono text-on-dark-soft">Como avançamos</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-0">
          {challenge.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative md:pr-7 md:not-last:after:absolute md:not-last:after:top-3 md:not-last:after:right-3 md:not-last:after:h-px md:not-last:after:w-7 md:not-last:after:bg-gold/35"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 text-base font-semibold text-on-dark">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-on-dark-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-9 border-t border-line-dark pt-8">
        <p className="label-mono text-on-dark-soft">Entregáveis relacionados</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {challenge.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="flex min-h-9 items-center rounded-full border border-line-dark bg-deep/30 px-4 py-2 text-xs leading-tight text-on-dark-soft"
            >
              {deliverable}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-9 border-l-2 border-gold bg-gold/[0.06] px-5 py-5 sm:px-6">
        <p className="label-mono text-gold">Resultado esperado</p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-dark">
          {challenge.expectedResult}
        </p>
      </section>

      {challenge.proof ? (
        <aside className="mt-7 flex flex-col gap-3 border-t border-line-dark pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-mono text-on-dark-soft">Projeto relacionado</p>
            <p className="mt-2 text-sm leading-relaxed text-on-dark-soft">
              <span className="font-semibold text-on-dark">{challenge.proof.name}</span>
              {" — "}
              {challenge.proof.description}
            </p>
          </div>
          <Link
            to="/cases"
            hash={challenge.proof.slug}
            className="focus-gold inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-gold transition-colors hover:text-gold-light"
          >
            Ver projeto <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </aside>
      ) : null}

      <footer className="mt-9 border-t border-line-dark pt-8">
        <ActionLink to="/contato" variant="gold" className="group w-full sm:w-auto">
          {challenge.ctaLabel}
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </ActionLink>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-dark-soft">
          {challenge.ctaMicrocopy}
        </p>
      </footer>
    </div>
  );
}

function DesktopChallengeSelector({
  activeIndex,
  onSelect,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeChallenge = CHALLENGES[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % CHALLENGES.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + CHALLENGES.length) % CHALLENGES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = CHALLENGES.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    onSelect(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="hidden lg:block">
      <div className="grid gap-6 xl:gap-10" style={DESKTOP_GRID_STYLE}>
        <div className="self-start lg:sticky lg:top-28">
          <div
            role="tablist"
            aria-label="Selecione o seu desafio"
            aria-orientation="vertical"
            className="flex flex-col gap-3"
          >
            {CHALLENGES.map((challenge, index) => {
              const isActive = index === activeIndex;
              const Icon = challenge.icon;

              return (
                <button
                  key={challenge.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`challenge-tab-${challenge.id}`}
                  aria-selected={isActive}
                  aria-controls={`challenge-panel-${challenge.id}`}
                  tabIndex={isActive ? 0 : -1}
                  data-challenge-id={challenge.id}
                  onClick={() => onSelect(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={[
                    "focus-gold group relative flex min-h-[6.5rem] w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-[background-color,border-color,color,transform] duration-200",
                    isActive
                      ? "border-gold bg-night/70 text-on-dark"
                      : "border-line-dark bg-night/15 text-on-dark-soft hover:-translate-y-0.5 hover:border-on-dark-soft/70 hover:bg-night/35 hover:text-on-dark",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors",
                      isActive
                        ? "border-gold/55 bg-gold/10 text-gold"
                        : "border-line-dark text-on-dark-soft",
                    ].join(" ")}
                  >
                    <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={[
                        "font-mono text-[0.62rem] tracking-[0.16em]",
                        isActive ? "text-gold" : "text-on-dark-soft/70",
                      ].join(" ")}
                    >
                      {challenge.number}
                    </span>
                    <span className="mt-1 block text-base font-semibold tracking-tight">
                      {challenge.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-on-dark-soft">
                      {challenge.shortDescription}
                    </span>
                  </span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className={[
                      "shrink-0 transition-[opacity,transform,color] duration-200",
                      isActive
                        ? "translate-x-0 text-gold opacity-100"
                        : "-translate-x-1 text-on-dark-soft opacity-40 group-hover:translate-x-0 group-hover:opacity-100",
                    ].join(" ")}
                  />
                  {isActive ? <span className="sr-only">(selecionado)</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-line-dark bg-night/55 p-7 xl:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeChallenge.id}
              id={`challenge-panel-${activeChallenge.id}`}
              role="tabpanel"
              aria-labelledby={`challenge-tab-${activeChallenge.id}`}
              data-challenge-panel={activeChallenge.id}
              initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{
                duration: reducedMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ChallengePanelContent challenge={activeChallenge} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileChallengeAccordion({
  activeIndex,
  onSelect,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}) {
  return (
    <div className="space-y-3 lg:hidden">
      {CHALLENGES.map((challenge, index) => {
        const isActive = index === activeIndex;
        const Icon = challenge.icon;
        const buttonId = `challenge-accordion-${challenge.id}`;
        const panelId = `challenge-accordion-panel-${challenge.id}`;

        return (
          <div
            key={challenge.id}
            className={[
              "overflow-hidden rounded-xl border transition-colors duration-200",
              isActive ? "border-gold bg-night/60" : "border-line-dark bg-night/20",
            ].join(" ")}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isActive}
              aria-controls={panelId}
              data-challenge-id={challenge.id}
              onClick={() => onSelect(index)}
              className="focus-gold flex min-h-[5.5rem] w-full items-center gap-4 rounded-xl px-4 py-4 text-left"
            >
              <span
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                  isActive
                    ? "border-gold/55 bg-gold/10 text-gold"
                    : "border-line-dark text-on-dark-soft",
                ].join(" ")}
              >
                <Icon size={19} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={[
                    "font-mono text-[0.62rem] tracking-[0.16em]",
                    isActive ? "text-gold" : "text-on-dark-soft/70",
                  ].join(" ")}
                >
                  {challenge.number}
                </span>
                <span className="mt-1 block text-[0.95rem] font-semibold text-on-dark">
                  {challenge.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-on-dark-soft">
                  {challenge.shortDescription}
                </span>
              </span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={[
                  "shrink-0 text-gold transition-transform duration-200",
                  isActive ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            <AnimatePresence initial={false}>
              {isActive ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-challenge-panel={challenge.id}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-line-dark px-4 py-6 sm:px-6">
                    <ChallengePanelContent challenge={challenge} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ChallengeSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());
  const activeChallenge = CHALLENGES[activeIndex];

  return (
    <section
      id="desafios"
      className="surface-deep section-pad relative overflow-hidden scroll-mt-24"
      aria-labelledby="challenge-selector-title"
    >
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-35" />
      <div className="shell relative">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <div>
              <Eyebrow>// Ponto de partida</Eyebrow>
              <h2 id="challenge-selector-title" className="h-section mt-5 max-w-2xl text-on-dark">
                Qual desafio trouxe você <span className="editorial text-gold">até aqui?</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-dark-soft sm:text-lg">
                Selecione o cenário que mais se aproxima do seu momento. A partir dele, mostramos um
                caminho possível para avançar.
              </p>
            </div>
            <p
              className="hidden shrink-0 font-mono text-xs tracking-[0.18em] text-on-dark-soft sm:block"
              aria-live="polite"
            >
              {activeChallenge.number} / 04
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14">
          <DesktopChallengeSelector
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            reducedMotion={reducedMotion}
          />
          <MobileChallengeAccordion
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
