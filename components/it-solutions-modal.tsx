"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FireworksOverlay } from "@/components/fireworks-overlay";
import { validateEmail, validatePhone } from "@/lib/validation";

interface ITSolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const itServices = [
  "CRM Systems",
  "Automation",
  "Tech Solutions",
  "Cyber Security",
  "Data Migration & Protection",
  "Robot Training",
  "Other"
];

export function ITSolutionsModal({ isOpen, onClose, preselectedService = "" }: ITSolutionsModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessEmail: "",
    address: "",
    serviceType: preselectedService,
    projectDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFireworks, setShowFireworks] = useState(false);

  // Update serviceType when preselectedService changes
  useEffect(() => {
    if (preselectedService && isOpen) {
      setFormData(prev => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService, isOpen]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    }

    return () => {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    // Email validation
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    // Phone validation
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    
    // Business email validation
    const businessEmailError = validateEmail(formData.businessEmail);
    if (businessEmailError) newErrors.businessEmail = businessEmailError;
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.serviceType) newErrors.serviceType = "Please select a service";
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please describe your project or requirements";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/it-solutions-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setShowFireworks(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          businessName: "",
          businessEmail: "",
          address: "",
          serviceType: "",
          projectDescription: "",
        });
        setTimeout(() => {
          setShowFireworks(false);
          onClose();
          setSubmitStatus("idle");
        }, 4000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-border rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-foreground">Get IT Service</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                      errors.firstName ? "border-red-500" : "border-border"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                      errors.lastName ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                      errors.phone ? "border-red-500" : "border-border"
                    }`}
                    placeholder="+44 123 456 7890"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
              
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
                  Business/Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                    errors.businessName ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your Company Ltd"
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
              </div>

              {/* Business Email */}
              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium text-foreground mb-2">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                    errors.businessEmail ? "border-red-500" : "border-border"
                  }`}
                  placeholder="info@yourcompany.com"
                />
                {errors.businessEmail && <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                    errors.address ? "border-red-500" : "border-border"
                  }`}
                  placeholder="123 Main Street, London, UK"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
              
              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-foreground mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>
                {preselectedService ? (
                  <input
                    type="text"
                    value={formData.serviceType}
                    readOnly
                    className="w-full px-4 py-2 border border-border rounded-lg bg-gray-50 font-bold cursor-not-allowed"
                  />
                ) : (
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                      errors.serviceType ? "border-red-500" : "border-border"
                    } ${formData.serviceType ? "font-bold" : ""}`}
                  >
                    <option value="" disabled> Select a service</option>
                    {itServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                )}
                {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
              </div>

              {/* Project Description - Always visible */}
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground mb-2">
                  Describe Your Project or Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald ${
                    errors.projectDescription ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Please provide details about your IT project, requirements, timeline, budget, and any specific features or functionalities you need..."
                />
                {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
                <p className="text-sm text-muted-foreground mt-2">
                  Include information about your current systems, challenges you're facing, and what you hope to achieve.
                </p>
              </div>
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-emerald/10 border border-emerald text-emerald px-4 py-3 rounded-lg">
                Thank you! Your IT service request has been submitted successfully. We'll be in touch soon to discuss your project.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald hover:bg-emerald-dark text-white px-8 py-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </div>

        {/* Custom CSS for animation */}
        <style jsx>{`
          @keyframes scaleIn {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-scale-in {
            animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>

      {/* Fireworks Overlay */}
      {showFireworks && <FireworksOverlay />}
    </>
  );
}
