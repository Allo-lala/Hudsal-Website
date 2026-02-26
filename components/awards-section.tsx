"use client";

import Image from "next/image";

const awards = [
  {
    id: 1,
    logo: "/images/awards/benecol.svg",
    organization: "CQC",
    category: "Outstanding Care Provider",
    year: "2024"
  },
  {
    id: 2,
    logo: "/images/awards/spons.svg",
    organization: "NHS",
    category: "Excellence in Healthcare",
    year: "2023"
  },
  {
    id: 3,
    logo: "/images/awards/spons.svg",
    organization: "ISO",
    category: "Quality Management",
    year: "2024"
  },
  {
    id: 4,
    logo: "/images/awards/Heylen.svg",
    organization: "Healthcare Awards",
    category: "Innovation in Care",
    year: "2023"
  },
  {
    id: 5,
    logo: "/images/awards/Vlaamse.svg",
    organization: "Care Industry",
    category: "Best Staffing Solutions",
    year: "2024"
  },
  {
    id: 6,
    logo: "/images/awards/sponlog.svg",
    organization: "UK Healthcare",
    category: "Digital Excellence",
    year: "2023"
  },
  {
    id: 7,
    logo: "/images/awards/spons.svg",
    organization: "Business Excellence",
    category: "Sustainability Leader",
    year: "2024"
  },
  {
    id: 8,
    logo: "/images/awards/sponlog.svg",
    organization: " Awards",
    category: "Outstanding Service",
    year: "2023"
  }
];

export function AwardsSection() {
  // Triple duplicate awards for seamless infinite scroll
  const duplicatedAwards = [...awards, ...awards, ...awards];

  return (
    <>
      {/* Section Title - Outside dark background */}
      <section className="py-12 bg-background px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Trusted by leading organizations in healthcare and beyond
          </p>
        </div>
      </section>

      {/* Partners Slider - Dark background */}
      <section className="py-12 bg-[#1a2e1a] overflow-hidden">
        <div className="max-w-full">
          {/* Infinite Scrolling Awards - Full Width */}
          <div className="relative">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a2e1a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a2e1a] to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling Container - Full Screen Width */}
            <div className="overflow-hidden py-4">
              <div className="flex animate-scroll-left items-center whitespace-nowrap">
                {duplicatedAwards.map((award, index) => (
                  <div
                    key={`${award.id}-${index}`}
                    className="flex-shrink-0 mx-8 group"
                  >
                    <div className="flex items-center justify-center hover:scale-110 transition-all duration-300">
                      {/* Award Logo */}
                      <Image
                        src={award.logo}
                        alt={`${award.organization} award`}
                        width={80}
                        height={80}
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll-left {
            animation: scroll-left 15s linear infinite;
          }
          
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </>
  );
}