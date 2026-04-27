import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrmSection } from "@/components/crm-section";
import { ProductsSection } from "@/components/products-section";
import { Services } from "@/components/services";
import { HealthcareProducts } from "@/components/healthcare-products";
import { BooksAndPodcasts } from "@/components/books-podcasts";
import { PhilanthropySection } from "@/components/philanthropy-section";
import { AwardsSection } from "@/components/awards-section";
import { ClimateSection } from "@/components/climate-section";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome | Hadsul',
  description: 'Hadsul Limited provides CQC registered healthcare staffing, consultancy, and IT solutions across the UK. NHS compliant services including nursing care, residential care, and professional training.',
  keywords: ['healthcare staffing', 'CQC registered', 'NHS compliant', 'nursing care UK', 'healthcare consultancy', 'care home solutions'],
  alternates: {
    canonical: 'https://hadsul.co.uk',
  },
  openGraph: {
    title: 'Hadsul - Healthcare Staffing & Consultancy Services UK',
    description: 'CQC registered healthcare staffing and consultancy services across the UK',
    url: 'https://hadsul.co.uk',
    siteName: 'Hadsul Limited',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hadsul Limited',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <CrmSection />
      <ProductsSection />
      <Services />
      <HealthcareProducts />
      <BooksAndPodcasts />
      <PhilanthropySection />
      <AwardsSection />
      <ClimateSection />
      
      {/* Infinite Scrolling Text Section */}
      <section className="py-12 bg-[#1a2e1a] overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left">
          {/* Duplicate the text multiple times for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 md:mx-8">
                Clarity
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 md:mx-8">
                Engineered
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 md:mx-8">
                Before You do anything
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 md:mx-8">
                First Understand Everything
              </span>
              
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}
