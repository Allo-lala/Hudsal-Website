"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function BecomeClientSection() {
  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
    address: "",
    companyName: "",
    phone: "",
    service: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClientFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/become-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientFormData),
      });

      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        setClientFormData({ name: "", email: "", address: "", companyName: "", phone: "", service: "", description: "" });
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="become-client" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden p-8 md:p-12 max-w-4xl w-full shadow-2xl">
            {/* Background Image */}
            <Image
              src="/images/become.webp"
              alt="Become a client"
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Form Content */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                Hire Experts
              </h3>
              <p className="text-white/90 mb-8 text-center">
                Access skilled professionals ready to build and scale – without the full-time commitment
              </p>
              
              <form onSubmit={handleClientFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={clientFormData.name}
                      onChange={(e) => setClientFormData({...clientFormData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={clientFormData.email}
                      onChange={(e) => setClientFormData({...clientFormData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={clientFormData.address}
                      onChange={(e) => setClientFormData({...clientFormData, address: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Business or Company Name"
                      value={clientFormData.companyName}
                      onChange={(e) => setClientFormData({...clientFormData, companyName: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={clientFormData.phone}
                      onChange={(e) => setClientFormData({...clientFormData, phone: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={clientFormData.service}
                      onChange={(e) => setClientFormData({...clientFormData, service: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-emerald"
                    >
                      <option value="" disabled hidden className="bg-gray-800">Select Service</option>
                      <option value="Healthcare Staffing" className="bg-gray-800">Healthcare Staffing</option>
                      <option value="Consultancy" className="bg-gray-800">Consultancy</option>
                      <option value="IT Solutions" className="bg-gray-800">IT Solutions</option>
                      <option value="Software Licensing" className="bg-gray-800">Software Licensing</option>
                      <option value="Other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <textarea
                    placeholder="Describe what you need help with..."
                    value={clientFormData.description}
                    onChange={(e) => setClientFormData({...clientFormData, description: e.target.value})}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald resize-none"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-12 py-3 font-semibold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
