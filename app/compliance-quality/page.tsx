import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Compliance & Quality - Hadsul",
  description: "Compliance and Quality services coming soon.",
};

export default function ComplianceQualityPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Compliance & Quality"
        description="I will come back, I am still working on something exciting"
      />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-emerald"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our Compliance & Quality service is currently under development. We're building comprehensive solutions to ensure your organization meets the highest standards.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
