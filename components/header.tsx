"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
  X,
  Calendar,
} from "lucide-react";

// Declare Calendly type
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const navItems = [
  { name: "OUR INSIGHTS", href: "/", hasDropdown: false },
  { name: "ABOUT HADSUL", href: "/story", hasDropdown: false },
  { name: "WHAT WE DO", href: "/services", hasDropdown: false },
  // { name: "INDUSTRIES", href: "/industries", hasDropdown: false },
  // { name: "CAREERS", href: "/careers", hasDropdown: false },
  { name: " OUR PRODUCTS", href: "/products", hasDropdown: false },
  { 
    name: "THE HADSUL HOUSE", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      // { name: "Our Team", href: "/team" },
      { name: "Books", href: "/#books-podcasts" },
      { name: "Webinars", href: "/#books-podcasts" },
      { name: "Podcasts", href: "/#books-podcasts" },
      { name: "Careers", href: "/careers" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Events", href: "/events" },
      { name: "Contact Us", href: "/contact" },
    ]
  },
];

interface HeaderProps {
  variant?: 'light' | 'dark' | 'auto';
  isAssessmentMode?: boolean;
}

export function Header({ variant = 'auto', isAssessmentMode = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load Calendly widget script and styles only once
  useEffect(() => {
    // Check if Calendly is already loaded
    if (document.querySelector('script[src*="calendly"]')) {
      return;
    }

    // Add Calendly CSS only if not already present
    if (!document.querySelector('link[href*="calendly"]')) {
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Add Calendly JS only if not already present
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Add custom styles to ensure only one popup appears
    const style = document.createElement('style');
    style.textContent = `
      .calendly-badge-widget,
      .calendly-badge-content {
        display: none !important;
      }
      /* Ensure only one overlay appears */
      .calendly-overlay:not(:last-of-type) {
        display: none !important;
      }
      /* Hide duplicate spinners */
      .calendly-spinner-container:not(:last-of-type) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple popups
    if (isCalendlyOpen) {
      console.log('Calendly already open, ignoring click');
      return;
    }
    
    if (typeof window !== 'undefined' && window.Calendly) {
      console.log('Opening Calendly popup');
      setIsCalendlyOpen(true);
      
      // Remove ALL existing Calendly elements
      const existingOverlays = document.querySelectorAll('.calendly-overlay, .calendly-popup-content, .calendly-popup-close');
      console.log('Removing existing overlays:', existingOverlays.length);
      existingOverlays.forEach(overlay => overlay.remove());
      
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        window.Calendly?.initPopupWidget({
          url: 'https://calendly.com/musokeakisam16/30min?back=1&month=2026-02'
        });
      }, 100);
      
      // Reset flag after popup is closed (longer timeout)
      setTimeout(() => {
        setIsCalendlyOpen(false);
      }, 2000);
    } else {
      console.log('Calendly not loaded, opening in new tab');
      // Fallback: open in new tab if widget not loaded
      window.open('https://calendly.com/musokeakisam16/30min?back=1&month=2026-02', '_blank');
    }
  };

  // Check if we're on other pages that need header background
  const needsHeaderBackground = pathname?.includes('/contact') || 
                               pathname?.includes('/about') ||
                               pathname?.includes('/services') ||
                               pathname?.includes('/products') ||
                               pathname?.includes('/industries') ||
                               pathname?.includes('/careers') ||
                               pathname?.includes('/team') ||
                               pathname?.includes('/testimonials') ||
                               pathname?.includes('/events') ||
                               pathname?.includes('/story') ||
                               pathname?.includes('/privacy') ||
                               pathname?.includes('/terms') ||
                               pathname?.includes('/faq');

  // For all pages, use consistent white text styling
  const navLinkClass = 'text-white/90 hover:text-white';
  
  const mobileNavLinkClass = 'text-white/90 hover:text-white';
    
  const mobileMenuBg = 'bg-hero-dark/95';
    
  const hamburgerColor = 'text-white';
    
  // Add background for assessment steps and other content pages
  const headerBgClass = (isAssessmentMode || needsHeaderBackground) ? 'bg-[#1a2e1a]' : '';

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
    <header className={`absolute top-0 left-0 right-0 z-50 ${headerBgClass}`}>
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
                      className={`flex items-center gap-1 ${navLinkClass} text-sm font-medium transition-colors`}
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
                    className={`flex items-center gap-1 ${navLinkClass} text-sm font-medium transition-colors`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Book a Call Button integrated into calendly */}
            <Button 
              onClick={openCalendly}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 flex items-center gap-2 ml-4"
            >
              {/* <Calendar className="w-4 h-4" /> */}
              BOOK A CALL
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`lg:hidden ${hamburgerColor} ml-auto`}
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
          <div className={`lg:hidden ${mobileMenuBg} rounded-lg p-4 mb-4`}>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown && item.dropdownItems ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`flex items-center justify-between w-full ${mobileNavLinkClass} text-sm font-medium transition-colors py-2`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-2 mt-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onTouchEnd={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                                setTimeout(() => {
                                  window.location.href = dropdownItem.href;
                                }, 200);
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                                setTimeout(() => {
                                  router.push(dropdownItem.href);
                                }, 100);
                              }}
                              className="block w-full text-left text-white/70 hover:text-emerald text-sm py-1 rounded transition-colors cursor-pointer"
                              // style={{ minHeight: '20px', touchAction: 'manipulation', pointerEvents: 'auto' }}
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between ${mobileNavLinkClass} text-sm font-medium transition-colors py-2`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button 
                onClick={openCalendly}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 w-full mt-4 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                BOOK A CALL
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
