import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Terms & Conditions",
  description: "Read our terms and conditions for using Hudsal Healthcare services.",
};

export default function TermsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="Legal" 
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services."
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: February 2026
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Welcome to Hudsal Healthcare Limited (&quot;Hudsal&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). These Terms and Conditions govern your use of our website, services, and products. By accessing or using our services, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Services</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hudsal Healthcare provides healthcare staffing services, residential care, nursing care, domiciliary care, IT solutions for healthcare providers, and healthcare products. All services are provided in accordance with applicable UK healthcare regulations, including CQC requirements.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Eligibility</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our services are available to individuals, healthcare facilities, and organizations within the United Kingdom. By using our services, you confirm that you have the legal capacity to enter into a binding agreement.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When using our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use our services only for lawful purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Healthcare Services</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our healthcare services are delivered by qualified professionals in accordance with CQC standards and NHS guidelines. Care plans are developed on an individual basis, and all care is provided with dignity, respect, and in the best interests of the service user.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Products</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Healthcare products sold through our platform are certified and comply with relevant UK and EU standards. Product descriptions are accurate to the best of our knowledge. Returns and refunds are subject to our returns policy.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Payment Terms</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Payment terms vary depending on the service or product. Invoices for healthcare services are typically issued monthly. Product purchases require payment at the time of order. We accept various payment methods as specified at checkout.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              All content on our website, including text, graphics, logos, and software, is the property of Hudsal Healthcare or our licensors. You may not reproduce, distribute, or create derivative works without our written consent.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To the fullest extent permitted by law, Hudsal Healthcare shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our liability is limited to the amount paid for the specific service or product.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. Termination</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We reserve the right to terminate or suspend access to our services at any time, with or without notice, for conduct that we believe violates these terms or is harmful to other users or our business interests.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">11. Changes to Terms</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We may update these Terms and Conditions from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-secondary/30 rounded-lg p-6 text-muted-foreground">
              <p className="font-semibold text-foreground">Hudsal Healthcare Limited</p>
              <p>123 Healthcare Drive</p>
              <p>London, EC1A 1BB</p>
              <p>United Kingdom</p>
              <p className="mt-4">Email: legal@hudsal.co.uk</p>
              <p>Phone: +44 (0) 20 1234 5678</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
