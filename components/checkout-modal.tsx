"use client";

import { useState, useEffect } from "react";
import { X, Package, ChevronDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const UK_COUNTIES = [
  "Bedfordshire","Berkshire","Bristol","Buckinghamshire","Cambridgeshire",
  "Cheshire","City of London","Cornwall","Cumbria","Derbyshire","Devon",
  "Dorset","Durham","East Riding of Yorkshire","East Sussex","Essex",
  "Gloucestershire","Greater London","Greater Manchester","Hampshire",
  "Herefordshire","Hertfordshire","Isle of Wight","Kent","Lancashire",
  "Leicestershire","Lincolnshire","Merseyside","Norfolk","North Yorkshire",
  "Northamptonshire","Northumberland","Nottinghamshire","Oxfordshire",
  "Rutland","Shropshire","Somerset","South Yorkshire","Staffordshire",
  "Suffolk","Surrey","Tyne and Wear","Warwickshire","West Midlands",
  "West Sussex","West Yorkshire","Wiltshire","Worcestershire",
];

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; addressLine1: string; addressLine2: string;
  city: string; county: string; postcode: string; notes: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Step 2: Stripe payment form
function PaymentForm({
  form,
  onSuccess,
  onBack,
}: {
  form: FormData;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setLoading(false);
      return;
    }

    const orderItems = items.map(
      (i) =>
        `${i.name}${i.color ? ` (${i.color})` : ""} (${i.price}/${i.unit}) x${i.quantity} = £${(parseFloat(i.price.replace(/[^0-9.]/g, "")) * i.quantity).toFixed(2)}`
    );

    // Confirm payment
    const { error: payError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/products?order=success`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            address: {
              line1: form.addressLine1,
              line2: form.addressLine2 || undefined,
              city: form.city,
              state: form.county,
              postal_code: form.postcode,
              country: "GB",
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (payError) {
      setError(payError.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    // Payment succeeded — send confirmation emails
    await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items: orderItems, subtotal: `£${subtotal}` }),
    });

    onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handlePay} className="p-6 space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Order summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-gray-700">Order Summary</h3>
        </div>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.name}{item.color && <span className="text-gray-400 ml-1">({item.color})</span>}
                </p>
                <p className="text-xs text-gray-400">x{item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
                £{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
          <li className="flex justify-between text-sm font-bold text-gray-900 pt-2 mt-1">
            <span>Total</span>
            <span>£{subtotal}</span>
          </li>
        </ul>
      </div>

      {/* Stripe Payment Element */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Details</h3>
        <div className="border border-gray-200 rounded-xl p-4">
          <PaymentElement options={{ layout: { type: "tabs", defaultCollapsed: false } }} />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold text-base"
      >
        {loading ? "Processing..." : `Pay £${subtotal}`}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
        Secured by Stripe
      </div>
    </form>
  );
}

// Step 1: Contact + shipping form
function DetailsForm({
  form,
  setForm,
  onNext,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onNext: () => void;
}) {
  const { items, subtotal } = useCart();
  const set = (field: keyof FormData, value: string) =>
    setForm({ ...form, [field]: value });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="p-6 space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-gray-700">Order Summary</h3>
        </div>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.name}{item.color && <span className="text-gray-400 ml-1">({item.color})</span>}
                </p>
                <p className="text-xs text-gray-400">x{item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
                £{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
          <li className="flex justify-between text-sm font-bold text-gray-900 pt-2 mt-1">
            <span>Total</span>
            <span>£{subtotal}</span>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h3>
        <div className="grid grid-cols-2 gap-3">
          {(["firstName","lastName"] as const).map((f) => (
            <div key={f}>
              <label className="text-xs text-gray-500 mb-1 block capitalize">
                {f === "firstName" ? "First Name" : "Last Name"} *
              </label>
              <input required value={form[f]} onChange={(e) => set(f, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
            </div>
          ))}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email *</label>
            <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Phone *</label>
            <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
          </div>
          {/* <div className="col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Company / Care Home</label>
            <input value={form.company} onChange={(e) => set("company", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
          </div> */}
        </div>
      </div>

      {/* Shipping */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Shipping Address</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Address Line 1 *</label>
            <input required value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Address Line 2</label>
            <input value={form.addressLine2} onChange={(e) => set("addressLine2", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">City / Town *</label>
              <input required value={form.city} onChange={(e) => set("city", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Postcode *</label>
              <input required value={form.postcode} onChange={(e) => set("postcode", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">County *</label>
            <div className="relative">
              <select required value={form.county} onChange={(e) => set("county", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] appearance-none bg-white">
                <option value=""disabled hidden>Select county</option>
                {UK_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Order Notes (optional)</label>
            <textarea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)}
              placeholder="Special requirements or delivery instructions..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] resize-none" />
          </div>
        </div>
      </div>

      <Button type="submit"
        className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold text-base">
        Continue to Payment →
      </Button>
    </form>
  );
}

// Success screen with confetti
function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-4 relative">
      {/* Fireworks — runs automatically for 3 seconds */}
      <Fireworks
        autorun={{ speed: 3, duration: 3000 }}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      />
      <div className="w-40 h-40 relative">
        <Image
          src="/success.gif"
          alt="Payment successful"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
      <p className="text-gray-500 max-w-sm">
        Thank you for your order. A confirmation has been sent to your email.
      </p>
      <Button
        onClick={onClose}
        className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8"
      >
        Done
      </Button>
    </div>
  );
}

// Main modal orchestrator
export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", company: "",
    addressLine1: "", addressLine2: "", city: "", county: "", postcode: "", notes: "",
  });

  const handleNext = async () => {
    setLoadingIntent(true);
    setIntentError("");
    try {
      const amountPence = Math.round(parseFloat(subtotal) * 100);
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPence,
          metadata: { customer: `${form.firstName} ${form.lastName}`, email: form.email },
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err) {
      setIntentError(err instanceof Error ? err.message : "Could not initialise payment");
    } finally {
      setLoadingIntent(false);
    }
  };

  const handleSuccess = () => {
    clearCart();
    setStep("success");
  };

  const handleClose = () => {
    setStep("details");
    setClientSecret("");
    setIntentError("");
    setForm({
      firstName: "", lastName: "", email: "", phone: "", company: "",
      addressLine1: "", addressLine2: "", city: "", county: "", postcode: "", notes: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {step === "details" ? "Checkout" : step === "payment" ? "Payment" : "Order Confirmed"}
            </h2>
            {step !== "success" && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium ${step === "details" ? "text-[#0071E3]" : "text-gray-400"}`}>
                  1. Details
                </span>
                <span className="text-gray-300 text-xs">→</span>
                <span className={`text-xs font-medium ${step === "payment" ? "text-[#0071E3]" : "text-gray-400"}`}>
                  2. Payment
                </span>
              </div>
            )}
          </div>
          <button onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {step === "success" && (
          <SuccessScreen onClose={handleClose} />
        )}

        {step === "details" && (
          <>
            <DetailsForm form={form} setForm={setForm} onNext={handleNext} />
            {loadingIntent && (
              <p className="text-center text-sm text-gray-400 pb-4">Preparing payment...</p>
            )}
            {intentError && (
              <p className="text-center text-sm text-red-500 pb-4">{intentError}</p>
            )}
          </>
        )}

        {step === "payment" && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: { colorPrimary: "#0071E3", borderRadius: "8px" },
              },
            }}
          >
            <PaymentForm
              form={form}
              onSuccess={handleSuccess}
              onBack={() => setStep("details")}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}
