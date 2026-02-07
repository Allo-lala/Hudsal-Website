import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, Users, MapPin } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Stay updated with Hadsul Healthcare events, training sessions, and community activities.',
};

export default function EventsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Upcoming Events"
        description="Stay connected with our latest events, training sessions, and community activities."
      />

      {/* No Current Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-emerald" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              No Upcoming Events Scheduled
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              We don't have any events scheduled at the moment. Stay tuned for upcoming announcements and be the first 
              to know about our latest activities.
            </p>
          </div>


          {/* Types of Events We Host */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Training Workshops</h4>
              <p className="text-muted-foreground text-sm">
                Professional development sessions for healthcare staff
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-emerald" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Community Events</h4>
              <p className="text-muted-foreground text-sm">
                 Healthcare awareness and community outreach programs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Networking Events</h4>
              <p className="text-muted-foreground text-sm">
                Connect with healthcare professionals and industry experts
              </p>
            </div>
          </div> */}
        </div>
      </section>

      {/* Spacer between content and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}