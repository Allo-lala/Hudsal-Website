import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Testimonials",
  // description: "Read what our clients, families, and partners say about Hadsul Healthcare services.",
};

const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    role: "Family Member",
    location: "London",
    image: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "Hudsal has been a blessing for our family. The caregivers are compassionate, professional, and truly care about my mother's wellbeing. I couldn't be more grateful for their exceptional service. They go above and beyond every single day.",
    service: "Residential Care",
  },
  {
    id: 2,
    name: "Robert Williams",
    role: "Care Home Resident",
    location: "Manchester",
    image: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "The staff here treat me with dignity and respect every single day. The medical care is top-notch, and I finally feel like I'm in good hands. The activities and social events make every day enjoyable. Highly recommend Hudsal to anyone seeking quality care.",
    service: "Nursing Care",
  },
  {
    id: 3,
    name: "David Harrison",
    role: "Healthcare Partner",
    location: "Birmingham",
    image: "/images/testimonials/client3.jpg",
    rating: 5,
    text: "Working with Hudsal has transformed our care home operations. Their staffing solutions and IT support have streamlined everything. A truly professional and reliable healthcare partner that understands the challenges we face in this industry.",
    service: "Healthcare Staffing",
  },
  {
    id: 4,
    name: "Sarah Mitchell",
    role: "Daughter of Resident",
    location: "Leeds",
    image: "/images/team/sarah.jpg",
    rating: 5,
    text: "Finding the right care home for my father was stressful until we discovered Hudsal. The team made the transition smooth and kept us informed every step of the way. Dad is thriving and happier than he's been in years.",
    service: "Residential Care",
  },
  {
    id: 5,
    name: "James Anderson",
    role: "Hospital Administrator",
    location: "Bristol",
    image: "/images/team/james.jpg",
    rating: 5,
    text: "Hudsal's healthcare staffing service has been invaluable to our hospital. They consistently provide qualified, professional staff who integrate seamlessly with our teams. Their reliability and quality are unmatched.",
    service: "Healthcare Staffing",
  },
  {
    id: 6,
    name: "Emma Roberts",
    role: "Care Home Manager",
    location: "Edinburgh",
    image: "/images/team/emma.jpg",
    rating: 5,
    text: "The IT solutions provided by Hudsal have modernized our entire operation. From staff scheduling to resident records, everything is now efficient and compliant. Their support team is always responsive and helpful.",
    service: "IT Solutions",
  },
];

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "500+", label: "Happy Families" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "15+", label: "Years Experience" },
];

export default function TestimonialsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="What Our Clients Say"
        description="Real stories from families, residents, and partners who have experienced the Hudsal difference."
      />

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-emerald">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-emerald/20">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Service Badge */}
                <span className="inline-block bg-emerald/10 text-emerald text-xs font-medium px-3 py-1 rounded-full mb-6">
                  {testimonial.service}
                </span>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-emerald text-emerald"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground/80 leading-relaxed mb-8">
                  {`"${testimonial.text}"`}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald" />
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Share Your Experience
            </span>
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Have You Used Our Services?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We would love to hear about your experience with Hudsal Healthcare.
          </p>
          <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
            Leave a Review
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
