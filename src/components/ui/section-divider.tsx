import { Container } from "@/components/ui/container";

export function SectionDivider() {
  return (
    <div className="bg-cream" aria-hidden="true">
      <Container className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-gold" />
        <span className="h-2 w-2 rotate-45 bg-gold" />
        <span className="h-px flex-1 bg-gold" />
      </Container>
    </div>
  );
}
