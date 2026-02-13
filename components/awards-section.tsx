"use client";

import Image from "next/image";

const awards = [
  {
    id: 1,
    logo: "/images/awards/spoty.avif",
    organization: "CQC",
    category: "Outstanding Care Provider",
    year: "2024"
  },
  {
    id: 2,
    logo: "/images/awards/spo.avif",
    organization: "NHS",
    category: "Excellence in Healthcare",
    year: "2023"
  },
  {
    id: 3,
    logo: "/images/awards/spoty.avif",
    organization: "ISO",
    category: "Quality Management",
    year: "2024"
  },
  {
    id: 4,
    logo: "/images/awards/spo.avif",
    organization: "Healthcare Awards",
    category: "Innovation in Care",
    year: "2023"
  },
  {
    id: 5,
    logo: "/images/awards/spoty.avif",
    organization: "Care Industry",
    category: "Best Staffing Solutions",
    year: "2024"
  },
  {
    id: 6,
    logo: "/images/awards/aroc.png",
    organization: "UK Healthcare",
    category: "Digital Excellence",
    year: "2023"
  },
  {
    id: 7,
    logo: "/images/awards/spo.avif",
    organization: "Business Excellence",
    category: "Sustainability Leader",
    year: "2024"
  },
  {
    id: 8,
    logo: "/images/awards/spoty.avif",
    organization: " Awards",
    category: "Outstanding Service",
    year: "2023"
  }
];

export function AwardsSection() {
  // Duplicate awards for seamless infinite scroll
  const duplicatedAwards = [...awards, ...awards];

  return (
    <section className="py-16 bg-gradient-to-r from-emerald/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 bg-emerald rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-emerald rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Infinite Scrolling Awards - Reduced Size */}
        <div className="relative mb-8">
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald/10 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald/10 to-transparent z-10"></div>
          
          {/* Scrolling Container - Reduced Height */}
          <div className="overflow-hidden bg-emerald/10 rounded-2xl py-4 mx-4">
            <div className="flex animate-scroll-left items-center">
              {duplicatedAwards.map((award, index) => (
                <div
                  key={`${award.id}-${index}`}
                  className="flex-shrink-0 mx-6 group"
                >
                  <div className="flex items-center justify-center hover:scale-110 transition-all duration-300">
                    {/* Award Logo - Smaller Size */}
                    <Image
                      src={award.logo}
                      alt={`${award.organization} award`}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Awards Button */}
        <div className="text-center">
          <a
            href="/awards"
            className="inline-block"
          >
            <button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Our Awards
            </button>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}