"use client";

import { useState, useRef } from "react";

export function PhilanthropySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="bg-background">
      {/* Content Section - Above Video */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance animate-slide-up">
            When you choose Hadsul, you’re also choosing to uplift lives.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up animate-delay-200">
            Your support helps fund essential charity programs for communities in urgent need.
          </p>
        </div>
      </div>

      {/* Full-width Background Video */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover sm:object-cover"
          poster="/images/philanthropy/video-poster.jpg"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <source src="/images/sponsored.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}