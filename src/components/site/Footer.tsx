import { Link } from "@tanstack/react-router";
import { ArrowUp, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_ITEMS,
  PILLARS,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-night border-t border-line-dark">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-dark-soft">
            Consultoria e tecnologia para transformar gargalos de negócio em processos,
            sistemas, automações e resultados.
          </p>
        </div>

        <div>
          <h2 className="label-mono text-gold">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className="focus-gold text-sm text-on-dark-soft transition-colors hover:text-on-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="label-mono text-gold">Soluções</h2>
          <ul className="mt-5 space-y-3">
            {PILLARS.map((p) => (
              <li key={p.id}>
                <Link
                  to="/solucoes"
                  hash={p.id}
                  className="focus-gold text-sm text-on-dark-soft transition-colors hover:text-on-dark"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="label-mono text-gold">Contato</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={whatsappLink("Olá! Vim pelo site da JoIA e gostaria de conversar.")}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-gold inline-flex items-center gap-2 text-sm text-on-dark-soft transition-colors hover:text-on-dark"
              >
                <MessageCircle size={16} className="text-gold" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-gold inline-flex items-center gap-2 text-sm text-on-dark-soft transition-colors hover:text-on-dark"
              >
                <Instagram size={16} className="text-gold" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="shell flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs tracking-wide text-on-dark-soft">
            © {year} JoIA Soluções Empresariais. Todos os direitos reservados.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="focus-gold inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-gold uppercase"
          >
            Voltar ao topo <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
