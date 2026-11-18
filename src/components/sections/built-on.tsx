import { Container } from "@/components/ui/container";

const snippet = `import { test, expect } from "@playwright/test";

test("shared auth holds across the suite", async ({ page }) => {
  await page.goto("/account");
  await expect(page.getByTestId("session")).toBeVisible();
});

test("smoke gate on the pull request", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();
});

test("deep check on the flake path", async ({ page }) => {
  await page.goto("/checkout");
  await expect(page.getByTestId("order")).toBeVisible();
});`;

const results = [
  { name: "Shared auth holds across the suite", state: "Pass" },
  { name: "Smoke gate on the pull request", state: "Pass" },
  { name: "Deep check on the flake path", state: "Fail" },
] as const;

const tools = ["Playwright", "GitHub Actions", "GitLab", "Jenkins"] as const;

export function BuiltOn() {
  return (
    <section className="bg-pine py-3 text-cream md:py-10">
      <Container>
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:gap-6">
          <pre className="overflow-x-auto rounded-xl border border-gold/40 px-4 py-3 text-sm leading-relaxed text-cream md:p-4">
            <code>{snippet}</code>
          </pre>
          <figure className="rounded-xl border border-gold/40 px-4 py-3 md:p-5">
            <figcaption className="text-xs font-medium leading-relaxed text-cream">
              Example illustration, not a client result.
            </figcaption>
            <ul className="mt-3 space-y-2 border-t border-gold/40 pt-3 md:mt-4 md:space-y-3 md:pt-4">
              {results.map((result) => (
                <li key={result.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm leading-snug text-cream">{result.name}</span>
                  <span
                    className={`shrink-0 text-xs font-semibold tracking-[0.12em] uppercase ${
                      result.state === "Pass" ? "text-gold" : "text-cream"
                    }`}
                  >
                    {result.state}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-gold/40 pt-3 text-sm leading-relaxed text-cream md:mt-4">
              Auth passed. The smoke gate passed. A deep check failed.
            </p>
          </figure>
        </div>
        <div className="mt-4 border-t border-gold/40 pt-3 md:mt-6 md:pt-5">
          <p className="text-sm font-semibold text-gold">Built on</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {tools.map((tool) => (
              <li key={tool} className="flex items-center gap-2 text-sm font-medium text-cream">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
