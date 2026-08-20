import type { Metadata } from "next";
import { PrivacyPolicyHero } from "@/sections/PrivacyPolicyHero";
import {
  PrivacyPolicyBody,
  type PolicySection,
} from "@/sections/PrivacyPolicyBody";
import {
  PolicyBullet,
  PolicyCheck,
  PolicyList,
  PolicyText,
} from "@/components/ui/PolicyProse";
import { getSiteContent } from "@/lib/content";

const LAST_UPDATED = "July 23, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Creadify collects, uses, discloses, and safeguards your information, and the choices you have over your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const site = getSiteContent();

  const mailLink = (
    <a
      href={`mailto:${site.email}`}
      className="font-medium text-accent-600 underline-offset-4 hover:underline"
    >
      {site.email}
    </a>
  );

  const sections: PolicySection[] = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: "shield",
      content: (
        <>
          <PolicyText>We collect the following types of information:</PolicyText>
          <PolicyList>
            <PolicyBullet label="Personal Information:">
              Name, email address, phone number, and other contact details when you fill out forms
              or subscribe to our services.
            </PolicyBullet>
            <PolicyBullet label="Usage Data:">
              Information about how you use our website, including IP address, browser type,
              operating system, and browsing behavior.
            </PolicyBullet>
          </PolicyList>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: "clipboard",
      content: (
        <>
          <PolicyText>We use the information we collect to:</PolicyText>
          <PolicyList className="space-y-2.5">
            <PolicyCheck>Provide and improve our services</PolicyCheck>
            <PolicyCheck>Respond to your inquiries and support needs</PolicyCheck>
            <PolicyCheck>Send you updates, marketing communications, and promotional offers</PolicyCheck>
            <PolicyCheck>Analyze website usage and trends</PolicyCheck>
          </PolicyList>
        </>
      ),
    },
    {
      id: "sharing-your-information",
      title: "Sharing Your Information",
      icon: "users",
      content: (
        <>
          <PolicyText>
            We do not sell, trade, or otherwise transfer your personal information to outside
            parties except as described below:
          </PolicyText>
          <PolicyList>
            <PolicyBullet label="Service Providers:">
              We may share information with third-party vendors who assist us in operating our
              website and conducting our business.
            </PolicyBullet>
            <PolicyBullet label="Legal Requirements:">
              We may disclose your information if required by law or in response to valid requests
              by public authorities.
            </PolicyBullet>
          </PolicyList>
        </>
      ),
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: "lock",
      content: (
        <PolicyText>
          We implement appropriate security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </PolicyText>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: "user",
      content: (
        <>
          <PolicyText>You have the right to:</PolicyText>
          <PolicyList className="space-y-2.5">
            <PolicyCheck>Access, correct, or delete your personal information</PolicyCheck>
            <PolicyCheck>Withdraw consent for data processing</PolicyCheck>
            <PolicyCheck>Object to the processing of your data</PolicyCheck>
          </PolicyList>
          <PolicyText className="mt-4">
            To exercise these rights, please contact us at {mailLink}.
          </PolicyText>
        </>
      ),
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies & Tracking",
      icon: "cookie",
      content: (
        <PolicyText>
          Our website uses cookies to enhance your browsing experience. Cookies are small data
          files stored on your device. You can control the use of cookies through your browser
          settings.
        </PolicyText>
      ),
    },
    {
      id: "third-party-links",
      title: "Third-Party Links",
      icon: "link",
      content: (
        <PolicyText>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of these websites. We encourage you to read their privacy policies.
        </PolicyText>
      ),
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to This Policy",
      icon: "edit",
      content: (
        <PolicyText>
          We may update this privacy policy from time to time. We will notify you of any changes by
          posting the new policy on our website. Your continued use of the website after any changes
          signifies your acceptance of the new policy.
        </PolicyText>
      ),
    },
    {
      id: "contact-us",
      title: "Contact Us",
      icon: "mail",
      content: (
        <>
          <PolicyText>
            If you have any questions about this privacy policy, please contact us at:
          </PolicyText>
          <div className="mt-4 rounded-xl border border-border bg-surface p-5">
            <p className="font-semibold text-primary-900">{site.name} Private Limited</p>
            <p className="mt-1 text-[15px] leading-[1.75] text-text-muted">{site.address}</p>
            <p className="mt-2 text-[15px]">{mailLink}</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <main>
      <PrivacyPolicyHero siteName={site.name} lastUpdated={LAST_UPDATED} />
      <PrivacyPolicyBody sections={sections} />
    </main>
  );
}
