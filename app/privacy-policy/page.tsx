import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  const site = getSiteContent();

  return (
    <main className="py-20 sm:py-24">
      <Container className="prose prose-slate max-w-3xl">
        <h1 className="text-3xl font-bold text-text">Privacy Policy</h1>
        <p className="text-sm text-text-muted">Last updated: July 23, 2026</p>

        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your
          privacy. This Privacy Policy explains what information we collect, how we use it, and
          the choices you have.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">Information We Collect</h2>
        <p>
          We may collect information you provide directly to us, such as your name, email
          address, and phone number when you fill out a contact form or subscribe to our
          newsletter.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">How We Use Your Information</h2>
        <p>
          We use the information we collect to respond to your inquiries, send you updates you
          have requested, and improve our services. We do not sell your personal information to
          third parties.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">Cookies</h2>
        <p>
          Our website may use cookies to improve your browsing experience. You can choose to
          disable cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${site.email}`} className="text-accent-500 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Container>
    </main>
  );
}
