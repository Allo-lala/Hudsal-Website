"use client";

import React from "react"
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Address",
    details: ["6 Pelling Way", " Horsham, West Sussex","England", "RH12 3GW"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+44 (0) 73 9948 3885", "+44 (0) 745 569 8119 (Freephone)"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["admin@hudsal.co.uk", "support@hudsal.co.uk"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM", "24/7 Emergency Care"],
  },
];

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Hudsal";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <Header />
      <PageHeader 
        badge=" " 
        title="Get In Touch"
        // description="We're here to help. Reach out to us for any inquiries about our services."
      />

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
                {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                  Contact Information
                </span> */}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                {" Contact Information"}
              </h2>

              <div className="space-y-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-emerald" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        {item.details.map((detail) => {
                          // Check if this is a phone number
                          if (item.title === "Phone Numbers") {
                            const phoneNumber = detail.replace(/\s+/g, "").replace(/\(0\)/g, "");
                            return (
                              <a 
                                key={detail} 
                                href={`tel:${phoneNumber}`}
                                className="text-muted-foreground text-sm hover:text-emerald transition-colors cursor-pointer block"
                              >
                                {detail}
                              </a>
                            );
                          }
                          // Check if this is an email
                          if (item.title === "Email Address") {
                            return (
                              <a 
                                key={detail} 
                                href={`mailto:${detail}`}
                                className="text-muted-foreground text-sm hover:text-emerald transition-colors cursor-pointer block"
                              >
                                {detail}
                              </a>
                            );
                          }
                          // Regular text for other items
                          return (
                            <p key={detail} className="text-muted-foreground text-sm">{detail}</p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 20 1234 5678"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="services">Services Information</option>
                        <option value="staffing">Healthcare Staffing</option>
                        <option value="products">Products</option>
                        <option value="careers">Careers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button type="submit" className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3 w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <Sparkles className="w-4 h-4 text-emerald" /> */}
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                Our Location
              </span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Find Us on the Map
            </h2>
          </div>
          
          <div className="aspect-video rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4308290417576!2d-0.09878368422899664!3d51.51874797963654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b56c2b5f7a1%3A0x9f5c4c61c5a2e8a0!2sLondon%20EC1A%201BB%2C%20UK!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hudsal Healthcare Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
