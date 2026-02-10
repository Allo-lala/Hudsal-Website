"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/review-modal";

const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    role: "Family Member",
    image: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "Hudsal has been a blessing for our family. The caregivers are compassionate, professional, and truly care about my mother's wellbeing. I couldn't be more grateful for their exceptional service.",
  },
  {
    id: 2,
    name: "Robert Williams",
    role: "Care Home Resident",
    image: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "The staff here treat me with dignity and respect every single day. The medical care is top-notch, and I finally feel like I'm in good hands. Highly recommend Hudsal to anyone seeking quality care.",
  },
  {
    id: 3,
    name: "David Harrison",
    role: "Healthcare Partner",
    image: "/images/testimonials/client3.jpg",
    rating: 5,
    text: "Working with Hadsul has transformed our care home operations. Their staffing solutions and IT support have streamlined everything. A truly professional and reliable healthcare partner.",
  },
];

export function Testimonials() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Hear from families, residents, and partners who have experienced the
            Hudsal difference in quality healthcare services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-8 relative group hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-emerald/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a Review CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Have you used our services? We'd love to hear about your experience with Hadsul.
          </p>
          <Button 
            className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Leave a Review
          </Button>
        </div>
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
}
