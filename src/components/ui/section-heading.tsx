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
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pine sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-pine">{description}</p>
      ) : null}
    </header>
  );
}
