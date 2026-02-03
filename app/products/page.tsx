import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Diamond, 
  Gem, 
  Home,
  CheckCircle,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Subscription Products - Hudsal",
  description: "Explore our subscription products: Gold On Demand, Platinum Selection, Emerald Global, and Hudsal House.",
};

const products = [
  {
    id: "gold-on-demand",
    name: "Gold On Demand",
    icon: Crown,
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-500",
    description: "Flexible support when you need it most. Operate without restrictive long-term commitments while getting expert oversight and staffing support.",
    highlights: [
      "Free Business Health Check",
      "Free Workforce & Rota Stress Index",
      "Free Inspection Pressure Brief",
    ],
  },
  {
    id: "platinum-selection",
    name: "Platinum Selection",
    icon: Diamond,
    color: "from-slate-300 to-slate-500",
    bgColor: "bg-slate-400",
    description: "Leadership demands more than effort. Get your external strategic intelligence unit with continuous insight and proactive governance.",
    highlights: [
      "Free Access to Hudsal CRM",
      "Free Leadership Pressure Tracking",
      "Includes Gold On Demand Services",
    ],
  },
  {
    id: "emerald-global",
    name: "Emerald Global",
    icon: Gem,
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald",
    description: "Our comprehensive global solution for healthcare organizations seeking excellence in care delivery and operational efficiency.",
    highlights: [
      "All Platinum Selection Features",
      "Global Support Network",
      "Premium Analytics Dashboard",
    ],
  },
  {
    id: "hudsal-house",
    name: "Hudsal House",
    icon: Home,
    color: "from-emerald-600 to-emerald-800",
    bgColor: "bg-emerald-dark",
    description: "The ultimate partnership for healthcare facilities seeking complete operational transformation and long-term success.",
    highlights: [
      "All Emerald Global Features",
      "Dedicated Account Manager",
      "On-site Support Available",
    ],
  },
];

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="Our Products" 
        title="Subscription Products"
        description="Choose the perfect subscription plan for your healthcare organization. Flexible solutions designed to meet your operational needs."
      />

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Choose Your Plan
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Subscription Plans for Every Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From flexible on-demand support to comprehensive partnership solutions, we have the right plan for your organization.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald/30 transition-all duration-300">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${product.color} p-6`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {product.name}
                          </h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-3 mb-6">
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                            <span className="text-foreground text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Button className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full group-hover:shadow-lg transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Why Subscribe
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Benefits of Hudsal Subscriptions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expert Oversight", description: "Get professional support and guidance from healthcare industry experts." },
              { title: "Flexible Commitment", description: "Choose plans that work for you, with no restrictive long-term contracts." },
              { title: "Continuous Support", description: "Round-the-clock assistance when operational pressure requires expert help." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a2e1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Not Sure Which Plan is Right for You?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Our team is here to help you choose the perfect subscription for your organization.
          </p>
          <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
            <Phone className="w-5 h-5 mr-2" />
            Contact Our Team
          </Button>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}
