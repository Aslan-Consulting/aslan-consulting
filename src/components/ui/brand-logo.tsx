import Image from "next/image";

const MARK_SRC = "/testing-explained-mark.png";
const MARK_SIZE = 1024;

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  markClassName?: string;
};

export function BrandLogo({
  className = "",
  priority = false,
  markClassName = "h-11 w-11",
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <Image
        src={MARK_SRC}
        alt="Testing Explained"
        width={MARK_SIZE}
        height={MARK_SIZE}
        priority={priority}
        quality={95}
        sizes="44px"
        className={`shrink-0 object-contain ${markClassName}`.trim()}
      />
      <span className="text-[1.05rem] font-semibold tracking-tight text-zinc-900 sm:text-lg">
        Testing Explained
      </span>
    </span>
  );
}
