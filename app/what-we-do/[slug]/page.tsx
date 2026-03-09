"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Stethoscope,
  HeartPulse,
  Activity,
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
  ctaContent: string;
  sidebarContent: string;
}> = {
  "healthcare-staffing": {
    title: "Healthcare Staffing",
    description: "Comprehensive health assessments and screenings",
    icon: Stethoscope,
    image: "/images/services/staffing.png",
    shortContent: "At Hadsul, we specialise in providing trusted, high-quality healthcare staffing solutions to organisations across the UK. We supply fully vetted & trained HCAs, MHAs, Support Workers, Nurses, Cleaners, Team Leaders, and Kitchen Assistants to care homes, supported living services, hospitals, and community-based settings.   ",
    ctaContent: "Connect with our staffing team to discuss your specific requirements. We'll match you with qualified healthcare professionals who meet your exact needs.",
    sidebarContent: "Professional healthcare staffing solutions tailored to your organisation's needs",
    fullContent: `At Hadsul, we specialise in providing trusted, high-quality healthcare staffing solutions to organisations across the UK. We supply fully trained HCAs, MHAs, Support Workers, Nurses, Cleaners, Team Leaders, and Kitchen Assistants to care homes, supported living services, hospitals, and community-based settings.
    
Our commitment is simple: reliable people, exceptional care, and staffing you can trust—every time.

We understand that every service has unique staffing needs. That’s why we offer a wide range of flexible, carefully matched professionals, including:

• HCA / MHA / Support Workers
Compassionate and skilled staff supporting daily living, mental health needs, mobility, and quality-of-life care.

• Nurses
Registered Nurses delivering clinical excellence with professionalism, accuracy, and empathy.

• Cleaners
Hygiene specialists that maintain safe, infection-free environments for residents, patients, and staff.

• Team Leaders
Experienced leaders who ensure smooth operations, quality care, and confident decision-making during every shift.

• Kitchen Assistants
Catering support staff who help deliver nutritious meals and maintain safe, well-run kitchens.

With us because you get reliable, high-quality staffing exactly when it’s needed—whether for short notice cover, full rotas, emergencies or ongoing support. Every professional we supply is thoroughly vetted, trained, and aligned with UK standards including CQC, NHS, GDPR, and employment regulations. Our flexible shift options ensure services operate smoothly, with staff who are prepared, compliant, and ready to deliver exceptional care in all settings.

We value staff's work and support their growth. We offer competitive pay rates, friendly guidance, and flexible scheduling that fits their lifestyle, alongside opportunities to work in diverse, well-supported care environments. Our people-first approach ensures every team member feels confident, appreciated, and empowered to thrive in their role while making a real impact in the healthcare sector.`,

  },
  consultancy: {
    title: "Consultancy",
    description: "Professional Consultancy services with Expertise",
    icon: HeartPulse,
    image: "/images/services/consult.jpg",
    shortContent: "We provide expert consultancy services & strengthen operations, improve efficiency, and experience measurable returns on investment. Our approach focuses on making informed decisions, optimise systems, and build sustainable growth strategies. By combining leading industry insights with practical implementation. We guide through complex operational challenges with clarity and confidence.",
    ctaContent: "Schedule a consultation with our expert advisors to explore how we can help transform your operations and drive sustainable growth.",
    sidebarContent: "Expert guidance for IT, financial, and healthcare operational excellence",
    fullContent: `Every care plan is personalized to meet the unique health needs of each resident with compassion and professionalism from our registered nurses.

Our consultancy spans key areas, including:

• IT consultancy
For organisations implementing reliable technology systems, improving digital infrastructure, and automating operational workflows.

• Financial consultancy 
We support budgeting, financial planning, compliance, and sustainable business growth strategies.

• Healthcare consultancy 
We guide healthcare providers in improving service delivery, regulatory compliance, and operational governance.  

Effective consultancy goes beyond recommendations—it requires collaboration, insight & ongoing support for strategies translate into real operational improvements and measurable results.

Whether you require guidance on technology transformation, financial planning, or healthcare service optimisation, we provide the expertise needed to strengthen your organisation and support long-term success.`,
  },
  
  
  "client-relationship-manager": {
    title: "Client Relationship Management (CRM)",
    description: "Comprehensive health management services",
    icon: Activity,
    image: "/images/services/crm.png",
    shortContent: "The platform has easy-to-use dashboards plus essential operational tools—staff coordination, financial management, reporting, and customer support—into one integrated environment. By reducing manual administration and improving real-time oversight, organisations can focus more on delivering quality services while maintaining efficient internal processes. ",
    ctaContent: "Request a demo of our CRM platform and discover how it can streamline your operations with integrated tools and real-time insights.",
    sidebarContent: "Integrated platform for staff management, reporting, and operational efficiency",
    fullContent: `From routine health monitoring and medication management to chronic disease support and post-hospital care, we provide comprehensive health services.

Our CRM platform includes:

• Staff shift tracking and workforce management

• Automated task management

• Integrated worker payments

• Real-time dashboards 

• Downloadable reports

• 24/7 customer support

• Secure data management & protection compliant with GDPR 

• Workflow automation 

• Centralised communication tools

Our CRM supports care homes of different sizes, from growing to established care homes. With its modern interface, the platform adapts to operational needs while maintaining simplicity and reliability.

Offload the burden of expensive monthly subscription fees with our straightforward onboarding process allowing to quickly configure staff management, workflows, and reporting structures. Once operational, the system provides real-time insights that support smarter decision-making and improved service coordination through out.`,

  },
  
  "it-solutions": {
    title: "Free Inspection & Compliance Foresight",
    description: "Proactive compliance monitoring and inspection preparation",
    icon: Activity,
    image: "/images/services/it-solutions.png",
    shortContent: "Continuous analysis of regulatory landscapes and your operational data to predict and prepare for inspection focus areas, moving from reactive compliance to proactive readiness.",
    ctaContent: "Get in touch with our compliance specialists to discuss how we can help you stay ahead of inspections and maintain regulatory excellence.",
    sidebarContent: "Proactive compliance monitoring and inspection preparation for healthcare excellence",
    fullContent: `Continuous analysis of regulatory landscapes and your operational data to predict and prepare for inspection focus areas, moving from reactive compliance to proactive readiness.

Our Free Inspection & Compliance Foresight includes:

- Regulatory Landscape Analysis to track changing compliance requirements
- Operational Data Review to identify potential inspection focus areas
- Proactive Preparation strategies for upcoming inspections
- Compliance Gap Analysis to address issues before they become problems
- Real-time Compliance Monitoring and alerts
- Documentation Review to ensure all records meet standards
- Staff Readiness Training for inspection scenarios
- Post-Inspection Support and action planning

We understand that healthcare organizations face constant regulatory scrutiny. Our foresight service transforms compliance from a reactive burden into a proactive advantage, helping you stay ahead of inspections and maintain consistently high standards.

Our compliance specialists have extensive experience with CQC inspections, NHS requirements, and healthcare regulations. We analyze your operations through the lens of regulatory expectations, identifying areas that may attract inspector attention and helping you address them proactively.

The foresight journey begins with a comprehensive review of your current compliance status and operational data. We identify patterns and trends that may signal inspection focus areas, develop targeted preparation strategies, and provide ongoing monitoring to ensure you're always inspection-ready.

Our commitment is to provide peace of mind through proactive compliance management. We help you move from reactive firefighting to confident readiness, ensuring your organization consistently meets and exceeds regulatory standards.

Whether you're preparing for an upcoming inspection, recovering from previous findings, or simply want to maintain excellence, our Free Inspection & Compliance Foresight service provides the strategic advantage you need.`,
  },
  "staff-training": {
    title: "Career Training & Coaching",
    description: "Comprehensive career development and coaching programs",
    icon: Activity,
    image: "/images/services/staff-training.png",
    shortContent: "Hands-on training for new carers and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.",
    ctaContent: "Invest in your team's development with our comprehensive career training and coaching programs. Contact us to create a customized development plan for your staff.",
    sidebarContent: "Professional career development and coaching programs for healthcare excellence",
    fullContent: `Hands-on training for new carers and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.

Our Career Training & Coaching services include:

- Professional Development programs tailored to healthcare roles
- Certification Programs for HCAs, MHAs, Support Workers, and Nurses
- Compliance Training covering CQC standards, safeguarding, and health & safety
- Clinical Skills Training for medication management, wound care, and infection control
- Soft Skills Development including communication, empathy, and teamwork
- Career Coaching for professional growth and advancement
- Leadership Development for aspiring team leaders and managers
- Ongoing Support with refresher courses and continuous learning opportunities
- Quality Assurance monitoring to ensure training effectiveness
- Customized Training Plans designed for your organization's specific needs

We understand that well-trained staff are the foundation of quality healthcare delivery. Our training and coaching programs are designed to equip healthcare professionals with the knowledge, skills, and confidence they need to provide exceptional care while advancing their careers.

Our training team consists of experienced healthcare educators, clinical specialists, career coaches, and industry experts who bring real-world experience to every session. We use a combination of theoretical learning, practical demonstrations, hands-on practice, and personalized coaching to ensure effective skill development and career progression.

The training journey begins with a needs assessment to identify skill gaps, career aspirations, and training requirements. We develop a customized training and coaching plan that addresses both organizational needs and individual career goals, deliver engaging sessions using proven teaching methods, and provide ongoing support with regular assessments, refresher courses, and career guidance.

Our commitment to quality assurance means we continuously monitor training effectiveness and update our programs to reflect current best practices and regulatory changes. We believe that investing in career training and coaching is investing in better care outcomes and staff retention.

Whether you need initial training for new staff, compliance updates for existing teams, specialized skills development, or career coaching for professional advancement, our programs are designed to support your workforce and enhance the quality of care you provide.`,
  },
  "software-licensing-solutions": {
    title: "Software, Licensing Solutions",
    description: "Complete software licensing and management solutions",
    icon: Activity,
    image: "/images/services/solutions.avif",
    shortContent: "We provide complete software licensing and management solutions tailored for healthcare organizations and businesses, ensuring compliance, cost-effectiveness, and seamless software procurement and deployment.",
    ctaContent: "Let our licensing specialists help you optimize your software portfolio and ensure compliance. Reach out for a comprehensive license audit.",
    sidebarContent: "Cost-effective software licensing and management for healthcare organizations",
    fullContent: `We provide complete software licensing and management solutions tailored for healthcare organizations and businesses, ensuring compliance, cost-effectiveness, and seamless software procurement and deployment.

Our software licensing solutions include:

- License Management for tracking, renewal, and optimization of software licenses
- Software Procurement assistance with vendor selection and negotiation
- Compliance Support ensuring adherence to licensing agreements and regulations
- Technical Assistance with installation, configuration, and troubleshooting
- Cost Optimization strategies to reduce software expenses
- Volume Licensing Programs for organizations with multiple users
- Cloud-Based Solutions for flexible, scalable software access
- License Auditing to ensure compliance and identify cost savings

We understand that managing software licenses can be complex and time-consuming, especially for healthcare organizations that must balance cost control with regulatory compliance. Our solutions simplify license management while ensuring you have the right software tools to support your operations.

Our licensing specialists have extensive experience working with major software vendors and understand the unique requirements of healthcare organizations. We help you navigate complex licensing agreements, optimize your software portfolio, and ensure compliance with both vendor terms and healthcare regulations.

The licensing journey begins with a comprehensive audit of your current software assets and licensing agreements. We identify opportunities for cost savings and compliance improvements, develop a strategic licensing plan that aligns with your organizational needs, and provide ongoing management and support to ensure continued compliance and optimization.

Our commitment is to provide transparent, cost-effective licensing solutions that give you peace of mind. We handle the complexity of license management so you can focus on your core business operations.

Whether you need help with Microsoft 365, healthcare-specific software, or enterprise applications, our software licensing solutions are designed to save you time, reduce costs, and ensure compliance with all licensing requirements.`,
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you are looking for does not exist.</p>
            <Link href="/what-we-do">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">
                View All What We Do
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
            href="/what-we-do" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to What We Do</span>
          </Link>
          {/* <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Our Services
            </span>
          </div> */}
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
                  {service.ctaContent}
                </p>
                <Link href="/contact">
                  <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6">
                    Hire Now
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
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                      <Icon className="w-7 h-7 text-emerald" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.sidebarContent}</p>
                    </div>
                  </div>
                  <Link href="/what-we-do">
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                      View All What We Do
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
