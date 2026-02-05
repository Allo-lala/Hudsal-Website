"use client";

import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  description?: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section className="relative bg-[#1a2e1a] dark:bg-[#0f1a0f] pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#25D366_0%,transparent_50%)]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-emerald text-sm font-medium tracking-wider uppercase">
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
