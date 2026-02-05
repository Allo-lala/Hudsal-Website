import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Linkedin, Mail } from "lucide-react";

export const metadata = {
  title: "Our Team ",
  description: "Meet the dedicated professionals at Hudsal Healthcare who are committed to providing exceptional care services.",
};

const teamMembers = [
  {
    id: 1,
    name: "Mushin Ssenyonga",
    role: "Chief Executive Officer",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "james@hudsal.co.uk",
  },
  {
    id: 2,
    name: "Mushin Ssenyonga",
    role: "Medical Director",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "sarah@hudsal.co.uk",
  },
  {
    id: 3,
    name: "Mushin Ssenyonga",
    role: "Founder & Chairman",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "emma@hudsal.co.uk",
  },
  {
    id: 4,
    name: "Mushin Ssenyonga",
    role: "Director of Nursing",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "margaret@hudsal.co.uk",
  },
  {
    id: 5,
    name: "Mushin Ssenyonga",
    role: "Operations Manager",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "robert@hudsal.co.uk",
  },
  {
    id: 6,
    name: "Mushin Ssenyonga",
    role: "IT Director",
    department: " ",
    image: "/images/team/james.jpg",
    bio: " ",
    linkedin: "#",
    email: "david@hudsal.co.uk",
  },
];

const departments = ["All", "Leadership", "Medical", "Clinical", "Operations", "Technology"];

export default function TeamPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Meet Our Experts"
        // description="Dedicated professionals committed to delivering exceptional healthcare services."
      />

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Department Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {departments.map((dept, index) => (
              <button
                key={dept}
                type="button"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? "bg-emerald text-white" 
                    : "bg-secondary text-foreground hover:bg-emerald/10 hover:text-emerald"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Role Badge */}
                  <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-medium px-3 py-1 rounded-full">
                    {member.department}
                  </span>

                  {/* Social Links */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={member.linkedin}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-emerald transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-emerald transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-emerald font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a2e1a] dark:bg-[#0f1a0f]">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald" />
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Join Our Team
            </span>
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Want to Make a Difference in Healthcare?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            We are always looking for passionate healthcare professionals to join our growing team.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 font-medium transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>

      {/* Spacer between CTA and Footer */}
      <div className="h-16 bg-background" />

      <Footer />
    </main>
  );
}
