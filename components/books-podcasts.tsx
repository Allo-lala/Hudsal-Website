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
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Books</h3>
            </div>

            <div className="space-y-6">
              {books.map((book) => (
                <div key={book.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-emerald/20 to-emerald/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      <p className="text-sm text-muted-foreground mb-3">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald">{book.price}</span>
                        <Button className="bg-emerald hover:bg-emerald-dark text-white">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">
                View All Books
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Podcasts Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Podcasts</h3>
            </div>

            <div className="space-y-6">
              {podcasts.map((podcast) => (
                <div key={podcast.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald/20 to-emerald/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-8 h-8 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{podcast.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{podcast.episodes} episodes</p>
                      <p className="text-sm text-muted-foreground mb-4">{podcast.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                          onClick={() => window.open('https://open.spotify.com', '_blank')}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                          Spotify
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                          onClick={() => window.open('https://podcasts.apple.com', '_blank')}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.232 17.988c-.423 0-.766-.343-.766-.766s.343-.766.766-.766.766.343.766.766-.343.766-.766.766zm2.827-2.54c-1.135 0-2.062-.927-2.062-2.063 0-1.135.927-2.062 2.062-2.062s2.063.927 2.063 2.062c0 1.136-.928 2.063-2.063 2.063zm0-5.395c-1.841 0-3.332 1.491-3.332 3.332s1.491 3.333 3.332 3.333 3.333-1.492 3.333-3.333-1.492-3.332-3.333-3.332zm0-2.7c-3.34 0-6.033 2.693-6.033 6.032s2.693 6.033 6.033 6.033 6.032-2.694 6.032-6.033S14.399 7.353 11.059 7.353z"/>
                          </svg>
                          Apple Podcasts
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">
                View All Podcasts
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}