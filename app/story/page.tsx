"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const timelineEvents = [
  {
    year: "2016",
    title: "The Beginning",
    description: "Hadsul Healthcare was founded with a vision to transform healthcare delivery in the UK. Started with a small team of passionate healthcare professionals.",
    image: "/images/timeline/begining.png",
    side: "left"
  },
  {
    year: "2017",
    title: "First Care Home Partnership",
    description: "Established partnerships with 5 care homes across London, providing quality healthcare staffing solutions and setting new standards in care delivery.",
    image: "/images/timeline/partnership.png",
    side: "right"
  },
  {
    year: "2018",
    title: "Expansion & Growth",
    description: "Expanded operations to cover 15+ care facilities. Launched our consultancy division to help healthcare organizations optimize their operations.",
    image: "/images/timeline/expansion.png",
    side: "left"
  },
  {
    year: "2019",
    title: "Technology Integration",
    description: "Introduced IT solutions division, developing care management systems and digital platforms to modernize healthcare operations.",
    image: "/images/timeline/tech-intergration.png",
    side: "right"
  },
  {
    year: "2020",
    title: "Pandemic Response",
    description: "Played a crucial role during COVID-19, providing essential healthcare staff and support to overwhelmed care facilities across the UK.",
    image: "/images/timeline/pandemic.png",
    side: "left"
  },
  {
    year: "2021",
    title: "Recognition & Awards",
    description: "Received multiple industry awards for excellence in healthcare staffing and innovation. Reached milestone of 500+ healthcare professionals.",
    image: "/images/timeline/awards.png",
    side: "right"
  },
  {
    year: "2022",
    title: "Global Philanthropy",
    description: "Launched philanthropic initiatives in Africa, establishing healthcare centers and supporting communities in 8 countries.",
    image: "/images/timeline/philanthropy.png",
    side: "left"
  },
  {
    year: "2023",
    title: "Climate Action",
    description: "Committed to sustainability with 100% renewable energy transition, planted 50,000+ trees, and achieved 75% waste reduction.",
    image: "/images/timeline/climate-timeline.png",
    side: "right"
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Launched comprehensive digital platforms including books, podcasts, and webinars to share healthcare knowledge and expertise.",
    image: "/images/timeline/digitalTransformation.png",
    side: "left"
  },
  {
    year: "2025",
    title: "The Future",
    description: "Continuing to innovate and expand, with plans to reach 1000+ healthcare professionals and impact 50,000+ lives across the UK and beyond.",
    image: "/images/timeline/future.png",
    side: "right"
  }
];

export default function StoryPage() {
  useEffect(() => {
    document.title = "Our Story | Hadsul Limited";

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Dark Background with Quote */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#1a2e1a] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-[400px] lg:h-[600px]">
                <Image
                  src="/images/story/first.png"
                  alt="Our Story"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Quote */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="text-emerald">You Have Two Choices In Life:</span>
                  <br />
                  <span className="text-white italic text-5xl sm:text-6xl lg:text-7xl">
                    Success or Fear
                  </span>
                  <br />
                  <span className="text-emerald">You Can’t Have Both!</span>
                  <br />
                </h1>
              </div>

              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-8">
                <span className="text-4xl text-emerald">"</span>
                Hadsul is built on real-world experience, hard-earned lessons, and the belief that you deserve more than just inspiration—you deserve a path forward. Whether you're just starting or ready to scale, there's a place for you here.
                <span className="text-4xl text-emerald">"</span>
              </blockquote>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="/business-xray" className="inline-block">
                  <button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    Business X-ray
                  </button>
                </a>
                <a href="/products" className="inline-block">
                  <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    Our-Products
                  </button>
                </a>
              </div>

              {/* <div className="text-white/80">
                <p className="font-semibold text-lg mb-1">Hadsul Healthcare Team, 2024</p>
                <p className="text-sm">Founder, Healthcare Provider & Innovator</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative">
        {/* Timeline Title */}
        <div className="max-w-7xl mx-auto text-center mb-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="text-foreground">THE HADSUL </span>
            <span className="text-emerald">Timeline</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/20 hidden lg:block transform -translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-32 lg:space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`timeline-item opacity-0 transition-all duration-1000 relative ${
                  event.side === "left" ? "translate-x-[-50px]" : "translate-x-[50px]"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Mobile Layout (Stacked) */}
                <div className="lg:hidden flex flex-col items-center text-center space-y-6 px-4">
                  {/* Year */}
                  <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground/10 leading-none">
                    {event.year}
                  </div>

                  {/* Circular Image */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="max-w-sm sm:max-w-md px-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout (Alternating Sides) */}
                <div className="hidden lg:block">
                  {event.side === "left" ? (
                    <div className="grid grid-cols-2 gap-12 items-center">
                      {/* Left Side Content */}
                      <div className="text-right pr-12">
                        {/* Year */}
                        <div className="text-8xl xl:text-9xl font-bold text-foreground/10 leading-none mb-6">
                          {event.year}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl xl:text-3xl font-bold text-foreground mb-4">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Right Side Image */}
                      <div className="relative pl-12">
                        {/* Connecting Line */}
                        <div className="absolute left-0 top-1/2 w-12 h-0.5 bg-foreground/20 transform -translate-y-1/2"></div>
                        
                        {/* Center Dot */}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald rounded-full border-4 border-background z-10"></div>

                        {/* Circular Image */}
                        <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-12 items-center">
                      {/* Left Side Image */}
                      <div className="relative pr-12 flex justify-end">
                        {/* Circular Image */}
                        <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Connecting Line */}
                        <div className="absolute right-0 top-1/2 w-12 h-0.5 bg-foreground/20 transform -translate-y-1/2"></div>
                        
                        {/* Center Dot */}
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald rounded-full border-4 border-background z-10"></div>
                      </div>

                      {/* Right Side Content */}
                      <div className="text-left pl-12">
                        {/* Year */}
                        <div className="text-8xl xl:text-9xl font-bold text-foreground/10 leading-none mb-6">
                          {event.year}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl xl:text-3xl font-bold text-foreground mb-4">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Text Section */}
      <section className="py-12 bg-[#1a2e1a] overflow-hidden mb-20">
        <div className="flex whitespace-nowrap animate-scroll-left">
          {/* Duplicate the text multiple times for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {/* <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 lg:mx-8">
                Together,
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 lg:mx-8">
                 We benefit better •
              </span> */}
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 lg:mx-8">
                 Clarity
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 lg:mx-8">
                Engineered
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 lg:mx-8">
                Before You do anything
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 lg:mx-8">
                First Understand Everything
              </span>
              {/* <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mx-4 sm:mx-6 lg:mx-8">
                Transform
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script italic text-beige mx-4 sm:mx-6 lg:mx-8">
                Forever
              </span> */}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-beige mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-beige rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12">
              {/* Left Decoration - Phone GIF */}
              <div className="hidden lg:block lg:col-span-2">
                <div className="relative w-48 h-48 xl:w-56 xl:h-56 animate-float">
                  <Image
                    src="/images/story/phone.gif"
                    alt="Contact"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Center Content */}
              <div className="lg:col-span-8 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  STUCK ON{" "}
                  <span className="block lg:inline">WHERE TO</span>{" "}
                  <span className="italic text-emerald text-4xl md:text-5xl lg:text-6xl">START?</span>
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 mb-6">
                  Your next <span className="font-bold text-emerald">BIG</span> move starts right here!
                </p>
                <p className="text-base text-muted-foreground mb-8">
                  The Hadsul team has your back - get in touch & we'll take all the guesswork out of it!
                </p>
                <a href="/business-xray" className="inline-block">
                  <button className="bg-[#1a2e1a] hover:bg-emerald text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
                    LET'S GO
                  </button>
                </a>
              </div>

              {/* Right Decoration - Download Icon */}
              {/* <div className="hidden lg:block lg:col-span-2">
                <div className="relative w-48 h-48 xl:w-56 xl:h-56 animate-float" style={{ animationDelay: '1s' }}>
                  <Image
                    src="/images/story/download.png"
                    alt="Download"
                    fill
                    className="object-contain"
                  />
                </div>
              </div> */}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 border-4 border-emerald rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-emerald rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .timeline-item.animate-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </main>
  );
}
