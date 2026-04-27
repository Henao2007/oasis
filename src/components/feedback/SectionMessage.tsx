type SectionMessageProps = {
  title: string
  description: string
}

export function SectionMessage({ title, description }: SectionMessageProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
