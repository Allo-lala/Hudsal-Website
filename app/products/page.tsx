"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ProductSchema } from "@/components/product-schema";
import { Button } from "@/components/ui/button";
import { SubscriptionModal } from "@/components/subscription-modal";
import { 
  ArrowRight, 
  Crown, 
  Diamond, 
  Gem, 
  Home,
  CheckCircle,
  Phone,
} from "lucide-react";

const products = [
  {
    id: "gold-on-demand",
    name: "Gold On Demand",
    icon: Crown,
    image: "/images/below/goldpro.png",
    color: "from-amber-600 to-amber-600",
    bgColor: "bg-amber-500",
    description: "Operate without restrictive long-term commitments",
    subscriptionDescription: "Gold On Demand is a Do-It-Yourself (DIY) package for those with full control but need expert support on standby. Operate as you wish and only use Hadsul when needed. Zero contracts, free pressure mapping, with last-minute support.",
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
    image: "/images/below/platinumpro.png",
    color: "from-slate-500 to-slate-500",
    bgColor: "bg-slate-400",
    description: "Get external strategic intelligence with continuous insights.",
    subscriptionDescription: "With Platinum Selection, we Do It With You (DWY). You work side-by-side with Hadsul’s strategic intelligence unit, gaining continuous insight, proactive governance, and guided operational support. Together, we elevate with collaborative precision and ongoing expert oversight.",
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
    image: "/images/below/emeraldpro.png",
    color: "from-emerald-600 to-emerald-600",
    bgColor: "bg-emerald",
    description: "Get outstanding results completely stress-free",
    subscriptionDescription: "With Emerald Global, we Do It For You (DFY). Hadsul takes full ownership of operations—delivering a completely stress-free experience engineered for outstanding results without you lifting a finger.",
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
    image: "/images/below/hadsulpro.png",
    color: "from-emerald-800 to-emerald-800",
    bgColor: "bg-emerald-dark",
    description: "This is a, reserved, private and an invitation-only.",
    subscriptionDescription: "Hadsul House is a private, invitation-only service reserved for those seeking unmatched precision and operational mastery. Our senior experts take full command, delivering elite stewardship and flawless execution at every level.",
    highlights: [
      "All Emerald Global Features",
      "On-site Support Available",
      "This is pending",
    ],
  },
];

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  } | null>(null);

  const handleSubscribeClick = (productName: string, productDescription: string, productIcon: React.ComponentType<{ className?: string }>) => {
    setSelectedProduct({ name: productName, description: productDescription, icon: productIcon });
    setIsModalOpen(true);
  };

  return (
    <main>
      <ProductSchema />
      <Header />
      <PageHeader 
        badge="  " 
        title="Subscription Products"
        description="Choose the perfect subscription plan for your organization. Flexible solutions for a Return On Investments."
      />

      {/* Subscription Modal */}
      {selectedProduct && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          productName={selectedProduct.name}
          productDescription={selectedProduct.description}
          productIcon={selectedProduct.icon}
        />
      )}

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
              Subscription Plans
            </h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto">
              From flexible on-demand support to comprehensive partnership solutions, we have the right plan for your organization.
            </p> */}
          </div>

          {/* Products Grid - Spotify-style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const isRecommended = index === 3; // Hadsul House recommended (index 3)
              return (
                <div key={product.id} className="relative">
                  {/* Crown for Hadsul House - positioned relative to the container, not the card */}
                  {index === 3 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
                      <Image
                        src="/images/below/crown.avif"
                        alt="Crown"
                        width={50}
                        height={50}
                        className="object-contain animate-pulse"
                      />
                    </div>
                  )}

                  <div 
                    className={`group relative bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      isRecommended ? 'border-emerald shadow-emerald/20 scale-105 mt-8' : 'border-border hover:border-emerald/30'
                    }`}
                  >
                    {/* Product Name Badge at Top */}
                    <div className={`absolute top-0 left-0 right-0 text-white text-center py-2 text-sm font-medium z-10 ${
                      index === 0 ? 'bg-[#d9b85d]' : // color for God on demand, I need to change it to gold from yellow
                      index === 1 ? 'bg-slate-500' : 
                      index === 2 ? 'bg-emerald' : 
                      'bg-emerald-800'
                    }`}>
                      {product.name}
                    </div>
                  
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden mt-10 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Price Overlay - Slides in on hover */}
                    {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white/90 text-xs">
                        Starting from
                      </div>
                      <div className="text-2xl font-bold text-white">
                        £{index === 0 ? '99' : index === 1 ? '199' : index === 2 ? '299' : '499'}
                        <span className="text-sm font-normal">/month</span>
                      </div>
                    </div> */}
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
                    <Button 
                      onClick={() => handleSubscribeClick(product.name, product.subscriptionDescription, product.icon)}
                      className={`w-full rounded-full transition-all ${
                        isRecommended 
                          ? 'bg-emerald hover:bg-emerald-dark text-white shadow-lg' 
                          : 'bg-emerald/10 hover:bg-emerald hover:text-white text-emerald border border-emerald/20'
                      }`}
                    >
                      {index === 3 ? 'Invite Only' : 'Subscribe'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
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
              { title: "Expert Oversight", description: "Get professional support and guidance from industry experts." },
              { title: "Flexible Commitment", description: "Choose plans that work for you, with no restrictive long-term contracts." },
              { title: "Continuous Support", description: "Rapid responses & assistance when pressure requires expert help." },
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
          <a href="/business-xray" className="inline-block">
          <Button  className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
            {/* <Phone className="w-5 h-5 mr-2" /> */}
            Take Assesement
          </Button>
          </a>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}
