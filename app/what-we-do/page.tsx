import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ServiceSchema } from "@/components/service-schema";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  HeartPulse, 
  Home, 
  Activity, 
  Users, 
  ArrowRight,
  Laptop,
  GraduationCap,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "What We Do",
  description: "Comprehensive solutions including healthcare staffing, Software & Licensing Solutions, personal protective equipment, consultancy, CRM, IT solutions, and staff training. CQC registered and NHS compliant services across the UK.",
  keywords: ['healthcare staffing', 'healthcare consultancy', 'CRM healthcare', 'IT solutions healthcare', 'staff training', 'software licensing'],
  alternates: {
    canonical: 'https://hadsul.co.uk/what-we-do',
  },
  openGraph: {
    title: 'What We Do | Hadsul',
    description: 'Comprehensive healthcare solutions tailored to meet diverse needs of individuals, families & agencies',
    url: 'https://hadsul.co.uk/what-we-do',
    images: ['/images/logo.png'],
  },
};

const services = [
  {
    id: "01",
    icon: Stethoscope,
    title: "Healthcare Staffing",
    description: "Experienced and fully vetted healthcare professionals across the United Kingdom, including but not limited to:",
    features: ["HCA/MHA/Support Worker", "Nurses ", "Cleaners", "Team Leaders", "Kitchen Assistants "],
    href: "/what-we-do/healthcare-staffing",
    image: "/images/services/staffing.png",
  },
  {
    id: "02",
    icon: HeartPulse,
    title: "Consultancy",
    description: "Expert guidance that strengthens operations, improves efficiency with ROI. Our consultancy spans key areas, including:",
    features: ["IT Consultancy ", "Financial Consultancy", "Health Care Consultancy"],
    href: "/what-we-do/consultancy",
    image: "/images/services/it-solutions.png",
  },
  {
    id: "04",
    icon: Activity,
    title: "Client Relationship Management (CRM)",
    description: "Free, all-in-one CRM & simplify operations with full simple control over workflows. Centralise staff management, automate Rota, streamline payments with real-time reports. A one-size-fits-all free solution built for modern care homes.",
    features: [],
    href: "/what-we-do/client-relationship-manager",
    image: "/images/services/crm.png",
  },
  {
    id: "06",
    icon: Laptop, 
    title: "Free Inspection & Compliance Foresight",
    description: "Continuous analysis of regulatory landscapes and your operational data to predict and prepare for inspection focus areas, moving from reactive compliance to proactive readiness. ",
    features: [],
    href: "/what-we-do/it-solutions",
    image: "/images/services/it-solutions.png",
  },
  {
    id: "08",
    icon: GraduationCap,
    title: "Career Training & Coaching",
    description: "Hands-on training for trainees and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.",
    features: [],
    href: "/what-we-do/staff-training",
    image: "/images/services/training.png",
  },
  {
    id: "09",
    icon: Laptop,
    title: "Free External Perspective & Governance Support",
    description: "An objective, experienced viewpoint on your operations and governance structures, challenging assumptions and ensuring robust decision-making frameworks are in place.",
    features: [ ],
    href: "/what-we-do/software-licensing-solutions",
    image: "/images/services/solutions.avif",
  },
  
];

export default function ServicesPage() {
  return (
    <main>
      <ServiceSchema />
      <Header />
      <PageHeader 
        badge=" " 
        title="What We Do"
        description="Comprehensive solutions tailored to meet the diverse needs of individuals, families & Agencies."
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                What We Offer
              </span> */}
            </div>
            {/* <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Comprehensive Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Healthcare staffing, Staff training to Consultancy and IT solutions. We provide end-to-end  
              services for efficiency, compliance and growth.
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              return (
                <div 
                  key={service.id} 
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-emerald/30"
                >
                  {/* Service Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-emerald transition-colors">{service.title}</h3> 
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" />
                          {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-2 text-emerald hover:text-emerald-dark font-medium text-sm transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a2e1a] dark:bg-[#0f1a0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Ready to Experience Quality ?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Contact us today to discuss your needs and discover how Hadsul can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business-xray">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
                Business X-ray
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 bg-transparent">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}
