import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { CaseMockup } from "@/components/site/CaseMockup";
import { CASES } from "@/lib/site";

const VARIANTS = ["data", "system", "site"] as const;

const CASE_IMAGES: Record<string, string> = {
  masterflow: "/cases/masterflow-login.png",
  "granel-piscinas": "/cases/granel-piscinas-home.jpg",
  helpsmart: "/cases/helpsmart-dashboard.jpg",
};

export function CasesSection() {
  return (
    <section id="cases" className="surface-soft section-pad defer-render scroll-mt-24">
      <div className="shell">
        <Reveal>
          <Eyebrow tone="muted">// Projetos</Eyebrow>
          <h2 className="h-section mt-5 max-w-3xl text-ink">
            Problemas reais. Soluções construídas para a{" "}
            <span className="editorial text-ink-soft">realidade.</span>
          </h2>
        </Reveal>

        <p className="label-mono mt-7 flex items-center gap-2 text-ink-soft lg:hidden">
          Deslize para conhecer os projetos <ArrowRight size={15} aria-hidden="true" />
        </p>

        <Stagger
          ariaLabel="Projetos em destaque"
          className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {CASES.map((c, i) => (
            <StaggerItem
              key={c.slug}
              as="article"
              className="group flex min-w-0 flex-[0_0_86%] snap-center flex-col sm:flex-[0_0_72%] lg:flex-auto"
            >
              <Link
                to="/cases"
                hash={c.slug}
                className="focus-gold block overflow-hidden rounded-lg transition-transform duration-500 group-hover:-translate-y-1"
              >
                <CaseMockup
                  variant={VARIANTS[i % 3]}
                  image={CASE_IMAGES[c.slug]}
                  imageAlt={`Interface do projeto ${c.name}`}
                />
              </Link>
              <p className="label-mono mt-6 text-gold">{c.category}</p>
              <h3 className="h-card mt-3 text-ink">{c.name}</h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-ink-soft">{c.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.deliveries.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-line-light px-3 py-1.5 text-xs text-ink-soft"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 sm:mt-14">
          <ActionLink to="/cases" variant="outline-dark">
            Conhecer nossos projetos <ArrowRight size={16} />
          </ActionLink>
        </Reveal>
      </div>
    </section>
  );
}
