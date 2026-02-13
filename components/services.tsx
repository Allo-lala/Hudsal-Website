"use client";

import React from "react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  HeartPulse,
  Home,
  Activity,
  Users,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Stethoscope,
    title: "HealthCare stuffing ",
    slug: "medical",
    description:
      "Our experienced healthcare professionals provide routine screenings and comprehensive health assessments.",
  },
  {
    id: "02",
    icon: HeartPulse,
    title: "Consultancy ",
    slug: "nursing",
    description:
      "Every care plan is personalized to meet the unique health needs of each resident with compassion.",
  },
  {
    id: "03",
    icon: Home,
    title: "Care Homes",
    slug: "residential",
    description:
      "Our dedicated team delivers personalized care, 24/7 supervision, and medical support tailored to you.",
  },
  {
    id: "04",
    icon: Activity,
    title: "Client & Relationship Management",
    slug: "health-medical",
    description:
      "From routine health monitoring and medication management to chronic disease support and post-hospital care.",
  },
  {
    id: "05",
    icon: Users,
    title: "IT Solutions",
    slug: "senior-citizen",
    description:
      "We offer a full range of services—including medical assistance, personal care, and daily living support.",
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-32 h-32 bg-emerald rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-emerald rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
            <span className="text-emerald text-sm font-medium tracking-wider uppercase animate-fade-in">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance animate-slide-up">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up animate-delay-200">
            We provide a full range of healthcare services designed to meet the unique needs of every individual with compassion and professionalism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Additional Info */}
          <div className="lg:col-span-1 animate-slide-in-left">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-foreground mb-6 text-balance">
              Every Senior Deserves Our Best Services
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              At Hadsul Healthcare, we believe every senior deserves our best services—because quality care isn't a luxury, it's a right.
            </p>

            {/* Enhanced CTA Section */}
            <div className="space-y-4">
              <Link href="/services">
                <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-4 w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  VIEW ALL SERVICES
                  {/* <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /> */}
                </Button>
              </Link>
              
              {/* <Link href="/contact">
                <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white rounded-full px-8 py-4 w-full font-semibold transition-all duration-300">
                  Get Free Consultation
                </Button>
              </Link> */}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-6 bg-white/50 rounded-2xl border border-emerald/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald">500+</p>
                  <p className="text-sm text-muted-foreground">Satisfied Clients</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted across the UK for exceptional healthcare services
              </p>
            </div>
          </div>

          {/* Right Column - Service Cards Grid */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-emerald/10 to-emerald/5 rounded-3xl p-12 animate-slide-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Experience Quality Healthcare?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of families who trust us with their healthcare needs. Contact us today for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white rounded-full px-8 py-3 font-semibold">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  slug: string;
  description: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <Link href={`/services/${service.slug}`} className="block group">
      <div 
        className="border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-card hover:border-emerald/30 hover-lift animate-slide-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-emerald transition-colors duration-300">
            <Icon className="w-7 h-7 text-emerald group-hover:text-white transition-colors duration-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-emerald transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Arrow Link */}
        <span className="inline-flex items-center gap-2 text-muted-foreground group-hover:text-emerald transition-colors">
          <span className="text-sm font-medium">Read More</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
