"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Gold on Demand",
    image: "/images/below/two.avif",
    position: "top-left"
  },
  {
    id: 2,
    name: "Platinum Selection",
    image: "/images/below/four.avif",
    position: "top-right"
  },
  {
    id: 3,
    name: "Emerald Global",
    image: "/images/below/two.avif",
    position: "bottom-left"
  },
  {
    id: 4,
    name: "Hadsul House",
    image: "/images/below/four.avif",
    position: "bottom-right",
    hasCrown: true
  }
];

export function ProductsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[700px] bg-beige">
      <div className="max-w-7xl mx-auto relative z-10 h-full">
        {/* Product Images in Corners */}
        {products.map((product) => (
          <div
            key={product.id}
            className={`absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 ${
              product.position === "top-left" ? "top-0 left-0" :
              product.position === "top-right" ? "top-0 right-0" :
              product.position === "bottom-left" ? "bottom-16 left-0" :
              "bottom-0 right-0"
            }`}
          >
            {/* Crown for Hadsul House */}
            {product.hasCrown && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                <Image
                  src="/images/below/crown.avif"
                  alt="Crown"
                  width={60}
                  height={60}
                  className="object-contain animate-pulse"
                />
              </div>
            )}
            
            {/* Product Image - No card background, just the image shape */}
            <div className="relative w-full h-full hover:scale-105 transition-transform duration-300 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Product Name Overlay with emerald background */}
              <div className="absolute bottom-0 left-0 right-0 bg-emerald/90 backdrop-blur-sm rounded-b-lg">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg text-center py-2">
                  {product.name}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Central Content */}
        <div className="flex items-center justify-center min-h-[700px]">
          <div className="text-center max-w-4xl mx-auto px-8 py-16">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-emerald">Hadsul GOT</span>
                <br />
                <span className="text-emerald">WE'VE GOT</span>
                <br />
                <span className="text-foreground italic font-script text-5xl sm:text-6xl lg:text-7xl">
                  the vision
                  <br />
                  the path
                </span>
              </h1>
            </div>

            {/* Two Column Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-left">
              {/* Left Column */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  It's no secret that 90% of new business ventures in the UK don't make it past their first year.* But that's where we come in...
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Hadsul Healthcare, we provide the coaching, guidance, support programs & high-energy business building experiences that make all the difference in reaching your biggest, boldest, most outrageous success goals.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hadsul is built on real-world experience, hard-earned lessons, & the belief that you deserve more than just inspiration —you deserve a "tried & tested" path forward.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're just starting, growing or ready to scale, there's a place for you here.
                </p>
              </div>
            </div>

            {/* CTA Button - Larger with glow effect */}
            <div className="flex justify-center">
              <Link href="/products">
                <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-12 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse-glow">
                  Learn More
                  {/* <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" /> */}
                </Button>
              </Link>
            </div>

            {/* Source Attribution */}
            {/* <div className="mt-8 text-xs text-muted-foreground">
              <p>Source: Office for National Statistics (ONS), Business Demography 2023. Based on business survival rates for UK enterprises born in 2021-2022.</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}