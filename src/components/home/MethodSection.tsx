import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/site/motion";
import { Eyebrow } from "@/components/site/ActionLink";
import { METHOD_STEPS } from "@/lib/site";

export function MethodSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scaleY = useTransform(progress, (v) => (reduce ? 1 : v));

  return (
    <section id="como-atuamos" className="surface-night section-pad relative overflow-hidden scroll-mt-24">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />
      <div className="shell relative">
        <Reveal>
          <Eyebrow>// Como atuamos</Eyebrow>
          <h2 className="h-section mt-5 max-w-3xl text-on-dark">
            Antes de construir tecnologia, entendemos o{" "}
            <span className="editorial text-gold">problema que ela precisa resolver.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          <div className="absolute top-2 bottom-2 left-[15px] w-px bg-line-dark sm:left-[31px]" />
          <motion.div
            aria-hidden
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-gold-light via-gold to-gold/20 sm:left-[31px]"
          />

          <ol className="space-y-14">
            {METHOD_STEPS.map((step, i) => (
              <li key={step.num} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-10 flex h-8 w-8 items-center justify-center sm:-left-16"
                >
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-25%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-3 w-3 rotate-45 border border-gold bg-night"
                  />
                </span>
                <Reveal delay={i * 0.05}>
                  <p className="label-mono text-gold">{step.num}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-on-dark sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-body mt-3 max-w-2xl text-on-dark-soft">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
