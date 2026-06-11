# Portfolio Code Workspace

> Interactive portfolio with IDE-style code editor.

[![Live Demo](https://img.shields.io/badge/Live-Demo-1e3a8a?style=for-the-badge&logo=terminal)](https://portfolio-code-workspace.vercel.app/)
[![behance](https://img.shields.io/badge/behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/ingfranciscastillo)
[![github_stars](https://img.shields.io/github/stars/ingfranciscastillo/ai-resume-analyzer?style=for-the-badge)](https://github.com/ingfranciscastillo/portfolio-code-workspace/stargazers)
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![linkedin](https://img.shields.io/badge/linkedin-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ingfranciscastillo)
[![last_commit](https://img.shields.io/github/last-commit/ingfranciscastillo/ai-resume-analyzer?style=for-the-badge)](https://github.com/ingfranciscastillo/portfolio-code-workspace/commits/main)

<!-- README-I18N:START -->

**English** | [Español](./README.es.md)

<!-- README-I18N:END -->

![Preview](/screenshots/about.png)

## What This Does

A portfolio template that looks and feels like a code editor. Navigate through resume sections as if browsing files in an IDE — complete with syntax highlighting, tabs, a file explorer, and a command palette.

## Demo

[Live Demo](https://portfolio-code-workspace.vercel.app/)

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — Full-stack React framework
- [React 19](https://react.dev) — UI library
- [Tailwind CSS v4](https://tailwindcss.com) — Styling
- [Radix UI](https://radix-ui.com) — Accessible UI components
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Programming font

## Features

- **Portfolio Editor** — IDE-style code editor with syntax highlighting
- **Command Palette** — Quick file access with Ctrl+P
- **Theme Toggle** — Dark and light mode support
- **Responsive** — Mobile-first design with sidebar drawer on small screens
- **Accessible UI** — Built with Radix UI primitives

## How It Works

The editor reads from a `resume.ts` data file structured around [JSON Resume](https://jsonresume.org/) schema. Content is rendered as code-like syntax via `code-content.tsx`, which transforms each section into highlighted "files":

- `about.ts` — Professional summary and public profiles
- `experience.tsx` — Work history rendered as JSX-like timeline
- `projects.json` — Featured projects in JSON format
- `skills.ts` — Technologies grouped by domain
- `contact.md` — Contact channels and links

State (open tabs, active file, theme preference) persists to `localStorage`.

## Getting Started

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (Button, Command, Dialog, HoverCard, Sheet)
│   └── portfolio/  # EditorPortfolio, code-content
├── routes/          # File-based routing (TanStack Start)
├── data/            # resume.ts (JSON Resume data)
├── styles.css       # Tailwind v4 + custom themes with oklch colors
└── router.tsx       # Router configuration
```

## Support

If you find this project useful, consider supporting my work!

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-violet.png)](https://www.buymeacoffee.com/ingfranciscastillo)

---

MIT License — feel free to use this as a template for your own terminal portfolio.
