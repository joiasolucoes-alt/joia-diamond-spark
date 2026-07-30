import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line-dark bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="relative text-sm font-medium text-on-dark-soft transition-colors hover:text-on-dark focus-gold rounded-sm after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-on-dark" }}
              activeOptions={{ exact: item.to === "/" && !item.hash }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ActionLink to="/contato" variant="gold" className="px-5 py-2.5 text-sm">
            Encontrar oportunidades
          </ActionLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="focus-gold -mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-on-dark lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line-dark bg-night lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)" className="shell flex flex-col py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={() => setOpen(false)}
              className="focus-gold border-b border-line-dark py-4 text-lg font-medium text-on-dark"
            >
              {item.label}
            </Link>
          ))}
          <ActionLink
            to="/contato"
            variant="gold"
            className="mt-6 mb-4 w-full"
          >
            Encontrar oportunidades
          </ActionLink>
        </nav>
      </div>
    </header>
  );
}
