import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ActionLink } from "@/components/site/ActionLink";
import { JoiaDiamondMark } from "@/components/site/JoiaDiamondVisual";
import { WHATSAPP_DISPLAY } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="surface-night relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-10 max-w-xl text-center">
        <JoiaDiamondMark className="mx-auto h-28 w-28 opacity-70" />
        <p className="label-mono mt-8 text-gold">// 404</p>
        <h1 className="h-section mt-4 text-on-dark">
          Esta página não existe — <span className="editorial text-gold">ainda</span>.
        </h1>
        <p className="text-body mt-5 text-on-dark-soft">
          O caminho que você tentou acessar não faz parte do site da JoIA. Volte para a home ou
          conheça as nossas soluções.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ActionLink to="/" variant="gold">
            Voltar para a home
          </ActionLink>
          <ActionLink to="/solucoes" variant="outline-light">
            Conhecer as soluções
          </ActionLink>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="surface-night flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="h-card text-on-dark">Esta página não carregou</h1>
        <p className="mt-3 text-sm text-on-dark-soft">
          Algo saiu do esperado. Tente novamente ou volte para a home.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="focus-gold inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night"
          >
            Tentar novamente
          </button>
          <Link
            to="/"
            className="focus-gold inline-flex min-h-12 items-center justify-center rounded-full border border-line-dark px-6 py-3 text-sm font-medium text-on-dark"
          >
            Ir para a home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JoIA Soluções Empresariais" },
      {
        name: "description",
        content:
          "Consultoria e tecnologia para transformar gargalos de negócio em processos, sistemas, automações e resultados.",
      },
      { name: "author", content: "JoIA Soluções Empresariais" },
      { property: "og:site_name", content: "JoIA Soluções Empresariais" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#030713" },
      { name: "application-name", content: "JoIA Soluções Empresariais" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      { name: "msapplication-TileColor", content: "#030713" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { rel: "apple-touch-icon", href: "/apple-icon-180x180.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Rethink+Sans:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "JoIA Soluções Empresariais",
          url: "https://www.joiasolucoes.com.br",
          description:
            "Consultoria e tecnologia para transformar gargalos de negócio em processos, sistemas, automações e resultados.",
          sameAs: ["https://www.instagram.com/joia.solucoes"],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: WHATSAPP_DISPLAY,
              contactType: "sales",
              areaServed: "BR",
              availableLanguage: "Portuguese",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#conteudo"
        className="focus-gold fixed top-3 left-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-semibold text-night shadow-lg transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
