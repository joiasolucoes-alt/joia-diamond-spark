# JoIA Transformation

Crie o site institucional completo da JoIA Soluções Empresariais.

Não entregue apenas um wireframe, uma demonstração visual ou uma hero isolada. Implemente uma primeira versão completa, navegável, responsiva e funcional do site.

Antes de começar a implementação:

1. Analise todos os arquivos e imagens anexados.
2. Identifique a logo oficial, a paleta e os elementos da identidade visual.
3. Preserve a escrita oficial da marca como “JoIA”.
4. Use os ativos anexados como fonte principal da verdade.
5. Não redesenhe ou substitua silenciosamente a logo oficial.
6. Caso a logo esteja somente em PNG, use-a no header e crie separadamente uma composição vetorial inspirada em sua geometria para a animação do hero.
7. Não utilize imagens externas ou bancos de imagens sem necessidade.
8. Não use pessoas genéricas sorrindo para computadores.
9. Não invente métricas, depoimentos, clientes, resultados ou informações empresariais.
10. Não pare apenas no planejamento. Implemente o site completo.

# 1. Objetivo do projeto

Construir um site institucional premium, moderno e orientado à conversão para a JoIA Soluções Empresariais.

A home deve funcionar como uma landing page de alta conversão, enquanto as páginas internas aprofundam as soluções, os projetos, a empresa e o contato.

A JoIA não deve parecer somente:

• Uma software house
• Uma agência de criação de sites
• Uma empresa de automação
• Uma consultoria administrativa tradicional
• Uma startup genérica de inteligência artificial
• Uma fábrica de sistemas
• Uma empresa exclusivamente técnica

A JoIA une:

• Visão de negócio
• Diagnóstico
• Processos
• Tecnologia
• Sistemas sob medida
• Automação
• Inteligência artificial
• Dados
• Observabilidade
• Construção de produtos digitais

Posicionamento central:

“A JoIA identifica gargalos de negócio e constrói sistemas, automações e soluções digitais sob medida para transformar perdas operacionais em eficiência, controle e crescimento.”

Ideia central da marca:

“O dinheiro que sua empresa deixa na mesa pode virar crescimento.”

A tecnologia deve ser apresentada como meio, não como fim.

O site deve falar primeiro sobre:

• Problemas reais da operação
• Desperdício de tempo
• Retrabalho
• Processos desconectados
• Informações espalhadas
• Decisões sem dados
• Falta de indicadores
• Sistemas que não conversam
• Dependência de pessoas específicas
• Oportunidades invisíveis
• Valor perdido na operação

Somente depois devem aparecer tecnologias, ferramentas e competências técnicas.

# 2. Público do site

Público principal:

• Donos de empresas
• Diretores
• Gestores
• Líderes de operação
• Empresas tradicionais que precisam modernizar processos
• Negócios que enfrentam retrabalho, falta de controle e baixa visibilidade
• Pessoas que conhecem o problema, mas ainda não sabem qual tecnologia precisam

Público secundário:

• Gestores de TI
• Líderes técnicos
• Profissionais avaliando a capacidade técnica da JoIA
• Empresas que precisam de sistemas, integrações ou observabilidade

A linguagem deve ser empresarial, acessível e direta.

Não abrir o site falando de frameworks, APIs, n8n, SaaS ou inteligência artificial. Primeiro apresentar o problema e o resultado.

# 3. Arquitetura do site

Crie as seguintes rotas:

• `/` Home
• `/solucoes` Soluções
• `/cases` Projetos e cases
• `/sobre` Sobre a JoIA
• `/contato` Contato
• Página 404 personalizada

Use roteamento real e mantenha todos os links funcionando.

O header deve aparecer em todas as páginas.

A home deve conter versões resumidas das informações e conduzir para as páginas internas.

# 4. Direção criativa

Conceito visual:

“Da dispersão à inteligência.”

O site deve representar uma transformação:

1. Dados espalhados
2. Processos desconectados
3. Retrabalho
4. Informações incompletas
5. Oportunidades invisíveis
6. Linhas começando a se conectar
7. Dados ganhando organização
8. Processos ganhando lógica
9. Indicadores surgindo
10. Tecnologia gerando controle
11. Formação do diamante da JoIA

Direção estética:

“Premium Tech Editorial”

A identidade deve combinar:

• Tecnologia sofisticada
• Confiança empresarial
• Composição editorial
• Geometria precisa
• Muito espaço de respiro
• Hierarquia tipográfica forte
• Movimento com propósito
• Dourado utilizado com inteligência
• Azul profundo
• Elementos inspirados no diamante
• Interfaces e linhas técnicas
• Visual contemporâneo e corporativo

O resultado deve parecer específico para a JoIA.

Não deve parecer:

• Template de SaaS
• Site criado automaticamente por IA
• Startup de criptomoedas
• Empresa de cibersegurança genérica
• Joalheria
• Site gamer
• Projeto cyberpunk
• Site experimental sem foco comercial

# 5. Paleta

Use os valores oficiais encontrados nos arquivos anexados.

Caso seja necessário utilizar valores provisórios, adote:

• Azul-noite: `#030713`
• Azul profundo: `#0C1B3A`
• Ouro principal: `#C4A346`
• Ouro claro: `#E9CF6E`
• Branco: `#FFFFFF`
• Branco suavizado: `#F6F5F1`
• Texto secundário escuro: `#5D6370`
• Bordas claras: `rgba(255,255,255,0.12)`
• Bordas escuras: `rgba(3,7,19,0.10)`

Centralize todas as cores em variáveis ou tokens de tema.

O dourado possui função semântica.

Ele deve representar:

• Valor
• Oportunidade
• Progresso
• Conexão ativa
• Informação importante
• Resultado
• Ação principal

Não aplique dourado em todos os textos, ícones e bordas.

# 6. Tipografia

Utilize:

• Manrope para navegação, interface, parágrafos, botões e a maior parte dos títulos
• Instrument Serif para palavras ou frases editoriais específicas
• IBM Plex Mono para tags, etapas, pequenos indicadores e rótulos técnicos

Não use Instrument Serif em todos os títulos.

No hero, a maior parte da frase deve usar Manrope. A expressão “virar crescimento” pode utilizar Instrument Serif em itálico e dourado.

Configuração aproximada:

Desktop:

• H1 entre 68px e 84px
• H2 entre 46px e 60px
• Texto de destaque entre 19px e 22px
• Texto comum entre 16px e 18px
• Labels entre 12px e 14px

Mobile:

• H1 entre 42px e 50px
• H2 entre 34px e 42px
• Texto comum com no mínimo 16px

Utilize `clamp()` para escalas fluidas.

# 7. Sistema visual

Use um sistema híbrido:

• Hero predominantemente escuro
• Seções intermediárias claras
• Seções técnicas em azul profundo
• Dourado como conexão entre as áreas
• Transições geométricas inspiradas nas facetas do diamante

A composição geral deve utilizar aproximadamente:

• 45% azul-noite
• 25% branco suavizado
• 20% azul profundo
• 10% dourado e detalhes de destaque

Não construir o site inteiro em fundo preto.

# 8. Header

Crie um header fixo, responsivo e elegante.

Estado inicial:

• Transparente sobre o hero
• Logo horizontal à esquerda
• Navegação central ou à direita
• CTA destacado

Após rolagem:

• Fundo azul-noite translúcido
• Blur leve
• Borda inferior sutil
• Mudança suave
• Sem alteração brusca de tamanho

Logo:

• Use o ativo oficial
• Exiba símbolo + “JoIA”
• Não use a versão vertical completa no desktop
• “Soluções Empresariais” deve ser secundário
• A logo deve levar ao topo da home

Navegação:

• Soluções
• Como atuamos
• Cases
• Sobre
• Contato

O item “Como atuamos” deve levar à seção do método na home.

CTA do header:

“Encontrar oportunidades”

Menu mobile:

• Botão acessível
• `aria-expanded`
• Fecha com Escape
• Fecha ao selecionar um link
• Impede scroll do fundo quando aberto
• Área de toque confortável
• CTA principal destacado
• Não depender de hover

# 9. Home

A home deve conter as seguintes seções.

## 9.1 Hero

Altura mínima:

`100svh`

Composição desktop:

• Texto à esquerda
• Experiência visual do diamante à direita
• Hero dividido de forma equilibrada
• Diamante ocupando aproximadamente 45% da área disponível

Composição mobile:

• Conteúdo principal primeiro
• Diamante abaixo ou parcialmente integrado ao fundo
• Animação simplificada
• CTA visível sem exigir rolagem excessiva

Eyebrow:

“ESTRATÉGIA, TECNOLOGIA E EXECUÇÃO”

Título:

“O dinheiro que sua empresa deixa na mesa pode virar crescimento.”

Destaque editorial:

• “virar crescimento” em Instrument Serif itálico
• Aplicação controlada de dourado

Texto:

“A JoIA identifica gargalos e constrói sistemas, automações e soluções digitais sob medida para transformar perdas operacionais em eficiência, controle e escala.”

CTA principal:

“Descobrir oportunidades no meu negócio”

CTA secundário:

“Conhecer nossas soluções”

Frase de apoio:

“Não vendemos tecnologia por vender. Construímos o que o seu negócio precisa para funcionar melhor.”

Tags discretas:

• PROCESSOS
• SISTEMAS
• AUTOMAÇÃO
• IA
• DADOS
• OBSERVABILIDADE

As tags devem ser discretas e secundárias.

## 9.2 Diamante cinematográfico

Crie um componente vetorial próprio para o hero.

Nome sugerido:

`JoiaDiamondVisual`

Não utilize um ícone simples ampliado.

Não faça apenas um desenho plano com borda dourada.

O diamante deve possuir múltiplas camadas:

1. Grade técnica no fundo
2. Pontos dispersos
3. Linhas interrompidas
4. Fragmentos geométricos
5. Wireframe do diamante
6. Contorno externo
7. Facetas internas
8. Circuitos internos
9. Trilhas douradas ativas
10. Linhas brancas de suporte
11. Nós de conexão
12. Brilho interno controlado
13. Sombras e profundidade
14. Pulsos de dados

O diamante deve parecer:

• Projetado
• Preciso
• Tecnológico
• Arquitetônico
• Sofisticado
• Vivo
• Exclusivo da JoIA

Não deve parecer:

• Ícone de biblioteca
• Clip-art
• Pedra preciosa realista
• Logo esticada
• Joia de loja
• Elemento 3D genérico

Crie profundidade 2.5D usando:

• Camadas SVG
• Gradient strokes
• Máscaras
• Opacidade
• Sombras internas
• Wireframes duplicados
• Pequenos deslocamentos
• Parallax muito sutil

Sequência da animação:

1. Pontos aparecem desconectados
2. Linhas incompletas surgem
3. Fragmentos começam a convergir
4. O contorno do diamante é desenhado
5. Facetas internas se formam
6. Circuitos são ativados
7. Pulsos dourados percorrem os caminhos
8. O diamante se estabiliza
9. Após a conclusão, permanece apenas uma atividade sutil

Duração aproximada:

• Formação inicial entre 2 e 3 segundos
• Um pulso discreto a cada 5 ou 8 segundos

Não fazer:

• Rotação infinita
• Flutuação permanente
• Glow exagerado
• Pulsos rápidos
• Centenas de partículas
• Movimento caótico

Use Framer Motion, SVG e CSS.

Não use Three.js, WebGL ou vídeo pesado nesta primeira versão.

Respeite `prefers-reduced-motion`.

Nesse modo, mostrar diretamente o diamante finalizado e remover movimentos contínuos.

## 9.3 Seção “Onde o valor se perde”

Fundo claro.

Eyebrow:

“// ONDE O VALOR SE PERDE”

Título:

“Nem toda perda aparece no financeiro.”

Texto:

“Ela também pode estar escondida em tarefas repetitivas, informações espalhadas, processos dependentes de pessoas e decisões tomadas sem visibilidade.”

Apresente seis dores:

1. Retrabalho constante
2. Planilhas e mensagens desconectadas
3. Processos dependentes de pessoas específicas
4. Sistemas que não conversam
5. Decisões sem indicadores
6. Tecnologia sem visibilidade

Cada item deve possuir:

• Ícone de linha
• Título curto
• Explicação objetiva
• Microinteração sutil

Não transformar a seção em uma grade genérica de cards iguais.

Crie uma composição editorial assimétrica.

## 9.4 Seção interativa “Qual desafio trouxe você até aqui?”

Título:

“Qual desafio trouxe você até aqui?”

Crie quatro opções selecionáveis:

### Organizar minha operação

Texto:

“Precisamos entender processos, responsabilidades, indicadores e pontos de perda antes de escolher ferramentas.”

Entregáveis relacionados:

• Diagnóstico operacional
• Mapeamento de processos
• Indicadores
• Dashboards
• Plano de melhoria

### Automatizar tarefas

Texto:

“Conectamos sistemas e eliminamos atividades repetitivas que consomem tempo da equipe.”

Entregáveis relacionados:

• Workflows
• Integrações
• n8n
• IA aplicada
• Automação de rotinas

### Construir uma solução digital

Texto:

“Transformamos ideias, processos e necessidades do negócio em produtos digitais sob medida.”

Entregáveis relacionados:

• Sistemas web
• SaaS
• Portais internos
• Aplicações
• Landing pages

### Monitorar minha tecnologia

Texto:

“Criamos visibilidade sobre infraestrutura, aplicações, serviços e experiência operacional.”

Entregáveis relacionados:

• Monitoração
• Observabilidade
• Zabbix
• Grafana
• Indicadores técnicos

Ao selecionar cada opção:

• Alterar o conteúdo da área de detalhes
• Animar a transição suavemente
• Destacar a opção ativa em dourado
• Manter acessibilidade por teclado
• Não depender somente de cor

## 9.5 Soluções

Eyebrow:

“// O QUE CONSTRUÍMOS”

Título:

“Tecnologia que resolve o que está travando o negócio.”

Apresente quatro pilares.

### Estratégia, processos e dados

Descrição:

“Entendemos a operação, organizamos processos e transformamos informações dispersas em indicadores úteis para a tomada de decisão.”

Itens:

• Diagnóstico empresarial
• Mapeamento de processos
• Dashboards
• Business Intelligence
• Indicadores
• Estruturação operacional

### Sistemas e produtos digitais

Descrição:

“Construímos plataformas e sistemas sob medida para necessidades que ferramentas de prateleira não conseguem resolver.”

Itens:

• Sistemas web
• SaaS
• Portais internos
• Aplicações de gestão
• APIs
• Landing pages
• Sites institucionais

### Automação e inteligência artificial

Descrição:

“Conectamos ferramentas, automatizamos tarefas e aplicamos IA onde ela produz ganho real de tempo, controle e eficiência.”

Itens:

• n8n
• Integrações
• Workflows
• Assistentes
• Processamento de dados
• Automação de rotinas
• IA aplicada aos negócios

### Observabilidade e confiabilidade

Descrição:

“Criamos visibilidade sobre ambientes, aplicações e serviços para que a tecnologia seja acompanhada com clareza.”

Itens:

• Zabbix
• Grafana
• Dashboards operacionais
• Monitoração
• Observabilidade
• Indicadores de disponibilidade
• Capacidade e desempenho

Cada pilar deve ter:

• Ícone próprio
• Descrição empresarial
• Lista de capacidades
• CTA para a página `/solucoes`

## 9.6 Método JoIA

ID da seção:

`como-atuamos`

Eyebrow:

“// COMO ATUAMOS”

Título:

“Antes de construir tecnologia, entendemos o problema que ela precisa resolver.”

Etapas:

### 01. Enxergar

“Entendemos a operação, as dores, as pessoas envolvidas e onde o negócio perde tempo ou dinheiro.”

### 02. Priorizar

“Identificamos o que gera maior impacto e definimos uma solução realista.”

### 03. Construir

“Desenvolvemos processos, automações, sistemas, dashboards ou experiências digitais.”

### 04. Medir

“Acompanhamos o resultado, ajustamos a solução e buscamos novas oportunidades.”

Conecte as etapas com uma linha dourada animada.

A linha deve acompanhar a rolagem de forma discreta.

Não usar scroll hijacking.

## 9.7 Scanner JoIA de Oportunidades

Crie uma ferramenta interativa chamada:

“Scanner JoIA de Oportunidades”

Texto:

“Responda seis perguntas rápidas e identifique onde sua operação pode estar deixando valor sobre a mesa.”

Perguntas:

1. Sua equipe executa tarefas repetitivas manualmente?
2. Seus dados ficam espalhados em planilhas, mensagens e sistemas diferentes?
3. Você consegue acompanhar os principais indicadores do negócio facilmente?
4. Seus sistemas conversam entre si?
5. Existem processos que dependem exclusivamente de uma pessoa?
6. Você possui visibilidade sobre disponibilidade e desempenho da sua tecnologia?

Respostas:

• Sim
• Parcialmente
• Não

Crie uma pontuação local, sem banco de dados.

Resultado possível:

### Oportunidades pontuais

“Existem alguns pontos que podem ser aprimorados com ajustes específicos.”

### Gargalos relevantes

“Sua operação apresenta oportunidades claras de organização, integração ou automação.”

### Alto potencial de transformação

“Existem vários pontos em que processos, dados e tecnologia podem gerar ganhos relevantes.”

Não apresentar o resultado como diagnóstico definitivo.

Após o resultado, apresentar CTA:

“Conversar sobre este resultado”

O CTA deve abrir o WhatsApp com mensagem pré-preenchida informando que a pessoa concluiu o Scanner JoIA.

## 9.8 Cases e projetos

Título:

“Problemas reais. Soluções construídas para a realidade.”

Não inventar métricas.

Apresente inicialmente três projetos.

### H2O Distribuidora

Categoria:

“Dados, gestão e processos”

Descrição:

“Organização de informações comerciais, desenvolvimento de indicadores e apoio à evolução dos processos de gestão.”

Entregas:

• Estruturação de dados
• Dashboards
• Análise de processos
• Acompanhamento gerencial

### MasterFlow

Categoria:

“Sistema web sob medida”

Descrição:

“Construção de uma plataforma digital para organizar e acompanhar fluxos comerciais e operacionais.”

Entregas:

• Sistema web
• Digitalização de processos
• Gestão de fluxos
• Evolução contínua

### Granel Piscinas

Categoria:

“Presença digital”

Descrição:

“Criação de uma experiência digital institucional para apresentar serviços, fortalecer posicionamento e facilitar novos contatos.”

Entregas:

• Site institucional
• Experiência responsiva
• Posicionamento digital
• Estrutura de conversão

Não atribuir números, porcentagens ou resultados financeiros sem dados confirmados.

Adicionar CTA:

“Conhecer nossos projetos”

Levando para `/cases`.

Caso não existam imagens reais dos projetos, crie mockups abstratos de interface sem inventar telas ou dados.

Não usar fotografias genéricas de escritórios.

## 9.9 Sobre a JoIA

Título:

“Negócio e tecnologia na mesma conversa.”

Texto principal:

“A JoIA nasceu para transformar problemas operacionais em soluções que funcionam na prática. Unimos visão de negócio, processos, dados e capacidade técnica para construir soluções adequadas à realidade de cada empresa.”

Apresente os fundadores.

### Gabriel Lage

Especialidade:

“Tecnologia, inteligência artificial, dados e observabilidade aplicados aos negócios.”

Descrição:

“Responsável pela arquitetura tecnológica, desenvolvimento de soluções, automações, dados, monitoração e observabilidade.”

### Matheus

Especialidade:

“Compras, vendas, processos e gestão de equipes.”

Descrição:

“Responsável pelo diagnóstico empresarial, organização de processos e evolução operacional dos clientes.”

Não inventar sobrenome, formação acadêmica, certificações ou experiências que não estejam disponíveis.

Caso não existam fotografias, use monogramas elegantes, não pessoas geradas por IA.

CTA:

“Conhecer a JoIA”

Levando para `/sobre`.

## 9.10 CTA final

Fundo azul-noite.

Use as linhas e fragmentos da página convergindo novamente para uma pequena versão do diamante.

Título:

“Vamos encontrar o que está invisível na sua operação?”

Texto:

“Conte o que está travando o seu negócio. A JoIA ajuda a transformar o problema em um caminho possível.”

CTA principal:

“Encontrar oportunidades”

CTA secundário:

“Falar pelo WhatsApp”

# 10. Página Soluções

Rota:

`/solucoes`

Crie uma página completa apresentando:

1. Introdução
2. Os quatro pilares
3. Exemplos de problemas resolvidos
4. Tipos de entregáveis
5. Como a JoIA escolhe a tecnologia
6. FAQ
7. CTA final

Título:

“Não começamos pela ferramenta. Começamos pelo problema.”

Para cada pilar, mostrar:

• Problemas atendidos
• Soluções possíveis
• Entregáveis
• Para quem faz sentido
• Tecnologias relacionadas

Tecnologias podem aparecer como apoio, incluindo:

• React
• TypeScript
• Supabase
• APIs
• n8n
• OpenAI
• Zabbix
• Grafana
• Power BI

Não afirmar certificações ou parcerias oficiais.

FAQ sugerido:

• A JoIA trabalha com sistemas sob medida?
• Vocês também criam sites e landing pages?
• É possível automatizar processos que hoje usam planilhas?
• A JoIA trabalha com empresas pequenas?
• Como funciona o diagnóstico inicial?
• Vocês trabalham com projetos contínuos?
• A JoIA também atua com observabilidade?

Use accordion acessível.

# 11. Página Cases

Rota:

`/cases`

Apresente os três projetos iniciais.

Estrutura de cada case:

• Contexto
• Desafio
• Abordagem
• Solução construída
• Áreas envolvidas
• Tecnologias ou capacidades
• Situação atual

Não inventar resultados.

Quando não houver dados suficientes, use textos institucionais honestos.

Permita abrir detalhes em página, modal acessível ou seção expandida.

# 12. Página Sobre

Rota:

`/sobre`

Conteúdo:

• O que é a JoIA
• Por que a empresa existe
• Proposta de valor
• Forma de atuação
• Origem do nome
• Fundadores
• Princípios
• CTA

Origem do nome:

Explique de forma breve que “JoIA” representa valor, inteligência aplicada e a capacidade de lapidar problemas até encontrar uma solução.

Caso seja utilizado o contexto relacionado à resiliência de Jó, faça isso de forma discreta, institucional e sem transformar a página em conteúdo religioso.

Princípios:

• Tecnologia com propósito
• Clareza antes da complexidade
• Soluções adequadas à realidade
• Evolução mensurável
• Proximidade com o cliente
• Construção conjunta

# 13. Página Contato

Rota:

`/contato`

Título:

“Conte o que está travando o seu negócio.”

Campos:

• Nome
• Empresa
• WhatsApp
• E-mail opcional
• Tipo de desafio
• Mensagem

Tipos de desafio:

• Organizar processos
• Criar sistema
• Automatizar tarefas
• Criar site ou landing page
• Trabalhar dados e indicadores
• Monitorar tecnologia
• Outro

Não exigir backend nesta primeira versão.

Ao enviar:

1. Validar os campos.
2. Criar uma mensagem organizada.
3. Abrir o WhatsApp com a mensagem preenchida.
4. Mostrar feedback visual antes do redirecionamento.

WhatsApp oficial:

`+55 32 99884-8940`

Link base:

`https://wa.me/5532998848940`

Instagram:

`https://www.instagram.com/joia.solucoes`

Usuário:

`@joia.solucoes`

Site:

`https://www.joiasolucoes.com.br`

Não inventar endereço ou e-mail.

# 14. Footer

O footer deve conter:

• Logo JoIA
• Descrição curta
• Links de navegação
• Soluções
• WhatsApp
• Instagram
• Direitos autorais
• Link para voltar ao topo

Descrição:

“Consultoria e tecnologia para transformar gargalos de negócio em processos, sistemas, automações e resultados.”

Use o ano atual dinamicamente.

# 15. Sistema de animação

Use Framer Motion de forma controlada.

Animações permitidas:

• Blur e fade na entrada
• Pequenos deslocamentos verticais
• Stagger entre elementos
• Linhas sendo desenhadas
• Nós sendo ativados
• Transição de conteúdo
• Hover discreto
• Parallax mínimo no diamante
• Progresso visual do método

Configuração padrão:

```js
{
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)"
  },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }
}


Mandei cores de referencia e a logo atual

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/74c2e21d-1610-477f-bcec-6ff0815e199c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
