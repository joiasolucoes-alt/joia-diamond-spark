import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import gabrielPhoto from "@/assets/gabriel-lage.jpg.asset.json";
import matheusPhoto from "@/assets/matheus-morais.jpg.asset.json";

export const FOUNDERS = [
  {
    initials: "GL",
    photo: gabrielPhoto.url,
    name: "Gabriel Lage",
    specialty: "Especialista em tecnologia, IA e dados para negócios.",
    description:
      "Responsável pela arquitetura tecnológica, desenvolvimento de soluções, automações, dados, monitoração e observabilidade.",
  },
  {
    initials: "MM",
    photo: matheusPhoto.url,
    name: "Matheus Morais",
    specialty: "Especialista em compras, vendas, processos e gestão de equipes.",
    description:
      "Responsável pelo diagnóstico empresarial, organização de processos e evolução operacional dos clientes.",
  },
];

export function Monogram({
  initials,
  photo,
  name,
}: {
  initials: string;
  photo?: string;
  name?: string;
}) {
  return (
    <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gold/40 bg-night">
      {photo ? (
        <img
          src={photo}
          alt={`Retrato de ${name ?? initials}`}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-serif text-2xl not-italic text-gold">
          {initials}
        </span>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-gold/20" />
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="sobre-joia" className="surface-deep section-pad relative overflow-hidden scroll-mt-24">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <Eyebrow>// Sobre a JoIA</Eyebrow>
          <h2 className="h-section mt-5 text-on-dark">
            Negócio e tecnologia na{" "}
            <span className="editorial text-gold">mesma conversa.</span>
          </h2>
          <p className="text-lead mt-7 max-w-lg text-on-dark-soft">
            A JoIA nasceu para transformar problemas operacionais em soluções que funcionam
            na prática. Unimos visão de negócio, processos, dados e capacidade técnica para
            construir soluções adequadas à realidade de cada empresa.
          </p>
          <ActionLink to="/sobre" variant="outline-light" className="mt-9">
            Conhecer a JoIA <ArrowRight size={16} />
          </ActionLink>
        </Reveal>

        <Stagger className="grid gap-5">
          {FOUNDERS.map((f) => (
            <StaggerItem
              key={f.name}
              className="flex gap-6 rounded-xl border border-line-dark bg-night/50 p-7"
            >
              <Monogram initials={f.initials} photo={f.photo} name={f.name} />
              <div>
                <h3 className="h-card text-on-dark">{f.name}</h3>
                <p className="mt-2 text-sm font-medium text-gold">{f.specialty}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-on-dark-soft">
                  {f.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
