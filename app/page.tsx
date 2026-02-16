import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { Services } from "@/components/services";
import { BooksAndPodcasts } from "@/components/books-podcasts";
import { PhilanthropySection } from "@/components/philanthropy-section";
import { AwardsSection } from "@/components/awards-section";
import { ClimateSection } from "@/components/climate-section";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome | Hadsul',
  description: 'We are based & operate in the UK Providing exceptional healthcare services. CQC registered and NHS compliant.',
};

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <ProductsSection />
      <Services />
      <BooksAndPodcasts />
      <PhilanthropySection />
      <AwardsSection />
      <ClimateSection />
      
      {/* Infinite Scrolling Text Section */}
      <section className="py-12 bg-[#1a2e1a] overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left">
          {/* Duplicate the text multiple times for seamless loop */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mx-8">
                Learn
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-script italic text-beige mx-8">
                from the Best!
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mx-8">
                Get
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-script italic text-beige mx-8">
                Un-Stuck
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mx-8">
                Build
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-script italic text-beige mx-8">
                Your Empire
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mx-8">
                Transform
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-script italic text-beige mx-8">
                Your Life
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
