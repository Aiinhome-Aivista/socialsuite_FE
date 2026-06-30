import LegalPageLayout, { LegalSection } from "./Legalpagelayout"; // adjust path

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" updated="July 1, 2026">
      <LegalSection title="1. What are cookies">
        <p>
          Cookies are small text files placed on your device when you visit SocialSuite. They help
          the site function correctly, remember your preferences, and understand how the product
          is used.
        </p>
      </LegalSection>

      <LegalSection title="2. Types of cookies we use">
        <ul className="list-disc list-outside pl-5 space-y-1.5">
          <li><span className="font-bold text-gray-800">Essential cookies</span> — required for login, security, and core functionality. These can't be turned off.</li>
          <li><span className="font-bold text-gray-800">Analytics cookies</span> — help us understand how people use SocialSuite so we can improve it.</li>
          <li><span className="font-bold text-gray-800">Preference cookies</span> — remember settings like theme or language.</li>
          <li><span className="font-bold text-gray-800">Marketing cookies</span> — used to measure the performance of our own marketing campaigns.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Managing your preferences">
        <p>
          You can change or withdraw your cookie consent at any time from the cookie settings link
          in the footer, or by adjusting your browser settings to block or delete cookies. Blocking
          essential cookies may affect core functionality like staying signed in.
        </p>
      </LegalSection>

      <LegalSection title="4. Third-party cookies">
        <p>
          Some cookies are set by trusted third parties — for example, analytics providers or the
          social platforms you connect — to support features like embedded previews and login.
          These third parties have their own privacy and cookie policies.
        </p>
      </LegalSection>

      <LegalSection title="5. Changes to this policy">
        <p>
          We may update this Cookie Policy periodically. Material changes will be communicated via
          an in-app notice or banner before they take effect.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact us">
        <p>
          Questions about how we use cookies? Reach us at{" "}
          <span className="font-bold text-gray-800">privacy@socialsuite.com</span>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}