"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Mushin Ssenyonga",
    role: " ",
    image: "/images/team/james.jpg",
    description:
      " Manager ",
    email: "james.wilson@hudsal.com",
    linkedin: "https://linkedin.com/in/jameswilson",
  },
  {
    id: 2,
    name: "Mushin Ssenyonga",
    role: " ",
    image: "/images/team/james.jpg",
    description:
      "Manager ",
    email: "sarah.chen@hudsal.com",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    id: 3,
    name: "Mushin Ssenyonga",
    role: " ",
    image: "/images/team/james.jpg",
    description:
      "Manager",
    email: "emma.thompson@hudsal.com",
    linkedin: "https://linkedin.com/in/emmathompson",
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
              Meet Our Team
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Expert Healthcare Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the dedicated professionals who make exceptional care possible at Hudsal Senior Care
          </p>
        </div>

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
                At Hudsal Senior Care, our Registered Nurses and Skilled
                Professionals are the heart of our exceptional care services.
              </p>

              {/* CTA Button */}
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 flex items-center gap-2">
                Our Team
                {/* <span className="rotate-45">→</span> */}
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
  email: string;
  linkedin: string;
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
      <div className="pt-2 flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {member.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {member.description}
        </p>
        
        {/* Contact Information */}
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-emerald hover:text-emerald-dark transition-colors"
            title={`Email ${member.name}`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald hover:text-emerald-dark transition-colors"
            title={`${member.name} on LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
