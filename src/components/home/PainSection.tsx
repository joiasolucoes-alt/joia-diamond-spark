import { motion } from "framer-motion";
import {
  RefreshCw,
  FileSpreadsheet,
  UserRound,
  Unplug,
  GaugeCircle,
  EyeOff,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { Eyebrow } from "@/components/site/ActionLink";

const PAINS = [
  {
    icon: RefreshCw,
    title: "Retrabalho constante",
    text: "A mesma informação é digitada, conferida e corrigida várias vezes ao longo do dia.",
  },
  {
    icon: FileSpreadsheet,
    title: "Planilhas e mensagens desconectadas",
    text: "O que a empresa sabe está espalhado entre arquivos, conversas e memórias individuais.",
  },
  {
    icon: UserRound,
    title: "Processos dependentes de pessoas específicas",
    text: "Quando alguém falta, o processo trava — porque ele nunca saiu da cabeça de quem executa.",
  },
  {
    icon: Unplug,
    title: "Sistemas que não conversam",
    text: "Cada ferramenta guarda um pedaço da verdade e alguém precisa unir tudo manualmente.",
  },
  {
    icon: GaugeCircle,
    title: "Decisões sem indicadores",
    text: "A decisão é tomada pela percepção, porque o número confiável chega tarde ou não chega.",
  },
  {
    icon: EyeOff,
    title: "Tecnologia sem visibilidade",
    text: "Ninguém sabe se o ambiente está saudável até o momento em que ele para.",
  },
];

export function PainSection() {
  return (
    <section id="dores" className="surface-soft section-pad relative overflow-hidden scroll-mt-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <Eyebrow tone="muted">// Onde o valor se perde</Eyebrow>
            <h2 className="h-section mt-5 max-w-xl text-ink">
              Nem toda perda aparece no{" "}
              <span className="editorial text-ink-soft">financeiro.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lead max-w-xl text-ink-soft">
              Ela também pode estar escondida em tarefas repetitivas, informações
              espalhadas, processos dependentes de pessoas e decisões tomadas sem
              visibilidade.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <StaggerItem
              key={p.title}
              className={[
                "group relative bg-soft p-8 transition-colors duration-500 hover:bg-white",
                i === 0 ? "lg:row-span-2 lg:flex lg:flex-col lg:justify-between" : "",
              ].join(" ")}
            >
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-gold"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              <div>
                <span className="label-mono text-ink-soft/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p.icon
                  className="mt-6 text-gold transition-transform duration-500 group-hover:-translate-y-1"
                  size={i === 0 ? 34 : 26}
                  strokeWidth={1.3}
                />
                <h3 className="h-card mt-6 text-ink">{p.title}</h3>
                <p className="mt-3 max-w-sm text-[0.975rem] leading-relaxed text-ink-soft">
                  {p.text}
                </p>
              </div>
              {i === 0 && (
                <p className="mt-10 hidden font-mono text-xs leading-relaxed tracking-wide text-ink-soft/80 lg:block">
                  Perdas operacionais raramente aparecem em uma linha de despesa.
                  Elas aparecem em horas, em atrasos e em decisões adiadas.
                </p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
