import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
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
  description: "Explore Hudsal Healthcare services including healthcare staffing, residential care, nursing care, IT solutions, and professional training programs.",
};

const services = [
  {
    id: "01",
    icon: Stethoscope,
    title: "Medical Checkup",
    description: "Our experienced healthcare professionals provide routine screenings and comprehensive health assessments to ensure early detection.",
    features: ["Health Screenings", "Regular Monitoring", "GP Partnerships", "Specialist Referrals"],
    href: "/services/medical",
  },
  {
    id: "02",
    icon: HeartPulse,
    title: "Nursing Care",
    description: "Professional nursing services delivered by registered nurses, providing clinical care for complex medical needs with compassion.",
    features: ["Registered Nurses", "Medical Management", "Wound Care", "End of Life Care"],
    href: "/services/nursing",
  },
  {
    id: "03",
    icon: Home,
    title: "Residential Care",
    description: "Our residential care homes offer a safe, comfortable, and nurturing environment for seniors requiring long-term care and support.",
    features: ["Personalized Care Plans", "Qualified Staff", "Home-like Environment", "Activities Programs"],
    href: "/services/residential",
  },
  {
    id: "04",
    icon: Activity,
    title: "Health & Medical Care",
    description: "From routine health monitoring and medication management to chronic disease support and post-hospital care services.",
    features: ["Personal Care", "Medication Support", "Companionship", "Household Tasks"],
    href: "/services/health-medical",
  },
  {
    id: "05",
    icon: Users,
    title: "Senior Citizen Care",
    description: "We offer a full range of services including medical assistance, personal care, and daily living support for seniors.",
    features: ["CQC Compliant Staff", "24/7 Availability", "Thorough Vetting", "Ongoing Training"],
    href: "/services/senior-citizen",
  },
  {
    id: "06",
    icon: Laptop,
    title: "IT Solutions",
    description: "Innovative technology solutions designed specifically for healthcare providers to improve efficiency and care quality.",
    features: ["Care Management Systems", "Digital Records", "Staff Scheduling", "Compliance Tools"],
    href: "/services/it",
  },
  {
    id: "07",
    icon: GraduationCap,
    title: "Training Programs",
    description: "Accredited training courses for healthcare professionals to enhance skills and maintain compliance with regulations.",
    features: ["NVQ Qualifications", "Mandatory Training", "CPD Courses", "Leadership Programs"],
    href: "/services/training",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="Our Services" 
        title="Healthcare Services"
        description="Comprehensive healthcare solutions tailored to meet the diverse needs of individuals, families, and care providers."
      />

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                What We Offer
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Comprehensive Care Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From healthcare staffing to residential care and IT solutions, we provide end-to-end 
              services to support the healthcare sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-emerald/30"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7 text-emerald group-hover:text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                      Service {service.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
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
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
            Contact us today to discuss your healthcare needs and discover how Hudsal can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
              Get Started
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 bg-transparent">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}
