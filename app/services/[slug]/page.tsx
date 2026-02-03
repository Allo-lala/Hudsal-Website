"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sparkles,
  Stethoscope,
  HeartPulse,
  Home,
  Activity,
  Users,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const servicesData: Record<string, {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  shortContent: string;
  fullContent: string;
}> = {
  medical: {
    title: "Medical Checkup",
    description: "Comprehensive health assessments and screenings",
    icon: Stethoscope,
    image: "/images/hero-care.jpg",
    shortContent: "Our experienced healthcare professionals provide routine screenings and comprehensive health assessments to ensure early detection and prevention of health issues. We offer comprehensive health screenings, regular vital signs monitoring, blood tests and diagnostics, and specialist consultations.",
    fullContent: `Our experienced healthcare professionals provide routine screenings and comprehensive health assessments to ensure early detection and prevention of health issues.

We offer a complete range of medical checkup services including:

- Comprehensive health screenings to evaluate your overall health status
- Regular vital signs monitoring including blood pressure, heart rate, and temperature
- Blood tests and diagnostics to detect underlying conditions
- Specialist consultations with our network of experienced doctors
- Health risk assessments to identify potential future health concerns
- Personalized health reports with actionable recommendations

Our medical checkup process begins with scheduling an appointment at your convenience. During your visit, our team reviews your medical history and addresses any current concerns. We then conduct a thorough physical examination along with necessary tests. Finally, you receive a detailed report with personalized health recommendations.

Early detection is key to preventing serious health issues. Regular checkups provide peace of mind and ensure you stay on top of your health. Our qualified healthcare professionals are dedicated to providing expert care in a comfortable environment.

Whether you need an annual health check or have specific health concerns, our team is here to help. We work with you to create a preventive care plan that fits your lifestyle and health goals.`,
  },
  nursing: {
    title: "Nursing Care",
    description: "Professional nursing services with compassion",
    icon: HeartPulse,
    image: "/images/hero-care.jpg",
    shortContent: "Every care plan is personalized to meet the unique health needs of each resident with compassion and professionalism from our registered nurses. We provide 24/7 registered nurse availability, medication management, wound care, and post-operative care.",
    fullContent: `Every care plan is personalized to meet the unique health needs of each resident with compassion and professionalism from our registered nurses.

Our nursing care services include:

- 24/7 registered nurse availability for round-the-clock support
- Medication management to ensure proper dosing and timing
- Wound care and dressing with sterile techniques
- Post-operative care for recovery after surgery
- Chronic disease management for long-term conditions
- End of life care support with dignity and compassion

Our nursing team consists of qualified registered nurses with extensive experience in various healthcare settings. Each nurse undergoes rigorous training and continuous professional development to stay current with best practices.

The nursing care process starts with a comprehensive assessment of your care needs. We then develop a personalized nursing care plan tailored to your specific requirements. Our nurses deliver professional care services according to the plan, and we conduct regular reviews to make adjustments as needed.

We believe in personalized care that respects individual needs and preferences. Our continuous monitoring ensures round-the-clock health support, while our family support services keep loved ones informed and involved in care decisions.

Whether you need short-term nursing care during recovery or long-term support for chronic conditions, our team provides compassionate, professional care that makes a difference.`,
  },
  residential: {
    title: "Residential Care",
    description: "Comfortable living with professional support",
    icon: Home,
    image: "/images/about-hero.jpg",
    shortContent: "Our dedicated team delivers personalized care, 24/7 supervision, and medical support in a comfortable, home-like environment tailored to your needs. We offer private and shared room options, nutritious meals, and social activities.",
    fullContent: `Our dedicated team delivers personalized care, 24/7 supervision, and medical support in a comfortable, home-like environment tailored to your needs.

Our residential care facilities offer:

- Private and shared room options to suit your preferences and budget
- 24/7 professional care staff always available to assist
- Nutritious meals and dietary support catering to various needs
- Social activities and programs to keep residents engaged
- Personal care assistance with daily living tasks
- Safe and secure environment with modern safety features

Living in our residential care homes means becoming part of a caring community. Our facilities are designed to feel like home while providing all the professional support needed for comfortable living.

The journey begins with an initial enquiry where we discuss your residential care needs. We then conduct an assessment visit to evaluate care requirements and show you our facilities. Our team coordinates a smooth move-in process, and once settled, you receive continuous personalized care with regular reviews.

Our home-like environment is complemented by opportunities for community living and social interaction. All daily living needs are professionally managed while maintaining open visiting hours for family involvement and participation in activities.

We understand that moving to residential care is a significant decision. Our team is here to support you and your family through every step, ensuring a comfortable transition and ongoing quality of life.`,
  },
  "health-medical": {
    title: "Health & Medical Care",
    description: "Comprehensive health management services",
    icon: Activity,
    image: "/images/hero-care.jpg",
    shortContent: "From routine health monitoring and medication management to chronic disease support and post-hospital care, we provide comprehensive health services. Our integrated approach coordinates all aspects of your health management.",
    fullContent: `From routine health monitoring and medication management to chronic disease support and post-hospital care, we provide comprehensive health services.

Our health and medical care services encompass:

- Chronic disease management for conditions like diabetes, heart disease, and COPD
- Medication administration ensuring proper dosage and timing
- Health monitoring with regular assessments and tracking
- Rehabilitation support to help you regain strength and mobility
- Post-hospital recovery care for smooth transition from hospital to home
- Specialist coordination to ensure all your healthcare providers work together

We take an integrated approach to health management, coordinating all aspects of your care for the best outcomes. Our expert team manages complex health conditions while providing comprehensive support during recovery periods.

The process begins with a comprehensive health assessment to evaluate your current status. We then coordinate with your healthcare providers and specialists to develop a unified care approach. Treatment plans are implemented according to your specific needs, with ongoing management and monitoring to adjust care as required.

Our focus is always on maintaining and improving your quality of life. We understand that managing health conditions can be challenging, and our team is here to provide the support and expertise you need.

Whether you are recovering from surgery, managing a chronic condition, or need ongoing health support, our health and medical care services are designed to help you live your best life.`,
  },
  "senior-citizen": {
    title: "Senior Citizen Care",
    description: "Dedicated care for our elderly community",
    icon: Users,
    image: "/images/about-hero.jpg",
    shortContent: "We offer a full range of services including medical assistance, personal care, and daily living support designed specifically for senior citizens. Our care preserves dignity while ensuring safety and engagement.",
    fullContent: `We offer a full range of services including medical assistance, personal care, and daily living support designed specifically for senior citizens.

Our senior citizen care services include:

- Personal care assistance with bathing, dressing, and grooming
- Mobility support to help with movement and prevent falls
- Companionship services to combat loneliness and isolation
- Memory care support for those with dementia or Alzheimer's
- Daily living activities assistance including meal preparation
- Transportation assistance for appointments and outings

We believe every senior deserves to be treated with dignity and respect. Our care approach preserves independence while providing the support needed to stay safe and comfortable.

The care journey begins with a family consultation to discuss care needs. We conduct a personalized assessment of individual requirements, then match seniors with appropriate care services and staff. Ongoing care includes regular family updates to keep everyone informed.

Our commitment to dignity and respect means we always honor independence while ensuring safety with 24/7 monitoring and support. We provide programs to keep seniors active and engaged, while maintaining strong family bonds and communication.

Growing older should be a time of comfort and contentment. Our senior citizen care services are designed to enhance quality of life, providing the support needed while celebrating the wisdom and experience that comes with age.`,
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];
  const [expanded, setExpanded] = useState(false);

  if (!service) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you are looking for does not exist.</p>
            <Link href="/services">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main>
      <Header />
      
      {/* Page Header with Back Button */}
      <section className="bg-[#1a2e1a] pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald" />
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Our Services
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {/* Short Content - Always Visible */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {service.shortContent}
                </p>

                {/* Expandable Full Content */}
                {expanded && (
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line animate-in fade-in slide-in-from-top-4 duration-300">
                    {service.fullContent.split('\n\n').slice(1).map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Read More / Read Less Button */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-emerald hover:text-emerald-dark font-medium mt-4 transition-colors"
                >
                  {expanded ? (
                    <>
                      <span>Read Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Contact CTA */}
              <div className="mt-12 p-6 bg-emerald/10 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Interested in {service.title}?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Contact us today to learn more about how we can help you or your loved ones.
                </p>
                <Link href="/contact">
                  <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Service Card */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-emerald/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-emerald" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <Link href="/services">
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
