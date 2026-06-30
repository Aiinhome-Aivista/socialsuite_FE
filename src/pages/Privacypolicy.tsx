import LegalPageLayout, { LegalSection } from "./Legalpagelayout"; // adjust path

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="July 1, 2026">
      <LegalSection title="1. Overview">
        <p>
          SocialSuite ("we", "us", "our") provides social media management tools that help you
          create, schedule, and analyze content across multiple platforms. This policy explains
          what information we collect, how we use it, and the choices you have.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We collect information in three ways:</p>
        <ul className="list-disc list-outside pl-5 space-y-1.5">
          <li><span className="font-bold text-gray-800">Account information</span> — name, email, and password when you sign up.</li>
          <li><span className="font-bold text-gray-800">Connected platform data</span> — content, engagement, and profile data you authorize from linked social accounts.</li>
          <li><span className="font-bold text-gray-800">Usage data</span> — how you interact with the dashboard, collected to improve the product.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>
          We use your information to operate and improve SocialSuite, schedule and publish content
          on your behalf, generate analytics and AI-assisted suggestions, provide customer support,
          and communicate important account or service updates.
        </p>
      </LegalSection>

      <LegalSection title="4. Sharing of information">
        <p>
          We do not sell your personal information. We share data only with the social platforms
          you connect (to perform the actions you request), trusted service providers who help us
          run the product under confidentiality agreements, and authorities where required by law.
        </p>
      </LegalSection>

      <LegalSection title="5. Data retention">
        <p>
          We retain account and content data for as long as your account is active. If you delete
          your account, we remove your personal data within 30 days, except where retention is
          required for legal or security purposes.
        </p>
      </LegalSection>

      <LegalSection title="6. Your rights">
        <p>
          Depending on your location, you may have the right to access, correct, export, or delete
          your personal data. You can exercise most of these directly from account settings, or by
          contacting us at <span className="font-bold text-gray-800">privacy@socialsuite.com</span>.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use industry-standard encryption in transit and at rest, access controls, and regular
          security reviews to protect your data. No method of transmission is 100% secure, so we
          encourage strong, unique passwords and enabling two-factor authentication.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to this policy">
        <p>
          We may update this policy from time to time. We'll notify you of material changes by
          email or an in-app notice before they take effect.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact us">
        <p>
          Questions about this policy? Reach us at{" "}
          <span className="font-bold text-gray-800">privacy@socialsuite.com</span>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}