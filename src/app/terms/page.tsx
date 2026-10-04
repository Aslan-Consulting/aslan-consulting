import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/legal-article";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${site.legalName}`,
  description:
    "Terms of use for the Aslan Consulting, LLC website and B2B consulting inquiries.",
};

export default function TermsPage() {
  return (
    <LegalArticle title={`Terms of Service for ${site.legalName}`}>
      <p>
        By using this website, you agree to these terms. If you do not agree, please
        do not use the site.
      </p>

      <h2>Purpose of this website</h2>
      <p>
        This website is for informational purposes and to facilitate B2B consulting
        inquiries. Content on these pages describes our services; it is not a proposal,
        statement of work, or offer of employment.
      </p>

      <h2>Client services</h2>
      <p>
        Client services are governed by individual master service agreements (MSAs)
        executed with clients. Nothing on this website replaces or amends those
        agreements.
      </p>

      <h2>Governing jurisdiction</h2>
      <p>Governing jurisdiction: Fairfax, Virginia.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalArticle>
  );
}
