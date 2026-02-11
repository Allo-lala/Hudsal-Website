"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Users, Award, Clock, Heart, Stethoscope, Laptop, Calculator, CheckCircle, ChevronDown } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Care Professionals" },
  { icon: Heart, value: "10,000+", label: "Residents Served" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const services = [
  {
    title: "Healthcare Staffing",
    icon: Stethoscope,
    items: [
      "HCA/MHA/Support Worker",
      "Nurses",
      "Cleaners", 
      "Kitchen Assistants",
      "Team Leader"
    ]
  },
  {
    title: "Consultancy",
    icon: Calculator,
    items: [
      "IT Solutions",
      "Financial Management & Advisory",
      "Operational Efficiency Consulting",
      "Compliance & Regulatory Support",
      "Strategic Planning & Development"
    ]
  },
  {
    title: "IT Solutions",
    icon: Laptop,
    items: [
      "Care Management Systems",
      "Electronic Health Records (EHR)",
      "Staff Scheduling & Rota Management",
      "Compliance Tracking Software",
      "Digital Communication Platforms"
    ]
  }
];

const serviceDetails = [
  // Healthcare Staffing Details
  {
    category: "Healthcare Staffing",
    items: [
      {
        title: "HCA/MHA/Support Worker",
        description: "Our Healthcare Assistants and Mental Health Assistants provide essential support to patients with daily living activities, personal care, and emotional support. They work under the supervision of qualified nurses to ensure comprehensive care delivery."
      },
      {
        title: "Nurses",
        description: "Our registered nurses are fully qualified professionals who provide clinical care, medication administration, wound care, and health monitoring. They are CQC compliant and maintain continuous professional development to ensure the highest standards of care."
      },
      {
        title: "Cleaners",
        description: "Our cleaning staff maintain the highest standards of hygiene and infection control in healthcare environments. They are trained in healthcare-specific cleaning protocols and use appropriate cleaning agents to ensure safe, sanitized environments."
      },
      {
        title: "Kitchen Assistants",
        description: "Our kitchen assistants prepare nutritious meals according to dietary requirements and health conditions. They maintain food safety standards, assist with meal service, and ensure residents receive proper nutrition tailored to their needs."
      },
      {
        title: "Team Leader",
        description: "Our team leaders coordinate care delivery, supervise staff, and ensure quality standards are maintained. They provide leadership, training, and support to care teams while maintaining effective communication with families and healthcare professionals."
      }
    ]
  },
  // Consultancy Details
  {
    category: "Consultancy",
    items: [
      {
        title: "IT Solutions",
        description: "We provide comprehensive IT consultancy to modernize healthcare operations. Our experts assess current systems, recommend improvements, and implement technology solutions that enhance efficiency, compliance, and patient care quality."
      },
      {
        title: "Financial Management & Advisory",
        description: "Our financial consultancy services include budget planning, cost optimization, revenue management, and financial compliance for healthcare organizations. We help optimize operational costs while maintaining quality care standards and ensuring sustainable business growth."
      },
      {
        title: "Operational Efficiency Consulting",
        description: "We analyze healthcare operations to identify inefficiencies and implement process improvements. Our consultants work with organizations to streamline workflows, reduce waste, and optimize resource allocation for better patient outcomes."
      },
      {
        title: "Compliance & Regulatory Support",
        description: "Our compliance experts ensure healthcare organizations meet CQC standards, NHS requirements, and other regulatory obligations. We provide ongoing support, training, and documentation to maintain compliance and prepare for inspections."
      },
      {
        title: "Strategic Planning & Development",
        description: "We assist healthcare organizations in developing long-term strategies for growth, service expansion, and market positioning. Our strategic consultancy includes market analysis, business planning, and implementation roadmaps for sustainable development."
      }
    ]
  },
  // IT Solutions Details
  {
    category: "IT Solutions",
    items: [
      {
        title: "Care Management Systems",
        description: "Comprehensive software solutions that manage resident information, care plans, and daily activities. These systems streamline care coordination, improve communication between staff, and ensure consistent care delivery across all shifts."
      },
      {
        title: "Electronic Health Records (EHR)",
        description: "Digital health record systems that securely store and manage patient information, medical histories, and treatment plans. Our EHR solutions ensure data accuracy, improve accessibility, and maintain compliance with data protection regulations."
      },
      {
        title: "Staff Scheduling & Rota Management",
        description: "Advanced scheduling software that optimizes staff allocation, manages shift patterns, and ensures adequate coverage. The system handles complex scheduling requirements, tracks qualifications, and maintains compliance with working time regulations."
      },
      {
        title: "Compliance Tracking Software",
        description: "Specialized software that monitors and tracks compliance requirements, training records, and certification renewals. The system provides alerts, generates reports, and ensures organizations maintain regulatory compliance at all times."
      },
      {
        title: "Digital Communication Platforms",
        description: "Secure communication systems that facilitate information sharing between staff, families, and healthcare professionals. These platforms improve coordination, reduce communication errors, and enhance family engagement in care processes."
      }
    ]
  }
];

const values = [
  {
    title: "Compassion",
    description: "We treat every individual with kindness, empathy, and respect, understanding that each person has unique needs.",
  },
  {
    title: "Excellence",
    description: "We strive for the highest standards in healthcare delivery, continuously improving our services and practices.",
  },
  {
    title: "Integrity",
    description: "We operate with transparency and honesty, building trust with our patients, families, and partners.",
  },
  {
    title: "Innovation",
    description: "We embrace new technologies and methods to enhance care quality and operational efficiency.",
  },
];

export default function AboutPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    document.title = "About Us | Hudsal Limited";
  }, []);

  const toggleItem = (itemKey: string) => {
    setOpenItems(prev =>
      prev.includes(itemKey)
        ? prev.filter(item => item !== itemKey)
        : [...prev, itemKey]
    );
  };
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="About Hadsul Healthcare"
        description="Dedicated to providing exceptional healthcare services with compassion and professionalism."
      />

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/podcast.jpeg"
                alt="Healthcare staff"
                fill
                className="object-cover"
              />
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-emerald">{stat.value}</p>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
                <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Leading Healthcare Provider in the UK
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded with a vision to transform healthcare delivery, Hudsal Healthcare has grown 
                to become one of the UK&apos;s most trusted names in care services. We combine clinical 
                expertise with genuine compassion to deliver exceptional outcomes for our patients and partners.
              </p>

              {/* Mission */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional healthcare services that enhance the quality of life for individuals 
                  and families across the UK. We are committed to providing compassionate, professional, and 
                  personalized care that respects the dignity and independence of every person we serve.
                </p>
              </div>

              {/* Vision */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and innovative healthcare provider in the UK, setting new standards 
                  for excellence in care delivery. We envision a future where every individual has access to 
                  high-quality healthcare services that truly make a difference in their lives.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.slice(2).map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-emerald" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3">
                Our Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              We provide a full range of healthcare services, consultancy, and IT solutions to meet diverse needs across the healthcare sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const categoryDetails = serviceDetails.find(cat => cat.category === service.title);
              
              return (
                <div 
                  key={service.title} 
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                  
                  <div className="space-y-3">
                    {service.items.map((item) => {
                      const itemKey = `${service.title}-${item}`;
                      const isOpen = openItems.includes(itemKey);
                      const itemDetail = categoryDetails?.items.find(detail => detail.title === item);
                      
                      return (
                        <div key={item} className="border border-border/50 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-secondary/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" />
                              <span className="text-muted-foreground text-sm font-medium">{item}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && itemDetail && (
                            <div className="px-4 pb-3 pt-1 border-t border-border/30 bg-secondary/10">
                              <p className="text-muted-foreground text-xs leading-relaxed">{itemDetail.description}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Our Core Values
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
