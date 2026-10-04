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
      <Container className="py-16 sm:py-20">
        <p className="text-xs font-medium tracking-[0.16em] text-cyan-600 uppercase dark:text-cyan-400">
          {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {title}
        </h1>
        <article className="legal-copy mt-10 max-w-2xl">{children}</article>
      </Container>
    </main>
  );
}
