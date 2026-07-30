export const WHATSAPP_NUMBER = "5532999568866";
export const WHATSAPP_DISPLAY = "+55 32 99956-8866";
export const INSTAGRAM_URL = "https://www.instagram.com/joia.solucoes";
export const INSTAGRAM_HANDLE = "@joia.solucoes";
export const SITE_URL = "https://www.joiasolucoes.com.br";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { label: "Soluções", to: "/solucoes" as const },
  { label: "Como atuamos", to: "/" as const, hash: "como-atuamos" },
  { label: "Cases", to: "/cases" as const },
  { label: "Sobre", to: "/sobre" as const },
  { label: "Contato", to: "/contato" as const },
];

export const PILLARS = [
  {
    id: "estrategia",
    icon: "compass",
    title: "Estratégia, processos e dados",
    description:
      "Entendemos a operação, organizamos processos e transformamos informações dispersas em indicadores úteis para a tomada de decisão.",
    items: [
      "Diagnóstico empresarial",
      "Mapeamento de processos",
      "Dashboards",
      "Business Intelligence",
      "Indicadores",
      "Estruturação operacional",
    ],
    problems: [
      "Decisões tomadas sem indicadores confiáveis",
      "Informações espalhadas em planilhas e mensagens",
      "Processos que ninguém consegue descrever por completo",
    ],
    solutions: [
      "Diagnóstico da operação com pontos de perda mapeados",
      "Redesenho de processos e responsabilidades",
      "Painéis de acompanhamento gerencial",
    ],
    audience:
      "Empresas que já sentem o problema, mas ainda não sabem por onde começar a organizar a operação.",
    tech: ["Power BI", "Supabase", "APIs", "Planilhas estruturadas"],
  },
  {
    id: "sistemas",
    icon: "layers",
    title: "Sistemas e produtos digitais",
    description:
      "Construímos plataformas e sistemas sob medida para necessidades que ferramentas de prateleira não conseguem resolver.",
    items: [
      "Sistemas web",
      "SaaS",
      "Portais internos",
      "Aplicações de gestão",
      "APIs",
      "Landing pages",
      "Sites institucionais",
    ],
    problems: [
      "Controles paralelos que ninguém consegue auditar",
      "Ferramenta de mercado que não cabe no processo real",
      "Presença digital que não comunica o que a empresa faz",
    ],
    solutions: [
      "Sistemas web sob medida para o fluxo da empresa",
      "Portais internos e áreas de acompanhamento",
      "Sites e landing pages com estrutura de conversão",
    ],
    audience:
      "Negócios cujo processo é o diferencial e não cabe em um software genérico.",
    tech: ["React", "TypeScript", "Supabase", "APIs"],
  },
  {
    id: "automacao",
    icon: "workflow",
    title: "Automação e inteligência artificial",
    description:
      "Conectamos ferramentas, automatizamos tarefas e aplicamos IA onde ela produz ganho real de tempo, controle e eficiência.",
    items: [
      "n8n",
      "Integrações",
      "Workflows",
      "Assistentes",
      "Processamento de dados",
      "Automação de rotinas",
      "IA aplicada aos negócios",
    ],
    problems: [
      "Equipe copiando dados de um sistema para outro",
      "Rotinas repetitivas consumindo horas todos os dias",
      "Sistemas que não conversam entre si",
    ],
    solutions: [
      "Workflows que conectam sistemas existentes",
      "Automação de rotinas administrativas e comerciais",
      "IA aplicada a triagem, leitura e organização de informação",
    ],
    audience:
      "Operações com volume repetitivo e ferramentas desconectadas.",
    tech: ["n8n", "OpenAI", "APIs", "Supabase"],
  },
  {
    id: "observabilidade",
    icon: "activity",
    title: "Observabilidade e confiabilidade",
    description:
      "Criamos visibilidade sobre ambientes, aplicações e serviços para que a tecnologia seja acompanhada com clareza.",
    items: [
      "Zabbix",
      "Grafana",
      "Dashboards operacionais",
      "Monitoração",
      "Observabilidade",
      "Indicadores de disponibilidade",
      "Capacidade e desempenho",
    ],
    problems: [
      "O cliente avisa da indisponibilidade antes da equipe",
      "Nenhuma visão de capacidade ou desempenho",
      "Tecnologia funcionando às cegas",
    ],
    solutions: [
      "Monitoração de infraestrutura, aplicações e serviços",
      "Painéis operacionais e alertas úteis",
      "Indicadores de disponibilidade e desempenho",
    ],
    audience:
      "Empresas que dependem de sistemas em operação contínua.",
    tech: ["Zabbix", "Grafana", "APIs"],
  },
];

export const METHOD_STEPS = [
  {
    num: "01",
    title: "Enxergar",
    text: "Entendemos a operação, as dores, as pessoas envolvidas e onde o negócio perde tempo ou dinheiro.",
  },
  {
    num: "02",
    title: "Priorizar",
    text: "Identificamos o que gera maior impacto e definimos uma solução realista.",
  },
  {
    num: "03",
    title: "Construir",
    text: "Desenvolvemos processos, automações, sistemas, dashboards ou experiências digitais.",
  },
  {
    num: "04",
    title: "Medir",
    text: "Acompanhamos o resultado, ajustamos a solução e buscamos novas oportunidades.",
  },
];

export const CASES = [
  {
    slug: "h2o-distribuidora",
    name: "H2O Distribuidora",
    category: "Dados, gestão e processos",
    description:
      "Organização de informações comerciais, desenvolvimento de indicadores e apoio à evolução dos processos de gestão.",
    deliveries: [
      "Estruturação de dados",
      "Dashboards",
      "Análise de processos",
      "Acompanhamento gerencial",
    ],
    context:
      "Distribuidora com rotina comercial intensa e informações registradas em diferentes lugares.",
    challenge:
      "Reunir dados comerciais dispersos e dar à gestão uma visão única para acompanhar a operação.",
    approach:
      "Levantamento dos processos existentes, entendimento das rotinas da equipe e definição do que precisava ser medido antes de qualquer ferramenta.",
    solution:
      "Estruturação das bases de informação, construção de indicadores e painéis de acompanhamento, além do apoio à revisão dos processos de gestão.",
    areas: ["Comercial", "Gestão", "Processos"],
    capabilities: ["Estruturação de dados", "Business Intelligence", "Dashboards"],
    status: "Projeto em evolução contínua junto à gestão.",
  },
  {
    slug: "masterflow",
    name: "MasterFlow",
    category: "Sistema web sob medida",
    description:
      "Construção de uma plataforma digital para organizar e acompanhar fluxos comerciais e operacionais.",
    deliveries: [
      "Sistema web",
      "Digitalização de processos",
      "Gestão de fluxos",
      "Evolução contínua",
    ],
    context:
      "Fluxos comerciais e operacionais controlados de forma manual e distribuída.",
    challenge:
      "Digitalizar o fluxo de trabalho em uma plataforma única, sem engessar a forma como a operação realmente funciona.",
    approach:
      "Mapeamento do fluxo real, definição de etapas e permissões e construção iterativa junto às pessoas que usam o sistema.",
    solution:
      "Plataforma web sob medida para registrar, acompanhar e organizar os fluxos comerciais e operacionais.",
    areas: ["Comercial", "Operação"],
    capabilities: ["React", "TypeScript", "Supabase", "APIs"],
    status: "Plataforma em uso e em evolução contínua.",
  },
  {
    slug: "granel-piscinas",
    name: "Granel Piscinas",
    category: "Presença digital",
    description:
      "Criação de uma experiência digital institucional para apresentar serviços, fortalecer posicionamento e facilitar novos contatos.",
    deliveries: [
      "Site institucional",
      "Experiência responsiva",
      "Posicionamento digital",
      "Estrutura de conversão",
    ],
    context:
      "Empresa consolidada no atendimento presencial, com presença digital limitada.",
    challenge:
      "Traduzir os serviços e o posicionamento da empresa em uma experiência digital clara e responsiva.",
    approach:
      "Organização da narrativa institucional, definição da hierarquia de conteúdo e construção de um caminho simples até o contato.",
    solution:
      "Site institucional responsivo, com apresentação dos serviços e estrutura pensada para gerar novos contatos.",
    areas: ["Marketing", "Comercial"],
    capabilities: ["React", "Experiência responsiva", "SEO básico"],
    status: "Site publicado e disponível para evoluções.",
  },
  {
    slug: "helpsmart",
    name: "Help Smart",
    category: "Sistema sob medida",
    description:
      "Sistema de gestão personalizado para assistência técnica: produtos, vendas e ordens de serviço em uma única plataforma.",
    deliveries: [
      "Gestão de produtos",
      "Controle de vendas",
      "Ordens de serviço",
      "Acessos por perfil",
    ],
    context:
      "Assistência técnica precisando controlar produtos, vendas e ordens de serviço em um só lugar.",
    challenge:
      "Nenhum sistema de prateleira encaixava na forma como a operação realmente funciona: sempre faltava uma etapa ou sobrava complexidade.",
    approach:
      "Mapeamento do fluxo real da assistência, definição das etapas de atendimento e construção sob medida, validando cada módulo com quem usa no dia a dia.",
    solution:
      "Plataforma web personalizada que unifica catálogo de produtos, registro de vendas e o ciclo completo das ordens de serviço, com login e permissões por perfil.",
    areas: ["Operação", "Comercial", "Atendimento"],
    capabilities: ["React", "TypeScript", "Supabase", "Autenticação"],
    status: "Sistema em uso, com evoluções contínuas.",
  },
];

export const FAQ = [
  {
    q: "A JoIA trabalha com sistemas sob medida?",
    a: "Sim. Quando o processo da empresa é o diferencial e nenhuma ferramenta de prateleira acompanha, construímos sistemas web sob medida para aquele fluxo específico.",
  },
  {
    q: "Vocês também criam sites e landing pages?",
    a: "Sim. Sites institucionais e landing pages fazem parte do pilar de sistemas e produtos digitais, sempre com estrutura de conteúdo e conversão pensada junto ao negócio.",
  },
  {
    q: "É possível automatizar processos que hoje usam planilhas?",
    a: "Na maioria dos casos, sim. Antes de automatizar, mapeamos o processo para garantir que a automação resolva a causa e não apenas acelere um fluxo que precisa ser revisto.",
  },
  {
    q: "A JoIA trabalha com empresas pequenas?",
    a: "Sim. O ponto de partida é o problema, não o porte. Projetos menores costumam começar por um diagnóstico e uma entrega objetiva de alto impacto.",
  },
  {
    q: "Como funciona o diagnóstico inicial?",
    a: "Conversamos sobre a operação, entendemos rotinas, responsabilidades e pontos de perda e devolvemos uma leitura do que pode ser priorizado. A partir daí, definimos juntos o caminho.",
  },
  {
    q: "Vocês trabalham com projetos contínuos?",
    a: "Sim. Parte dos trabalhos evolui de forma contínua, com ajustes, novas entregas e acompanhamento de indicadores ao longo do tempo.",
  },
  {
    q: "A JoIA também atua com observabilidade?",
    a: "Sim. Monitoração e observabilidade de infraestrutura, aplicações e serviços são um dos quatro pilares de atuação.",
  },
];

export const SCANNER_QUESTIONS = [
  {
    id: "q1",
    text: "Sua equipe executa tarefas repetitivas manualmente?",
    invert: false,
  },
  {
    id: "q2",
    text: "Seus dados ficam espalhados em planilhas, mensagens e sistemas diferentes?",
    invert: false,
  },
  {
    id: "q3",
    text: "Você consegue acompanhar os principais indicadores do negócio facilmente?",
    invert: true,
  },
  { id: "q4", text: "Seus sistemas conversam entre si?", invert: true },
  {
    id: "q5",
    text: "Existem processos que dependem exclusivamente de uma pessoa?",
    invert: false,
  },
  {
    id: "q6",
    text: "Você possui visibilidade sobre disponibilidade e desempenho da sua tecnologia?",
    invert: true,
  },
];
