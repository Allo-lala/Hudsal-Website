import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <Services />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}
