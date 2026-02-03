import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Heart, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Care Professionals" },
  { icon: Heart, value: "10,000+", label: "Patients Served" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-hero.jpg"
              alt="Hudsal Healthcare facility"
              fill
              className="object-cover"
            />
            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-emerald">{stat.value}</p>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
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
              Leading Healthcare Provider in the UK
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Founded with a vision to transform healthcare delivery, Hudsal Healthcare has grown 
              to become one of the UK&apos;s most trusted names in care services. We combine clinical 
              expertise with genuine compassion to deliver exceptional outcomes for our patients and partners.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our comprehensive range of services includes healthcare staffing, residential care, 
              domiciliary support, and innovative IT solutions designed specifically for the healthcare sector. 
              We are CQC registered and NHS compliant, ensuring the highest standards of care delivery.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.slice(2).map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
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
  );
}
