type MarkProps = {
  className?: string;
};

export function Mark({ className = "h-8 w-8" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" fillOpacity="0.12" />
      <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M10 22 L16 10 L22 22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.4 17.2 H19.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
