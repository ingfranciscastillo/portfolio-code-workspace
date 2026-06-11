# Portfolio Code Workspace

> Portfolio interactivo con estilo editor de código.

[![Live Demo](https://img.shields.io/badge/Live-Demo-1e3a8a?style=for-the-badge&logo=terminal)](https://portfolio-code-workspace.vercel.app/)
[![behance](https://img.shields.io/badge/behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/ingfranciscastillo)
[![github_stars](https://img.shields.io/github/stars/ingfranciscastillo/ai-resume-analyzer?style=for-the-badge)](https://github.com/ingfranciscastillo/portfolio-code-workspace/stargazers)
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![linkedin](https://img.shields.io/badge/linkedin-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ingfranciscastillo)
[![last_commit](https://img.shields.io/github/last-commit/ingfranciscastillo/ai-resume-analyzer?style=for-the-badge)](https://github.com/ingfranciscastillo/portfolio-code-workspace/commits/main)

<!-- README-I18N:START -->

[English](./README.md) | **Español**

<!-- README-I18N:END -->

![Preview](/screenshots/about.png)

## What This Does

Una plantilla de portfolio que luce y se siente como un editor de código. Navega por las secciones del currículum como si exploraras archivos en un IDE — con highlight de sintaxis, tabs, explorador de archivos y paleta de comandos.

## Demo

[Live Demo](https://portfolio-code-workspace.vercel.app/)

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — Framework React full-stack
- [React 19](https://react.dev) — Librería UI
- [Tailwind CSS v4](https://tailwindcss.com) — Estilos
- [Radix UI](https://radix-ui.com) — Componentes UI accesibles
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Fuente de programación

## Features

- **Portfolio Editor** — Editor estilo IDE con highlight de sintaxis
- **Command Palette** — Acceso rápido a archivos con Ctrl+P
- **Theme Toggle** — Soporte para modo oscuro y claro
- **Responsive** — Diseño mobile-first con drawer lateral en pantallas pequeñas
- **Accessible UI** — Construido con componentes Radix UI

## How It Works

El editor lee desde un archivo de datos `resume.ts` estructurado alrededor del esquema [JSON Resume](https://jsonresume.org/). El contenido se renderiza como sintaxis similar a código vía `code-content.tsx`, que transforma cada sección en "archivos" con highlight:

- `about.ts` — Resumen profesional y perfiles públicos
- `experience.tsx` — Historial laboral renderizado como timeline JSX-like
- `projects.json` — Proyectos destacados en formato JSON
- `skills.ts` — Tecnologías agrupadas por dominio
- `contact.md` — Canales de contacto y enlaces

El estado (tabs abiertos, archivo activo, preferencia de tema) persiste en `localStorage`.

## Getting Started

```bash
pnpm install
pnpm dev
```

Build para producción:

```bash
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Componentes UI reutilizables (Button, Command, Dialog, HoverCard, Sheet)
│   └── portfolio/   # EditorPortfolio, code-content
├── routes/          # Enrutamiento basado en archivos (TanStack Start)
├── data/            # resume.ts (datos JSON Resume)
├── styles.css       # Tailwind v4 + temas personalizados con colores oklch
└── router.tsx       # Configuración del router
```

## Support

Si este proyecto te resulta útil, considera apoyar mi trabajo!

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-violet.png)](https://www.buymeacoffee.com/ingfranciscastillo)

---

MIT License — siéntete libre de usar esto como plantilla para tu propio portfolio tipo terminal.
