/**
 * Shared section header — mono index + title, Hamish-style numbered sections.
 */
export function SectionHeading({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <span className="font-mono text-sm text-primary">{index}</span>
      <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
