"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SoftwareOrderModal } from "@/components/software-order-modal";

const services = [
  {
    id: "01",
    title: "Business & Productivity Solutions",
    image: "/images/services/windows.png",
    description:
      "Office Suites, Accounting & Payroll Systems, CRM & ERP Platforms, Team Collaboration Tools, Cloud Storage & Email Solutions",
    features: ["Office Suites (Home & Business) ", "Accounting & Payroll Systems ", "CRM & ERP Platforms", "Team Collaboration Tools ", "Cloud Storage & Email Solutions"],
  },
  {
    id: "02",
    title: "Creative & Design Software",
    image: "/images/services/adobe.png",
    description:
      "Adobe Creative Applications, Graphic Design & Video Editing Tools, AI-Powered Creative Tools, Stock Media & Cloud Assets",
    features: ["Adobe Creative Applications", "Graphic Design & Video Editing Tools", "AI-Powered Creative Tools", "Stock Media & Cloud Assets"],
  },
  {
    id: "03",
    title: "Engineering & CAD Software",
    image: "/images/services/cad.jpeg",
    description:
      "AutoCAD & 3D Modeling Tools, Architecture & Civil Engineering Suites, Mechanical & Industrial Design Software, Professional Rendering Solutions",
    features: ["AutoCAD & 3D Modeling Tools", "Architecture & Civil Engineering Suites", "Mechanical & Industrial Design Software", "Professional Rendering Solutions "],
  },
  {
    id: "04",
    title: "Operating Systems & Security",
    image: "/images/services/hadsul.png",
    description:
      "Windows & Enterprise OS Licenses, Device Management Solutions, Endpoint Protection & Security Tools",
    features: ["Windows & Enterprise OS Licenses", "Device Management Solutions ", "Endpoint Protection & Security Tools"],
  },
  {
    id: "05",
    title: "AI & Automation Tools",
    image: "/images/services/auto.png",
    description:
      "AI Writing & Coding Assistants, Image & Video Generation Tools, Business Automation Software, Usage-Based AI Credit Licensing",
    features: ["AI Writing & Coding Assistants", "Image & Video Generation Tools", "Business Automation Software", "Usage-Based AI Credit Licensing"],
  },
  {
    id: "06",
    title: "Automotive & Technical Software",
    image: "/images/services/vehi.png",
    description:
      "Vehicle Diagnostics Tools, ECU Programming Software, Fleet Management Systems, Workshop & Repair Management Platforms",
    features: ["Vehicle Diagnostics Tools", "ECU Programming Software", "Fleet Management Systems", "Workshop & Repair Management Platforms"],
  },
 
];

// Counter component for animated numbers
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
}

export function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const openOrder = (category: string) => {
    setActiveCategory(category);
    setModalOpen(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
      <SoftwareOrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} category={activeCategory} />
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Software & Licensing Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Power your business with the right tools — licensed the right way. Genuine software, instant delivery, flexible plans.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-emerald/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image on Top */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-emerald transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Order Now Button */}
                <Button
                  onClick={() => openOrder(service.title)}
                  className="bg-[#0071E3] hover:bg-[#0077ED] text-white w-full rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  ORDER NOW
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-emerald/10 to-emerald/5 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h3>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto">
              Vetted Staff, Expert Consultants, Verified software with flexible licensing options to suit your business needs
            </p> */}
          </div>

          {/* Stats in Single Row */}
          <div className="flex flex-nowrap justify-center items-center gap-6 md:gap-8 lg:gap-12 mb-12 overflow-x-auto">
            <div className="text-center flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-2xl md:text-3xl font-bold text-emerald whitespace-nowrap">
                  £<Counter end={1} />Bn
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Managed spend</p>
            </div>

            <div className="text-center flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-2xl md:text-3xl font-bold text-emerald whitespace-nowrap">
                  £<Counter end={160} />m
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Cost saving</p>
            </div>

            <div className="text-center flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-2xl md:text-3xl font-bold text-emerald whitespace-nowrap">
                  <Counter end={58} />m
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Managed hours</p>
            </div>

            <div className="text-center flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-2xl md:text-3xl font-bold text-emerald whitespace-nowrap">
                  <Counter end={99.9} suffix="%" />
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Fulfilment</p>
            </div>

            <div className="text-center flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-2xl md:text-3xl font-bold text-emerald whitespace-nowrap">
                  <Counter end={100} />%
                </h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Compliance</p>
            </div>
          </div>
          {/* Licensing Options */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/business-xray">
              <Button className="bg-emerald hover:bg-[#20bd5a] text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
                Business X-Ray
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="border-[#20bd5a] hover:bg-[#20bd5a] text-black hover:text-white rounded-full px-8 py-3 font-semibold">
                Enquire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
