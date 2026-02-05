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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a full range of healthcare services designed to meet the unique needs of every individual with compassion and professionalism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Additional Info */}
          <div className="lg:col-span-1">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-foreground mb-6 text-balance">
              Every Senior Deserves Our Best Services
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              At Hudsal Healthcare, we believe every senior deserves our best services—because quality care isn't a luxury, it's a right.
            </p>

            {/* CTA Button */}
            {/* <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 flex items-center gap-2">
              VIEW ALL SERVICES
              <span className="rotate-45">→</span>
            </Button> */}
          </div>

          {/* Right Column - Service Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
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

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link href={`/services/${service.slug}`} className="block group">
      <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-card hover:border-emerald/30">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-emerald transition-colors">
            <Icon className="w-7 h-7 text-emerald group-hover:text-white transition-colors" />
          </div>
          {/* Service Number */}
          {/* <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
            Service {service.id}
          </span> */}
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
