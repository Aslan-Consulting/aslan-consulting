import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type LegalArticleProps = {
  kicker?: string;
  title: string;
  children: ReactNode;
};

export function LegalArticle({ kicker = "Legal", title, children }: LegalArticleProps) {
  return (
    <main id="main" className="flex-1">
      <Container className="py-10 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
          {kicker}
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-pine sm:text-4xl">
          {title}
        </h1>
        <article className="legal-copy mt-6 max-w-2xl">{children}</article>
      </Container>
    </main>
  );
}
