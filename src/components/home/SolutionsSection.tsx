import { Compass, Layers, Workflow, Activity, ArrowRight, Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { PILLARS } from "@/lib/site";

export const PILLAR_ICONS = {
  compass: Compass,
  layers: Layers,
  workflow: Workflow,
  activity: Activity,
} as const;

export function SolutionsSection() {
  return (
    <section className="surface-soft section-pad">
      <div className="shell">
        <Reveal>
          <Eyebrow tone="muted">// O que construímos</Eyebrow>
          <h2 className="h-section mt-5 max-w-3xl text-ink">
            Tecnologia que resolve o que está{" "}
            <span className="editorial text-ink-soft">travando o negócio.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon as keyof typeof PILLAR_ICONS];
            return (
              <StaggerItem
                key={pillar.id}
                as="article"
                className="group flex flex-col rounded-xl border border-line-light bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 sm:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-line-light bg-soft text-gold transition-colors duration-500 group-hover:border-gold/50">
                  <Icon size={22} strokeWidth={1.4} />
                </span>
                <h3 className="h-card mt-7 text-ink">{pillar.title}</h3>
                <p className="mt-4 text-body text-ink-soft">{pillar.description}</p>
                <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                      <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 pt-6 border-t border-line-light">
                  <ActionLink
                    to="/solucoes"
                    hash={pillar.id}
                    variant="ghost-gold"
                    className="px-0 py-0 text-sm"
                  >
                    Ver detalhes deste pilar
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </ActionLink>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
