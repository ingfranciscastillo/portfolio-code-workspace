export type ResumeProject = {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  url: string;
};

export const resume = {
  basics: {
    name: "Francis Castillo",
    label: "Semi Senior Full Stack Developer",
    image: "",
    email: "franciscastillodev@proton.me",
    phone: "+1 809 000 000",
    url: "https://franciscode.dev",
    summary: "Desarrollador web enfocado en construir productos interactivos con Next.js, IA y sistemas modernos. Transformo ideas complejas en experiencias claras, rápidas y bien diseñadas, cuidando tanto la lógica como la interfaz.",
    location: {
      city: "Republica Dominicana",
      countryCode: "ES",
      region: "Remote-first",
    },
    profiles: [
      { network: "GitHub", username: "ingfranciscastillo", url: "https://github.com/ingfranciscastillo" },
      { network: "LinkedIn", username: "ingfranciscastillo", url: "https://linkedin.com/in/ingfranciscastillo" },
      { network: "X", username: "ingfranciscas", url: "https://x.com/ingfranciscas" },
    ],
  },
  work: [
    {
      name: "Northstar Labs",
      position: "Lead Frontend Engineer",
      url: "https://northstar.example",
      startDate: "2022-01",
      endDate: "Present",
      summary: "Liderazgo técnico para una plataforma SaaS de analytics en tiempo real.",
      highlights: [
        "Reduje el tiempo de carga inicial un 42% con SSR, code splitting y optimización de datos.",
        "Diseñé un sistema de componentes usado por cinco squads de producto.",
        "Mentoricé a seis desarrolladores en arquitectura frontend y accesibilidad.",
      ],
    },
    {
      name: "Orbit Commerce",
      position: "Frontend Engineer",
      url: "https://orbit.example",
      startDate: "2019-06",
      endDate: "2021-12",
      summary: "Construcción de experiencias e-commerce para marcas internacionales.",
      highlights: [
        "Implementé checkout modular con experimentación A/B.",
        "Mejoré Core Web Vitals hasta superar el percentil 90 en mobile.",
        "Colaboré con diseño para crear patrones UI reutilizables.",
      ],
    },
  ],
  projects: [
    {
      name: "DevFlow",
      description: "Dashboard técnico para observar despliegues, errores y rendimiento en un solo flujo.",
      highlights: ["Streaming de eventos", "Alertas inteligentes", "UI densa y accesible"],
      keywords: ["React", "TypeScript", "TanStack", "Observability"],
      url: "https://devflow.example",
    },
    {
      name: "Schema Studio",
      description: "Editor visual para documentar APIs y contratos JSON con validación colaborativa.",
      highlights: ["JSON Schema", "Versionado", "Diff visual"],
      keywords: ["TypeScript", "Monaco-like UX", "Design Systems"],
      url: "https://schemastudio.example",
    },
    {
      name: "Pulse Kit",
      description: "Sistema de componentes para equipos que necesitan prototipar herramientas internas rápido.",
      highlights: ["Tokens semánticos", "Accesibilidad", "Documentación viva"],
      keywords: ["React", "CSS", "A11y", "DX"],
      url: "https://pulsekit.example",
    },
  ] satisfies ResumeProject[],
  skills: [
    { name: "Frontend", keywords: ["React", "TypeScript", "TanStack", "Next.js", "Vite"] },
    { name: "UI Systems", keywords: ["Design tokens", "Accessibility", "Radix UI", "Tailwind CSS"] },
    { name: "Product Engineering", keywords: ["Performance", "Experimentation", "Analytics", "DX"] },
    { name: "Backend fluency", keywords: ["Node.js", "PostgreSQL", "REST", "Edge runtimes"] },
  ],
};

export type PortfolioFileId = "about" | "experience" | "projects" | "skills" | "contact";

export type PortfolioFile = {
  id: PortfolioFileId;
  path: string;
  language: "typescript" | "tsx" | "json" | "markdown";
  description: string;
};

export const portfolioFiles: PortfolioFile[] = [
  { id: "about", path: "/about.ts", language: "typescript", description: "Resumen profesional y perfiles públicos" },
  { id: "experience", path: "/experience.tsx", language: "tsx", description: "Timeline laboral renderizado como JSX" },
  { id: "projects", path: "/projects.json", language: "json", description: "Proyectos destacados en formato JSON" },
  { id: "skills", path: "/skills.ts", language: "typescript", description: "Tecnologías agrupadas por dominio" },
  { id: "contact", path: "/contact.md", language: "markdown", description: "Canales de contacto y enlaces" },
];
