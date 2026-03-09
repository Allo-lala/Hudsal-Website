"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";

export default function ProductsPage() {
  return (
    <main>
      <Header />
      
      {/* Coming Soon Section */}
      <section className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald/20 rounded-full blur-3xl animate-pulse"></div>
              <Sparkles className="w-24 h-24 text-emerald relative z-10 animate-bounce" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-emerald mb-6">
            Coming Soon
          </h1>

        </div>
      </section>

      <Footer />
    </main>
  );
}
