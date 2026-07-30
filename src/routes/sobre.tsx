import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Gem } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { FOUNDERS, Monogram } from "@/components/home/AboutSection";
import { JoiaDiamondMark } from "@/components/site/JoiaDiamondVisual";

const TITLE = "Sobre a JoIA — Negócio e tecnologia na mesma conversa";
const DESC =
  "Quem é a JoIA Soluções Empresariais, por que existe, como atua, a origem do nome e os princípios que guiam cada projeto.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/sobre" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

const PRINCIPLES = [
  {
    title: "Tecnologia com propósito",
    text: "Cada solução precisa responder a um problema concreto da operação.",
  },
  {
    title: "Clareza antes da complexidade",
    text: "Entender bem o processo vale mais do que adicionar mais uma ferramenta.",
  },
  {
    title: "Soluções adequadas à realidade",
    text: "O time, o orçamento e a maturidade da empresa fazem parte do projeto.",
  },
  {
    title: "Evolução mensurável",
    text: "O que foi entregue precisa poder ser acompanhado e ajustado.",
  },
  {
    title: "Proximidade com o cliente",
    text: "Conversa direta com quem vive o problema todos os dias.",
  },
  {
    title: "Construção conjunta",
    text: "A solução é construída com a equipe, não entregue por cima dela.",
  },
];

function Sobre() {
  return (
    <>
      <section className="surface-night relative overflow-hidden page-hero-pad">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <Eyebrow>// Sobre a JoIA</Eyebrow>
            <h1 className="h-display mt-6 max-w-[15ch] text-on-dark">
              Negócio e tecnologia na <span className="editorial text-gold">mesma conversa.</span>
            </h1>
            <p className="text-lead mt-8 max-w-2xl text-on-dark-soft">
              A JoIA nasceu para transformar problemas operacionais em soluções que funcionam na
              prática. Unimos visão de negócio, processos, dados e capacidade técnica para construir
              soluções adequadas à realidade de cada empresa.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-xs">
            <JoiaDiamondMark className="w-full opacity-90" />
          </Reveal>
        </div>
      </section>

      <section className="surface-soft section-pad">
        <div className="shell grid gap-12 md:grid-cols-3">
          <Reveal>
            <h2 className="label-mono text-gold">// Por que existimos</h2>
            <p className="text-body mt-5 text-ink-soft">
              Muitas empresas sabem que perdem tempo e dinheiro na operação, mas não têm clareza
              sobre onde nem sobre qual tecnologia resolveria. A JoIA existe para ocupar exatamente
              esse espaço entre o problema de negócio e a solução técnica.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="label-mono text-gold">// Proposta de valor</h2>
            <p className="text-body mt-5 text-ink-soft">
              Identificamos gargalos e construímos sistemas, automações e soluções digitais sob
              medida para transformar perdas operacionais em eficiência, controle e crescimento —
              com a tecnologia como meio, nunca como fim.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="label-mono text-gold">// Forma de atuação</h2>
            <p className="text-body mt-5 text-ink-soft">
              Começamos por enxergar a operação, priorizamos o que gera mais impacto, construímos
              junto com a equipe e acompanhamos o resultado para seguir evoluindo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-deep section-pad relative overflow-hidden">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>// Origem do nome</Eyebrow>
            <h2 className="h-section mt-5 text-on-dark">
              Por que <span className="editorial text-gold">JoIA</span>?
            </h2>
            <p className="text-body mt-6 max-w-xl text-on-dark-soft">
              A escrita “JoIA” carrega o “IA” dentro da palavra: valor e inteligência aplicada na
              mesma ideia. Uma joia não nasce pronta — ela é lapidada. É assim que enxergamos o
              trabalho: lapidar o problema até encontrar a solução que realmente serve para aquele
              negócio.
            </p>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-on-dark-soft/80">
              O nome também remete à resiliência de Jó — a capacidade de atravessar um cenário
              difícil e sair dele com mais estrutura do que antes.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <span className="flex h-40 w-40 items-center justify-center rounded-2xl border border-gold/40 bg-night text-gold">
              <Gem size={56} strokeWidth={1} />
            </span>
          </Reveal>
        </div>
      </section>

      <section className="surface-soft section-pad">
        <div className="shell">
          <Reveal>
            <Eyebrow tone="muted">// Fundadores</Eyebrow>
            <h2 className="h-section mt-5 max-w-2xl text-ink">
              Duas frentes que <span className="editorial text-ink-soft">se completam.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <StaggerItem
                key={f.name}
                className="flex gap-6 rounded-xl border border-line-light bg-white p-8"
              >
                <Monogram
                  initials={f.initials}
                  photo={f.photo}
                  photoPosition={f.photoPosition}
                  name={f.name}
                />
                <div>
                  <h3 className="h-card text-ink">{f.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-ink">{f.specialty}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {f.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-24">
            <Eyebrow tone="muted">// Princípios</Eyebrow>
            <h2 className="h-section mt-5 max-w-2xl text-ink">
              O que orienta cada <span className="editorial text-ink-soft">decisão.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <StaggerItem key={p.title} className="bg-white p-8">
                <span className="label-mono text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-card mt-5 text-ink">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="surface-night section-pad relative overflow-hidden">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />
        <div className="shell relative text-center">
          <Reveal>
            <h2 className="h-section mx-auto max-w-3xl text-on-dark">
              Vamos conversar sobre o que a sua operação{" "}
              <span className="editorial text-gold">ainda não mostra?</span>
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
