import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "h-10 w-auto", priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/aslan-logo.png"
      alt="Aslan Consulting"
      width={241}
      height={226}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
