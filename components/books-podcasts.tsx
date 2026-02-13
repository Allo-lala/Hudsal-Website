"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, ExternalLink, ShoppingCart } from "lucide-react";
import Image from "next/image";

const books = [
  {
    id: 1,
    title: "Healthcare Leadership in Modern Times",
    author: "Dr. Sarah Johnson",
    description: "A comprehensive guide to leading healthcare teams through challenges and change.",
    image: "/images/book-1.jpg",
    price: "£24.99"
  },
  {
    id: 2,
    title: "The Future of Healthcare Staffing",
    author: "Michael Thompson",
    description: "Insights into recruitment strategies and workforce management in healthcare.",
    image: "/images/book-2.jpg",
    price: "£19.99"
  },
  {
    id: 3,
    title: "Digital Health Solutions",
    author: "Emma Wilson",
    description: "Exploring technology's role in transforming healthcare delivery.",
    image: "/images/book-3.jpg",
    price: "£29.99"
  }
];

const podcasts = [
  {
    id: 1,
    title: "Healthcare Insights Weekly",
    description: "Weekly discussions on healthcare trends, challenges, and innovations.",
    episodes: 45,
    image: "/images/podcast-1.jpg"
  },
  {
    id: 2,
    title: "Staffing Solutions Podcast",
    description: "Expert advice on healthcare recruitment and workforce management.",
    episodes: 32,
    image: "/images/podcast-2.jpg"
  },
  {
    id: 3,
    title: "Care Home Chronicles",
    description: "Stories and insights from care home professionals and residents.",
    episodes: 28,
    image: "/images/podcast-3.jpg"
  }
];

export function BooksAndPodcasts() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Knowledge & Insights
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Books, Podcasts & Webinars
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expand your knowledge with our curated collection of healthcare books, insightful podcasts, and interactive webinars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Books Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Books</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Expand your healthcare knowledge with our expertly written books
            </p>

            {/* Book Display - Vertical Layout */}
            <div className="flex flex-col items-center text-center">
              {/* Book Image - Smaller Size */}
              <div className="flex-shrink-0 mb-6">
                <div className="relative w-48 h-64 sm:w-52 sm:h-72 rounded-lg overflow-hidden shadow-2xl bg-transparent">
                  <Image
                    src="/images/books/image.jpeg"
                    alt="Healthcare Book"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Book Content - Below Image */}
              <div className="space-y-4 max-w-sm">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A comprehensive guide to leading healthcare teams through challenges and change in modern healthcare environments.
                </p>

                <div className="pt-2">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-sm text-muted-foreground">from</span>
                    <p className="text-2xl font-bold text-emerald">£24.99</p>
                  </div>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full text-base py-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      ORDER NOW
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Podcasts Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Podcasts</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Listen to our healthcare podcasts on your favorite platform
            </p>

            {/* Circular Podcast Design - Increased Size */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Multiple Dashed Circles in WhatsApp Green - Larger Rings */}
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="32%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    opacity="0.45"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="24%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    opacity="0.4"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="16%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    opacity="0.35"
                  />
                </svg>

                {/* Central Podcast Host Image - Larger */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-[#25D366]/30 animate-pulse" style={{ animationDuration: '3s' }}>
                  <Image
                    src="/images/podcast/cover.jpeg"
                    alt="Podcast Host"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* YouTube Icon - Top - Larger */}
                <a
                  href="https://youtube.com/hadsulltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-[6%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 4s ease-in-out infinite',
                    animationDelay: '0s'
                  }}
                >
                  <Image
                    src="/images/podcast/youtube.png"
                    alt="YouTube"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Apple Podcasts Icon - Right - Larger */}
                <a
                  href="https://podcasts.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-1/2 right-[6%] -translate-y-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 4.5s ease-in-out infinite',
                    animationDelay: '1s'
                  }}
                >
                  <Image
                    src="/images/podcast/ApplePodcasts.png"
                    alt="Apple Podcasts"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Spotify Icon - Left - Larger */}
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-1/2 left-[6%] -translate-y-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 5s ease-in-out infinite',
                    animationDelay: '2s'
                  }}
                >
                  <Image
                    src="/images/podcast/Spotify.png"
                    alt="Spotify"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Amazon Music Icon - Bottom - Larger */}
                <a
                  href="https://music.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 5.5s ease-in-out infinite',
                    animationDelay: '3s'
                  }}
                >
                  <Image
                    src="/images/podcast/amazonMusic.png"
                    alt="Amazon Music"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Webinars Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Live Webinars</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Join our interactive webinars and get notified when we go live
            </p>

            {/* Square Webinar Design - Similar to Podcast but Square */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Square Border with Emerald Color */}
                <div className="absolute inset-0 border-4 border-emerald rounded-2xl bg-gradient-to-br  shadow-2xl"></div>
                
                {/* Inner Square Border */}
                <div className="absolute inset-4 border-2 border-emerald/30 rounded-xl"></div>
                
                {/* Central Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {/* Live Indicator */}
                  <div className="w-4 h-4 bg-emerald rounded-full animate-pulse mb-4"></div>
                  
                  {/* Main Text */}
                  <h4 className="text-lg font-bold text-foreground mb-2">Get Notified</h4>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Subscribe to get notified when we go live with healthcare webinars
                  </p>
                  
                  {/* Buttons */}
                  <div className="space-y-3 w-full max-w-52">
                    <a
                      href="https://hadsul.co.uk/webinar-notifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-4 py-2 w-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all animate-pulse">
                        Subscribe
                      </Button>
                    </a>
                    
                    <a
                      href="/webinars/recordings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white rounded-full px-4 py-2 w-full text-sm font-semibold transition-all">
                        Previous Recordings
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}