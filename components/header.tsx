"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "HOME", href: "/", hasDropdown: false },
  { name: "ABOUT", href: "/about", hasDropdown: false },
  { 
    name: "PAGES", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { name: "Our Team", href: "/team" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "FAQ", href: "/faq" },
      { name: "Events", href: "/events" },
    ]
  },
  { name: "SERVICES", href: "/services", hasDropdown: false },
  { name: "CAREERS", href: "/careers", hasDropdown: false },
  { name: "PRODUCTS", href: "/products", hasDropdown: false },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo - centered positioning */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={50}
              className="h-15 w-auto"
            />
          </Link>

          {/* Desktop Navigation with integrated Contact Us button */}
          <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown && item.dropdownItems ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-xl border border-border py-2 z-50">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-emerald/10 hover:text-emerald transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Contact Us Button integrated into navigation */}
            <Link href="/contact">
              <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 flex items-center gap-2 ml-4">
                CONTACT US
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-hero-dark/95 rounded-lg p-4 mb-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown && item.dropdownItems ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full text-white/90 hover:text-white text-sm font-medium transition-colors py-2"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-2 mt-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block text-white/70 hover:text-emerald text-sm py-1"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-white/90 hover:text-white text-sm font-medium transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link href="/contact">
                <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 w-full mt-4">
                  CONTACT US
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
