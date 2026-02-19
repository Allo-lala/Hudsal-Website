import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export default function IndustriesPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="    " 
        title="Industries"
        description="  We shall have something here."
      />
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
             .................... Still Thinking..........................
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
