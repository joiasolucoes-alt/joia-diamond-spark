import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { ActionLink, Eyebrow } from "@/components/site/ActionLink";
import { SCANNER_QUESTIONS, whatsappLink } from "@/lib/site";

type Answer = "sim" | "parcialmente" | "nao";

const ANSWERS: { value: Answer; label: string }[] = [
  { value: "sim", label: "Sim" },
  { value: "parcialmente", label: "Parcialmente" },
  { value: "nao", label: "Não" },
];

/** score: higher = more opportunity on the table */
function scoreOf(answer: Answer, invert: boolean) {
  const base = answer === "sim" ? 2 : answer === "parcialmente" ? 1 : 0;
  return invert ? 2 - base : base;
}

const RESULTS = [
  {
    id: "pontuais",
    title: "Oportunidades pontuais",
    text: "Existem alguns pontos que podem ser aprimorados com ajustes específicos.",
  },
  {
    id: "gargalos",
    title: "Gargalos relevantes",
    text: "Sua operação apresenta oportunidades claras de organização, integração ou automação.",
  },
  {
    id: "alto",
    title: "Alto potencial de transformação",
    text: "Existem vários pontos em que processos, dados e tecnologia podem gerar ganhos relevantes.",
  },
];

export function ScannerSection() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const total = useMemo(
    () =>
      SCANNER_QUESTIONS.reduce(
        (acc, q) => acc + (answers[q.id] ? scoreOf(answers[q.id], q.invert) : 0),
        0,
      ),
    [answers],
  );

  const answered = Object.keys(answers).length;
  const complete = answered === SCANNER_QUESTIONS.length;
  const remaining = SCANNER_QUESTIONS.length - answered;
  const maxScore = SCANNER_QUESTIONS.length * 2;
  const result = total <= 4 ? RESULTS[0] : total <= 8 ? RESULTS[1] : RESULTS[2];

  const waMessage = `Olá! Concluí o Scanner JoIA de Oportunidades no site e o resultado foi "${result.title}". Gostaria de conversar sobre isso.`;

  function showResult() {
    setSubmitted(true);
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }


  return (
    <section id="scanner" className="surface-deep section-pad relative overflow-hidden scroll-mt-24">
      <div className="shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <Eyebrow>// Ferramenta</Eyebrow>
          <h2 className="h-section mt-5 text-on-dark">
            Scanner JoIA de <span className="editorial text-gold">Oportunidades</span>
          </h2>
          <p className="text-lead mt-6 max-w-md text-on-dark-soft">
            Responda seis perguntas rápidas e identifique onde sua operação pode estar
            deixando valor sobre a mesa.
          </p>
          <p className="mt-8 font-mono text-xs leading-relaxed tracking-wide text-on-dark-soft/80">
            Este scanner é um ponto de partida para a conversa. Ele não substitui um
            diagnóstico realizado com a sua equipe.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-xl border border-line-dark bg-night/60 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="label-mono text-on-dark-soft">
              {answered}/{SCANNER_QUESTIONS.length} respondidas
            </p>
            <div className="h-px flex-1 bg-line-dark">
              <motion.div
                className="h-px bg-gold"
                animate={{ width: `${(answered / SCANNER_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <ol className="mt-8 space-y-7">
            {SCANNER_QUESTIONS.map((q, i) => (
              <li key={q.id}>
                <fieldset>
                  <legend className="flex gap-3 text-[0.975rem] leading-relaxed text-on-dark">
                    <span className="font-mono text-xs text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {q.text}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ANSWERS.map((a) => {
                      const active = answers[q.id] === a.value;
                      return (
                        <button
                          key={a.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setAnswers((prev) => ({ ...prev, [q.id]: a.value }));
                            setSubmitted(false);
                          }}
                          className={[
                            "focus-gold min-h-11 rounded-full border px-5 text-sm transition-all duration-300",
                            active
                              ? "border-gold bg-gold/15 font-semibold text-gold-light"
                              : "border-line-dark text-on-dark-soft hover:border-on-dark-soft hover:text-on-dark",
                          ].join(" ")}
                        >
                          {active ? "✓ " : ""}
                          {a.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!complete}
              onClick={() => setSubmitted(true)}
              className="focus-gold inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-35"
            >
              Ver meu resultado
            </button>
            {answered > 0 && (
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="focus-gold inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm text-on-dark-soft hover:text-on-dark"
              >
                <RotateCcw size={15} /> Recomeçar
              </button>
            )}
            {!complete && (
              <p className="text-xs text-on-dark-soft">
                Responda todas as perguntas para ver o resultado.
              </p>
            )}
          </div>

          <AnimatePresence>
            {submitted && complete && (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                className="mt-8 rounded-lg border border-gold/40 bg-gold/5 p-7"
              >
                <p className="label-mono text-gold">Resultado</p>
                <h3 className="h-card mt-3 text-on-dark">{result.title}</h3>
                <p className="mt-3 text-body text-on-dark-soft">{result.text}</p>
                <p className="mt-4 font-mono text-xs text-on-dark-soft/80">
                  Indicativo, não é um diagnóstico definitivo.
                </p>
                <ActionLink
                  href={whatsappLink(waMessage)}
                  external
                  variant="gold"
                  className="mt-7"
                >
                  <MessageCircle size={17} />
                  Conversar sobre este resultado
                </ActionLink>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
