"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Palette,
  Ruler,
  Shield,
  Bot,
  Car,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Briefcase,
    title: "Business & Productivity Solutions",
    image: "/images/services/windows.png",
    description:
      "Office Suites, Accounting & Payroll Systems, CRM & ERP Platforms, Team Collaboration Tools, Cloud Storage & Email Solutions",
    features: ["Office Suites (Home & Business) ", "Accounting & Payroll Systems ", "CRM & ERP Platforms", "Team Collaboration Tools ", "Cloud Storage & Email Solutions"],
  },
  {
    id: "02",
    icon: Palette,
    title: "Creative & Design Software",
    image: "/images/services/adobe.png",
    description:
      "Adobe Creative Applications, Graphic Design & Video Editing Tools, AI-Powered Creative Tools, Stock Media & Cloud Assets",
    features: ["Adobe Creative Applications", "Graphic Design & Video Editing Tools", "AI-Powered Creative Tools", "Stock Media & Cloud Assets"],
  },
  {
    id: "03",
    icon: Ruler,
    title: "Engineering & CAD Software",
    image: "/images/services/cad.jpeg",
    description:
      "AutoCAD & 3D Modeling Tools, Architecture & Civil Engineering Suites, Mechanical & Industrial Design Software, Professional Rendering Solutions",
    features: ["AutoCAD & 3D Modeling Tools", "Architecture & Civil Engineering Suites", "Mechanical & Industrial Design Software", "Professional Rendering Solutions "],
  },
  {
    id: "04",
    icon: Shield,
    title: "Operating Systems & Security",
    image: "/images/services/hadsul.png",
    description:
      "Windows & Enterprise OS Licenses, Device Management Solutions, Endpoint Protection & Security Tools",
    features: ["Windows & Enterprise OS Licenses", "Device Management Solutions ", "Endpoint Protection & Security Tools"],
  },
  {
    id: "05",
    icon: Bot,
    title: "AI & Automation Tools",
    image: "/images/services/auto.png",
    description:
      "AI Writing & Coding Assistants, Image & Video Generation Tools, Business Automation Software, Usage-Based AI Credit Licensing",
    features: ["AI Writing & Coding Assistants", "Image & Video Generation Tools", "Business Automation Software", "Usage-Based AI Credit Licensing"],
  },
  {
    id: "06",
    icon: Car,
    title: "Automotive & Technical Software",
    image: "/images/services/vehi.png",
    description:
      "Vehicle Diagnostics Tools, ECU Programming Software, Fleet Management Systems, Workshop & Repair Management Platforms",
    features: ["Vehicle Diagnostics Tools", "ECU Programming Software", "Fleet Management Systems", "Workshop & Repair Management Platforms"],
  },
  {
    id: "07",
    icon: Shield,
    title: "Flexible Licensing Options",
    image: "/images/services/office.png",
    description:
      "One-Time Licenses, Monthly & Annual Subscriptions, Enterprise Contracts, Volume & Reseller Licensing, Centralized License Management",
    features: ["One-Time Licenses", "Monthly & Annual Subscriptions", "Enterprise Contracts", "Volume & Reseller Licensing", "Centralized License Management"],
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Software & Licensing Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Power your business with the right tools — licensed the right way. Genuine software, instant delivery, flexible plans.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-emerald/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image on Top */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-emerald transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-emerald hover:text-emerald-dark font-medium text-sm transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-emerald/10 to-emerald/5 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Verified software with flexible licensing options to suit your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Genuine & Verified</h4>
              <p className="text-sm text-muted-foreground">100% authentic licenses</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full  flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Instant Delivery</h4>
              <p className="text-sm text-muted-foreground">Get started immediately</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Flexible Plans</h4>
              <p className="text-sm text-muted-foreground">One-time or subscription</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Enterprise Support</h4>
              <p className="text-sm text-muted-foreground">Dedicated assistance</p>
            </div>
          </div>

          {/* Licensing Options */}
          <div className="text-center mb-8">
            <h4 className="font-semibold text-foreground mb-4">Flexible Licensing Options</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-foreground">
                One-Time Licenses
              </span>
              <span className="px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-foreground">
                Monthly Subscriptions
              </span>
              <span className="px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-foreground">
                Annual Plans
              </span>
              <span className="px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-foreground">
                Enterprise Contracts
              </span>
              <span className="px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-foreground">
                Volume Licensing
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
                Buy Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white rounded-full px-8 py-3 font-semibold">
                Have A Qn?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
