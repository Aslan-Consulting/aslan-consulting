type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-medium tracking-[0.16em] text-green-700 uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
