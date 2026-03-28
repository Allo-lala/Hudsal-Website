import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Download } from "lucide-react";

export const metadata = {
  title: "Compliance & Quality",
  description: "Access our compliance documents and quality policies.",
};

const documents = [
  {
    title: "Complaints Policy",
    filename: "Complaints.pdf",
    description: "Our procedure for handling complaints and feedback"
  },
  {
    title: "Confidentiality of Clients Information",
    filename: "Confidentiality_of_Clients_Information_MHC_Policy.pdf",
    description: "How we protect and manage client information"
  },
  {
    title: "Data Protection & Compliance Policy",
    filename: "DATA_PROTECTION_AND_COMPLIANCE_POLICY.pdf",
    description: "Our commitment to data protection and GDPR compliance"
  },
  {
    title: "Equal Opportunities Policy",
    filename: "Equal_Opportunties_MHC_Policy.pdf",
    description: "Our commitment to equality and diversity"
  },
  {
    title: "Health and Safety Policy",
    filename: "Health and Safety_MHC_Policy.pdf",
    description: "Ensuring safe working environments for all"
  },
  {
    title: "Modern Slavery Statement 2025",
    filename: "MODERN_SLAVERY_Statement.pdf",
    description: "Our stance against modern slavery and human trafficking"
  },
  {
    title: "Record Keeping Policy",
    filename: "Record_Keeping_MHC_Policy.pdf",
    description: "Standards for maintaining accurate records"
  },
  {
    title: "Recruitment & Selection Policy",
    filename: "Recruitment_Selection_Policy.pdf",
    description: "Our fair and transparent recruitment process"
  },
  {
    title: "Safeguarding Policy",
    filename: "SAFE_GUARDING.pdf",
    description: "Protecting vulnerable individuals in our care"
  },
  {
    title: "Terms of Engagement",
    filename: "TERMS_OF_ENGAGEMENT.pdf",
    description: "Terms and conditions for our services"
  }
];

export default function ComplianceQualityPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Our Policies & Documents"
        description="For complete transparency. All our policies and compliance documents are available for download below. These documents outline our commitment to quality, safety, and ethical practices."
      />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          {/* <div className="text-center mb-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-emerald" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Transparency & Accountability
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              For complete transparency. All our policies and compliance documents are available for download below. These documents outline our commitment to quality, safety, and ethical practices.
            </p>
          </div> */}

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-emerald/30 flex flex-col"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <Image src="/compliance.png" alt="Compliance document" fill className="object-contain" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-emerald transition-colors">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {doc.description}
                </p>

                {/* Download Button */}
                <a
                  href={`/images/Compliance_Quality/${doc.filename}`}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-3 font-medium transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-emerald/5 rounded-2xl p-8 border border-emerald/20">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Questions About Our Policies?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about our compliance documents or quality standards, we are here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 font-semibold transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
