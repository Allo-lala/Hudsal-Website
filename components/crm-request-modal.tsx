"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { FireworksOverlay } from "@/components/fireworks-overlay";
import { validateEmail, validatePhone } from "@/lib/validation";

interface CRMRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CRMRequestModal({ isOpen, onClose }: CRMRequestModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phoneNumber?: string }>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    state: "",
    hearAboutUs: "",
    companyWebsite: "",
    currentPlatforms: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setFieldErrors((fe) => ({ ...fe, email: "" }));
    if (name === "phoneNumber") setFieldErrors((fe) => ({ ...fe, phoneNumber: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(formData.email);
    const phoneErr = validatePhone(formData.phoneNumber);
    if (emailErr || phoneErr) {
      setFieldErrors({ email: emailErr, phoneNumber: phoneErr });
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/crm-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setStep("success");
      } else {
        setErrorMessage(data.message || "Failed to submit request. Please try again.");
      }
    } catch {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setFieldErrors({});
    setFormData({
      firstName: "", lastName: "", email: "", jobTitle: "", phoneNumber: "",
      companyName: "", country: "", state: "", hearAboutUs: "", companyWebsite: "", currentPlatforms: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        {step === "form" && (
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Request CRM</h2>
              <p className="text-muted-foreground">Fill out the form below and we&apos;ll get back to you shortly</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{errorMessage}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" required className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required className="mt-1" />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter your job title" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number (UK) *</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+44 7123 456 789" required className="mt-1" />
                {fieldErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneNumber}</p>}
              </div>
              <div>
                <Label htmlFor="companyName">Care Home Name *</Label>
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Enter company name" required className="mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">County *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleInputChange} placeholder="Enter county" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">Town/City *</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} placeholder="Enter town/city" required className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="hearAboutUs">How did you hear about us? *</Label>
                <Input id="hearAboutUs" name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} placeholder="e.g., Google, LinkedIn, Referral" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input id="companyWebsite" name="companyWebsite" type="url" value={formData.companyWebsite} onChange={handleInputChange} placeholder="https://example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="currentPlatforms">What current platforms do you use?</Label>
                <Textarea id="currentPlatforms" name="currentPlatforms" value={formData.currentPlatforms} onChange={handleInputChange} placeholder="e.g., CRM, Manual Paperwork, Excel, Roundsy etc." rows={3} className="mt-1" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Request CRM"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="p-8 text-center">
            <FireworksOverlay />
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Request Received!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in our CRM platform. We&apos;ll review your request and contact you shortly.
            </p>
            <Button onClick={handleClose} className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
