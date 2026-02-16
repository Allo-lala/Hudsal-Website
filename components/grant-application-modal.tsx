"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessToast } from "@/components/success-toast";

interface GrantApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GrantApplicationModal({ isOpen, onClose }: GrantApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    organizationName: "",
    isRegistered: "",
    budget: "",
    countryOfOperation: "",
    previousFunding: "",
    previousFundingDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/grant-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessToast(true);
        setFormData({
          name: "",
          role: "",
          email: "",
          organizationName: "",
          isRegistered: "",
          budget: "",
          countryOfOperation: "",
          previousFunding: "",
          previousFundingDetails: "",
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        alert(result.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error('Grant application error:', error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Application Submitted!"
        message="Thank you for your grant application. We'll review it and get back to you soon."
      />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-foreground">Grant Application</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                    Role/Position *
                  </label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="e.g., Project Manager, CEO"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Organization Information</h3>
              
              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-foreground mb-2">
                  Organization Name *
                </label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label htmlFor="isRegistered" className="block text-sm font-medium text-foreground mb-2">
                  Is your organization registered? *
                </label>
                <select
                  id="isRegistered"
                  name="isRegistered"
                  value={formData.isRegistered}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes, registered</option>
                  <option value="no">No, not registered</option>
                  <option value="in-process">Registration in process</option>
                </select>
              </div>

              <div>
                <label htmlFor="countryOfOperation" className="block text-sm font-medium text-foreground mb-2">
                  Country of Operation *
                </label>
                <Input
                  id="countryOfOperation"
                  name="countryOfOperation"
                  type="text"
                  value={formData.countryOfOperation}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter country where you operate"
                />
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Project Information</h3>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                  Requested Budget *
                </label>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="e.g £10,000"
                />
              </div>

              <div>
                <label htmlFor="previousFunding" className="block text-sm font-medium text-foreground mb-2">
                  Have you received funding before? *
                </label>
                <select
                  id="previousFunding"
                  name="previousFunding"
                  value={formData.previousFunding}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {formData.previousFunding === "yes" && (
                <div>
                  <label htmlFor="previousFundingDetails" className="block text-sm font-medium text-foreground mb-2">
                    Please elaborate on previous funding
                  </label>
                  <textarea
                    id="previousFundingDetails"
                    name="previousFundingDetails"
                    value={formData.previousFundingDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald resize-none"
                    placeholder="Please provide details about previous funding sources, amounts, and projects..."
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald hover:bg-emerald-dark text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Application
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}