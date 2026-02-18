import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Business Xray - Hadsul",
  description: "Business Xray services coming soon.",
};

export default function BusinessXrayPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Business Xray"
        description="I will come back, I am still working on something exciting."
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our Business Xray service is currently under development. I am creating something special i am yet to gain deeper insights  and sesigns.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
