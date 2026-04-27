import type { ReactNode } from 'react'
import { resume, type PortfolioFileId } from '@/data/resume'

const T = ({ children }: { children: ReactNode }) => (
  <span className="text-code-keyword">{children}</span>
)
const S = ({ children }: { children: ReactNode }) => (
  <span className="text-code-string">{children}</span>
)
const P = ({ children }: { children: ReactNode }) => (
  <span className="text-code-property">{children}</span>
)
const C = ({ children }: { children: ReactNode }) => (
  <span className="text-code-comment">{children}</span>
)
const N = ({ children }: { children: ReactNode }) => (
  <span className="text-code-number">{children}</span>
)
const F = ({ children }: { children: ReactNode }) => (
  <span className="text-code-function">{children}</span>
)

const quote = (value: string) => <S>&quot;{value}&quot;</S>

function aboutLines() {
  const { basics } = resume
  return [
    <>
      <C>// JSON Resume: basics</C>
    </>,
    <>
      <T>export</T> <T>const</T> <P>about</P> = {'{'}
    </>,
    <>
      {' '}
      <P>name</P>: {quote(basics.name)},
    </>,
    <>
      {' '}
      <P>role</P>: {quote(basics.label)},
    </>,
    <>
      {' '}
      <P>location</P>:{' '}
      {quote(`${basics.location.city}, ${basics.location.region}`)},
    </>,
    <>
      {' '}
      <P>bio</P>: {quote(basics.summary)},
    </>,
    <>
      {' '}
      <P>profiles</P>: [
    </>,
    ...basics.profiles.flatMap((profile) => [
      <>
        {' '}
        {'{'} <P>network</P>: {quote(profile.network)}, <P>url</P>:{' '}
        {quote(profile.url)} {'}'},
      </>,
    ]),
    <> ],</>,
    <>
      {' '}
      <P>availableFor</P>: [<S>&quot;Product teams&quot;</S>,{' '}
      <S>&quot;Frontend architecture&quot;</S>,{' '}
      <S>&quot;Design systems&quot;</S>],
    </>,
    <>
      {'}'} <T>as const</T>;
    </>,
  ]
}

function experienceLines() {
  return [
    <>
      <T>export</T> <T>function</T> <F>ExperienceTimeline</F>() {'{'}
    </>,
    <>
      {' '}
      <T>return</T> (
    </>,
    <>
      {' '}
      <span className="text-code-tag">&lt;Timeline&gt;</span>
    </>,
    ...resume.work.flatMap((job) => [
      <>
        {' '}
        <span className="text-code-tag">&lt;Role</span> <P>company</P>=
        <S>&quot;{job.name}&quot;</S> <P>title</P>=
        <S>&quot;{job.position}&quot;</S>
        <span className="text-code-tag">&gt;</span>
      </>,
      <>
        {' '}
        <span className="text-code-tag">&lt;Period&gt;</span>
        {job.startDate} — {job.endDate}
        <span className="text-code-tag">&lt;/Period&gt;</span>
      </>,
      <>
        {' '}
        <span className="text-code-tag">&lt;Summary&gt;</span>
        {job.summary}
        <span className="text-code-tag">&lt;/Summary&gt;</span>
      </>,
      <>
        {' '}
        <span className="text-code-tag">&lt;Highlights&gt;</span>
      </>,
      ...job.highlights.map((highlight) => (
        <>
          {' '}
          <span className="text-code-tag">&lt;Item&gt;</span>
          {highlight}
          <span className="text-code-tag">&lt;/Item&gt;</span>
        </>
      )),
      <>
        {' '}
        <span className="text-code-tag">&lt;/Highlights&gt;</span>
      </>,
      <>
        {' '}
        <span className="text-code-tag">&lt;/Role&gt;</span>
      </>,
    ]),
    <>
      {' '}
      <span className="text-code-tag">&lt;/Timeline&gt;</span>
    </>,
    <> );</>,
    <>{'}'}</>,
  ]
}

function projectsLines() {
  return JSON.stringify({ projects: resume.projects }, null, 2)
    .split('\n')
    .map((line) => {
      const property = line.match(/^(\s*)"([^"]+)":(.*)$/)
      if (property) {
        return (
          <>
            {property[1]}
            <P>&quot;{property[2]}&quot;</P>:{highlightJsonValue(property[3])}
          </>
        )
      }
      return <>{highlightJsonValue(line)}</>
    })
}

function highlightJsonValue(value: string) {
  const parts = value.split(/("[^"]*"|\b\d+\b)/g)
  return parts.map((part, index) => {
    if (/^".*"$/.test(part)) return <S key={index}>{part}</S>
    if (/^\d+$/.test(part)) return <N key={index}>{part}</N>
    return <span key={index}>{part}</span>
  })
}

function skillsLines() {
  return [
    <>
      <C>// grouped from resume.skills</C>
    </>,
    <>
      <T>export</T> <T>const</T> <P>skills</P> = [
    </>,
    ...resume.skills.flatMap((group) => [
      <> {'{'}</>,
      <>
        {' '}
        <P>group</P>: {quote(group.name)},
      </>,
      <>
        {' '}
        <P>stack</P>: [
        {group.keywords.map((keyword, index) => (
          <span key={keyword}>
            {index > 0 ? ', ' : ''}
            {quote(keyword)}
          </span>
        ))}
        ],
      </>,
      <> {'}'},</>,
    ]),
    <>
      ] <T>as const</T>;
    </>,
  ]
}

function contactLines() {
  const { basics } = resume
  return [
    <>
      <span className="text-code-markup"># Contact</span>
    </>,
    <></>,
    <>
      Disponible para colaborar en productos donde la experiencia de desarrollo
      y la calidad de interfaz importan.
    </>,
    <></>,
    <>
      - <span className="text-code-markup">Email:</span> <S>{basics.email}</S>
    </>,
    <>
      - <span className="text-code-markup">Website:</span> <S>{basics.url}</S>
    </>,
    ...basics.profiles.map((profile) => (
      <>
        - <span className="text-code-markup">{profile.network}:</span>{' '}
        <S>{profile.url}</S>
      </>
    )),
    <></>,
    <>
      <C>
        &gt; Preferencia: mensajes directos, contexto breve y objetivos claros.
      </C>
    </>,
  ]
}

export function getCodeLines(fileId: PortfolioFileId) {
  const map: Record<PortfolioFileId, ReactNode[]> = {
    about: aboutLines(),
    experience: experienceLines(),
    projects: projectsLines(),
    skills: skillsLines(),
    contact: contactLines(),
  }

  return map[fileId]
}
