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
  // Duplicate awards for seamless infinite scroll
  const duplicatedAwards = [...awards, ...awards];

  return (
    <section className="py-12 bg-emerald overflow-hidden">
      <div className="max-w-full">
        {/* Infinite Scrolling Awards - Full Width */}
        <div className="relative mb-8">
          {/* Scrolling Container - Full Screen Width */}
          <div className="overflow-hidden py-6">
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

        {/* Our Awards Button */}
        <div className="text-center">
          <a
            href="#"
            className="inline-block"
          >
            <button className="bg-white hover:bg-gray-100 text-emerald font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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