import LegalPageLayout, { LegalSection } from "./Legalpagelayout"; // adjust path

export default function Terms() {
  return (
    <LegalPageLayout title="Terms & Conditions" updated="July 1, 2026">
      <LegalSection title="1. Acceptance of terms">
        <p>
          By creating an account or using SocialSuite, you agree to these Terms & Conditions. If
          you don't agree, please don't use the service.
        </p>
      </LegalSection>

      <LegalSection title="2. Your account">
        <p>
          You're responsible for keeping your login credentials secure and for all activity under
          your account. Let us know immediately if you suspect unauthorized access.
        </p>
      </LegalSection>

      <LegalSection title="3. Subscription & billing">
        <p>
          Paid plans are billed in advance on a monthly or yearly cycle, as selected at checkout.
          Plans renew automatically until cancelled. Prices may change with at least 30 days'
          notice before your next renewal.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>You agree not to use SocialSuite to:</p>
        <ul className="list-disc list-outside pl-5 space-y-1.5">
          <li>Post content that is illegal, infringing, or violates a connected platform's own terms.</li>
          <li>Attempt to interfere with or disrupt the service or its infrastructure.</li>
          <li>Resell or sublicense access to the platform without our written consent.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Connected platforms">
        <p>
          When you connect a third-party social account, you authorize SocialSuite to access and
          act on that account per the permissions you grant. We're not responsible for changes,
          outages, or policy changes made by those third-party platforms.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual property">
        <p>
          SocialSuite and its branding are our property. Content you create or upload remains
          yours — you grant us only the license needed to store, process, and publish it on your
          behalf.
        </p>
      </LegalSection>

      <LegalSection title="7. Cancellation & refunds">
        <p>
          You can cancel anytime from billing settings; you'll retain access until the end of the
          current billing period. Refunds are evaluated case-by-case within 14 days of a charge.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <p>
          SocialSuite is provided "as is." To the extent permitted by law, we're not liable for
          indirect, incidental, or consequential damages arising from your use of the service.
        </p>
      </LegalSection>

      <LegalSection title="9. Termination">
        <p>
          We may suspend or terminate accounts that violate these terms or pose a security risk to
          the platform or other users.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact us">
        <p>
          Questions about these terms? Reach us at{" "}
          <span className="font-bold text-gray-800">legal@socialsuite.com</span>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}