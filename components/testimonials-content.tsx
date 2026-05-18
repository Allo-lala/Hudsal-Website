"use client";

import { useState } from "react";
import Image from "next/image";
import { ReviewModal } from "@/components/review-modal";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Daughter of Client",
    location: "Leeds",
    image: "/images/team/sarah.jpg",
    rating: 5,
    text: "Hadsul provided our family with confidence during a very important transition. The team communicated clearly, delivered consistent support, and ensured my mother received high-quality care with dignity and professionalism.",
    service: "Healthcare Delivery",
  },
  {
    id: 2,
    name: "Robert Williams",
    role: "Care Home Resident",
    location: "Manchester",
    image: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "The staff consistently treat residents with respect and professionalism. The quality of care, attention to wellbeing, and supportive environment have made a significant difference to my daily life.",
    service: "Residential Care Support",
  },
  {
    id: 3,
    name: "Margaret Thompson",
    role: "Family Representative",
    location: "London",
    image: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "From the beginning, Hadsul handled every stage of the process with care and professionalism. Their support gave our family reassurance, and the improvement in my father's wellbeing has been remarkable.",
    service: "Healthcare Delivery",
  },
  {
    id: 4,
    name: "David Harrison",
    role: "Care Home Operations Partner",
    location: "Birmingham",
    image: "/images/testimonials/client3.jpg",
    rating: 5,
    text: "Hadsul has strengthened our operational capacity through reliable staffing support and structured digital solutions. Their understanding of healthcare environments makes them a valuable long-term partner.",
    service: "Workforce & Operations",
  },
  {
    id: 5,
    name: "James Anderson",
    role: "Hospital Administrator",
    location: "Bristol",
    image: "/images/team/james.jpg",
    rating: 5,
    text: "The quality and reliability of Hadsul's healthcare professionals have consistently met the demands of our organisation. Their staffing support integrates efficiently into our teams and maintains a high professional standard.",
    service: "Healthcare Staffing",
  },
  {
    id: 6,
    name: "Emma Roberts",
    role: "Care Home Manager",
    location: "Edinburgh",
    image: "/images/team/emma.jpg",
    rating: 5,
    text: "The systems implemented by Hadsul significantly improved operational visibility and workflow efficiency across our organisation. Their digital infrastructure and ongoing support have modernised key areas of our operation.",
    service: "Digital Infrastructure",
  },
];

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "500+", label: "Happy Families" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "15+", label: "Years Experience" },
];

export function TestimonialsContent() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Have You Used Our Services?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We would love to hear about your experience with Hadsul.
          </p>
          <Button 
            className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Leave a Review
          </Button>
        </div>
      </section>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </>
  );
}
