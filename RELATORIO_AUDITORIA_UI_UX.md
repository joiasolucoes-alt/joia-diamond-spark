# Relatório de Auditoria de UI e UX — JoIA Soluções Empresariais

Data da auditoria: 30/07/2026  
Ambiente analisado: aplicação local em `http://localhost:8080`  
Tecnologias identificadas: React 19, TypeScript, TanStack Router/Start, Tailwind CSS 4, Framer Motion, Embla Carousel, React Hook Form e Zod.

> Nota de escopo: o roteiro original previa somente investigação. Em mensagem posterior, foi solicitada explicitamente a correção da responsividade considerando o scroll. Por isso, os itens marcados como **corrigidos localmente** foram implementados, mas ainda não publicados.

## Resumo executivo

O site apresenta identidade visual forte, boa coerência de marca, conteúdo claro e componentes bem estruturados. A experiência desktop é madura e diferenciada. O principal desequilíbrio estava na home mobile: uma seção de storytelling reservava seis alturas de tela e mantinha o conteúdo preso durante a rolagem. Isso tornava a página cansativa e dava a sensação de que o scroll não avançava.

A auditoria percorreu 6 rotas/estados em 8 larguras, totalizando 48 combinações de viewport. Não foi encontrada rolagem horizontal global indevida. Foram identificados 14 problemas ou oportunidades: 0 críticos, 3 altos, 7 médios e 4 baixos/sugestões.

### Nível de maturidade

- Interface visual: alta.
- Facilidade de uso: boa, com atrito relevante no mobile antes das correções.
- Responsividade: intermediária antes das correções; boa após os ajustes locais prioritários.
- Acessibilidade: intermediária, com boa semântica básica e alguns alvos/textos pequenos.

### Cinco problemas mais importantes

1. Storytelling da seção de perdas consumia 600svh também no celular.
2. Carrossel de soluções podia se mover sozinho enquanto o usuário fazia scroll mobile.
3. Envio do formulário depende de uma nova janela do WhatsApp aberta após temporização.
4. Home ainda é extensa e densa no celular, mesmo após remover o principal bloqueio.
5. Textos monoespaçados decorativos aparecem abaixo de 12 px em várias seções mobile.

### Cinco melhorias de maior impacto

1. Manter efeitos de scroll fixo somente em telas grandes.
2. Desativar avanço automático de carrosséis no mobile e preservar gesto/controle manual.
3. Tornar a abertura do WhatsApp síncrona ao clique, com fallback visível.
4. Reduzir densidade vertical de seções secundárias na home mobile.
5. Padronizar texto auxiliar mobile em pelo menos 11–12 px e alvos em 44 px.

## Inventário de telas

| Tela | Rota | Objetivo | Perfil | Estado analisado | Resultado |
|---|---|---|---|---|---|
| Home | `/` | Apresentar proposta, dores, desafios, soluções e conversão | Público | Inicial, scroll, carrosséis, scanner | Boa visualmente; scroll mobile era excessivo |
| Soluções | `/solucoes` | Detalhar os quatro pilares | Público | Hero, navegação âncora, pilares e FAQ | Boa; página longa e subnav horizontal pouco explícita |
| Cases | `/cases` | Exibir projetos e provas | Público | Listagem e acesso direto | Boa, sem overflow |
| Sobre | `/sobre` | Posicionamento, princípios e equipe | Público | Conteúdo completo | Boa, mas longa em telas estreitas |
| Contato | `/contato` | Coletar cenário e abrir WhatsApp | Lead | Vazio, inválido, preenchimento e envio | Validação boa; risco de popup bloqueado |
| Não encontrada | rota inexistente | Recuperar navegação | Público | Acesso direto | Boa mensagem e duas saídas claras |

Não existem login, usuários autenticados, dashboards, tabelas, exclusões, uploads ou permissões no escopo atual. Os testes obrigatórios relativos a essas funções não são aplicáveis.

## Problemas encontrados

### Altos

#### UI-01 — Scroll mobile artificialmente longo

- Categoria: Responsividade / scroll
- Severidade: Alta
- Página: `/`
- Componente: `PainSection`
- Evidência: em 390 px, a seção media 5.064 px e usava `height: 600svh` com conteúdo `sticky`.
- Reprodução: abrir a home em 390 px e rolar até “Onde o valor se perde”.
- Impacto: sensação de página travada, esforço excessivo e perda de contexto.
- Recomendação: reservar a narrativa por scroll para desktop e usar fluxo natural com swipe no mobile.
- Esforço: baixo.
- Prioridade: imediata.
- Arquivo: `src/components/home/PainSection.tsx`
- Estado: **corrigido localmente**. A seção passou para aproximadamente 850 px em 375–390 px.

#### UX-01 — Avanço automático durante a rolagem mobile

- Categoria: Controle do usuário
- Severidade: Alta
- Página: `/`
- Componente: `SolutionsSection`
- Evidência: temporizador podia avançar o pilar ativo em viewports mobile enquanto a seção estivesse visível.
- Impacto: o conteúdo muda sem ação do usuário e pode deslocar o carrossel durante a leitura.
- Recomendação: manter autoplay apenas no desktop; no mobile, usar swipe e indicadores.
- Esforço: baixo.
- Prioridade: imediata.
- Arquivo: `src/components/home/SolutionsSection.tsx`
- Estado: **corrigido localmente**.

#### UX-02 — WhatsApp pode ser bloqueado após o envio

- Categoria: Fluxo de conversão
- Severidade: Alta
- Página: `/contato`
- Componente: formulário de contato
- Evidência: `window.open` ocorre dentro de `setTimeout`, fora do gesto direto do clique, e o estado de sucesso é ativado mesmo se a janela não abrir.
- Impacto: o usuário acredita que concluiu o contato sem ter enviado a mensagem.
- Recomendação: abrir uma janela vazia sincronamente no submit, preencher a URL após validação e oferecer link/copiar mensagem como fallback.
- Esforço: médio.
- Prioridade: alta.
- Arquivo: `src/routes/contato.tsx`
- Estado: **corrigido localmente**. A janela agora é reservada durante o clique e existe um link de fallback quando o navegador bloqueia o popup.

### Médios

#### UI-02 — Home ainda muito extensa no celular

- Categoria: Ritmo e densidade
- Severidade: Média
- Página: `/`
- Evidência: após a correção principal, a home ainda mede aproximadamente 14.765 px em 390 px.
- Impacto: usuários podem abandonar antes de chegar aos cases e CTA final.
- Recomendação: condensar Method, Cases e About no mobile; reduzir paddings e permitir “ver mais” onde fizer sentido.
- Esforço: médio.
- Prioridade: próxima versão.
- Estado: **corrigido localmente**. Método e paddings foram compactados; cases e fundadores viraram sequências horizontais indicadas no mobile, preservando todo o conteúdo e as grades do desktop.

#### A11Y-01 — Indicadores de carrossel tinham área de toque de 8 px

- Categoria: Acessibilidade
- Severidade: Média
- Critério: WCAG 2.2 — 2.5.8 Target Size
- Páginas: home
- Componentes: `PainSection`, `SolutionsSection`
- Impacto: difícil selecionar um item com precisão no celular.
- Recomendação: manter o ponto visual pequeno dentro de botão com 44 px de altura.
- Esforço: baixo.
- Estado: **corrigido localmente**.

#### A11Y-02 — Textos auxiliares muito pequenos

- Categoria: Tipografia / legibilidade
- Severidade: Média
- Páginas: principalmente home e soluções
- Evidência: 48 elementos abaixo de 12 px foram encontrados na home mobile; muitos são labels e instruções monoespaçadas.
- Impacto: leitura difícil em telas pequenas e com zoom.
- Recomendação: elevar instruções funcionais para 11–12 px; manter tamanhos menores apenas em decoração dispensável.
- Esforço: baixo.
- Prioridade: alta.
- Estado: **corrigido localmente**. Labels e instruções funcionais agora usam pelo menos 12 px; textos menores ficaram restritos à composição decorativa.

#### UX-03 — Navegação horizontal de pilares pouco explícita

- Categoria: Descoberta
- Severidade: Média
- Página: `/solucoes`
- Componente: subnav sticky
- Evidência: em 320–390 px, itens seguintes ficam fora da viewport, embora o container seja rolável.
- Impacto: parte dos usuários pode não perceber que existem outros pilares.
- Recomendação: acrescentar fade lateral/indicador “arraste” e garantir que o item ativo seja centralizado.
- Esforço: baixo.
- Prioridade: próxima versão.
- Estado: **corrigido localmente**. A navegação agora mostra instrução de gesto, fades laterais, progresso, estado ativo e centralização automática.

#### UX-04 — Barra sticky do scanner pode ocupar área relevante em telas curtas

- Categoria: Scroll / formulário
- Severidade: Média
- Página: home, seção `#scanner`
- Componente: ações do scanner
- Evidência: o bloco de ação possui cerca de 121 px e usa `sticky bottom-0` no mobile.
- Impacto: em aparelhos com 568 px de altura, reduz significativamente a área disponível para perguntas.
- Recomendação: compactar a barra, ativá-la somente após a primeira resposta ou mantê-la no fluxo em telas muito baixas.
- Esforço: baixo.
- Prioridade: alta.
- Estado: **corrigido localmente**. As ações aparecem após a primeira resposta, são mais compactas e deixam de ser sticky abaixo de 700 px de altura.

#### CONS-01 — Telefones inconsistentes

- Categoria: Conteúdo / confiança
- Severidade: Média
- Evidência: o WhatsApp visível usa `+55 32 99956-8866`, enquanto o JSON-LD informa `+55 32 99884-8940`.
- Impacto: dados divergentes em mecanismos de busca e canais de contato.
- Recomendação: definir uma única fonte para o telefone e reutilizá-la no schema.
- Esforço: baixo.
- Prioridade: alta.
- Arquivos: `src/lib/site.ts`, `src/routes/__root.tsx`
- Estado: **corrigido localmente**. O JSON-LD agora reutiliza o mesmo número exibido no site.

#### PERF-01 — Bundle principal elevado

- Categoria: Desempenho percebido
- Severidade: Média
- Evidência: build aponta chunk principal próximo de 591 kB minificado.
- Impacto: primeira renderização mais lenta em redes móveis.
- Recomendação: revisar imports globais, lazy loading de seções abaixo da dobra e separação de bibliotecas de animação.
- Esforço: médio.
- Prioridade: próxima versão.
- Estado: **corrigido localmente**. O maior chunk do cliente caiu de `591,81 kB` (`183,04 kB` gzip) para `273,09 kB` (`82,14 kB` gzip), com React e Framer Motion separados em pacotes reutilizáveis pelo cache. Seções abaixo da dobra usam `content-visibility: auto` sem remover conteúdo do HTML ou interromper âncoras e interações.

### Baixos e sugestões

#### A11Y-03 — Logo clicável tinha 36 px de altura

- Severidade: Baixa
- Critério: WCAG 2.2 — 2.5.8
- Recomendação: área mínima de 44 px.
- Estado: **corrigido localmente** em `Logo.tsx`.

#### COPY-01 — Falha ao copiar e-mail é silenciosa

- Severidade: Baixa
- Página: `/contato`
- Recomendação: mostrar “Não foi possível copiar. Selecione o endereço manualmente.”

#### A11Y-04 — Ausência de link “Pular para o conteúdo”

- Severidade: Baixa
- Critério: WCAG 2.4.1 — Bypass Blocks
- Recomendação: adicionar skip link visível ao foco apontando para `#conteudo`.

#### SUG-01 — Reduzir repetição de CTAs

- Severidade: Sugestão
- Página: home
- Evidência: diversos blocos repetem CTAs de contato em uma página extensa.
- Recomendação: diferenciar CTAs por intenção e concentrar chamadas mais fortes após prova/case.

## Análise dos fluxos

### Descoberta de serviços

Fluxo atual: Home → dores → desafios → soluções → CTA.  
Problema principal: no mobile, o storytelling de dores ocupava seis telas e atrasava o acesso às soluções.  
Fluxo recomendado: Hero → dor principal navegável por swipe → escolha do desafio → solução → prova → contato.  
Ganho esperado: menor abandono e percepção de avanço contínuo.

### Exploração dos pilares

Fluxo atual: header → `/solucoes` → subnav horizontal → detalhes → CTA.  
Problema: subnav horizontal não comunica claramente que há conteúdo fora da tela.  
Fluxo recomendado: incluir pista visual de continuidade, manter item ativo visível e reduzir a distância até o CTA.

### Contato

Fluxo anterior: preencher → validar → aguardar 450 ms → abrir WhatsApp → confirmar manualmente.  
Pontos positivos: labels, autocomplete, validação específica, foco no primeiro erro e resumo claro.  
Problema anterior: popup podia ser bloqueado e o sucesso era informado antes do envio real.  
Fluxo implementado localmente: reservar a janela durante o clique, gerar a mensagem, redirecionar e mostrar um link de fallback quando necessário.

## Auditoria de responsividade

| Tela | Larguras testadas | Resultado/problema | Severidade | Recomendação |
|---|---:|---|---|---|
| Home | 320, 375, 390 | `PainSection` media 5.064 px em 390 px | Alta | Fluxo natural abaixo de 1280 px — corrigido |
| Home | 320–390 | 14 alvos pequenos antes da correção | Média | Áreas de toque maiores — corrigido para os carrosséis |
| Home | 320–390 | Conteúdo total ainda muito longo | Média | Condensar seções secundárias |
| Soluções | 320–768 | Subnav horizontal depende de gesto não indicado | Média | Fade e microcopy de arraste |
| Scanner | 320 com 568 px de altura | Barra de ação pode ocupar ~121 px | Média | Compactar/condicionar sticky |
| Cases | todas | Sem overflow global | — | Manter |
| Sobre | todas | Sem overflow global; conteúdo longo no mobile | Baixa | Ajustar ritmo vertical |
| Contato | todas | Formulário reorganiza corretamente | — | Manter grid responsivo |
| 404 | todas | Ações acessíveis e sem corte | — | Manter |

Não houve overflow horizontal global nas 48 combinações testadas.

## Auditoria de acessibilidade

| Critério | Tela | Problema | WCAG | Correção |
|---|---|---|---|---|
| Tamanho do alvo | Home | Dots de 8 px | 2.5.8 AA | Botões de 44 px — corrigido |
| Tamanho do alvo | Global | Logo de 36 px | 2.5.8 AA | Área mínima 44 px — corrigido |
| Bypass blocks | Global | Sem skip link | 2.4.1 A | Link “Pular para o conteúdo” — corrigido |
| Movimento | Home | Autoplay mobile | 2.2.2 A / boa prática | Desativado localmente |
| Foco | Header/menu | Foco visível e trap presentes | Conforme | Manter |
| Labels/erros | Contato | Labels, `aria-invalid` e mensagens associados | Conforme | Manter |
| Contraste | Superfícies principais | Dourado original tinha pouco contraste em textos sobre fundo claro | 1.4.3 AA | Tom dourado escuro contextual em superfícies claras — corrigido |
| Zoom | Home | Labels pequenos perdiam legibilidade | 1.4.4 AA | Textos funcionais com pelo menos 12 px — corrigido |

## Melhorias de textos

| Local | Texto atual | Problema | Texto recomendado |
|---|---|---|---|
| PainSection mobile | “Role para avançar · deslize para explorar” | Scroll não deve controlar cards no mobile | “Deslize o card para explorar” — corrigido |
| Soluções mobile | “Cada movimento reorganiza o sistema...” | Abstrato | “Deslize para comparar os quatro pilares.” |
| Contato após popup bloqueado | “Abrimos o WhatsApp...” | Pode não ser verdadeiro | “Se o WhatsApp não abrir, use este link ou copie a mensagem.” |
| Copiar e-mail | Sem mensagem de falha | Falta orientação | “Não foi possível copiar. Selecione o endereço manualmente.” |
| Subnav de soluções | Sem instrução | Gesto escondido | “Deslize para ver todos os pilares.” |

## Plano de ação

### Correções imediatas

1. Publicar os ajustes locais de scroll e alvos mobile após aprovação.
2. Publicar o fluxo confiável de abertura do WhatsApp, já corrigido e validado localmente.
3. Unificar o telefone do site e do JSON-LD.
4. Compactar a barra sticky do scanner em telas de pouca altura.

### Próxima versão

1. Reduzir densidade vertical da home mobile.
2. Adicionar pista visual na subnav de soluções.
3. Aumentar textos funcionais abaixo de 12 px.
4. Adicionar skip link.

### Melhorias estruturais

1. Dividir o bundle por rota e seções pesadas.
2. Criar tokens específicos para touch targets e microcopy.
3. Automatizar testes de overflow e tamanhos de alvo.

### Refinamentos futuros

1. Revisar repetição de CTAs.
2. Testar contraste com ferramenta automatizada.
3. Medir abandono por seção e Core Web Vitals em produção.

## Roadmap recomendado

1. **Etapa 1 — concluída localmente:** scroll mobile, autoplay e fluxo de WhatsApp.
2. **Etapa 2 — concluída localmente:** contato, scanner e descoberta dos pilares.
3. **Etapa 3 — concluída localmente:** acessibilidade, touch targets e microtipografia.
4. **Etapa 4 — concluída localmente:** padronização de densidade e ritmo visual.
5. **Etapa 5 — concluída localmente:** code splitting, adiamento de pintura abaixo da dobra, métricas de bundle e validação final de scroll.

## Score final

| Critério | Nota | Justificativa |
|---|---:|---|
| Aparência visual | 8,8 | Identidade forte, profissional e diferenciada |
| Consistência | 8,2 | Tokens e componentes coerentes; pequenos desvios de conteúdo |
| Navegação | 8,5 | Header e subnav indicam estado ativo; pilares têm pista visual e acompanhamento por scroll |
| Facilidade de uso | 8,2 | Boa hierarquia e exploração horizontal nas coleções mais densas do mobile |
| Responsividade | 8,4 | Sem overflow; scroll mobile, densidade e coleções responsivas revisados |
| Acessibilidade | 8,4 | Skip link, foco de alto contraste, alvos de 44 px e microtextos funcionais revisados |
| Clareza dos textos | 8,5 | Copy específica e orientada ao negócio |
| Feedback do sistema | 8,4 | Formulário, WhatsApp, cópia de e-mail e scanner comunicam estado e alternativas |
| Prevenção de erros | 7,9 | Validação boa, abertura síncrona e fallback direto para o WhatsApp |
| Eficiência dos fluxos | 7,6 | Conversão direta, porém home longa |
| Percepção de desempenho | 8,5 | Maior chunk reduzido em 54%; bibliotecas compartilhadas separadas e pintura abaixo da dobra adiada |
| Qualidade geral | 8,5 | Roadmap de cinco etapas executado localmente, com navegação, responsividade, acessibilidade e desempenho revisados |

## Resumo quantitativo

- Telas/estados analisados: 6.
- Combinações de viewport: 48.
- Problemas/oportunidades registrados: 14.
- Críticos: 0.
- Altos: 3.
- Médios: 7.
- Baixos/sugestões: 4.
- Primeira correção recomendada: remover o storytelling `600svh` do mobile — **já corrigido localmente**.
