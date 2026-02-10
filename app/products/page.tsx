import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { 
  // Sparkles, 
  ArrowRight, 
  Crown, 
  Diamond, 
  Gem, 
  Home,
  CheckCircle,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Products",
  // description: "Explore our subscription products: Gold On Demand, Platinum Selection, Emerald Global, and Hudsal House.",
};

const products = [
  {
    id: "gold-on-demand",
    name: "Gold On Demand",
    icon: Crown,
    color: "from-amber-600 to-amber-600",
    bgColor: "bg-amber-500",
    description: "Flexible support when you need it most. Operate without restrictive long-term commitments while getting expert oversight and staffing support.",
    highlights: [
      "Free Business Health Check",
      "Free Workforce & Rota Stress Index",
      "Free Inspection Pressure Brief",
      "Free Business Stability Scorecard",
      "Free Leadership Pressure Map",
      "Free 24/Hr Business X-Ray",
      "24/Hr On Call Support",
      "Zero No Contract",
      "Enjoy Last Minute Bookings",
      "Recruit both Permanent & Temporary Staff"
    ],
  },
  {
    id: "platinum-selection",
    name: "Platinum Selection",
    icon: Diamond,
    color: "from-slate-500 to-slate-500",
    bgColor: "bg-slate-400",
    description: "Leadership demands more than effort. Get your external strategic intelligence unit with continuous insight and proactive governance.",
    highlights: [
      "All Gold On Demand Features",
      // "Free Leadership Pressure Tracking",
      "Includes Gold On Demand Services",
      "Early warning intelligence",
      " Priority recalibration",
      "Invitation to private briefing",
      "Governed execution windows",
      "Kill-switch authority",
      "Regulatory & reputational risk control",
      "Strategic growth orchestration",
      "Monthly executive review",
      "Executive window",
      "Compliance & inspection readiness",
    ],
  },
  {
    id: "emerald-global",
    name: "Emerald Global",
    icon: Gem,
    color: "from-emerald-600 to-emerald-600",
    bgColor: "bg-emerald",
    description: "Our comprehensive global solution for healthcare organizations seeking excellence in care delivery and operational efficiency.",
    highlights: [
      "All Platinum Selection Features",
      "This is pending",
      "This is pending",
    ],
  },
  {
    id: "hudsal-house",
    name: "Hadsul House",
    icon: Home,
    color: "from-emerald-800 to-emerald-800",
    bgColor: "bg-emerald-dark",
    description: "The ultimate partnership for healthcare facilities seeking complete operational transformation and long-term success.",
    highlights: [
      "All Hadsul Features",
      "On-site Support Available",
      "This is pending",
    ],
  },
];

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge="  " 
        title="Subscription Products"
        description="Choose the perfect subscription plan for your healthcare organization. Flexible solutions designed to meet your operational needs."
      />

      {/* Products Section - Spotify-style single screen layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Choose Your Plan
              </span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Subscription Plans for Every Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From flexible on-demand support to comprehensive partnership solutions, we have the right plan for your organization.
            </p>
          </div>

          {/* Products Grid - Spotify-style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              const isRecommended = index === 2; // Emerald Global as recommended
              return (
                <div 
                  key={product.id}
                  className={`relative bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    isRecommended ? 'border-emerald shadow-emerald/20 scale-105' : 'border-border hover:border-emerald/30'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute top-0 left-0 right-0 bg-emerald text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 ${isRecommended ? 'pt-12' : ''}`}>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full backdrop-blur flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <div className="text-white/90 text-sm">
                        Starting from
                      </div>
                      <div className="text-3xl font-bold text-white">
                        £{index === 0 ? '99' : index === 1 ? '199' : index === 2 ? '299' : '499'}
                        <span className="text-lg font-normal">/month</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {product.highlights.map((highlight, highlightIndex) => (
                        <li key={`${product.id}-${highlightIndex}`} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href={`/products/${product.id}`}>
                      <Button 
                        className={`w-full rounded-full transition-all ${
                          isRecommended 
                            ? 'bg-emerald hover:bg-emerald-dark text-white shadow-lg' 
                            : 'bg-emerald/10 hover:bg-emerald hover:text-white text-emerald border border-emerald/20'
                        }`}
                      >
                        {isRecommended ? 'Get Started' : 'Learn More'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All plans include 24/7 support and can be cancelled anytime
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="rounded-full">
                Visit Our Shop
              </Button>
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Why Subscribe
              </span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Benefits of Hadsul Subscriptions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expert Oversight", description: "Get professional support and guidance from healthcare industry experts." },
              { title: "Flexible Commitment", description: "Choose plans that work for you, with no restrictive long-term contracts." },
              { title: "Continuous Support", description: "Round-the-clock assistance when operational pressure requires expert help." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
