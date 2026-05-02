"use client";

import { useState, useEffect } from "react";
import { Heart, Briefcase, Laptop, UserPlus, Calendar, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeetingPlatformModal } from "@/components/meeting-platform-modal";

const serviceCategories = [
  {
    id: "care",
    title: "Care Services",
    icon: Heart,
    ctaText: "Request Staff",
    ctaIcon: UserPlus,
    services: [
      {
        name: "Home Care",
        description: "Personalized care in the comfort of your own home. Our compassionate team provides support tailored to individual needs.",
        image: "/images/core/wooow.jpg",
      },
      {
        name: "Supported Living",
        description: "Independent living with the right level of support. Empowering individuals to live life on their own terms.",
        image: "/images/core/woot.jpg",
      },
      {
        name: "Care Homes",
        description: "Residential care in a warm, welcoming environment. Creating a home away from home with dignity and respect.",
        image: "/images/core/wooow.jpg",
      },
      {
        name: "Dementia Care",
        description: "Specialist support for those living with dementia. Expert care that understands and responds to unique needs.",
        image: "/images/core/woot.jpg",
      },
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    // icon: Briefcase,
    ctaText: "Book a Consultation",
    // ctaIcon: Calendar,
    services: [
      {
        name: "Healthcare Consulting",
        description: "Strategic advice for healthcare organizations. Transform your operations with expert guidance and proven methodologies.",
        image: "/images/core/woot.jpg",
      },
      {
        name: "Operations Improvement",
        description: "Streamline processes and boost efficiency. Data-driven solutions that deliver measurable results.",
        image: "/images/core/wooow.jpg",
      },
      {
        name: "Business Health Checks",
        description: "Comprehensive assessments to identify opportunities. Uncover hidden potential and mitigate risks.",
        image: "/images/core/woot.jpg",
      },
      {
        name: "Free Health Check",
        description: "Complimentary initial consultation and assessment. No obligation—just expert insights to help you move forward.",
        image: "/images/core/wooow.jpg",
      },
    ],
  },
  {
    id: "digital",
    title: "IT Solutions",
    icon: Laptop,
    ctaText: "Get A Service",
    ctaIcon: Wrench,
    services: [
      {
        name: "CRM Systems",
        description: "Manage relationships and streamline communications. Purpose-built systems that integrate seamlessly with your workflow.",
        image: "/images/core/wooow.jpg",
      },
      {
        name: "Automation",
        description: "Reduce admin burden with intelligent automation. Free your team to focus on what matters—caring for people.",
        image: "/images/core/woot.jpg",
      },
      {
        name: "Tech Solutions",
        description: "Custom software tailored to your needs. From concept to deployment, we build technology that works for you.",
        image: "/images/core/wooow.jpg",
      },
    ],
  },
];

export function CoreServicesSection() {
  const [activeCategory, setActiveCategory] = useState("care");
  const [isHovering, setIsHovering] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  // Auto-transition between categories every 2 seconds
  useEffect(() => {
    if (isHovering) return; // Pause auto-transition when user is hovering

    const interval = setInterval(() => {
      setActiveCategory((current) => {
        const currentIndex = serviceCategories.findIndex((cat) => cat.id === current);
        const nextIndex = (currentIndex + 1) % serviceCategories.length;
        return serviceCategories[nextIndex].id;
      });
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [isHovering]);

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory) || serviceCategories[0];
  const CtaIcon = currentCategory.ctaIcon;

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/10 to-background"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-slide-up">
            Hadsul Group
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
            From compassionate care to strategic consulting and cutting-edge technology—we deliver excellence across every aspect of healthcare.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {serviceCategories.map((category) => {
            const CategoryIcon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-emerald text-white shadow-lg scale-105"
                    : "bg-white text-muted-foreground hover:bg-emerald/10 hover:text-emerald border-2 border-border hover:border-emerald"
                }`}
              >
                {/* <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Services Content */}
        <div className="mb-10">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCategory.services.map((service, index) => {
              return (
                <div
                  key={`${currentCategory.id}-${index}`}
                  className="group relative rounded-2xl overflow-hidden shadow-lg border-2 border-border hover:border-emerald transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up-fade h-80"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    {/* Service Name */}
                    <h4 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition-colors">
                      {service.name}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category CTA */}
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: `${currentCategory.services.length * 100}ms` }}>
          <Button
            asChild
            size="lg"
            className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <Link href="/contact">
              {/* <CtaIcon className="w-5 h-5 mr-2" /> */}
              {currentCategory.ctaText}
            </Link>
          </Button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-emerald/10 to-emerald/5 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Healthcare Operations?
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              Join hundreds of healthcare providers who trust Hadsul for staffing, consulting, and technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsMeetingModalOpen(true)}
                className="bg-emerald hover:bg-[#20bd5a] text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Platform Modal */}
      <MeetingPlatformModal 
        isOpen={isMeetingModalOpen} 
        onClose={() => setIsMeetingModalOpen(false)} 
      />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slide-up-fade {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}
