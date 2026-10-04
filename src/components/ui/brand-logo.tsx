type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "h-10 w-auto", priority = false }: BrandLogoProps) {
  return (
    // SVG lockup: next/image does not optimize SVG without extra config.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/aslan-logo.svg"
      alt="Aslan Consulting"
      width={240}
      height={226}
      className={`object-contain ${className}`}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
