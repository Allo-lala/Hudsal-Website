"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ArrowRight, CheckCircle, Crown, Diamond, Gem, Home } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productDescription: string;
  productIcon?: React.ComponentType<{ className?: string }>;
}

export function SubscriptionModal({ isOpen, onClose, productName, productDescription, productIcon }: SubscriptionModalProps) {
  const [step, setStep] = useState<"info" | "form" | "success">("info");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    company: "",
    designation: "",
    registrationNumber: "",
  });

  // Get the appropriate icon
  const IconComponent = productIcon || CheckCircle;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (acceptedTerms) {
      setStep("form");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName,
          productDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("success");
      } else {
        setErrorMessage(data.message || 'Failed to submit subscription. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("info");
    setAcceptedTerms(false);
    setFormData({
      name: "",
      email: "",
      address: "",
      company: "",
      designation: "",
      registrationNumber: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "info" && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-emerald" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Subscribe to {productName}
              </h2>
              <p className="text-muted-foreground">
                Get more insights about the service you are subscribing to
              </p>
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-2">{productName}</h3>
              <p className="text-sm text-muted-foreground">
                {productDescription}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-emerald hover:underline" target="_blank">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald hover:underline" target="_blank">
                    Privacy Policy
                  </Link>{" "}
                  for Hadsul.
                </Label>
              </div>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={!acceptedTerms}
              className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === "form" && (
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Complete Your Subscription
              </h2>
              <p className="text-muted-foreground">
                Please provide your details to subscribe to {productName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company">Company/Organization *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter your designation"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Subscription'}
              </Button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
              <IconComponent className="w-10 h-10 text-emerald" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Subscription Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for subscribing to {productName}. We will review your application and contact you shortly.
            </p>
            <Button 
              onClick={handleClose}
              className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
