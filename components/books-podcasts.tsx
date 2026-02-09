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
            Books & Podcasts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expand your knowledge with our curated collection of healthcare books and insightful podcasts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Books Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Books</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Expand your healthcare knowledge with our expertly written books
            </p>

            {/* Book Display - Side by Side Layout (No Card) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Book Image - Left Side */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-lg overflow-hidden shadow-2xl bg-transparent">
                  <Image
                    src="/images/books/image.webp"
                    alt="Healthcare Book"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Book Content - Right Side */}
              <div className="flex-1 space-y-4">
                <h4 className="text-xl md:text-2xl font-bold text-foreground">
                  Healthcare & Leadership For Modern Times
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A comprehensive guide to leading healthcare teams through challenges and change. 
                  This book covers essential leadership principles, team management strategies, 
                  and how to navigate the complex healthcare landscape with confidence and expertise.
                </p>
                
                {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    320 pages
                  </span>
                  <span>•</span>
                  <span>Written by Mushin</span>
                </div> */}

                <div className="pt-4">
                  <p className="text-2xl md:text-3xl font-bold text-emerald mb-4">£24.99</p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full text-base md:text-lg py-5 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      ORDER NOW
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="mt-8 text-center">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">
                View All Books
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div> */}
          </div>

          {/* Podcasts Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Podcasts</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Listen to our healthcare podcasts on your favorite platform
            </p>

            {/* Circular Podcast Design */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Multiple Dashed Circles in WhatsApp Green */}
              <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  opacity="0.5"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="38%"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  opacity="0.45"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="31%"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="0.4"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="24%"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  opacity="0.35"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="17%"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              </svg>

              {/* Central Podcast Host Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-[#25D366]/30 animate-pulse" style={{ animationDuration: '3s' }}>
                <Image
                  src="/images/podcast/cover.jpeg"
                  alt="Podcast Host"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* YouTube Icon - Top */}
              <a
                href="https://youtube.com/hadsulltd"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                style={{
                  animation: 'zoomInOut 4s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              >
                <Image
                  src="/images/podcast/youtube.png"
                  alt="YouTube"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </a>

              {/* Apple Podcasts Icon - Right */}
              <a
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 right-[5%] -translate-y-1/2 w-16 h-16 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                style={{
                  animation: 'zoomInOut 4.5s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              >
                <Image
                  src="/images/podcast/ApplePodcasts.png"
                  alt="Apple Podcasts"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </a>

              {/* Spotify Icon - Left */}
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-[5%] -translate-y-1/2 w-16 h-16 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                style={{
                  animation: 'zoomInOut 5s ease-in-out infinite',
                  animationDelay: '2s'
                }}
              >
                <Image
                  src="/images/podcast/Spotify.png"
                  alt="Spotify"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </a>

              {/* Amazon Music Icon - Bottom */}
              <a
                href="https://music.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                style={{
                  animation: 'zoomInOut 5.5s ease-in-out infinite',
                  animationDelay: '3s'
                }}
              >
                <Image
                  src="/images/podcast/amazonMusic.png"
                  alt="Amazon Music"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </a>
            </div>

            {/* <div className="mt-12 text-center">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">
                View All Episodes
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}