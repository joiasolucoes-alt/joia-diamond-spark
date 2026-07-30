import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.06,
  as = "div",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "section";
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce)
    return (
      <Comp className={className} role={ariaLabel ? "region" : undefined} aria-label={ariaLabel}>
        {children}
      </Comp>
    );

  return (
    <Comp
      className={className}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={revealVariants}>
      {children}
    </Comp>
  );
}

export { EASE };
