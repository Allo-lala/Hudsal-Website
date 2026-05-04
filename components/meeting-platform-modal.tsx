"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface MeetingPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Declare Calendly type
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function MeetingPlatformModal({ isOpen, onClose }: MeetingPlatformModalProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showZoomEmbed, setShowZoomEmbed] = useState(false);
  const [showGoogleMeetEmbed, setShowGoogleMeetEmbed] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    }

    return () => {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const openCalendly = () => {
    // Prevent multiple popups
    if (isCalendlyOpen) {
      return;
    }

    if (typeof window !== 'undefined' && window.Calendly) {
      setIsCalendlyOpen(true);
      
      // Don't remove existing overlays - let Calendly handle it
      // Just open the widget
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/musokeakisam16/30min?back=1&month=2026-02'
      });

      // Reset flag after popup is closed
      setTimeout(() => {
        setIsCalendlyOpen(false);
      }, 2000);

      // Close the platform selection modal
      onClose();
    } else {
      // Fallback: open in new tab if widget not loaded
      window.open('https://calendly.com/musokeakisam16/30min?back=1&month=2026-02', '_blank');
      onClose();
    }
  };

  const openZoom = () => {
    // Show Zoom embed instead of opening new tab
    setShowZoomEmbed(true);
  };

  const closeZoomEmbed = () => {
    setShowZoomEmbed(false);
  };

  const openGoogleMeet = () => {
    // Show Google Meet embed
    setShowGoogleMeetEmbed(true);
  };

  const closeGoogleMeetEmbed = () => {
    setShowGoogleMeetEmbed(false);
  };

  // If Zoom embed is showing, display it
  if (showZoomEmbed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl animate-scale-in max-w-4xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Schedule via Zoom</h2>
            <button
              onClick={() => {
                closeZoomEmbed();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Embed */}
          <div className="p-4">
            <iframe 
              src="https://scheduler.zoom.us/kyagulanyi-allan/30-mins-with-kyagulanyi?embed=true" 
              frameBorder="0" 
              className="w-full h-[560px] rounded-lg"
              title="Zoom Scheduler"
            />
          </div>
        </div>

        {/* Custom CSS for animation */}
        <style jsx>{`
          @keyframes scaleIn {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-scale-in {
            animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    );
  }

  // If Google Meet embed is showing, display it
  if (showGoogleMeetEmbed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl animate-scale-in max-w-4xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Schedule a Google Meet</h2>
            <button
              onClick={() => {
                closeGoogleMeetEmbed();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Google Calendar Appointment Scheduling Embed */}
          <div className="p-4">
            <iframe 
              src="https://calendar.app.google/5zxgZyDxJy54T6NJA" 
              frameBorder="0" 
              className="w-full h-[560px] rounded-lg"
              title="Google Meet Scheduler"
            />
          </div>
        </div>

        {/* Custom CSS for animation */}
        <style jsx>{`
          @keyframes scaleIn {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-scale-in {
            animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Choose Your Platform</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Icons Only */}
        <div className="p-8">
          <p className="text-muted-foreground text-center mb-8">
            Select your preferred meeting platform
          </p>

          <div className="flex items-center justify-center gap-8">
            {/* Calendly Icon */}
            <button
              onClick={openCalendly}
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-emerald">
                <Image
                  src="/images/core/calendly.png"
                  alt="Calendly"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            {/* Zoom Icon */}
            <button
              onClick={openZoom}
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-emerald">
                <Image
                  src="/images/core/zoom.png"
                  alt="Zoom"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            {/* Google Meet Icon */}
            <button
              onClick={openGoogleMeet}
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-emerald">
                <Image
                  src="/images/core/google-meet.png"
                  alt="Google Meet"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
