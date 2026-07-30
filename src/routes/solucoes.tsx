import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { PILLAR_ICONS } from "@/components/home/SolutionsSection";
import { FAQ, PILLARS, whatsappLink } from "@/lib/site";

const TITLE = "Soluções — JoIA Soluções Empresariais";
const DESC =
  "Estratégia e dados, sistemas sob medida, automação com IA e observabilidade: os quatro pilares de atuação da JoIA, sempre começando pelo problema do negócio.";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/solucoes" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/solucoes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Solucoes,
});

const DELIVERABLES = [
  "Diagnóstico operacional",
  "Mapeamento de processos",
  "Dashboards e indicadores",
  "Sistemas web sob medida",
  "Portais internos e SaaS",
  "Sites e landing pages",
  "Integrações e APIs",
  "Workflows automatizados",
  "IA aplicada a rotinas",
  "Monitoração e observabilidade",
  "Painéis operacionais",
  "Acompanhamento contínuo",
];

const CRITERIA = [
  {
    title: "O problema define a ferramenta",
    text: "Só entramos na discussão de tecnologia depois de entender o processo, as pessoas e o resultado esperado.",
  },
  {
    title: "Simples antes de sofisticado",
    text: "Se um ajuste de processo resolve, ele vem antes do sistema. Complexidade só entra quando ela se paga.",
  },
  {
    title: "Adequação à realidade",
    text: "Consideramos o time, o orçamento e a maturidade da empresa. Solução que ninguém consegue operar não é solução.",
  },
  {
    title: "Evolução possível",
    text: "Escolhemos caminhos que permitam crescer por etapas, sem reconstruir tudo a cada nova necessidade.",
  },
];

function Solucoes() {
  return (
    <>
      <section className="surface-night relative overflow-hidden page-hero-pad">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>// Soluções</Eyebrow>
            <h1 className="h-display mt-6 max-w-[18ch] text-on-dark">
              Não começamos pela ferramenta. Começamos pelo{" "}
              <span className="editorial text-gold">problema.</span>
            </h1>
            <p className="text-lead mt-8 max-w-2xl text-on-dark-soft">
              Cada empresa perde valor de um jeito diferente. Por isso, nossa atuação começa
              com entendimento e termina em soluções que a operação consegue sustentar —
              processos, dados, sistemas, automações ou visibilidade técnica.
            </p>
          </Reveal>
        </div>
      </section>

      <nav
        aria-label="Atalhos para os pilares"
        className="surface-soft seam-top sticky top-16 z-30 border-b border-line-light/70 bg-soft/90 backdrop-blur-md"
      >
        <div className="shell flex snap-x snap-mandatory gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PILLARS.map((pillar, i) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className="focus-gold inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border border-line-light bg-white px-4 text-xs font-medium text-ink-soft transition-colors hover:border-gold/60 hover:text-ink"
            >
              <span className="font-mono text-[0.65rem] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              {pillar.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="surface-soft section-pad">
        <div className="shell space-y-20">

          {PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS];
            return (
              <Reveal key={pillar.id} as="section">
                <div id={pillar.id} className="scroll-mt-28 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <span className="label-mono text-ink-soft/70">
                      Pilar {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-lg border border-line-light bg-white text-gold">
                      <Icon size={22} strokeWidth={1.4} />
                    </span>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                      {pillar.title}
                    </h2>
                    <p className="text-body mt-4 max-w-md text-ink-soft">{pillar.description}</p>
                    <p className="label-mono mt-8 text-ink-soft/70">Tecnologias relacionadas</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {pillar.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line-light bg-white px-3 py-1.5 font-mono text-xs text-ink-soft"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl border border-line-light bg-white p-7">
                      <h3 className="label-mono text-gold">Problemas atendidos</h3>
                      <ul className="mt-4 space-y-3">
                        {pillar.problems.map((p) => (
                          <li key={p} className="text-[0.95rem] leading-relaxed text-ink-soft">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-line-light bg-white p-7">
                      <h3 className="label-mono text-gold">Soluções possíveis</h3>
                      <ul className="mt-4 space-y-3">
                        {pillar.solutions.map((p) => (
                          <li key={p} className="text-[0.95rem] leading-relaxed text-ink-soft">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-line-light bg-white p-7">
                      <h3 className="label-mono text-gold">Entregáveis</h3>
                      <ul className="mt-4 space-y-2">
                        {pillar.items.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-ink-soft">
                            <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-gold/40 bg-gold/5 p-7">
                      <h3 className="label-mono text-gold">Para quem faz sentido</h3>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                        {pillar.audience}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="surface-deep section-pad relative overflow-hidden">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>// Entregáveis</Eyebrow>
            <h2 className="h-section mt-5 text-on-dark">
              O que costuma sair de um projeto{" "}
              <span className="editorial text-gold">JoIA.</span>
            </h2>
            <Stagger className="mt-8 flex flex-wrap gap-2" gap={0.04}>
              {DELIVERABLES.map((d) => (
                <StaggerItem
                  key={d}
                  className="rounded-full border border-line-dark px-4 py-2 text-sm text-on-dark-soft"
                >
                  {d}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>// Critérios</Eyebrow>
            <h2 className="h-section mt-5 text-on-dark">
              Como escolhemos a <span className="editorial text-gold">tecnologia.</span>
            </h2>
            <ul className="mt-8 space-y-6">
              {CRITERIA.map((c, i) => (
                <li key={c.title} className="border-l border-line-dark pl-6">
                  <span className="label-mono text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-bold text-on-dark">{c.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-soft">{c.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="surface-soft section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow tone="muted">// Perguntas frequentes</Eyebrow>
            <h2 className="h-section mt-5 text-ink">
              Dúvidas <span className="editorial text-ink-soft">comuns.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-line-light">
                  <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.975rem] leading-relaxed text-ink-soft">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="surface-night section-pad relative overflow-hidden">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />
        <div className="shell relative text-center">
          <Reveal>
            <h2 className="h-section mx-auto max-w-3xl text-on-dark">
              Descreva o problema. Nós ajudamos a encontrar o{" "}
              <span className="editorial text-gold">caminho.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ActionLink to="/contato" variant="gold">
                Encontrar oportunidades <ArrowRight size={16} />
              </ActionLink>
              <ActionLink
                href={whatsappLink("Olá! Vim pela página de soluções da JoIA.")}
                external
                variant="outline-light"
              >
                <MessageCircle size={17} /> Falar pelo WhatsApp
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
