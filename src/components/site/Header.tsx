import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { NAV_ITEMS } from "@/lib/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const HOME_SECTIONS = [
  "dores",
  "desafios",
  "solucoes",
  "como-atuamos",
  "scanner",
  "cases",
  "sobre-joia",
];

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        className="gold-rule h-px origin-left"
        style={{ transform: `scaleX(${progress})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const activeSection = useActiveSection(HOME_SECTIONS, isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape, scroll lock and focus trap for the mobile panel
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || current === triggerRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isItemActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.hash) return isHome && activeSection === item.hash;
    if (item.to === "/") return isHome && !activeSection;
    return pathname.startsWith(item.to);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line-dark bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-[height] duration-500 lg:flex lg:justify-between lg:gap-6",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo />

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-gold relative rounded-sm text-sm font-medium transition-colors duration-300 hover:text-on-dark",
                  active ? "text-on-dark" : "text-on-dark-soft",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-gold transition-[width] duration-300",
                    active ? "w-full" : "w-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ActionLink
            to="/contato"
            variant="gold"
            className={cn(
              "transition-all duration-500",
              scrolled ? "min-h-10 px-4 py-2 text-[0.8rem]" : "px-5 py-2.5 text-sm",
            )}
          >
            Encontrar oportunidades
          </ActionLink>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="focus-gold -mr-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-on-dark lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {scrolled && <ReadingProgress />}

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="fixed inset-0 top-[var(--header-h,5rem)] -z-10 h-screen w-full cursor-default bg-night/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              id="menu-mobile"
              ref={panelRef}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-line-dark bg-night lg:hidden"
            >
              <nav aria-label="Navegação principal (mobile)" className="shell flex flex-col py-3">
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      hash={item.hash}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-gold flex min-h-14 items-center gap-3 border-b border-line-dark text-lg font-medium transition-colors",
                        active ? "text-gold" : "text-on-dark",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-px bg-gold transition-all duration-300",
                          active ? "w-5" : "w-0",
                        )}
                      />
                      {item.label}
                    </Link>
                  );
                })}
                <ActionLink to="/contato" variant="gold" className="mt-6 mb-4 w-full">
                  Encontrar oportunidades
                </ActionLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
