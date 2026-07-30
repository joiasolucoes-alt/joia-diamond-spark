import { MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink } from "@/components/site/ActionLink";
import { JoiaDiamondMark } from "@/components/site/JoiaDiamondVisual";
import { whatsappLink } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="surface-night section-pad relative overflow-hidden">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px gold-rule opacity-70"
      />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <h2 className="h-section max-w-2xl text-on-dark">
            Vamos encontrar o que está{" "}
            <span className="editorial text-gold">invisível na sua operação?</span>
          </h2>
          <p className="text-lead mt-6 max-w-xl text-on-dark-soft">
            Conte o que está travando o seu negócio. A JoIA ajuda a transformar o problema
            em um caminho possível.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ActionLink to="/contato" variant="gold">
              Encontrar oportunidades <ArrowRight size={16} />
            </ActionLink>
            <ActionLink
              href={whatsappLink(
                "Olá! Vim pelo site da JoIA e gostaria de conversar sobre a minha operação.",
              )}
              external
              variant="outline-light"
            >
              <MessageCircle size={17} /> Falar pelo WhatsApp
            </ActionLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm">
          <JoiaDiamondMark className="w-full opacity-90" />
        </Reveal>
      </div>
    </section>
  );
}
