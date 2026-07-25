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

        <h2 className="text-xl font-semibold text-text mt-8">1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <p>
          <strong>Personal Information:</strong> Name, email address, phone number, and other
          contact details when you fill out forms or subscribe to our services.
        </p>
        <p>
          <strong>Usage Data:</strong> Information about how you use our website, including IP
          address, browser type, operating system, and browsing behavior.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to your inquiries and support needs</li>
          <li>Send you updates, marketing communications, and promotional offers</li>
          <li>Analyze website usage and trends</li>
        </ul>

        <h2 className="text-xl font-semibold text-text mt-8">3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside
          parties except as described below:
        </p>
        <p>
          <strong>Service Providers:</strong> We may share information with third-party vendors
          who assist us in operating our website and conducting our business.
        </p>
        <p>
          <strong>Legal Requirements:</strong> We may disclose your information if required by
          law or in response to valid requests by public authorities.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">5. Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. Cookies are small data
          files stored on your device. You can control the use of cookies through your browser
          settings.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">6. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of these websites. We encourage you to read their privacy policies.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Withdraw consent for data processing</li>
          <li>Object to the processing of your data</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href={`mailto:${site.email}`} className="text-accent-500 hover:underline">
            {site.email}
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes
          by posting the new policy on our website. Your continued use of the website after any
          changes signifies your acceptance of the new policy.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8">9. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at:</p>
        <p>
          <strong>{site.name} Private Limited</strong>
          <br />
          {site.address}
          <br />
          <a href={`mailto:${site.email}`} className="text-accent-500 hover:underline">
            {site.email}
          </a>
        </p>
      </Container>
    </main>
  );
}
