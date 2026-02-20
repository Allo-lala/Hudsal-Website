"use client";

export function PhilanthropySection() {

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
      <div className="relative h-screen w-full overflow-hidden">
        <iframe
          src="https://streamable.com/e/s70uv8?autoplay=1&nocontrols=1&loop=1&muted=1"
          className="absolute inset-0 w-full h-full object-cover"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </section>
  );
}