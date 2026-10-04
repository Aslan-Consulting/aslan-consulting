import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/legal-article";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.legalName}`,
  description:
    "How Aslan Consulting, LLC collects and uses information for scheduling consultations and B2B software testing communications.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle title={`Privacy Policy for ${site.legalName}`}>
      <p>
        This policy describes how {site.legalName} collects and uses information when you
        inquire about B2B software testing services through this website.
      </p>

      <h2>What we collect</h2>
      <p>
        We collect information you provide when requesting a consultation — typically
        your name, email address, and phone number, along with company and engagement
        details you choose to share on the discovery form.
      </p>

      <h2>How we use it</h2>
      <p>
        We use this information solely for the purpose of scheduling consultations and
        communicating regarding B2B software testing services. We do not use it for
        unrelated marketing lists.
      </p>

      <h2>Sharing</h2>
      <p>We do not sell your data to third parties.</p>

      <h2>Scheduling</h2>
      <p>
        Scheduling is handled securely via Cal.com. If you book a time, Cal.com
        processes the name and email needed to hold that appointment.
      </p>

      <h2>Contact</h2>
      <p>
        For inquiries, contact{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalArticle>
  );
}
