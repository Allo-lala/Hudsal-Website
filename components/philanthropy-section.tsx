"use client";

export function PhilanthropySection() {

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-width Background Video */}
      <iframe
        src="https://streamable.com/e/s70uv8?autoplay=1&nocontrols=1&loop=1&muted=1"
        className="absolute inset-0 w-full h-full object-cover"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ pointerEvents: 'none' }}
      />

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
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-slide-up animate-delay-300">
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
          </div> */}

          {/* Donate Button */}
          <div className="animate-slide-up animate-delay-400">
            <a
              href="/donate"
              className="inline-block"
            >
              
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}