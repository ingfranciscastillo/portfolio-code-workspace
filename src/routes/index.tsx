import { EditorPortfolio } from '#/components/portfolio/EditorPortfolio'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Francis Castillo — Developer Portfolio' },
      {
        name: 'description',
        content:
          'Portfolio interactivo tipo editor de código basado en JSON Resume Schema.',
      },
      {
        property: 'og:title',
        content: 'Francis Castillo — Developer Portfolio',
      },
      {
        property: 'og:description',
        content:
          'Explora experiencia, proyectos, skills y contacto como archivos de un editor moderno.',
      },
    ],
  }),
  component: Index,
})

function Index() {
  return <EditorPortfolio />
}
