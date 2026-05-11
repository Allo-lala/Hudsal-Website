"use client";

import { useState, useEffect, useRef } from "react";

export function VisionPathSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#f5f1e8] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Main Title */}
        <div className={`text-center mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald mb-2">
            YOU'VE DREAMS!,
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald mb-4">
            WE'VE GOT
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Vision & Path
          </h2>
        </div>

        {/* Description Content */}
        <div className={`max-w-4xl mx-auto space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <p className="text-center">
            It's no secret that <span className="font-semibold text-foreground">90% of healthcare ventures in the UK don't make it past their first year</span>. But that's where Hadsul comes in.
          </p>
          
        </div>
      </div>
    </section>
  );
}
