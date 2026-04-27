import { useEffect, useMemo, useState } from 'react'
import {
  Braces,
  ChevronDown,
  Code2,
  FileCode2,
  FileJson,
  FileText,
  FolderOpen,
  Menu,
  Moon,
  Search,
  Sun,
  Terminal,
  X,
} from 'lucide-react'

import { getCodeLines } from '@/components/portfolio/code-content'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  portfolioFiles,
  type PortfolioFile,
  type PortfolioFileId,
} from '@/data/resume'
import { cn } from '@/lib/utils'

type Theme = 'dark' | 'light'

type PersistedEditorState = {
  openTabs: PortfolioFileId[]
  activeFile: PortfolioFileId
  theme: Theme
}

const storageKey = 'portfolio-editor-state'
const defaultState: PersistedEditorState = {
  openTabs: ['about', 'experience', 'projects'],
  activeFile: 'about',
  theme: 'dark',
}

const fileIconMap = {
  typescript: FileCode2,
  tsx: Code2,
  json: FileJson,
  markdown: FileText,
}

type FilePreview = {
  summary: string
  quickLinks: { label: string; target: PortfolioFileId }[]
}

const filePreviewMap: Record<PortfolioFileId, FilePreview> = {
  about: {
    summary:
      'Resumen profesional, rol actual, bio y perfiles públicos del portfolio.',
    quickLinks: [
      { label: 'Experiencia', target: 'experience' },
      { label: 'Contacto', target: 'contact' },
    ],
  },
  experience: {
    summary:
      'Timeline laboral en formato JSX-like con roles, compañías e impacto medible.',
    quickLinks: [
      { label: 'Proyectos', target: 'projects' },
      { label: 'Skills', target: 'skills' },
    ],
  },
  projects: {
    summary:
      'Lista JSON de proyectos destacados, descripción, tecnologías y enlaces externos.',
    quickLinks: [
      { label: 'Skills', target: 'skills' },
      { label: 'Contacto', target: 'contact' },
    ],
  },
  skills: {
    summary:
      'Tecnologías agrupadas por frontend, sistemas UI, producto y backend fluency.',
    quickLinks: [
      { label: 'Experiencia', target: 'experience' },
      { label: 'Proyectos', target: 'projects' },
    ],
  },
  contact: {
    summary:
      'Canales para iniciar conversación: email, web y perfiles profesionales.',
    quickLinks: [
      { label: 'About', target: 'about' },
      { label: 'Proyectos', target: 'projects' },
    ],
  },
}

function readStoredState(): PersistedEditorState {
  if (typeof window === 'undefined') return defaultState

  try {
    const stored = window.localStorage.getItem(storageKey)
    if (!stored) return defaultState
    const parsed = JSON.parse(stored) as Partial<PersistedEditorState>
    const validTabs = parsed.openTabs?.filter((tab): tab is PortfolioFileId =>
      portfolioFiles.some((file) => file.id === tab),
    )
    const activeFile = portfolioFiles.some(
      (file) => file.id === parsed.activeFile,
    )
      ? parsed.activeFile
      : (validTabs?.[0] ?? defaultState.activeFile)

    return {
      openTabs: validTabs?.length ? validTabs : defaultState.openTabs,
      activeFile: activeFile as PortfolioFileId,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
    }
  } catch {
    return defaultState
  }
}

export function EditorPortfolio() {
  const [state, setState] = useState<PersistedEditorState>(defaultState)
  const [commandOpen, setCommandOpen] = useState(false)
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false)

  useEffect(() => {
    setState(readStoredState())
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'p') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const activeFile =
    portfolioFiles.find((file) => file.id === state.activeFile) ??
    portfolioFiles[0]
  const openFiles = state.openTabs
    .map((tab) => portfolioFiles.find((file) => file.id === tab))
    .filter((file): file is PortfolioFile => Boolean(file))

  const openFile = (fileId: PortfolioFileId) => {
    setState((current) => ({
      ...current,
      openTabs: current.openTabs.includes(fileId)
        ? current.openTabs
        : [...current.openTabs, fileId],
      activeFile: fileId,
    }))
    setMobileExplorerOpen(false)
    setCommandOpen(false)
  }

  const closeTab = (fileId: PortfolioFileId) => {
    setState((current) => {
      const nextTabs = current.openTabs.filter((tab) => tab !== fileId)
      if (nextTabs.length === 0) {
        return { ...current, openTabs: ['about'], activeFile: 'about' }
      }

      const closedActive = current.activeFile === fileId
      return {
        ...current,
        openTabs: nextTabs,
        activeFile: closedActive
          ? nextTabs[Math.max(0, current.openTabs.indexOf(fileId) - 1)]
          : current.activeFile,
      }
    })
  }

  const toggleTheme = () => {
    setState((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }))
  }

  return (
    <main
      className={cn(
        'portfolio-editor min-h-screen font-mono',
        state.theme === 'light' && 'theme-light',
      )}
    >
      <div className="flex h-screen flex-col overflow-hidden bg-editor-bg text-editor-fg">
        <TopBar
          theme={state.theme}
          onToggleTheme={toggleTheme}
          onOpenCommand={() => setCommandOpen(true)}
          onOpenExplorer={() => setMobileExplorerOpen(true)}
        />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="hidden w-72 shrink-0 border-r border-editor-border bg-editor-sidebar md:block">
            <FileExplorer activeFile={activeFile.id} openFile={openFile} />
          </aside>

          <section className="flex min-w-0 flex-1 flex-col bg-editor-panel">
            <EditorTabs
              files={openFiles}
              activeFile={activeFile.id}
              onSelect={openFile}
              onClose={closeTab}
            />
            <CodeViewer file={activeFile} />
          </section>
        </div>

        <StatusBar
          activeFile={activeFile}
          theme={state.theme}
          openTabs={openFiles.length}
        />
      </div>

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        openFile={openFile}
      />

      <Sheet open={mobileExplorerOpen} onOpenChange={setMobileExplorerOpen}>
        <SheetContent
          side="left"
          className="w-[86vw] border-editor-border bg-editor-sidebar p-0 text-editor-fg sm:max-w-sm"
        >
          <SheetTitle className="sr-only">Explorador de archivos</SheetTitle>
          <FileExplorer activeFile={activeFile.id} openFile={openFile} />
        </SheetContent>
      </Sheet>
    </main>
  )
}

function TopBar({
  theme,
  onToggleTheme,
  onOpenCommand,
  onOpenExplorer,
}: {
  theme: Theme
  onToggleTheme: () => void
  onOpenCommand: () => void
  onOpenExplorer: () => void
}) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-editor-border bg-editor-topbar px-2 md:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-editor-muted hover:bg-editor-hover md:hidden"
          onClick={onOpenExplorer}
          aria-label="Abrir explorador"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm font-semibold text-editor-fg">
          <Terminal className="h-4 w-4 text-code-function" />
          <span className="truncate">portfolio.code-workspace</span>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-md border border-editor-border bg-editor-panel px-3 py-1.5 text-xs text-editor-muted sm:flex">
        <Search className="h-3.5 w-3.5" />
        <button
          onClick={onOpenCommand}
          className="text-left outline-none hover:text-editor-fg"
        >
          Open file
        </button>
        <kbd className="rounded border border-editor-border px-1.5 py-0.5 text-[10px]">
          Ctrl P
        </kbd>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleTheme}
        className="h-8 w-8 text-editor-muted hover:bg-editor-hover"
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </header>
  )
}

function FileExplorer({
  activeFile,
  openFile,
}: {
  activeFile: PortfolioFileId
  openFile: (fileId: PortfolioFileId) => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-editor-border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-editor-muted">
        Explorer
      </div>
      <div className="px-2 py-3">
        <div className="mb-2 flex items-center gap-1.5 px-2 text-xs font-semibold uppercase text-editor-muted">
          <ChevronDown className="h-3.5 w-3.5" />
          <FolderOpen className="h-3.5 w-3.5 text-code-string" />
          resume.schema
        </div>
        <div className="space-y-1">
          {portfolioFiles.map((file) => {
            const Icon = fileIconMap[file.language]
            const preview = filePreviewMap[file.id]
            return (
              <HoverCard key={file.id} openDelay={220} closeDelay={80}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => openFile(file.id)}
                    title={file.description}
                    className={cn(
                      'group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-editor-muted outline-none transition-colors hover:bg-editor-hover hover:text-editor-fg focus-visible:bg-editor-hover',
                      activeFile === file.id &&
                        'bg-editor-active text-editor-fg',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-code-function" />
                    <span className="truncate">{file.path.slice(1)}</span>
                    <span className="ml-auto hidden max-w-20 truncate text-[10px] text-code-comment group-hover:block">
                      {file.language}
                    </span>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  align="start"
                  className="w-80 border-editor-border bg-editor-panel p-0 text-editor-fg shadow-lg"
                >
                  <div className="border-b border-editor-border px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon className="h-4 w-4 text-code-function" />
                      <span>{file.path}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-editor-muted">
                      {preview.summary}
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-code-comment">
                      Quick links
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {preview.quickLinks.map((link) => (
                        <button
                          key={`${file.id}-${link.target}`}
                          onClick={() => openFile(link.target)}
                          className="rounded-sm border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-muted transition-colors hover:bg-editor-hover hover:text-editor-fg"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EditorTabs({
  files,
  activeFile,
  onSelect,
  onClose,
}: {
  files: PortfolioFile[]
  activeFile: PortfolioFileId
  onSelect: (fileId: PortfolioFileId) => void
  onClose: (fileId: PortfolioFileId) => void
}) {
  return (
    <div className="flex h-11 shrink-0 overflow-x-auto border-b border-editor-border bg-editor-topbar editor-scrollbar">
      {files.map((file) => {
        const Icon = fileIconMap[file.language]
        return (
          <div
            key={file.id}
            className={cn(
              'flex min-w-40 max-w-56 items-center border-r border-editor-border text-sm text-editor-muted',
              activeFile === file.id && 'bg-editor-panel text-editor-fg',
            )}
          >
            <button
              onClick={() => onSelect(file.id)}
              className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left outline-none"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-code-function" />
              <span className="truncate">{file.path.slice(1)}</span>
            </button>
            <button
              onClick={() => onClose(file.id)}
              className="mr-2 rounded-sm p-1 hover:bg-editor-hover"
              aria-label={`Cerrar ${file.path}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

function CodeViewer({ file }: { file: PortfolioFile }) {
  const lines = useMemo(() => getCodeLines(file.id), [file.id])
  const activeLine = file.id === 'about' ? 4 : file.id === 'experience' ? 8 : 6

  return (
    <div className="editor-scrollbar relative min-h-0 flex-1 overflow-auto bg-editor-panel">
      <div className="min-w-max px-0 py-5 text-[13px] leading-6 sm:text-sm">
        {lines.map((line, index) => (
          <div
            key={`${file.id}-${index}`}
            className={cn(
              'grid grid-cols-[3.5rem_minmax(0,1fr)] pr-8',
              index + 1 === activeLine && 'bg-editor-line',
              file.id === 'about' && index === 3 && 'typing-line',
            )}
          >
            <span className="select-none border-r border-transparent pr-4 text-right text-editor-line-number">
              {index + 1}
            </span>
            <code className="relative whitespace-pre pl-4 text-editor-fg">
              {line}
              {index + 1 === activeLine && <span className="editor-cursor" />}
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommandPalette({
  open,
  onOpenChange,
  openFile,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openFile: (fileId: PortfolioFileId) => void
}) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar archivo por nombre o tipo..." />
      <CommandList>
        <CommandEmpty>No se encontró ningún archivo.</CommandEmpty>
        <CommandGroup heading="resume.schema">
          {portfolioFiles.map((file) => {
            const Icon = fileIconMap[file.language]
            return (
              <CommandItem
                key={file.id}
                value={`${file.path} ${file.description}`}
                onSelect={() => openFile(file.id)}
              >
                <Icon className="text-code-function" />
                <span>{file.path}</span>
                <CommandShortcut>{file.language}</CommandShortcut>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

function StatusBar({
  activeFile,
  theme,
  openTabs,
}: {
  activeFile: PortfolioFile
  theme: Theme
  openTabs: number
}) {
  return (
    <footer className="flex h-7 shrink-0 items-center justify-between gap-3 bg-editor-status px-3 text-[11px] text-editor-status-fg">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex items-center gap-1">
          <Braces className="h-3 w-3" /> JSON Resume
        </span>
        <span className="hidden sm:inline">read-only</span>
        <span className="truncate">{activeFile.path}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span>Ln 4, Col 12</span>
        <span>{openTabs} tabs</span>
        <span>{theme}</span>
      </div>
    </footer>
  )
}
