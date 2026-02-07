import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Briefcase, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our team at Hudsal Healthcare. Explore career opportunities in healthcare staffing, consultancy, and IT solutions.',
};

export default function CareersPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Join the Hadsul Family"
        description="Build your career with Hadsul Healthcare and make a difference in the lives of others."
      />

      {/* No Current Openings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-emerald" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              No Current Job Openings
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              We don't have any open positions at the moment, but we're always looking for talented 
              healthcare professionals to join our us. We encourage you to check back regularly. 
            </p>
          </div>

          


        </div>
      </section>

      {/* Spacer between content and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}