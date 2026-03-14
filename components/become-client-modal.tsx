"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BecomeClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export function BecomeClientModal({ isOpen, onClose, preselectedService }: BecomeClientModalProps) {
  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
    address: "",
    companyName: "",
    phone: "",
    service: preselectedService || "",
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
        setClientFormData({ name: "", email: "", address: "", companyName: "", phone: "", service: preselectedService || "", description: "" });
        onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Form Content */}
        <div className="relative z-10 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
            Hadsul Limited 
          </h3>
          <p className="text-muted-foreground mb-8 text-center">
            Access skilled professionals ready to build and scale – without Your full-time commitment
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
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={clientFormData.email}
                  onChange={(e) => setClientFormData({...clientFormData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
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
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Business or Company Name"
                  value={clientFormData.companyName}
                  onChange={(e) => setClientFormData({...clientFormData, companyName: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
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
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                />
              </div>
              
              <div>
                {preselectedService ? (
                  <input
                    type="text"
                    value={preselectedService}
                    readOnly
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground opacity-70 cursor-not-allowed"
                  />
                ) : (
                  <select
                    value={clientFormData.service}
                    onChange={(e) => setClientFormData({...clientFormData, service: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald"
                  >
                    <option value="" disabled hidden>Select Service</option>
                    <option value="Healthcare Staffing">Healthcare Staffing</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Free Inspection & Compliance Foresight">Free Inspection &amp; Compliance Foresight</option>
                    <option value="Free External Perspective & Governance Support">Free External Perspective &amp; Governance Support</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              </div>
            </div>
            
            <div>
              <textarea
                placeholder="Describe what you need help with..."
                value={clientFormData.description}
                onChange={(e) => setClientFormData({...clientFormData, description: e.target.value})}
                required
                rows={4}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald resize-none"
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
  );
}
