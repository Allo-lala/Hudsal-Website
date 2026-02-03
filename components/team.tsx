"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "James Wilson",
    role: "Manager",
    image: "/images/team/james.jpg",
    description:
      "Personal Care Our goal each day is to ensure that our residents' needs are not only met but exceeded. Assisted Living Our goal each day is..",
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    role: "Doctor",
    image: "/images/team/sarah.jpg",
    description:
      "Personal Care Our goal each day is to ensure that our residents' needs are not only met but exceeded. Assisted Living Our goal each day is..",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Founder",
    image: "/images/team/emma.jpg",
    description:
      "Personal Care Our goal each day is to ensure that our residents' needs are not only met but exceeded. Assisted Living Our goal each day is..",
  },
];

export function Team() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Info Card */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/images/hero-care.jpg"
                alt="Healthcare professional"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-8 right-0 md:right-[-40px] bg-card rounded-lg shadow-xl p-6 max-w-sm">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-emerald" />
                <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                  Our Experts
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                Our Registered Nurses and Skilled Professionals
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                At Hudsal Senior Care, our Registered Nurses and Skilled
                Professionals are the heart of our exceptional care services.
              </p>

              {/* CTA Button */}
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 flex items-center gap-2">
                KNOW MORE US
                <span className="rotate-45">→</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Team Members */}
          <div className="space-y-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-start gap-6">
      {/* Image with Role Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-card shadow-lg">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Role Badge */}
        <span className="absolute top-0 left-0 bg-emerald text-white text-xs font-medium px-3 py-1 rounded-full">
          {member.role}
        </span>
      </div>

      {/* Info */}
      <div className="pt-2">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {member.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {member.description}
        </p>
      </div>
    </div>
  );
}
