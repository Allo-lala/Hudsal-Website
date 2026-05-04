"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CRMRequestModal } from "@/components/crm-request-modal";

export function CrmSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <CRMRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ backgroundColor: "#d1c9c9", color: "#174731" }}>
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#f10808" }} />
              <span className="text-emerald text-sm font-medium">AI-powered CRM</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Care home management{" "}
              <span className="text-emerald">is easier</span>{" "}
              with the right tools
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              All-in-one AI-powered care home platform to manage enquiries, capture leads, schedule staff and tours, handle compliance, payroll, care planning, and more — efficiently and effortlessly.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center sm:justify-start">
              {/* <a href="https://crm.hadsul.co.uk" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full px-7 py-3 font-semibold text-base shadow-lg">
                  Sign in
                </Button>
              </a> */}
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full px-7 py-3 font-semibold text-base shadow-lg transition-all"
              >
                Request CRM
              </Button>
            </div>

            {/* Trust line */}
            <p className="text-gray-400 text-sm pt-1">
              Trusted by care homes across the UK, USA &amp; Europe
            </p>
          </div>

          {/* Right — screenshot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/login.webp"
                alt="Hadsul CRM dashboard"
                width={700}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
