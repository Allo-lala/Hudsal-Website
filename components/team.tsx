"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Muhsin Senyonga",
    role: "Director",
    image: "/images/team/hajj.jpeg",
    description:
      "Leading Hadsul with vision and expertise in healthcare management. Muhsin brings years of experience in healthcare operations and strategic leadership to ensure exceptional care delivery across all our services.",
    email: "manager@hadsul.co.uk",
    linkedin: "https://www.linkedin.com/in/muhsin-senyonga-0a3907326/",
  },
];

export function Team() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Sparkles className="w-5 h-5 text-emerald" /> */}
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Leadership
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Our Director
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leading Hadsul Healthcare with vision, expertise, and commitment to exceptional care delivery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Info Card */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/images/tim.jpeg"
                alt="Healthcare professional"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-8 right-0 md:right-[-40px] bg-card rounded-lg shadow-xl p-6 max-w-sm">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
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
                At Hadsul Senior Care, our Registered Nurses and Skilled
                Professionals are the heart of our exceptional care services.
              </p>

              {/* CTA Button */}
              <Link href="/team">
                <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 flex items-center gap-2">
                  Our Team
                  {/* <span className="rotate-45">→</span> */}
                </Button>
              </Link>
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
  email: string;
  linkedin: string | null;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
      {/* Larger Image with Role Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald shadow-xl">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Role Badge */}
        <span className="absolute -top-2 -right-2 bg-emerald text-white text-xs sm:text-sm font-medium px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg">
          {member.role}
        </span>
      </div>

      {/* Info */}
      <div className="pt-2 sm:pt-4 flex-1">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
          {member.name}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
          {member.description}
        </p>
        
        {/* Contact Information */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 sm:gap-3 text-emerald hover:text-emerald-dark transition-colors bg-emerald/10 hover:bg-emerald/20 px-3 py-2 sm:px-4 sm:py-2 rounded-full"
            title={`Email ${member.name}`}
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Email</span>
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 text-emerald hover:text-emerald-dark transition-colors bg-emerald/10 hover:bg-emerald/20 px-3 py-2 sm:px-4 sm:py-2 rounded-full"
              title={`${member.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
