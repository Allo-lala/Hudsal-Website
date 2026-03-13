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
• Nurses
• Cleaners
• Team Leaders
• Kitchen Assistants

With us, you get reliable, high-quality staffing exactly when it’s needed—whether for short notice cover, full rotas, emergencies or ongoing support. Every professional we supply is thoroughly vetted, trained, and aligned with UK standards including CQC, NHS, GDPR, and employment regulations. Our flexible shift options ensure services operate smoothly, with staff who are prepared, compliant, and ready to deliver exceptional care in all settings.

We value staff's work and support their growth. We offer competitive pay rates, friendly guidance, and flexible scheduling that fits their lifestyle, alongside opportunities to work in diverse, well-supported care environments.`,

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

Healthcare organizations face constant regulatory scrutiny. Foresight services transform compliance from a reactive burden into a proactive advantage, helping you stay ahead of inspections and maintain consistently high standards.

We analyze your operations through the lens of regulatory expectations, identifying areas that may attract inspector attention and address them proactively.

Our commitment is to provide peace of mind through proactive compliance management. Move from reactive firefighting to confident readiness, ensuring your organization consistently meets and exceeds regulatory standards.

Whether you're preparing for an upcoming inspection, recovering from previous findings, or simply want to maintain excellence, our Free Inspection & Compliance Foresight service provides the strategic advantage you need.`,
  },
  "staff-training": {
    title: "Career Training & Coaching",
    description: "Comprehensive career development and coaching programs",
    icon: Activity,
    image: "/images/services/staff-training.png",
    shortContent: "Hands-on training for new carers and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.",
    ctaContent: "Invest in your team's development with our comprehensive career training and coaching programs. Contact us to create a customized development plan for your staff.",
    sidebarContent: "Professional career development and coaching programs for excellence",
    fullContent: `Hands-on training for new trainees and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.

Our Career Training & Coaching services include:

- Professional Development programs
- Certification Programs for HCAs, MHAs, Support Workers, and Nurses
- Compliance Training covering CQC standards, safeguarding, and health & safety
- Clinical Skills Training for medication management, wound care, and infection control
- Soft Skills Development including communication, empathy, and teamwork
- Career Coaching for professional growth and advancement
- Leadership Development for aspiring team leaders and managers
- Ongoing Support with refresher courses and continuous learning opportunities
- Quality Assurance monitoring 
- Customized Training Plans

Well-trained staff are the foundation of quality delivery. Our training and coaching programs are designed to equip professionals with the knowledge, skills, and confidence they need to provide exceptional results while advancing their careers.

We use a combination of theoretical learning, practical demonstrations, hands-on practice, and personalized coaching to ensure effective skill development and career progression.

We continuously monitor training effectiveness and update our programs to reflect current best practices and regulatory changes.

Whether you need initial training for new staff, compliance updates for existing teams, specialized skills development, or career coaching for professional advancement, our programs are designed to support your workforce and enhance the quality of care you provide.`,
  },
  "software-licensing-solutions": {
    title: "Free External Perspective & Governance Support",
    description: "Objective, experienced viewpoint on operations and governance structures",
    icon: Activity,
    image: "/images/services/solutions.avif",
    shortContent: "An objective, experienced viewpoint on your operations and governance structures, challenging assumptions and ensuring robust decision-making frameworks are in place.",
    ctaContent: "Connect with our governance specialists to gain fresh perspectives on your operations and strengthen your decision-making frameworks.",
    sidebarContent: "Independent governance review and strategic operational insights",
    fullContent: `An objective, experienced viewpoint on your operations and governance structures, challenging assumptions and ensuring robust decision-making frameworks are in place.

In the complex landscape of UK healthcare and social care, organisations often operate within their own established patterns and assumptions. While internal expertise is invaluable, an external perspective brings fresh insights, identifies blind spots, and challenges thinking in ways that drive meaningful improvement.

Our Free External Perspective & Governance Support service provides exactly this—a professional, independent review of your operational and governance structures, delivered by experienced consultants who understand the UK regulatory environment, CQC standards, and the practical realities of running care services.

What We Provide:

• Independent Operational Review
We examine your day-to-day operations with fresh eyes, identifying inefficiencies, risks, and opportunities that internal teams may overlook. Our review covers staffing patterns, workflow processes, resource allocation, and service delivery models.

• Governance Structure Assessment
We evaluate your governance frameworks, board effectiveness, decision-making processes, and accountability structures. Strong governance is the foundation of sustainable, high-quality care provision.

• Risk Identification & Mitigation
Through our external lens, we identify operational and governance risks before they become problems. We assess compliance risks, financial vulnerabilities, reputational concerns, and strategic threats.

• Decision-Making Framework Review
We examine how decisions are made within your organisation—who makes them, what information informs them, and how they're implemented. Robust decision-making processes are critical for effective leadership.

• Regulatory Compliance Perspective
With deep knowledge of CQC requirements, safeguarding standards, and UK healthcare regulations, we provide insights on how your governance and operations align with regulatory expectations.

• Strategic Challenge & Questioning
Sometimes the most valuable service is asking the difficult questions. We challenge assumptions, test strategic thinking, and ensure your leadership team has considered all angles before making significant decisions.

• Best Practice Benchmarking
We compare your governance and operational approaches against sector best practices, highlighting where you excel and where improvements could strengthen your organisation.

• Stakeholder Perspective Analysis
We consider how your operations and governance appear to external stakeholders—regulators, commissioners, families, and staff—providing insights on perception gaps and communication opportunities.

Why External Perspective Matters:

Healthcare organisations can become insular, with established ways of working that go unquestioned. An external perspective breaks this pattern, bringing:

- Objectivity: We have no internal politics or preconceptions
- Experience: We've seen what works (and what doesn't) across multiple organisations
- Fresh thinking: We challenge the "we've always done it this way" mindset
- Regulatory insight: We understand what inspectors and commissioners look for
- Strategic clarity: We help leadership teams see the bigger picture

Our approach is collaborative, not confrontational. We work alongside your leadership team, respecting your expertise while offering our independent insights. The goal is not to criticise but to strengthen—helping you build more robust operations and governance structures that support sustainable, high-quality care.

The UK Care Sector Context:

The UK care sector faces unprecedented challenges—workforce shortages, funding pressures, increasing regulatory scrutiny, and rising service user complexity. In this environment, strong governance and efficient operations aren't optional—they're essential for survival and success.

CQC inspections increasingly focus on governance and leadership, recognising that operational quality flows from effective oversight and decision-making. Organisations with weak governance structures, unclear accountability, or inefficient operations face regulatory action, regardless of their good intentions.

Our Free External Perspective service helps you stay ahead of these challenges, ensuring your governance and operations meet not just minimum standards but represent genuine best practice.

Who Benefits:

This service is particularly valuable for:

- Care homes preparing for CQC inspections
- Organisations recovering from previous regulatory concerns
- Leadership teams facing strategic decisions
- Services experiencing operational challenges
- Boards seeking to strengthen governance
- Growing organisations needing to scale governance structures
- Services undergoing significant change or transition

The Process:

Our engagement typically involves:

1. Initial Consultation: Understanding your organisation, current challenges, and specific areas where external perspective would be valuable

2. Documentation Review: Examining governance documents, policies, operational data, and previous inspection reports

3. Stakeholder Interviews: Speaking with board members, senior leaders, managers, and frontline staff to understand different perspectives

4. Operational Observation: Spending time in your service to observe operations firsthand

5. Analysis & Insight Development: Synthesising our findings into clear, actionable insights

6. Presentation & Discussion: Sharing our perspective with your leadership team, facilitating discussion and strategic thinking

7. Recommendations Report: Providing written recommendations for governance and operational improvements

8. Follow-up Support: Offering ongoing consultation as you implement changes

Why "Free"?

We believe that access to external governance perspective shouldn't be limited to organisations with large consultancy budgets. Strong governance benefits the entire sector—improving care quality, protecting vulnerable people, and supporting workforce wellbeing.

By offering this service free of charge, we're investing in sector improvement and building relationships with organisations committed to excellence. It's our contribution to raising standards across UK healthcare and social care.

The Value of Challenge:

The best leaders welcome challenge and questioning. They understand that their thinking is strengthened when tested by experienced external perspectives. Our service provides this challenge in a supportive, constructive environment.

We ask questions like:
- Have you considered alternative approaches?
- What evidence supports this decision?
- How does this align with your strategic objectives?
- What could go wrong, and how would you respond?
- Are your governance structures fit for your current scale and complexity?
- Does your board have the right skills and information to provide effective oversight?

These questions aren't criticisms—they're tools for strengthening thinking and ensuring robust decision-making.

Long-term Partnership:

While our initial perspective service is free, many organisations choose to develop ongoing relationships with us, engaging our consultancy services for implementation support, regular governance reviews, or strategic planning assistance.

We're interested in long-term sector improvement, not quick transactions. Our free external perspective service is the beginning of a relationship built on trust, expertise, and shared commitment to excellence.

Get Started:

If your organisation would benefit from an independent, experienced perspective on your operations and governance, we'd welcome the opportunity to work with you.

Contact our governance specialists to arrange an initial conversation. We'll discuss your current situation, explore where external perspective could add value, and outline how our service works.

There's no obligation, no hidden costs, and no pressure—just a genuine offer of professional insight from experienced consultants who care about sector improvement and organisational excellence.

In a sector facing constant change and increasing complexity, the organisations that thrive are those willing to challenge their own thinking, welcome external perspectives, and continuously strengthen their governance and operations.

Let us help you build the robust frameworks that support sustainable, high-quality care delivery across the UK.`,
  },
  "free-inspection-compliance-foresight": {
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

Healthcare organizations face constant regulatory scrutiny. Foresight services transform compliance from a reactive burden into a proactive advantage, helping you stay ahead of inspections and maintain consistently high standards.

We analyze your operations through the lens of regulatory expectations, identifying areas that may attract inspector attention and address them proactively.

Our commitment is to provide peace of mind through proactive compliance management. Move from reactive firefighting to confident readiness, ensuring your organization consistently meets and exceeds regulatory standards.

Whether you're preparing for an upcoming inspection, recovering from previous findings, or simply want to maintain excellence, our Free Inspection & Compliance Foresight service provides the strategic advantage you need.`,
  },
  "career-training-coaching": {
    title: "Career Training & Coaching",
    description: "Comprehensive career development and coaching programs",
    icon: Activity,
    image: "/images/services/staff-training.png",
    shortContent: "Hands-on training for new carers and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.",
    ctaContent: "Invest in your team's development with our comprehensive career training and coaching programs. Contact us to create a customized development plan for your staff.",
    sidebarContent: "Professional career development and coaching programs for excellence",
    fullContent: `Hands-on training for new trainees and professionals renewing their certificates. Whether you attained theoretical knowledge or completely new to care, we equip you with core essential skills, manual handling & workplace inductions.

Our Career Training & Coaching services include:

- Professional Development programs
- Certification Programs for HCAs, MHAs, Support Workers, and Nurses
- Compliance Training covering CQC standards, safeguarding, and health & safety
- Clinical Skills Training for medication management, wound care, and infection control
- Soft Skills Development including communication, empathy, and teamwork
- Career Coaching for professional growth and advancement
- Leadership Development for aspiring team leaders and managers
- Ongoing Support with refresher courses and continuous learning opportunities
- Quality Assurance monitoring 
- Customized Training Plans

Well-trained staff are the foundation of quality delivery. Our training and coaching programs are designed to equip professionals with the knowledge, skills, and confidence they need to provide exceptional results while advancing their careers.

We use a combination of theoretical learning, practical demonstrations, hands-on practice, and personalized coaching to ensure effective skill development and career progression.

We continuously monitor training effectiveness and update our programs to reflect current best practices and regulatory changes.

Whether you need initial training for new staff, compliance updates for existing teams, specialized skills development, or career coaching for professional advancement, our programs are designed to support your workforce and enhance the quality of care you provide.`,
  },
  "free-external-perspective-governance-support": {
    title: "Free External Perspective & Governance Support",
    description: "Objective, experienced viewpoint on operations and governance structures",
    icon: Activity,
    image: "/images/services/solutions.avif",
    shortContent: "An objective, experienced viewpoint on your operations and governance structures, challenging assumptions and ensuring robust decision-making frameworks are in place.",
    ctaContent: "Connect with our governance specialists to gain fresh perspectives on your operations and strengthen your decision-making frameworks.",
    sidebarContent: "Independent governance review and strategic operational insights",
    fullContent: `An objective, experienced viewpoint on your operations and governance structures, challenging assumptions and ensuring robust decision-making frameworks are in place.

In the complex landscape of UK healthcare and social care, organisations often operate within their own established patterns and assumptions. While internal expertise is invaluable, an external perspective brings fresh insights, identifies blind spots, and challenges thinking in ways that drive meaningful improvement.

Our Free External Perspective & Governance Support service provides exactly this—a professional, independent review of your operational and governance structures, delivered by experienced consultants who understand the UK regulatory environment, CQC standards, and the practical realities of running care services.

What We Provide:

• Independent Operational Review
• Governance Structure Assessment
• Risk Identification & Mitigation
• Decision-Making Framework Review
• Regulatory Compliance Perspective
• Strategic Challenge & Questioning
• Best Practice Benchmarking


`,
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
