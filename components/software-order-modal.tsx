"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { X, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateEmail, validatePhone } from "@/lib/validation";
import { FireworksOverlay } from "@/components/fireworks-overlay";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SoftwareOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

type Product = {
  name: string;
  variants: string[];
  prices: string[];
  platforms?: string[];
  type?: string;
  note?: string;
  logo?: string;
};

const BUSINESS_PRODUCTS: Product[] = [
  { name: "Microsoft Office 365", variants: ["Personal (1 user)", "Home (6 users)", "Business Basic", "Business Standard", "Business Premium"], prices: ["£59.99/yr", "£79.99/yr", "£4.99/mo", "£9.99/mo", "£17.99/mo"], type: "subscription", logo: "/Microsoft_365.png" },
  { name: "Microsoft Office 2024", variants: ["Home & Student", "Home & Business", "Professional"], prices: ["£119.99", "£249.99", "£389.99"], type: "perpetual", note: "Permanent product key — one-time activation", logo: "/Office_2024.png" },
  { name: "Windows Product Key", variants: ["Windows 10 Home", "Windows 10 Pro", "Windows 11 Home", "Windows 11 Pro", "Windows 11 Pro for Workstations"], prices: ["£89.99", "£149.99", "£99.99", "£159.99", "£249.99"], type: "key", note: "Genuine digital licence key — instant delivery", logo: "/windows11.png" },
  { name: "QuickBooks", variants: ["Simple Start", "Essentials", "Plus", "Advanced"], prices: ["£12/mo", "£22/mo", "£32/mo", "£90/mo"], type: "subscription", logo: "/quickbooks.jpeg" },
  { name: "Sage Accounting", variants: ["Sage Accounting Start", "Sage Accounting", "Sage 50cloud"], prices: ["£12/mo", "£24/mo", "£58/mo"], type: "subscription", logo: "/sage.png" },
];

const CREATIVE_PRODUCTS: Product[] = [
  { name: "Adobe Creative Cloud ( Full suite)", variants: ["Individual", "Business", "Students & Teachers"], prices: ["£54.98/mo", "£69.98/mo", "£19.97/mo"], platforms: ["windows", "mac"], type: "subscription", logo: "/adobe-creative-cloud.png" },
  { name: "Adobe Photoshop 2025", variants: ["Single App"], prices: ["£19.97/mo"], platforms: ["windows", "mac"], type: "subscription", logo: "/adobe-photoshop-logo.png" },
  { name: "Adobe Premiere Pro 2025", variants: ["Single App"], prices: ["£19.97/mo"], platforms: ["windows", "mac"], type: "subscription", logo: "/adobe-premiere-pro.png" },
  { name: "Adobe Illustrator 2025", variants: ["Single App"], prices: ["£19.97/mo"], platforms: ["windows", "mac"], type: "subscription", logo: "/adobe-illustrator.png" },
  { name: "CorelDRAW Graphics Suite 2024", variants: ["Annual Subscription", "Perpetual Licence"], prices: ["£299/yr", "£649"], platforms: ["windows", "mac"], type: "both", logo: "/coreldraw.png" },
  // { name: "CorelDRAW Essentials 2024", variants: ["Perpetual Licence"], prices: ["£199"], platforms: ["windows"], type: "perpetual", logo: "/coreldraw.png" },
];

const CAD_PRODUCTS: Product[] = [
  { name: "AutoCAD 2025", variants: ["Annual Subscription", "3-Year Subscription"], prices: ["£1,865/yr", "£1,680/yr"], platforms: ["windows", "mac"], type: "subscription", logo: "/autocad.png" },
  { name: "AutoCAD LT 2025", variants: ["Annual Subscription"], prices: ["£395/yr"], platforms: ["windows", "mac"], type: "subscription", logo: "/autocad_lt.png" },
  { name: "ArchiCAD 28", variants: ["Full Licence", "Annual Subscription"], prices: ["£3,499", "£1,199/yr"], platforms: ["windows", "mac"], type: "both", logo: "/archicad.png" },
  { name: "SketchUp Pro 2025", variants: ["Annual Subscription"], prices: ["£299/yr"], platforms: ["windows", "mac"], type: "subscription", logo: "/sketch_up.png" },
  { name: "SolidWorks 2025", variants: ["Standard", "Professional", "Premium"], prices: ["£3,995", "£5,490", "£7,995"], platforms: ["windows"], type: "perpetual", logo: "/solidworks.png" },
];

const OS_PRODUCTS: Product[] = [
  { name: "Windows 11 Home", variants: ["Digital Key"], prices: ["£99.99"], platforms: ["windows"], type: "key", note: "Genuine Microsoft licence key — instant delivery", logo: "/windows11.png" },
  { name: "Windows 11 Pro", variants: ["Digital Key"], prices: ["£159.99"], platforms: ["windows"], type: "key", note: "Genuine Microsoft licence key — instant delivery", logo: "/windows11.png" },
  { name: "Windows Server 2025", variants: ["Standard", "Datacenter"], prices: ["£599", "£1,299"], platforms: ["windows"], type: "key", logo: "/windows11.png" },
  { name: "macOS Upgrade Assistance", variants: ["Ventura", "Sonoma", "Sequoia"], prices: ["£29.99", "£29.99", "£29.99"], platforms: ["mac"], type: "service", note: "Guided installation & setup service", logo: "/apple.png" },
  { name: "Norton 360", variants: ["Standard (1 device)", "Deluxe (5 devices)", "Premium (10 devices)"], prices: ["£19.99/yr", "£34.99/yr", "£44.99/yr"], platforms: ["windows", "mac"], type: "subscription", logo: "/norton.png" },
  { name: "Bitdefender Total Security", variants: ["1 device", "3 devices", "5 devices"], prices: ["£24.99/yr", "£34.99/yr", "£44.99/yr"], platforms: ["windows", "mac"], type: "subscription", logo: "/bitdefender.png" },
];

const AUTOMOTIVE_PRODUCTS: Product[] = [
  { name: "XENTRY / DAS (Mercedes-Benz)", variants: ["Annual Licence"], prices: ["£299/yr"], note: "Full diagnostic suite for Mercedes-Benz & Smart", logo: "/mercedes-benz.png" },
  { name: "ISTA (BMW / MINI)", variants: ["Annual Licence"], prices: ["£249/yr"], note: "BMW Group diagnostic & programming software", logo: "/bmw.png" },
  { name: "ODIS (VW / Audi / Seat / Skoda)", variants: ["Annual Licence"], prices: ["£249/yr"], note: "Official VAG group diagnostic platform", logo: "/audi.png" },
  { name: "Ford IDS / FDRS", variants: ["Annual Licence"], prices: ["£199/yr"], note: "Ford & Lincoln diagnostic software", logo: "/ford.png"  },
  { name: "TechStream (Toyota / Lexus)", variants: ["Annual Licence"], prices: ["£179/yr"], note: "Toyota & Lexus OEM diagnostic tool", logo: "/toyota.png" },
  { name: "AutoData", variants: ["Monthly", "Annual"], prices: ["£39.99/mo", "£349/yr"], note: "Technical data for all makes & models", logo: "/autodata.jpeg" },
  { name: "Haynes Pro", variants: ["Monthly", "Annual"], prices: ["£29.99/mo", "£249/yr"], note: "Workshop manuals & wiring diagrams", logo: "/haynespro.png" },
  { name: "Mitchell1 ProDemand", variants: ["Monthly", "Annual"], prices: ["£49.99/mo", "£449/yr"], note: "OEM repair information & diagnostics", logo: "/mitchell1.svg" },
];

function getCatalogue(category: string): Product[] {
  if (category.includes("Business")) return BUSINESS_PRODUCTS;
  if (category.includes("Creative")) return CREATIVE_PRODUCTS;
  if (category.includes("Engineering")) return CAD_PRODUCTS;
  if (category.includes("Operating")) return OS_PRODUCTS;
  if (category.includes("Automotive")) return AUTOMOTIVE_PRODUCTS;
  return [];
}

// ── Stripe Payment Step ───
function PaymentForm({ amount, onSuccess, onBack }: { amount: number; onSuccess: () => void; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    const { error: submitErr } = await elements.submit();
    if (submitErr) { setError(submitErr.message || "Payment failed"); setLoading(false); return; }
    const { error: payErr } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });
    if (payErr) { setError(payErr.message || "Payment failed"); setLoading(false); return; }
    onSuccess();
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading || !stripe} className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold">
        {loading ? "Processing..." : `Pay £${(amount / 100).toFixed(2)}`}
      </Button>
      <button type="button" onClick={onBack} className="w-full text-sm text-muted-foreground hover:text-foreground text-center">← Back</button>
    </form>
  );
}

export function SoftwareOrderModal({ isOpen, onClose, category }: SoftwareOrderModalProps) {
  const [step, setStep] = useState<"product" | "platform" | "variant" | "details" | "payment" | "success">("product");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "mac" | "">("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [amountPence, setAmountPence] = useState(0);

  const catalogue = getCatalogue(category);
  const aiMode = category.includes("AI");
  const showPlatform = category.includes("Creative") || category.includes("Engineering") || category.includes("Operating");

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
      // Wait for styles to apply before restoring scroll
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

  const reset = () => {
    setStep("product"); setSelectedProduct(null); setSelectedPlatform("");
    setSelectedVariant(""); setSelectedPrice(""); setAiDescription("");
    setForm({ name: "", email: "", phone: "", company: "", notes: "" });
    setFieldErrors({}); setClientSecret(""); setAmountPence(0);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p); setSelectedVariant(""); setSelectedPrice(""); setSelectedPlatform("");
    if (showPlatform && p.platforms && p.platforms.length > 1) setStep("platform");
    else setStep("variant");
  };

  const handleBack = () => {
    if (step === "details") setStep("variant");
    else if (step === "variant") setStep(showPlatform && selectedProduct?.platforms?.length === 2 ? "platform" : "product");
    else if (step === "platform") setStep("product");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(form.email);
    const phoneErr = form.phone ? validatePhone(form.phone) : "";
    if (emailErr || phoneErr) { setFieldErrors({ email: emailErr, phone: phoneErr }); return; }
    setSubmitting(true);
    try {
      if (aiMode) {
        // AI: just send email, no payment
        await fetch("/api/software-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, product: "AI & Automation Service", aiDescription, ...form }),
        });
        setStep("success");
      } else {
        // Parse price to pence — strip non-numeric except dot, take first number
        const priceNum = parseFloat(selectedPrice.replace(/[^0-9.]/g, "")) || 0;
        const pence = Math.round(priceNum * 100);
        setAmountPence(pence);
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: pence, metadata: { product: selectedProduct?.name, variant: selectedVariant, platform: selectedPlatform, customer: form.name, email: form.email } }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setStep("payment");
      }
    } catch {
      setStep("success"); // fallback
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = async () => {
    // Send confirmation emails after successful payment
    await fetch("/api/software-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, product: selectedProduct?.name, platform: selectedPlatform, variant: selectedVariant, price: selectedPrice, ...form }),
    }).catch(() => {});
    setStep("success");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {step !== "product" && step !== "success" && step !== "payment" && (
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-foreground">{category}</h2>
              <p className="text-xs text-muted-foreground">
                {step === "product" && (aiMode ? "Describe your requirements" : "Select a product")}
                {step === "platform" && `${selectedProduct?.name} — Choose Operating System`}
                {step === "variant" && `${selectedProduct?.name} — Choose version`}
                {step === "details" && "Your details"}
                {step === "payment" && "Secure payment"}
                {step === "success" && "Order confirmed"}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Product list */}
          {step === "product" && !aiMode && (
            <div className="space-y-3">
              {catalogue.map((p) => (
                <button key={p.name} onClick={() => handleSelectProduct(p)}
                  className="w-full text-left p-4 rounded-xl border border-border hover:border-emerald/50 hover:bg-emerald/5 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    {p.logo && (
                      <Image src={p.logo} alt={p.name} width={36} height={36} className="object-contain flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-emerald transition-colors">{p.name}</p>
                      {p.note && <p className="text-xs text-muted-foreground mt-0.5">{p.note}</p>}
                      <p className="text-xs text-emerald mt-1">from {p.prices[0]}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* AI custom request */}
          {step === "product" && aiMode && (
            <form onSubmit={(e) => { e.preventDefault(); setStep("details"); }} className="space-y-5">
              <p className="text-muted-foreground text-sm">Tell us what you need — custom chatbots, AI automation workflows, AI integrations, or anything else. We&apos;ll scope it and get back to you.</p>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Describe what you need *</label>
                <textarea value={aiDescription} onChange={(e) => setAiDescription(e.target.value)} required rows={5}
                  placeholder="e.g. I need a customer service chatbot for my care home that can answer FAQs and book appointments..."
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald resize-none" />
              </div>
              <Button type="submit" disabled={!aiDescription.trim()} className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full">
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          )}

          {/* Platform picker */}
          {step === "platform" && (
            <div className="grid grid-cols-2 gap-6 py-4">
              {[
                { key: "windows", label: "Windows", img: "/windows.png" },
                { key: "mac", label: "macOS", img: "/apple-logo.png" },
              ].map(({ key, label, img }) => (
                <button key={key} onClick={() => { setSelectedPlatform(key as "windows" | "mac"); setStep("variant"); }}
                  className="flex flex-col items-center justify-center gap-5 p-10 rounded-2xl border-2 border-border hover:border-emerald hover:bg-emerald/5 transition-all group">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <Image src={img} alt={label} fill className="object-contain" />
                  </div>
                  <span className="text-lg font-semibold text-foreground group-hover:text-emerald">{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Variant picker */}
          {step === "variant" && selectedProduct && (
            <div className="space-y-3">
              {selectedProduct.variants.map((v, i) => (
                <button key={v} onClick={() => { setSelectedVariant(v); setSelectedPrice(selectedProduct.prices[i]); setStep("details"); }}
                  className="w-full text-left p-4 rounded-xl border border-border hover:border-emerald/50 hover:bg-emerald/5 transition-all flex items-center justify-between group">
                  <span className="font-medium text-foreground group-hover:text-emerald">{v}</span>
                  <span className="text-emerald font-bold">{selectedProduct.prices[i]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Details form */}
          {step === "details" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-secondary/40 rounded-xl p-4 text-sm space-y-1">
                <p className="font-semibold text-foreground">Order Summary</p>
                {aiMode ? (
                  <p className="text-muted-foreground">AI & Automation — Custom Service</p>
                ) : (
                  <div className="flex items-center gap-3 mt-1">
                    {selectedProduct?.logo && (
                      <Image src={selectedProduct.logo} alt={selectedProduct.name} width={48} height={48} className="object-contain flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{selectedProduct?.name}{selectedPlatform ? ` (${selectedPlatform === "windows" ? "Windows" : "macOS"})` : ""}</p>
                      <p className="text-muted-foreground">{selectedVariant}</p>
                      <p className="text-emerald font-bold text-base">{selectedPrice}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input required type="email" value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setFieldErrors((fe) => ({ ...fe, email: "" })); }}
                    placeholder="you@example.com" className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                  {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                  <input required type="tel" value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setFieldErrors((fe) => ({ ...fe, phone: "" })); }}
                    placeholder="+44 7123 456 789" className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                  {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company / Organisation</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Optional"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Additional Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                  placeholder="Any specific requirements or questions..."
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald resize-none" />
              </div>
              <Button type="submit" disabled={submitting} className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold">
                {submitting ? "Processing..." : aiMode ? "Submit Request" : "Continue to Payment"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {aiMode ? "We'll scope your request and get back to you." : "Secure payment powered by Stripe."}
              </p>
            </form>
          )}

          {/* Payment step */}
          {step === "payment" && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#0071E3", borderRadius: "8px" } } }}>
              <div className="mb-4 bg-secondary/40 rounded-xl p-4 text-sm space-y-1">
                <p className="font-semibold text-foreground">Order Summary</p>
                <div className="flex items-center gap-3 mt-1">
                  {selectedProduct?.logo && (
                    <Image src={selectedProduct.logo} alt={selectedProduct?.name || ""} width={48} height={48} className="object-contain flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{selectedProduct?.name}{selectedPlatform ? ` (${selectedPlatform === "windows" ? "Windows" : "macOS"})` : ""}</p>
                    <p className="text-muted-foreground">{selectedVariant}</p>
                    <p className="text-emerald font-bold text-base">{selectedPrice}</p>
                  </div>
                </div>
              </div>
              <PaymentForm amount={amountPence} onSuccess={handlePaymentSuccess} onBack={() => setStep("details")} />
            </Elements>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <FireworksOverlay />
              <Image src="/success.gif" alt="Success" width={120} height={120} unoptimized />
              <h3 className="text-2xl font-bold text-foreground">
                {aiMode ? `Thank you, ${form.name}!` : `Order Confirmed, ${form.name}!`}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {aiMode
                  ? `We've received your request and will be in touch at ${form.email} shortly.`
                  : `Your order is confirmed. We'll send delivery details to ${form.email} shortly.`}
              </p>
              <Button onClick={handleClose} className="mt-2 bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">Done</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
