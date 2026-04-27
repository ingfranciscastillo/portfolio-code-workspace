# Portfolio Code Workspace

Interactive portfolio with IDE-style code editor.

![About section](/screenshots/about.png)
![Contact section](/screenshots/contact.png)
![Experience section](/screenshots/experience.png)
![Projects section](/screenshots/projects.png)
![Skills section](/screenshots/skills.png)
![Light theme](/screenshots/light-theme.png)

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — Full-stack React framework
- [React 19](https://react.dev) — UI library
- [Tailwind CSS v4](https://tailwindcss.com) — Styling
- [Radix UI](https://radix-ui.com) — Accessible UI components
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Programming font

## Getting Started

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Features

- **Portfolio Editor** — IDE-style code editor with syntax highlighting
- **Accessible UI** — Built with Radix UI primitives
- **Dark Mode** — Full theme support
- **Responsive** — Mobile-first design

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── portfolio/  # Portfolio-specific components
├── routes/         # File-based routing
├── data/           # Data modules
├── styles.css      # Tailwind + custom themes
└── router.tsx      # Router configuration
```

## License

MIT
