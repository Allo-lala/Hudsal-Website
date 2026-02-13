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
      <Testimonials />
      <Footer />
    </main>
  );
}
