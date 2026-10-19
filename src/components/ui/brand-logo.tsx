type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      {/* SVG mark: next/image does not optimize SVG without extra config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/aslan-mark.svg"
        alt="Aslan Consulting"
        width={240}
        height={200}
        className="h-11 w-auto shrink-0 object-contain sm:h-12"
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[0.14em] text-zinc-900 sm:text-lg dark:text-zinc-50">
          ASLAN
        </span>
        <span className="mt-1 text-[0.62rem] font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          Consulting LLC
        </span>
      </span>
    </span>
  );
}
