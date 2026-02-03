import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Heart, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Care Professionals" },
  { icon: Heart, value: "10,000+", label: "Patients Served" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const certifications = [
  {
    name: "CQC",
    fullName: "Care Quality Commission",
    logo: "/images/certifications/cqc-logo.svg",
    description: "Regulated by the Care Quality Commission"
  },
  {
    name: "NHS",
    fullName: "National Health Service",
    logo: "/images/certifications/nhs-logo.svg",
    description: "NHS Approved Healthcare Provider"
  },
  {
    name: "UK Employment",
    fullName: "UK Employment Standards",
    logo: "/images/certifications/uk-employment-logo.svg",
    description: "Compliant with UK Employment Standards"
  }
];

export function AboutSection() {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image with stats overlay like the inspiration */}
            <div className="relative">
              {/* Main image container */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Hudsal Healthcare facility"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating stats cards - positioned like the inspiration */}
              <div className="absolute -top-4 -right-4 bg-emerald rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Happy Customers</span>
                </div>
                <p className="text-3xl font-bold">25K+</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Customer Support</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">15K+</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-emerald" />
                <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                  About Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Our mission is to provide accurate and timely medical diagnostic services to help you take control of your health.
              </h2>
              
              {/* Three feature boxes like the inspiration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-[#1a2e1a] rounded-2xl p-6">
                <div className="text-center text-white">
                  <div className="w-12 h-12 rounded-lg bg-emerald/20 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-2">Highest Level Expertise</h3>
                  <p className="text-sm text-white/70">We stay up to date with the latest medical advancements to ensure safe, effective, and compassionate care.</p>
                </div>
                
                <div className="text-center text-white">
                  <div className="w-12 h-12 rounded-lg bg-emerald/20 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-2">Additional Services will Grow</h3>
                  <p className="text-sm text-white/70">With Grankare, every individual gets the attention and support they deserve, ensuring continued growth in health.</p>
                </div>
                
                <div className="text-center text-white">
                  <div className="w-12 h-12 rounded-lg bg-emerald/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-2">97% Client Satisfaction</h3>
                  <p className="text-sm text-white/70">When you choose Grankare, you're choosing a care provider that consistently exceeds expectations and delivers top-tier service.</p>
                </div>
              </div>
              
              <Link href="/about">
                <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Slider Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Our Certifications
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certified & Regulated Healthcare Provider
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards through our certifications and regulatory compliance.
            </p>
          </div>

          {/* Certifications Slider */}
          <div className="relative">
            <div className="flex justify-center items-center gap-8 md:gap-12">
              {certifications.map((cert, index) => (
                <div key={cert.name} className="flex flex-col items-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-lg border border-border flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow">
                    <Image
                      src={cert.logo}
                      alt={cert.fullName}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground text-center">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
