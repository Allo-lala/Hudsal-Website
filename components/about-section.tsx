"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Healthcare Staffing",
    description: "Our expert nursing staff deliver compassionate, professional support tailored."
  },
  {
    icon: Heart,
    title: "Consultancy",
    description: "Our consultancy Services provides vital emotional, social, and practical support to seniors and their families."
  },
  {
    icon: Award,
    title: "IT Solutions",
    description: "Our comprehensive solutions include vital signs monitoring, chronic condition screenings, medication reviews for a better life...."
  }
];

// Counter component with animation
function Counter({ value, suffix = "", duration = 2000, className = "text-3xl font-bold text-emerald" }: { 
  value: number; 
  suffix?: string; 
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div ref={counterRef} className={className}>
      {count}{suffix}
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Triangle Image Structure */}
          <div className="relative pb-20">
            {/* Bottom Left image */}
            <div className="relative h-[240px] w-[240px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-care.jpg"
                alt="Healthcare professional with elderly patient"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Right image */}
            <div className="absolute top-0 right-0 h-[240px] w-[240px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/hero-care.jpg"
                alt="Caring moment"
                fill
                className="object-cover"
              />
            </div>

            {/* Top Center image - creating triangle */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-[240px] w-[240px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10">
              <Image
                src="/images/hero-care.jpg"
                alt="team collaboration"
                fill
                className="object-cover"
              />
            </div>

            {/* Counters centered below the images */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8">
              {/* Residents - No background */}
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <Counter value={500} suffix="+" className="text-2xl font-bold text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Residents</p>
                </div>
              </div>

              {/* Care Homes - No background */}
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <div>
                  <Counter value={125} suffix="+" className="text-2xl font-bold text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Care Homes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Professional Care Can Trust & We Provide
            </h2>

            {/* Brief company description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              At Hudsal Healthcare, we are dedicated to providing exceptional care services that prioritize dignity, compassion, and professional excellence. Our experienced team delivers personalized healthcare solutions designed to enhance the quality of life for every individual we serve.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Years of Experience Counter - replacing Learn More button */}
            <div className=" rounded-2xl p-6 inline-block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <Counter value={15} suffix="+" />
                  <p className="text-sm text-emerald font-medium">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Support - Bottom Right - styled like years experience */}
      <div className="absolute bottom-8 right-1/4 rounded-2xl ">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-emerald" />
          </div>
          <div>
            <Counter value={15} suffix="K+" />
            <p className="text-sm text-emerald font-medium">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}