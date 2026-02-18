import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
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
  title: "Our Services ",
  // description: "Explore Hadsul Healthcare services including healthcare staffing, residential care, nursing care, IT solutions, and professional training programs.",
};

const services = [
  {
    id: "01",
    icon: Stethoscope,
    title: "Healthcare Staffing",
    description: "Our experienced healthcare professionals provide routine screenings and comprehensive health assessments to ensure early detection.",
    features: ["HCA/MHA/Support Worker", "Nurses ", "Cleaners", "Team Leaders", "Kitchen Assistants "],
    href: "/services/healthcare-staffing",
    image: "/images/services/staffing.jpg",
  },
  {
    id: "02",
    icon: HeartPulse,
    title: "Consultancy",
    description: "Professional nursing services delivered by registered nurses, providing clinical care for complex medical needs with compassion.",
    features: ["IT Consultancy ", "Financial Consultancy", "Health Care Consultancy"],
    href: "/services/consultancy",
    image: "/images/services/consult.jpg",
  },
  {
    id: "03",
    icon: Home,
    title: "Home Care",
    description: "Our residential care homes offer a safe, comfortable, and nurturing environment for seniors requiring long-term care and support across the UK with a wide including but not limited to...",
    features: ["west sussex ", "East sussex ", " East Grin", "Chichester"],
    href: "/services/homecare",
    image: "/images/services/homecare.jpg",
  },
  {
    id: "04",
    icon: Activity,
    title: "Client Relationship Management (CRM)",
    description: "From routine health monitoring and medication management to chronic disease support and post-hospital care services.",
    features: ["Personal Care", "Medication Support", "Companionship", "Household Tasks"],
    href: "/services/client-relationship-manager",
    image: "/images/services/crm.webp",
  },
  {
    id: "05",
    icon: Users,
    title: "Companionship Services",
    description: "Our systems offers a full range of services including medical assistance, personal care, and daily living support for residents icluding.....",
    features: ["CQC Compliant Staff", "24/7 Availability", "Thorough Vetting", "Ongoing Training"],
    href: "/services/companionship-services",
    image: "/images/services/companion.jpg",
  },
  {
    id: "06",
    icon: Laptop,
    title: "IT Solutions",
    description: "Innovative technology solutions designed specifically for healthcare providers to improve efficiency and care quality.",
    features: ["Care Management Systems", "Digital Records", "Staff Scheduling", "Compliance Tools"],
    href: "/services/it-solutions",
    image: "/images/services/solutions.avif",
  },
  {
    id: "07",
    icon: GraduationCap,
    title: "Palliative Care at Home",
    description: "Accredited training courses for healthcare professionals to enhance skills and maintain compliance with regulations.",
    features: ["NVQ Qualifications", "Mandatory Training", "CPD Courses", "Leadership Programs"],
    href: "/services/palliative-care-at-home",
    image: "/images/services/Palliative.jpg",
  },
  {
    id: "08",
    icon: HeartPulse,
    title: "Respite Care",
    description: "Temporary relief care services for family caregivers, providing professional support while you take a well-deserved break.",
    features: ["Short-term Care", "Flexible Scheduling", "Professional Caregivers", "Peace of Mind"],
    href: "/services/respite-care",
    image: "/images/services/recipite.jpg",
  },
  {
    id: "09",
    icon: Home,
    title: "Private Care",
    description: "Personalized one-on-one care services tailored to your specific needs, providing dedicated support in the comfort of your home.",
    features: ["One-on-One Care", "Personalized Plans", "Flexible Hours", "Dedicated Caregiver"],
    href: "/services/private-care",
    image: "/images/services/private.jpg",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Healthcare Services"
        description="Comprehensive healthcare solutions tailored to meet the diverse needs of individuals, families, and care providers."
      />

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                What We Offer
              </span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Comprehensive Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From healthcare to Consultancy and IT solutions, we provide end-to-end  
              services to support the healthcare sector.
            </p>
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
            Ready to Experience Quality Healthcare?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Contact us today to discuss your healthcare needs and discover how Hadsul can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
                Get Started
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
