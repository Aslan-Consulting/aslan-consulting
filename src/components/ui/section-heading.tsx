type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-medium tracking-[0.16em] text-cyan-600 uppercase dark:text-cyan-400">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
