import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { TestimonialsContent } from "@/components/testimonials-content";

export const metadata = {
  title: "Testimonials",
  // description: "Read what our clients, families, and partners say about Hadsul Healthcare services.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="What Our Clients Say"
        description="Real stories from families, residents, and partners who have experienced the Hudsal difference."
      />
      
      <TestimonialsContent />

      <Footer />
    </main>
  );
}
