import Image from "next/image";

const MARK_SRC = "/aslan-mark-v2.png";
const MARK_WIDTH = 789;
const MARK_HEIGHT = 600;

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  markClassName?: string;
};

export function BrandLogo({
  className = "",
  priority = false,
  markClassName = "h-12 w-auto",
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <Image
        src={MARK_SRC}
        alt="Aslan Consulting"
        width={MARK_WIDTH}
        height={MARK_HEIGHT}
        priority={priority}
        quality={95}
        sizes="80px"
        className={`shrink-0 object-contain ${markClassName}`.trim()}
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
