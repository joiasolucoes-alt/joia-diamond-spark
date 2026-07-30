import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { CHALLENGES, CONTACT, whatsappLink } from "@/lib/site";

const TITLE = "Contato — JoIA Soluções Empresariais";
const DESC =
  "Conte o que está travando a sua operação. A JoIA responde com um caminho possível para resolver o problema.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/contato" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Contato,
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100, "Nome muito longo"),
  company: z.string().trim().max(120, "Nome da empresa muito longo").optional(),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30, "Telefone muito longo").optional(),
  challenge: z.string().trim().min(1, "Selecione um desafio"),
  message: z
    .string()
    .trim()
    .min(10, "Descreva um pouco mais o cenário")
    .max(1000, "Máximo de 1000 caracteres"),
});

type Field = keyof z.infer<typeof schema>;

const FIELDS: { name: Field; label: string; type?: string; optional?: boolean }[] = [
  { name: "name", label: "Nome" },
  { name: "company", label: "Empresa", optional: true },
  { name: "email", label: "E-mail", type: "email" },
  { name: "phone", label: "Telefone / WhatsApp", optional: true },
];

const inputClass =
  "focus-gold w-full rounded-lg border border-line-light bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-soft/50 hover:border-gold/50";

function Contato() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const v = parsed.data;
    const text = [
      "Olá! Vim pelo site da JoIA.",
      `Nome: ${v.name}`,
      v.company ? `Empresa: ${v.company}` : null,
      `E-mail: ${v.email}`,
      v.phone ? `Telefone: ${v.phone}` : null,
      `Desafio principal: ${v.challenge}`,
      `Cenário: ${v.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSent(true);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="surface-night relative overflow-hidden pt-40 pb-24">
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>// Contato</Eyebrow>
            <h1 className="h-display mt-6 max-w-[16ch] text-on-dark">
              Conte o que está travando o seu{" "}
              <span className="editorial text-gold">negócio.</span>
            </h1>
            <p className="text-lead mt-8 max-w-2xl text-on-dark-soft">
              Você não precisa chegar com a solução pronta. Basta descrever o cenário — nós
              ajudamos a transformar o problema em um caminho possível.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-soft section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-xl border border-line-light bg-white p-8 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name} className={f.name === "email" ? "" : ""}>
                    <label htmlFor={f.name} className="label-mono text-ink-soft/70">
                      {f.label}
                      {f.optional ? " (opcional)" : ""}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type ?? "text"}
                      className={`${inputClass} mt-2`}
                      aria-invalid={!!errors[f.name]}
                    />
                    {errors[f.name] && (
                      <p className="mt-2 text-xs text-destructive">{errors[f.name]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label htmlFor="challenge" className="label-mono text-ink-soft/70">
                  Principal desafio hoje
                </label>
                <select id="challenge" name="challenge" defaultValue="" className={`${inputClass} mt-2`}>
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {CHALLENGES.map((c) => (
                    <option key={c.id} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                  <option value="Outro">Outro</option>
                </select>
                {errors.challenge && (
                  <p className="mt-2 text-xs text-destructive">{errors.challenge}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="label-mono text-ink-soft/70">
                  Descreva o cenário
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  placeholder="O que acontece hoje, onde trava e o que você gostaria que fosse diferente."
                  className={`${inputClass} mt-2 resize-y`}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="focus-gold mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-night transition-transform hover:-translate-y-0.5"
              >
                <Send size={16} /> Enviar mensagem
              </button>

              {sent && (
                <p className="mt-5 rounded-lg border border-gold/40 bg-gold/5 p-4 text-sm text-ink-soft">
                  Abrimos o WhatsApp com o resumo da sua mensagem. Se a janela não abrir,
                  use o botão de WhatsApp ao lado.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-xl border border-line-light bg-white p-8">
              <h2 className="h-card text-ink">Canais diretos</h2>
              <ul className="mt-6 space-y-5 text-[0.95rem] text-ink-soft">
                <li className="flex items-start gap-3">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-gold" />
                  <a
                    className="focus-gold rounded transition-colors hover:text-ink"
                    href={whatsappLink("Olá! Vim pelo site da JoIA.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                  <a
                    className="focus-gold rounded transition-colors hover:text-ink"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                  {CONTACT.location}
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gold/40 bg-gold/5 p-8">
              <h2 className="h-card text-ink">Como funciona depois do contato</h2>
              <ol className="mt-5 space-y-3 text-[0.95rem] text-ink-soft">
                <li>1. Conversa inicial para entender o cenário.</li>
                <li>2. Leitura da operação e dos pontos de perda.</li>
                <li>3. Proposta com prioridades e caminho possível.</li>
              </ol>
              <ActionLink
                href={whatsappLink("Olá! Vim pelo site da JoIA e quero conversar.")}
                external
                variant="outline-dark"
                className="mt-7"
              >
                <MessageCircle size={17} /> Falar agora
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
