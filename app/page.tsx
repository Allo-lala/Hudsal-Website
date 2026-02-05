import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { Services } from "@/components/services";
import { FAQ } from "@/components/faq";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome | Hudsal',
  description: 'We are based & operate legally in the UK Providing exceptional healthcare services. CQC registered and NHS compliant.',
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <Services />
      <FAQ />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}
