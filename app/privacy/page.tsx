import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Privacy Policy - Hudsal Healthcare",
  description: "Learn how Hudsal Healthcare collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="Legal" 
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: February 2026
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hudsal Healthcare Limited (&quot;Hudsal&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, services, and products.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We may collect the following types of information:
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Name, address, email, and phone number</li>
              <li>Date of birth and identification documents</li>
              <li>Health and medical information (for care services)</li>
              <li>Emergency contact details</li>
              <li>Payment and billing information</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Cookies and usage data</li>
              <li>Website interaction data</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Providing and managing healthcare services</li>
              <li>Processing orders and payments</li>
              <li>Communicating with you about our services</li>
              <li>Improving our website and services</li>
              <li>Complying with legal and regulatory requirements</li>
              <li>Marketing (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Legal Basis for Processing</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Under GDPR, we process your personal data based on: contract performance (providing services), legal obligations (healthcare regulations), legitimate interests (business operations), and consent (marketing communications).
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Data Sharing</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Healthcare professionals involved in your care</li>
              <li>NHS and regulatory bodies (as required by law)</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Healthcare records are retained in accordance with NHS guidelines (typically 8 years for adult records, longer for children).
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Under GDPR, you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Restriction:</strong> Request limited processing of your data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw marketing consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Data Security</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data, including encryption, access controls, regular security assessments, and staff training. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Cookies</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our website uses cookies to enhance your experience. You can control cookies through your browser settings. Essential cookies are necessary for the website to function, while analytics and marketing cookies require your consent.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. International Transfers</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your data is primarily processed within the UK and EEA. If we transfer data outside these regions, we ensure appropriate safeguards are in place (such as Standard Contractual Clauses).
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">11. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We do not knowingly collect personal information from children under 16 without parental consent. If you believe we have collected such information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">12. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer:
            </p>
            <div className="bg-secondary/30 rounded-lg p-6 text-muted-foreground">
              <p className="font-semibold text-foreground">Data Protection Officer</p>
              <p>Hudsal Healthcare Limited</p>
              <p>123 Healthcare Drive</p>
              <p>London, EC1A 1BB</p>
              <p>United Kingdom</p>
              <p className="mt-4">Email: dpo@hudsal.co.uk</p>
              <p>Phone: +44 (0) 20 1234 5678</p>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">14. Complaints</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              If you are not satisfied with our response to a privacy concern, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk or by calling 0303 123 1113.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
