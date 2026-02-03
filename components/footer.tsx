"use client";

import React from "react"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowUp, Send, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Healthcare Staffing", href: "/services/staffing" },
  { name: "Care Home Services", href: "/services/care-home" },
  { name: "IT Solutions", href: "/services/it" },
  { name: "Medical Products", href: "/products" },
  { name: "Training Programs", href: "/services/training" },
];

const legal = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "GDPR Compliance", href: "/gdpr" },
];

const socials = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <>
      <footer className="bg-[#1a2e1a] dark:bg-[#0f1a0f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl tracking-wide">
                    HUDSAL
                  </span>
                  <span className="text-white/60 text-xs">
                    Living in harmony, every day
                  </span>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Providing exceptional healthcare staffing, care home services, and
                innovative IT solutions for healthcare providers across the UK.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-emerald transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-white/70 hover:text-emerald transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
              <p className="text-white/70 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and healthcare insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald"
                  />
                  <Button
                    type="submit"
                    className="bg-emerald hover:bg-emerald-dark text-white px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              {/* Legal Links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-white/60 hover:text-emerald transition-colors text-xs"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Hudsal. All rights reserved.
              </p>
              <p className="text-white/60 text-sm">
                CQC Registered | NHS Compliant | ISO 9001 Certified
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button - Fixed on right side */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full bg-emerald hover:bg-emerald-dark text-white shadow-lg shadow-emerald/30 flex items-center justify-center transition-all animate-in fade-in slide-in-from-bottom-4"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* WhatsApp Button - Fixed on left side */}
      <a
        href="https://wa.me/447000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
