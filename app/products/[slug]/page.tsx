"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SubscriptionModal } from "@/components/subscription-modal";
import {
  ArrowLeft,
  Crown,
  Diamond,
  Gem,
  Home,
  CheckCircle,
  HeartPulse,
  Shield,
  Clock,
  Users,
  BarChart3,
  FileCheck,
  Zap,
  Phone,
  Building,
  Globe,
  Award,
} from "lucide-react";

const productsData: Record<string, {
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  features: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }[];
  included: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }[];
}> = {
  "gold-on-demand": {
    name: "Gold On Demand",
    tagline: "Flexible Support When You Need It Most",
    description: "Operate without restrictive long-term commitments. Remain in control, using Hudsal when operational pressure requires expert oversight and staffing support. Our Gold On Demand service provides rapid response when gaps appear unexpectedly.",
    icon: Crown,
    color: "from-amber-600 to-amber-600",
    bgColor: "bg-amber-500",
    features: [
      {
        title: "Free Business Health Check",
        description: "Comprehensive assessment of your organization's operational health to identify areas for improvement and optimization.",
        icon: HeartPulse,
      },
      {
        title: "Free Workforce & Rota Stress Index",
        description: "Detailed analysis of your staffing patterns and scheduling to reduce workforce stress and improve efficiency.",
        icon: Users,
      },
      {
        title: "Free Inspection Pressure Brief",
        description: "Preparation and guidance for regulatory inspections to ensure your facility meets all compliance requirements.",
        icon: FileCheck,
      },
    ],
    included: [
      {
        title: "Free Leadership Pressure Map",
        description: "Visual mapping of leadership responsibilities and pressure points to optimize management effectiveness.",
        icon: BarChart3,
      },
      {
        title: "Zero No Contract",
        description: "Operate without restrictive long-term commitments. You remain in control of when and how you use our services.",
        icon: Shield,
      },
      {
        title: "Last Minute Booking Support",
        description: "Rapid response when staffing gaps appear unexpectedly. Need a staff member in your care home urgently? We assist you immediately.",
        icon: Zap,
      },
    ],
  },
  "platinum-selection": {
    name: "Platinum Selection",
    tagline: "Strategic Intelligence for Decisive Leadership",
    description: "Leadership demands more than effort—it's a structured, continuous interpretation of reality. With Platinum Selection, get an external intelligence framework that transforms data into decisive action. Our suite of integrated service functions serves as your external strategic intelligence unit.",
    icon: Diamond,
    color: "from-slate-500 to-slate-500",
    bgColor: "bg-slate-400",
    features: [
      {
        title: "Free Access to Hudsal CRM",
        description: "Full access to our Customer Relationship Management system designed specifically for healthcare organizations.",
        icon: Building,
      },
      {
        title: "Free Leadership Pressure Tracking",
        description: "Continuous monitoring and reporting on leadership performance metrics and organizational pressure points.",
        icon: BarChart3,
      },
      {
        title: "Free Inspection & Compliance Foresight",
        description: "Proactive compliance monitoring and preparation to ensure you're always ready for regulatory reviews.",
        icon: FileCheck,
      },
    ],
    included: [
      {
        title: "Free Workforce & Rota Stabilisation",
        description: "Ongoing support to maintain stable staffing levels and optimize scheduling for operational efficiency.",
        icon: Users,
      },
      {
        title: "External Perspective & Governance Support",
        description: "Independent oversight and governance guidance to strengthen organizational decision-making.",
        icon: Shield,
      },
      {
        title: "Gold On Demand Services Included",
        description: "All benefits of our Gold On Demand tier are included, providing comprehensive flexible support.",
        icon: Crown,
      },
    ],
  },
  "emerald-global": {
    name: "Emerald Global",
    tagline: "Comprehensive Global Healthcare Solutions",
    description: "Our most comprehensive solution for healthcare organizations seeking excellence in care delivery and operational efficiency on a global scale. Emerald Global combines all our premium services with expanded international support.",
    icon: Gem,
    color: "from-emerald-600 to-emerald-600",
    bgColor: "bg-emerald",
    features: [
      {
        title: "All Platinum Selection Features",
        description: "Every feature from our Platinum Selection tier is included, providing a solid foundation of strategic support.",
        icon: Diamond,
      },
      {
        title: "Global Support Network",
        description: "Access to our worldwide network of healthcare professionals and consultants for international operations.",
        icon: Globe,
      },
      {
        title: "Premium Analytics Dashboard",
        description: "Advanced data visualization and analytics tools for comprehensive organizational insights.",
        icon: BarChart3,
      },
    ],
    included: [
      {
        title: "International Compliance Support",
        description: "Guidance on meeting healthcare regulations across different jurisdictions and countries.",
        icon: FileCheck,
      },
      {
        title: "24/7 Priority Support",
        description: "Round-the-clock access to our expert team with priority response for urgent matters.",
        icon: Clock,
      },
      {
        title: "Custom Integration Services",
        description: "Tailored integration with your existing systems and workflows for seamless operations.",
        icon: Zap,
      },
    ],
  },
  "hudsal-house": {
    name: "Hudsal House",
    tagline: "The Ultimate Healthcare Partnership",
    description: "The pinnacle of healthcare operational partnership. Hudsal House provides complete operational transformation with dedicated resources, on-site support, and a long-term commitment to your organization's success.",
    icon: Home,
    color: "from-emerald-800 to-emerald-800",
    bgColor: "bg-emerald-dark",
    features: [
      {
        title: "All Emerald Global Features",
        description: "Complete access to every feature from our Emerald Global tier as the foundation of your partnership.",
        icon: Gem,
      },
      {
        title: "Dedicated Account Manager",
        description: "A personal account manager who understands your organization intimately and advocates for your needs.",
        icon: Users,
      },
      {
        title: "On-Site Support Available",
        description: "When needed, our experts can work directly at your facilities to provide hands-on assistance.",
        icon: Building,
      },
    ],
    included: [
      {
        title: "Strategic Planning Partnership",
        description: "Collaborative long-term planning to align our services with your organizational growth goals.",
        icon: Award,
      },
      {
        title: "Executive Leadership Access",
        description: "Direct communication channels with Hudsal's senior leadership for strategic discussions.",
        icon: Crown,
      },
      {
        title: "Customized Training Programs",
        description: "Bespoke training and development programs designed specifically for your team's needs.",
        icon: Shield,
      },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productsData[slug];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you are looking for does not exist.</p>
            <Link href="/products">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = product.icon;

  return (
    <main>
      <Header />
      
      {/* Page Header */}
      <section className={`bg-gradient-to-r ${product.color} py-20  px-8 sm:px-6 lg:px-8 text-center pt-32 pb-20 overflow-hidden`}>



   {/*  <div className="max-w-5xl mx-5x1 justify-center p-24 flex items-center gap-6 mb-8">*/}
          <Link 
            href="/products" 
            className=" items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
           {/*ArrowLeft className="w-5 h-6" />
            <span>BACK</span>*/}
          </Link>
          
         
    {/*   <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
          <div className="flex item-center gap-6 mb-8">
          
          <Icon className="w-10 h-11 text-white inline-flex"/>
            </div>*/}
   {/*        <div>
              <div className=">
                {/* <Sparkles className="w-4 h-4 text-white/70" /> */}
                <span className="text-white/70 text-sm font-medium tracking-wider uppercase" />
                 {/*Subscription Product*/} 
                
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {product.name}
              </h1>
             
     {/*    </div>  */}
        
     {/*    </div> */}
         
          <p className="text-white/90 text-xl max-w-3x text-center">
            {product.tagline}
          </p>

       {/* /div>
        </div>*/}
      </section>

      {/* Description Section */}
      <section className="flex justify-center p-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                What You Get
              </span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <FeatureIcon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-emerald" />
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Also Included
              </span>
            </div> */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              What's Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.included.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <ItemIcon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a2e1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Ready to Get Started with {product.name}?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Subscribe today and transform your healthcare organization's operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3"
            >
              Subscribe Now
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productDescription={product.description}
      />
    </main>
  );
}
