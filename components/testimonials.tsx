"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/review-modal";

const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    role: "Relative",
    image: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "Hudsal has been a blessing for our family. The caregivers are compassionate, professional, and truly care about my mother's wellbeing. I couldn't be more grateful for their exceptional service.",
  },
  {
    id: 2,
    name: "Robert Williams",
    role: "Team Leader",
    image: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "The staff here treat me with dignity and respect every single day. The medical care is top-notch, and I finally feel like I'm in good hands. Highly recommend Hudsal to anyone seeking quality care.",
  },
  {
    id: 3,
    name: "David Harrison",
    role: "Care Home Partner",
    image: "/images/testimonials/client3.jpg",
    rating: 5,
    text: "Working with Hadsul has transformed our care home operations. Their emergency staffing solutions and IT support have streamlined everything. A truly professional and reliable partner.",
  },
  {
    id: 4,
    name: "Sarah Mitchell",
    role: "Family Member",
    image: "/images/testimonials/client1.jpg",
    rating: 5,
    text: "The level of care and attention my father receives is outstanding. The staff goes above and beyond every day. We're so grateful to have found Hadsul.",
  },
  {
    id: 5,
    name: "James Anderson",
    role: "Care Home Manager",
    image: "/images/testimonials/client2.jpg",
    rating: 5,
    text: "Hadsul's CRM is game-changing for our facility. Professional, reliable, and exceeded expectations.",
  },
  {
    id: 6,
    name: "Emily Roberts",
    role: "Healthcare Professional",
    image: "/images/testimonials/client3.jpg",
    rating: 5,
    text: "Working with Hadsul has been an incredible experience. They truly value their staff and provide excellent support. Proud to be part of this team.",
  },
];

export function Testimonials() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(testimonials.length / perPage);

  // Reset to first slide when layout changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [perPage]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Pause when modal opens
  useEffect(() => {
    setIsAutoPlaying(!isReviewModalOpen);
  }, [isReviewModalOpen]);

  const slides = Array.from({ length: totalSlides }, (_, i) =>
    testimonials.slice(i * perPage, (i + 1) * perPage)
  );

  return (
    <section
      id="testimonials-section"
      className="py-20 bg-gradient-to-b from-background to-emerald/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance animate-slide-up">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto animate-slide-up animate-delay-200">
            Hear from families, residents, and partners who have experienced the
            Hadsul difference in quality services.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative mb-16"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((group, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
                    gap: "2rem",
                  }}
                >
                  {group.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-card border border-border rounded-2xl p-8 relative group hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="absolute top-6 right-6 text-emerald/20 group-hover:text-emerald/40 transition-colors">
                        <Quote className="w-12 h-12" />
                      </div>
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-emerald text-emerald"
                          />
                        ))}
                      </div>
                      <p className="text-foreground/80 leading-relaxed mb-8 group-hover:text-foreground transition-colors">
                        {`"${testimonial.text}"`}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald flex-shrink-0">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-emerald transition-colors">
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
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-emerald scale-125"
                    : "bg-emerald/30 hover:bg-emerald/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Leave a Review CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Have you used our services? We&apos;d love to hear about your
            experience with Hadsul.
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
