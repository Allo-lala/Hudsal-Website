"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Headphones, Search, Filter, ShoppingCart, ExternalLink, Star, Play } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Healthcare Leadership in Modern Times",
    author: "Dr. Sarah Johnson",
    description: "A comprehensive guide to leading healthcare teams through challenges and change. This book covers essential leadership principles, team management strategies, and how to navigate the complex healthcare landscape.",
    image: "/images/book-1.jpg",
    price: "£24.99",
    rating: 4.8,
    reviews: 127,
    category: "Leadership",
    pages: 320,
    publishedYear: 2023
  },
  {
    id: 2,
    title: "The Future of Healthcare Staffing",
    author: "Michael Thompson",
    description: "Insights into recruitment strategies and workforce management in healthcare. Explore innovative approaches to staffing challenges and building resilient healthcare teams.",
    image: "/images/book-2.jpg",
    price: "£19.99",
    rating: 4.6,
    reviews: 89,
    category: "Staffing",
    pages: 280,
    publishedYear: 2023
  },
  {
    id: 3,
    title: "Digital Health Solutions",
    author: "Emma Wilson",
    description: "Exploring technology's role in transforming healthcare delivery. From AI to telemedicine, discover how digital innovations are reshaping patient care.",
    image: "/images/book-3.jpg",
    price: "£29.99",
    rating: 4.9,
    reviews: 203,
    category: "Technology",
    pages: 400,
    publishedYear: 2024
  },
  {
    id: 4,
    title: "Care Home Excellence",
    author: "Dr. James Mitchell",
    description: "Best practices for care home management and resident wellbeing. A practical guide to creating exceptional care environments.",
    image: "/images/book-4.jpg",
    price: "£22.99",
    rating: 4.7,
    reviews: 156,
    category: "Care Management",
    pages: 350,
    publishedYear: 2023
  },
  {
    id: 5,
    title: "Healthcare Innovation Handbook",
    author: "Dr. Lisa Chen",
    description: "Driving innovation in healthcare organizations. Learn how to foster creativity and implement breakthrough solutions in healthcare settings.",
    image: "/images/book-5.jpg",
    price: "£26.99",
    rating: 4.5,
    reviews: 94,
    category: "Innovation",
    pages: 290,
    publishedYear: 2024
  },
  {
    id: 6,
    title: "Patient-Centered Care Strategies",
    author: "Dr. Robert Taylor",
    description: "Putting patients at the heart of healthcare delivery. Strategies for improving patient experience and outcomes through compassionate care.",
    image: "/images/book-6.jpg",
    price: "£21.99",
    rating: 4.8,
    reviews: 178,
    category: "Patient Care",
    pages: 310,
    publishedYear: 2023
  }
];

const podcasts = [
  {
    id: 1,
    title: "Healthcare Insights Weekly",
    description: "Weekly discussions on healthcare trends, challenges, and innovations with industry experts and thought leaders.",
    episodes: 45,
    image: "/images/podcast-1.jpg",
    category: "Industry News",
    duration: "30-45 min",
    frequency: "Weekly",
    rating: 4.8,
    subscribers: "12.5K"
  },
  {
    id: 2,
    title: "Staffing Solutions Podcast",
    description: "Expert advice on healthcare recruitment and workforce management. Real-world solutions for staffing challenges.",
    episodes: 32,
    image: "/images/podcast-2.jpg",
    category: "Recruitment",
    duration: "25-35 min",
    frequency: "Bi-weekly",
    rating: 4.7,
    subscribers: "8.9K"
  },
  {
    id: 3,
    title: "Care Home Chronicles",
    description: "Stories and insights from care home professionals and residents. Celebrating excellence in elderly care.",
    episodes: 28,
    image: "/images/podcast-3.jpg",
    category: "Care Homes",
    duration: "20-30 min",
    frequency: "Weekly",
    rating: 4.9,
    subscribers: "15.2K"
  },
  {
    id: 4,
    title: "Digital Health Revolution",
    description: "Exploring how technology is transforming healthcare. Interviews with innovators and digital health pioneers.",
    episodes: 38,
    image: "/images/podcast-4.jpg",
    category: "Technology",
    duration: "35-50 min",
    frequency: "Weekly",
    rating: 4.6,
    subscribers: "10.8K"
  },
  {
    id: 5,
    title: "Leadership in Healthcare",
    description: "Conversations with healthcare leaders about management, strategy, and organizational excellence.",
    episodes: 41,
    image: "/images/podcast-5.jpg",
    category: "Leadership",
    duration: "40-60 min",
    frequency: "Bi-weekly",
    rating: 4.8,
    subscribers: "9.7K"
  },
  {
    id: 6,
    title: "Patient Stories",
    description: "Inspiring stories from patients and their families. Real experiences that highlight the human side of healthcare.",
    episodes: 25,
    image: "/images/podcast-6.jpg",
    category: "Patient Experience",
    duration: "15-25 min",
    frequency: "Weekly",
    rating: 4.9,
    subscribers: "18.3K"
  }
];

const categories = ["All", "Leadership", "Staffing", "Technology", "Care Management", "Innovation", "Patient Care"];
const podcastCategories = ["All", "Industry News", "Recruitment", "Care Homes", "Technology", "Leadership", "Patient Experience"];

export default function BooksAndPodcastsPage() {
  useEffect(() => {
    document.title = "Books & Podcasts | Hudsal";
  }, []);

  const [activeTab, setActiveTab] = useState("books");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPodcastCategory, setSelectedPodcastCategory] = useState("All");

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedPodcastCategory === "All" || podcast.category === selectedPodcastCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <Header />
      <PageHeader 
        badge="Knowledge Hub" 
        title="Books & Podcasts"
        description="Expand your healthcare knowledge with our curated collection of books and insightful podcasts"
      />

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-secondary/30 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("books")}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === "books"
                    ? "bg-emerald text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Books
              </button>
              <button
                onClick={() => setActiveTab("podcasts")}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === "podcasts"
                    ? "bg-emerald text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Headphones className="w-4 h-4 mr-2 inline" />
                Podcasts
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={activeTab === "books" ? selectedCategory : selectedPodcastCategory}
                onChange={(e) => activeTab === "books" ? setSelectedCategory(e.target.value) : setSelectedPodcastCategory(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {(activeTab === "books" ? categories : podcastCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Books Section */}
          {activeTab === "books" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-emerald/20 to-emerald/5 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-emerald" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded-full">
                        {book.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{book.publishedYear}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{book.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({book.reviews} reviews)</span>
                      <span className="text-xs text-muted-foreground">• {book.pages} pages</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-emerald">{book.price}</span>
                      <Button className="bg-emerald hover:bg-emerald-dark text-white">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Podcasts Section */}
          {activeTab === "podcasts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPodcasts.map((podcast) => (
                <div key={podcast.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-emerald/20 to-emerald/5 flex items-center justify-center relative">
                    <Headphones className="w-16 h-16 text-emerald" />
                    <div className="absolute top-4 right-4 bg-emerald text-white p-2 rounded-full">
                      <Play className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded-full">
                        {podcast.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{podcast.frequency}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{podcast.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span>{podcast.episodes} episodes</span>
                      <span>{podcast.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{podcast.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{podcast.subscribers} subscribers</span>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#1DB954] hover:bg-[#1ed760] text-white flex-1"
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
                        className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white flex-1"
                        onClick={() => window.open('https://podcasts.apple.com', '_blank')}
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.232 17.988c-.423 0-.766-.343-.766-.766s.343-.766.766-.766.766.343.766.766-.343.766-.766.766zm2.827-2.54c-1.135 0-2.062-.927-2.062-2.063 0-1.135.927-2.062 2.062-2.062s2.063.927 2.063 2.062c0 1.136-.928 2.063-2.063 2.063zm0-5.395c-1.841 0-3.332 1.491-3.332 3.332s1.491 3.333 3.332 3.333 3.333-1.492 3.333-3.333-1.492-3.332-3.333-3.332zm0-2.7c-3.34 0-6.033 2.693-6.033 6.032s2.693 6.033 6.033 6.033 6.032-2.694 6.032-6.033S14.399 7.353 11.059 7.353z"/>
                        </svg>
                        Apple
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {((activeTab === "books" && filteredBooks.length === 0) || 
            (activeTab === "podcasts" && filteredPodcasts.length === 0)) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === "books" ? (
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                ) : (
                  <Headphones className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No {activeTab} found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}