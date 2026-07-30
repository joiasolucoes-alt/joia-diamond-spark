## Plano de melhorias — UX & UI

Prioridades ordenadas por impacto na experiência e na conversão. Nada de mudança de conteúdo ou de posicionamento: só forma, ritmo e usabilidade.

### 1. Navegação e header (alto impacto)
- Indicador de seção ativa no scroll da home (Dores / Soluções / Método / Scanner / Cases), hoje o link só marca por rota.
- Menu mobile como painel animado (entrada/saída suave, foco preso dentro do painel, fechar por clique fora) — hoje é um `hidden` seco sem transição nem focus trap.
- Barra fina de progresso de leitura no topo em páginas longas.
- CTA do header ganha estado compacto após o scroll para reduzir peso visual.

### 2. Hierarquia e ritmo vertical
- Padronizar o espaçamento entre seções com uma escala única (`section-pad` em 3 variações: compacta, padrão, ampla) para eliminar saltos irregulares entre home e páginas internas.
- Alternância de superfícies mais intencional (night → deep → night) com transições em degradê fino em vez de cortes duros.
- Larguras de leitura limitadas (~68ch) em todos os parágrafos longos; hoje alguns blocos esticam demais em telas grandes.

### 3. Scanner JoIA (principal ferramenta de conversão)
- Estado de resultado com destaque real: card de resultado ancorado com scroll automático, barra de score visual e próxima ação evidente.
- Feedback imediato por pergunta (marcação sutil + avanço visual) e botão “Ver meu resultado” fixo/sticky no mobile enquanto houver perguntas pendentes.
- Mensagem clara de “faltam N perguntas” em vez de apenas botão desabilitado.
- Opções de resposta em grade de 3 colunas iguais no mobile (hoje quebram desalinhadas).

### 4. Formulário de contato
- Validação em tempo real no blur com mensagens de erro por campo e `aria-describedby`.
- Estados de loading/sucesso no envio e explicação prévia de que abre o WhatsApp (hoje o salto é inesperado).
- Campos com labels flutuantes ou labels persistentes + hint, altura mínima 48px, agrupamento lógico em duas colunas no desktop.
- Alternativa de contato visível (e-mail copiável) para quem não usa WhatsApp.

### 5. Cases e Soluções
- Cases: cartões com hierarquia mais forte (resultado/indicador em destaque), transição de expandir/colapsar com altura animada e ícone de estado.
- Soluções: âncoras laterais (sticky) para saltar entre os quatro pilares em desktop; no mobile, chips horizontais.
- FAQ: um item aberto por padrão e transições consistentes.

### 6. Micro-interações e movimento
- Padronizar duração/easing em tokens (`--ease-brand`, `--dur-fast/base/slow`) e aplicar em todos os hovers, revelações e acordeões.
- Revelações com deslocamento menor (12–16px) e stagger curto — hoje há sensação de “tudo entra tarde”.
- Respeitar `prefers-reduced-motion` em todas as seções (hoje só no diamante).

### 7. Acessibilidade e polimento
- Foco visível consistente em todos os elementos interativos (auditar `focus-gold`).
- Contraste do `on-dark-soft` sobre `surface-deep` revisado para AA.
- Alvos de toque mínimos 44×44 em chips, links do footer e botões de ícone.
- Um único `<main>` por página e hierarquia de headings sem saltos.

### 8. Responsivo
- Revisão dedicada em 360px, 768px e 1440px: hero, scanner, timeline do método e mockups de case.
- Timeline do método em layout vertical simplificado no mobile.
- Tipografia fluida revisada para evitar headline gigante em tablets.

### Detalhes técnicos
- Tokens de movimento e espaçamento centralizados em `src/styles.css`.
- Novo hook `useActiveSection` (IntersectionObserver) para o header.
- Menu mobile com `AnimatePresence` + focus trap simples.
- Scanner e formulário permanecem client-side, sem mudança de lógica de negócio nem backend.

### Sugestão de execução
Fase 1: header/nav + ritmo vertical + tokens de movimento. Fase 2: Scanner + formulário. Fase 3: Cases/Soluções + acessibilidade + responsivo.
