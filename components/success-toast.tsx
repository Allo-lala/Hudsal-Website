"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  duration?: number;
}

export function SuccessToast({ 
  isVisible, 
  onClose, 
  title, 
  message, 
  duration = 5000 
}: SuccessToastProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti particles
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1,
      }));
      setConfetti(particles);

      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <>
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute top-0 animate-confetti-fall"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          >
            {['🎉', '🎊', '🎉', '🎊', '🎉'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-emerald/20 p-5 min-w-[340px] max-w-md relative overflow-hidden">
          {/* Celebration Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-yellow-500/5 pointer-events-none" />
          
          <div className="relative flex items-start gap-3">
            {/* Success Icon with Celebration */}
            <div className="flex-shrink-0 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center animate-in zoom-in duration-500 shadow-lg shadow-emerald/30">
                <CheckCircle className="w-7 h-7 text-white animate-in zoom-in duration-700" />
              </div>
              {/* Celebration Emoji */}
              <div className="absolute -top-1 -right-1 text-2xl animate-bounce">
                🎉
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-foreground text-lg">{title}</h3>
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald via-emerald-dark to-emerald rounded-full"
              style={{ 
                animation: `progress ${duration}ms linear forwards` 
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
}