"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export function PhilanthropySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-width Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
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
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          {/* <div className="mb-6">
            <span className="text-emerald text-sm font-medium tracking-wider uppercase animate-fade-in">
              Our Impact in Africa
            </span>
          </div> */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            In a gentle way, you can shake the world ~ Ghandi
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up animate-delay-200">
            Joining hands towards basic needs where its urgent
          </p>
          
          {/* Stats Overlay */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-slide-up animate-delay-300">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">10,000+</div>
              <div className="text-white/80">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">50+</div>
              <div className="text-white/80">Support Centers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">158</div>
              <div className="text-white/80">Communities</div>
            </div>
          </div>

          {/* Donate Button */}
          <div className="animate-slide-up animate-delay-400">
            <a
              href="/donate"
              className="inline-block"
            >
              <button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Support the Campaign
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div 
        className={`absolute bottom-8 left-8 right-8 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setShowControls(true)}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 bg-emerald hover:bg-emerald-dark rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            
            <button
              onClick={handleMuteToggle}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* <div className="text-white text-sm font-medium">
            Raising hands towards basic need were its urgent
          </div> */}

          <button
            onClick={handleFullscreen}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="w-24 h-24 bg-emerald/80 hover:bg-emerald rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 group"
          >
            <Play className="w-12 h-12 text-white ml-2 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
}