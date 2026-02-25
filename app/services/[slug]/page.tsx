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
  "healthcare-staffing": {
    title: "Healthcare Staffing",
    description: "Comprehensive health assessments and screenings",
    icon: Stethoscope,
    image: "/images/services/staffing.jpg",
    shortContent: "At Hadsul, we specialise in providing trusted, high-quality healthcare staffing solutions to organisations across the UK. We supply fully vetted & trained HCAs, MHAs, Support Workers, Nurses, Cleaners, Team Leaders, and Kitchen Assistants to care homes, supported living services, hospitals, and community-based settings.   ",
    fullContent: `At Hadsul, we specialise in providing trusted, high-quality healthcare staffing solutions to organisations across the UK. We supply fully trained HCAs, MHAs, Support Workers, Nurses, Cleaners, Team Leaders, and Kitchen Assistants to care homes, supported living services, hospitals, and community-based settings.
    
Our commitment is simple: reliable people, exceptional care, and staffing you can trust—every time.

We understand that every service has unique staffing needs. That’s why we offer a wide range of flexible, carefully matched professionals, including:

• HCA / MHA / Support Workers
Compassionate and skilled staff supporting daily living, mental health needs, mobility, and quality-of-life care.

• Nurses
Registered Nurses delivering clinical excellence with professionalism, accuracy, and empathy.

• Cleaners
Hygiene specialists helping maintain safe, infection-free environments for residents, patients, and staff.

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
  homecare: {
    title: "Home Care",
    description: "Comfortable living with professional support",
    icon: Home,
    image: "/images/services/homecare.jpg",
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
  "client-relationship-manager": {
    title: "Client Relationship Management (CRM)",
    description: "Comprehensive health management services",
    icon: Activity,
    image: "/images/services/crm.webp",
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
  "companionship-services": {
    title: "Companionship Services",
    description: "Dedicated care for our elderly community",
    icon: Users,
    image: "/images/services/companion.jpg",
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
  "palliative-care-at-home": {
    title: "Palliative Care at Home",
    description: "Compassionate end-of-life care in the comfort of your own home",
    icon: Users,
    image: "/images/services/Palliative.jpg",
    shortContent: "We provide compassionate palliative care services in the comfort of your home, focusing on quality of life, pain management, and emotional support for patients and families.",
    fullContent: `We provide compassionate palliative care services in the comfort of your home, focusing on quality of life, pain management, and emotional support for patients and families.

Our palliative care at home services include:

- Comprehensive pain and symptom management
- 24/7 nursing care and medical support
- Emotional and spiritual support for patients and families
- Medication management and administration
- Personal care assistance with dignity and respect
- Coordination with healthcare providers and hospice services

We understand that end-of-life care is a deeply personal journey. Our approach focuses on comfort, dignity, and quality of life, ensuring that patients can spend their final days in the familiar surroundings of home, surrounded by loved ones.

Our palliative care team consists of experienced nurses, care assistants, and support staff who are specially trained in end-of-life care. We work closely with families to create personalized care plans that honor the patient's wishes and provide the highest level of comfort.

The care journey begins with a compassionate consultation to understand the patient's needs and wishes. We develop a comprehensive care plan that addresses physical, emotional, and spiritual needs, and provide ongoing support to both the patient and family members.

Our commitment is to ensure that every patient receives care with dignity, compassion, and respect. We believe that everyone deserves to spend their final days in comfort, surrounded by love, and we are honored to support families during this important time.`,
  },
  "respite-care": {
    title: "Respite Care",
    description: "Temporary relief care for family caregivers",
    icon: HeartPulse,
    image: "/images/services/recipite.jpg",
    shortContent: "We provide professional respite care services to give family caregivers a well-deserved break, ensuring your loved one receives quality care while you recharge and attend to personal needs.",
    fullContent: `We provide professional respite care services to give family caregivers a well-deserved break, ensuring your loved one receives quality care while you recharge and attend to personal needs.

Our respite care services include:

- Short-term care from a few hours to several weeks
- Flexible scheduling to meet your family's needs
- Professional caregivers trained in various care needs
- Personal care assistance and companionship
- Medication management and health monitoring
- Activities and engagement for your loved one
- Emergency respite care availability

We understand that caring for a loved one is both rewarding and demanding. Family caregivers often experience physical and emotional exhaustion, which is why respite care is essential for maintaining your own health and well-being.

Our respite care team consists of experienced, compassionate caregivers who are trained to provide the same level of care your loved one receives from you. We take time to understand your loved one's routines, preferences, and care requirements to ensure continuity of care.

The respite care process begins with a consultation to understand your loved one's needs and your schedule. We create a personalized care plan that maintains their routine and provides engaging activities. Our caregivers provide regular updates so you can enjoy your break with peace of mind.

Whether you need a few hours to run errands, a day for self-care, or a week for vacation, our respite care services are designed to support both you and your loved one. We believe that taking care of yourself is essential to providing the best care for others.

Our commitment is to provide reliable, professional care that gives you confidence and peace of mind. We honor the trust you place in us and treat your loved one with the same care, dignity, and respect you would provide yourself.`,
  },
  "private-care": {
    title: "Private Care",
    description: "Personalized one-on-one care in your home",
    icon: Home,
    image: "/images/services/private.jpg",
    shortContent: "We provide personalized private care services with dedicated caregivers who focus exclusively on your needs, delivering tailored support in the comfort and privacy of your own home.",
    fullContent: `We provide personalized private care services with dedicated caregivers who focus exclusively on your needs, delivering tailored support in the comfort and privacy of your own home.

Our private care services include:

- Dedicated one-on-one caregiver assigned to you
- Fully personalized care plans tailored to your needs
- Flexible scheduling from a few hours to 24/7 live-in care
- Personal care assistance with bathing, dressing, and grooming
- Medication management and health monitoring
- Meal preparation and nutritional support
- Companionship and social engagement
- Light housekeeping and errands
- Transportation to appointments and activities

We understand that everyone has unique care needs and preferences. Our private care service is designed to provide the highest level of personalized attention, with a dedicated caregiver who gets to know you, understands your routines, and adapts to your changing needs.

Our private caregivers are carefully selected, thoroughly vetted, and extensively trained. We match caregivers based on personality, skills, and your specific requirements to ensure the best possible fit. Each caregiver is committed to providing compassionate, professional care that respects your independence and dignity.

The private care journey begins with a comprehensive assessment of your needs, preferences, and lifestyle. We create a detailed care plan that addresses all aspects of your wellbeing, from physical care to emotional support. Your dedicated caregiver implements this plan while building a trusting relationship with you and your family.

Whether you need assistance recovering from surgery, managing a chronic condition, or simply want support to maintain your independence at home, our private care services provide the personalized attention you deserve.

Our commitment is to deliver exceptional care that enhances your quality of life. We believe that private care should be more than just assistance—it should be a partnership built on trust, respect, and genuine care for your wellbeing.`,
  },
  "it-solutions": {
    title: "IT Solutions",
    description: "Innovative technology solutions for healthcare",
    icon: Activity,
    image: "/images/services/solutions.avif",
    shortContent: "We provide innovative technology solutions designed specifically for healthcare providers to improve efficiency, enhance care quality, and streamline operations across your organization.",
    fullContent: `We provide innovative technology solutions designed specifically for healthcare providers to improve efficiency, enhance care quality, and streamline operations across your organization.

Our IT solutions include:

- Care Management Systems for comprehensive patient tracking
- Digital Records for secure, accessible health information
- Staff Scheduling tools for optimal workforce management
- Compliance Tools to ensure regulatory adherence
- Real-time reporting and analytics dashboards
- Mobile applications for on-the-go access
- Integration with existing healthcare systems
- Data security and GDPR compliance

We understand that healthcare organizations face unique technological challenges. Our IT solutions are designed with healthcare professionals in mind, providing intuitive interfaces and powerful features that enhance rather than complicate your workflow.

Our technology team consists of experienced developers and healthcare IT specialists who understand both the technical and practical aspects of healthcare delivery. We work closely with your organization to implement solutions that fit your specific needs and integrate seamlessly with your existing processes.

The implementation journey begins with a comprehensive assessment of your current systems and needs. We develop a customized solution plan that addresses your specific challenges, then provide full training and ongoing support to ensure successful adoption. Our team remains available for updates, maintenance, and continuous improvement.

Whether you need a complete care management system, digital transformation support, or specific tools to address particular challenges, our IT solutions are designed to help you deliver better care more efficiently.

Our commitment is to provide technology that empowers healthcare professionals, improves patient outcomes, and streamlines operations. We believe that the right technology should make your work easier, not harder, and we're dedicated to delivering solutions that truly make a difference.`,
  },
  "staff-training": {
    title: "Staff Training",
    description: "Comprehensive training programs for healthcare professionals",
    icon: Activity,
    image: "/images/services/recipite.jpg",
    shortContent: "We provide comprehensive training programs for healthcare professionals, offering professional development opportunities, certification programs, and ongoing support to enhance skills and ensure quality care delivery.",
    fullContent: `We provide comprehensive training programs for healthcare professionals, offering professional development opportunities, certification programs, and ongoing support to enhance skills and ensure quality care delivery.

Our staff training services include:

- Professional Development programs tailored to healthcare roles
- Certification Programs for HCAs, MHAs, Support Workers, and Nurses
- Compliance Training covering CQC standards, safeguarding, and health & safety
- Clinical Skills Training for medication management, wound care, and infection control
- Soft Skills Development including communication, empathy, and teamwork
- Ongoing Support with refresher courses and continuous learning opportunities
- Quality Assurance monitoring to ensure training effectiveness
- Customized Training Plans designed for your organization's specific needs

We understand that well-trained staff are the foundation of quality healthcare delivery. Our training programs are designed to equip healthcare professionals with the knowledge, skills, and confidence they need to provide exceptional care while meeting regulatory requirements.

Our training team consists of experienced healthcare educators, clinical specialists, and industry experts who bring real-world experience to every session. We use a combination of theoretical learning, practical demonstrations, and hands-on practice to ensure effective skill development.

The training journey begins with a needs assessment to identify skill gaps and training requirements. We develop a customized training plan that addresses your organization's specific needs, deliver engaging training sessions using proven teaching methods, and provide ongoing support with regular assessments and refresher courses.

Our commitment to quality assurance means we continuously monitor training effectiveness and update our programs to reflect current best practices and regulatory changes. We believe that investing in staff training is investing in better care outcomes.

Whether you need initial training for new staff, compliance updates for existing teams, or specialized skills development, our training programs are designed to support your workforce and enhance the quality of care you provide.`,
  },
  "software-licensing-solutions": {
    title: "Software, Licensing Solutions",
    description: "Complete software licensing and management solutions",
    icon: Activity,
    image: "/images/services/solutions.avif",
    shortContent: "We provide complete software licensing and management solutions tailored for healthcare organizations and businesses, ensuring compliance, cost-effectiveness, and seamless software procurement and deployment.",
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
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center">
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
