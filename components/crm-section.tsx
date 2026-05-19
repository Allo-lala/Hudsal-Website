"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { CRMRequestModal } from "@/components/crm-request-modal";

export function CrmSection() {
  const [modalOpen, setModalOpen] = useState(false);
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
    <section ref={sectionRef} className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <CRMRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center">

          {/* Text content - shows first on mobile */}
          <div className={`space-y-6 order-1 lg:order-1 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ backgroundColor: "#ffffffff", color: "#174731" }}>
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#f10808" }} />
              <span className="text-emerald text-sm font-medium">AI-powered CRM</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Care home management{" "}
              <span className="text-emerald">is easier</span>{" "}
              with the right tools
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              All-in-one AI-powered care home platform to manage enquiries, capture leads, schedule staff and tours, handle compliance, payroll, care planning, and more — efficiently and effortlessly.
            </p>

            {/* Button - hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full px-7 py-3 font-semibold text-base shadow-lg transition-all"
              >
                Apply For Access
              </Button>
            </div>

            {/* Trust line - visible only on desktop */}
            <p className="text-gray-400 text-sm pt-1 hidden lg:block">
              Trusted by care homes across the UK, USA &amp; Europe
            </p>
          </div>

          {/* Image - shows second on mobile */}
          <div className={`relative flex justify-center lg:justify-end order-2 lg:order-2 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/login.webp"
                alt="Hadsul CRM dashboard"
                width={700}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Button section - shows third on mobile only */}
          <div className={`order-3 lg:hidden space-y-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full px-7 py-3 font-semibold text-base shadow-lg transition-all"
              >
                Apply For Access
              </Button>
            </div>
            
            {/* Trust line - visible only on mobile */}
            <p className="text-gray-400 text-sm text-center sm:text-left">
              Trusted by care homes across the UK, USA &amp; Europe
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
