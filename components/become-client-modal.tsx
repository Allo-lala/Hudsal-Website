"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FireworksOverlay } from "@/components/fireworks-overlay";

interface BecomeClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const inputClass =
  "w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald text-sm";
const labelClass = "block text-sm font-medium text-foreground mb-1";

export function BecomeClientModal({ isOpen, onClose, preselectedService }: BecomeClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    service: preselectedService || "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/become-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: "", email: "", companyName: "", phone: "",
      address: "", service: preselectedService || "", description: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8">
          {submitted ? (
            <>
              <FireworksOverlay />
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <CheckCircle className="w-16 h-16 text-emerald-500" />
                <h3 className="text-2xl font-bold text-foreground">Request Submitted!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you! We will review your request and contact you soon.
                </p>
                <Button
                  onClick={handleClose}
                  className="mt-2 bg-emerald hover:bg-emerald-dark text-white rounded-full px-8"
                >
                  Done
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-1">Hire Us</h3>
                <p className="text-muted-foreground text-sm">
                  Fill in your details and we'll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="First and last name"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Your Email *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+44 7123 456 789"
                    value={formData.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className={labelClass}>Business / Company Name *</label>
                  <input
                    type="text"
                    placeholder="Your organisation or company name"
                    value={formData.companyName}
                    onChange={(e) => set("companyName", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className={labelClass}>Address *</label>
                  <input
                    type="text"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={(e) => set("address", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Service */}
                <div>
                  <label className={labelClass}>Service</label>
                  {preselectedService ? (
                    <div className="w-full px-4 py-3 border border-input rounded-lg bg-muted text-sm">
                      <span className="font-bold text-foreground">{preselectedService}</span>
                    </div>
                  ) : (
                    <select
                      value={formData.service}
                      onChange={(e) => set("service", e.target.value)}
                      required
                      className={inputClass}
                    >
                      <option value="" disabled hidden>Select a service</option>
                      <option value="Healthcare Staffing">Healthcare Staffing</option>
                      <option value="Consultancy">Consultancy</option>
                      <option value="Free Inspection & Compliance Foresight">Free Inspection & Compliance Foresight</option>
                      <option value="Free External Perspective & Governance Support">Free External Perspective & Governance Support</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>How can we help? *</label>
                  <textarea
                    placeholder="Briefly describe what you need help with..."
                    value={formData.description}
                    onChange={(e) => set("description", e.target.value)}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full py-3 font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
