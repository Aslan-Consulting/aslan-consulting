type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
        {kicker}
      </p>
      <h2 className="mt-1.5 text-3xl font-semibold tracking-tight text-pine sm:text-4xl md:mt-2">{title}</h2>
      {description ? (
        <p className="mt-2 text-base leading-relaxed text-pine md:mt-3">{description}</p>
      ) : null}
    </header>
  );
}
