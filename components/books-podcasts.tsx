"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, ExternalLink, ShoppingCart, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { validatePhone } from "@/lib/validation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const BOOK = {
  title: "Business Euphoria",
  price: "£24.99",
  pence: 2499,
  image: "/images/books/books.png",
};

// ─ Stripe payment form ──────
function BookPaymentForm({
  copies,
  totalPence,
  onSuccess,
  onBack,
}: {
  copies: number;
  totalPence: number;
  onSuccess: () => void;
  onBack: () => void;
}) {
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

  const total = (totalPence / 100).toFixed(2);

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <button type="button" onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-secondary/40 rounded-xl p-4 flex items-center gap-4">
        <div className="relative w-14 h-20 flex-shrink-0">
          <Image src={BOOK.image} alt={BOOK.title} fill className="object-contain" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{BOOK.title}</p>
          <p className="text-muted-foreground text-xs">{copies} {copies === 1 ? "copy" : "copies"} × £{(BOOK.pence / 100).toFixed(2)}</p>
          <p className="text-emerald font-bold text-lg">£{total}</p>
        </div>
      </div>
      <div className="border border-border rounded-xl p-4">
        <PaymentElement options={{ layout: { type: "tabs", defaultCollapsed: false } }} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading || !stripe} className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold">
        {loading ? "Processing..." : `Pay £${total}`}
      </Button>
    </form>
  );
}

// ── Book purchase modal ──────────────────────────────────────────────────────
type BookForm = { name: string; email: string; phone: string; address: string; city: string; postcode: string; copies: number; signed: boolean; notes: string; };

function BookModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState<BookForm>({ name: "", email: "", phone: "", address: "", city: "", postcode: "", copies: 1, signed: false, notes: "" });

  const totalPence = BOOK.pence * form.copies;
  const set = (field: keyof BookForm, value: string | number | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, +, spaces, hyphens, and parentheses
    const sanitized = value.replace(/[^0-9+\s\-()]/g, "");
    set("phone", sanitized);
    
    // Clear error when user starts typing
    if (phoneError) setPhoneError("");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number before proceeding
    const phoneValidationError = validatePhone(form.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    setLoadingIntent(true);
    setIntentError("");
    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPence, metadata: { product: BOOK.title, copies: form.copies, signed: form.signed } }),
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

  const stepLabel = step === "details" ? "Your Details" : step === "payment" ? "Payment" : "Order Confirmed";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">Purchase Book</h2>
            <p className="text-xs text-muted-foreground">{stepLabel}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* ── Step 1: Details ── */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {/* Book summary */}
              <div className="bg-secondary/40 rounded-xl p-4 flex items-center gap-4">
                <div className="relative w-14 h-20 flex-shrink-0">
                  <Image src={BOOK.image} alt={BOOK.title} fill className="object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{BOOK.title}</p>
                  <p className="text-emerald font-bold text-lg">£{(totalPence / 100).toFixed(2)}</p>
                </div>
              </div>

              {/* Copies + signed */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Number of Copies *</label>
                  <div className="flex items-center border border-input rounded-lg overflow-hidden">
                    <button type="button" onClick={() => set("copies", Math.max(1, form.copies - 1))}
                      className="px-3 py-2.5 text-foreground hover:bg-secondary transition-colors text-lg font-bold">−</button>
                    <span className="flex-1 text-center text-sm font-medium text-foreground py-2.5">{form.copies}</span>
                    <button type="button" onClick={() => set("copies", Math.min(50, form.copies + 1))}
                      className="px-3 py-2.5 text-foreground hover:bg-secondary transition-colors text-lg font-bold">+</button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total: £{(totalPence / 100).toFixed(2)}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <label className="block text-sm font-medium text-foreground mb-2">Hand Signed?</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => set("signed", !form.signed)}
                      className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${form.signed ? "bg-emerald" : "bg-input"}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-transform ${form.signed ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{form.signed ? "Yes please" : "No thanks"}</span>
                  </label>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                  <input 
                    required 
                    type="tel" 
                    value={form.phone} 
                    onChange={handlePhoneChange} 
                    placeholder="+44 7123 456 789"
                    pattern="^(\+?[\d\s\-().]{7,20})$"
                    className={`w-full px-4 py-2.5 border ${phoneError ? 'border-red-500' : 'border-input'} rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500' : 'focus:ring-emerald'}`}
                  />
                  {phoneError && (
                    <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Delivery Address *</label>
                <input required value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address"
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">City *</label>
                  <input required value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="London"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Postcode *</label>
                  <input required value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="SW1A 1AA"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Additional Notes</label>
                <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}
                  placeholder="Any special requests, personalisation for the signed copy, delivery instructions..."
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald resize-none" />
              </div>

              {intentError && <p className="text-red-500 text-sm">{intentError}</p>}

              <Button type="submit" disabled={loadingIntent} className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full py-3 font-semibold">
                {loadingIntent ? "Preparing payment..." : `Continue to Payment — £${(totalPence / 100).toFixed(2)}`}
              </Button>
            </form>
          )}

          {/* ── Step 2: Payment ── */}
          {step === "payment" && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#0071E3", borderRadius: "8px" } } }}>
              <BookPaymentForm copies={form.copies} totalPence={totalPence} onSuccess={() => setStep("success")} onBack={() => setStep("details")} />
            </Elements>
          )}

          {/* ── Step 3: Success ── */}
          {step === "success" && (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <Fireworks autorun={{ speed: 3, duration: 3000 }} style={{ position: "fixed", pointerEvents: "none", width: "100%", height: "100%", top: 0, left: 0, zIndex: 999 }} />
              <Image src="/success.gif" alt="Success" width={120} height={120} unoptimized />
              <h3 className="text-xl font-bold text-foreground">Order Confirmed!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Thank you, {form.name}! Your {form.copies === 1 ? "copy" : `${form.copies} copies`}{form.signed ? " (hand signed)" : ""} will be delivered to {form.city}. Check {form.email} for confirmation.
              </p>
              <Button onClick={onClose} className="mt-2 bg-emerald hover:bg-emerald-dark text-white rounded-full px-8">Done</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BooksAndPodcasts() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // Scroll lock
  useEffect(() => {
    if (bookModalOpen) {
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
  }, [bookModalOpen]);

  return (
    <>
      {bookModalOpen && <BookModal onClose={() => setBookModalOpen(false)} />}
      <section id="books-podcasts" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Knowledge & Insights
            </span> */}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Hadsul House
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            It's no secret that 90% of new business ventures in the UK don't make it past their first year. But that's where we come in. Hadsul is built on real-world experience, hard-earned lessons, & the belief that you deserve more than just inspiration — you deserve a <b> "Tried & Tested" </b> path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Books Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground"> Books</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Expand your knowledge with our human written books
            </p>

            {/* Book Display - Vertical Layout */}
            <div className="flex flex-col items-center text-center">
              {/* Book Image - Smaller Size */}
              <div className="flex-shrink-0 mb-6">
                <div className="relative w-48 h-64 sm:w-52 sm:h-72 rounded-lg overflow-hidden shadow-2xl bg-transparent">
                  <Image
                    src="/images/books/books.png"
                    alt="Healthcare Book"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Book Content - Below Image */}
              <div className="space-y-4 max-w-sm">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {/* A comprehensive guide to leading healthcare teams through challenges and change in modern healthcare environments. */}
                </p>

                <div className="pt-2">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    {/* <span className="text-sm text-muted-foreground">from</span> */}
                    <p className="text-2xl font-bold text-emerald">£24.99</p>
                  </div>
                  <button
                    onClick={() => setBookModalOpen(true)}
                    className="inline-block w-full"
                  >
                    <Button className="bg-[#0071E3] hover:bg-[#0077ED] text-white w-full text-base py-4 rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
                      <span>
                        {/* <ShoppingCart className="w-5 h-5 mr-2" /> */}
                        BUY NOW
                      </span>
                    </Button>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Podcasts Section */}
          <div id="podcasts-section" className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Podcasts</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Listen to our healthcare podcasts on your favorite platform
            </p>

            {/* Circular Podcast Design - Increased Size */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Multiple Dashed Circles in WhatsApp Green - Larger Rings */}
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="32%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    opacity="0.45"
                  />
                  {/* <circle
                    cx="50%"
                    cy="50%"
                    r="24%"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    opacity="0.4"
                  /> */}
                </svg>

                {/* Central Podcast Host Image - Larger */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl animate-pulse" style={{ animationDuration: '3s' }}>
                  <Image
                    src="/images/podcast/digital-transformation.png"
                    alt="Podcast Host"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* YouTube Icon - Top - Larger */}
                <a
                  href="https://youtube.com/hadsulltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-[6%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 4s ease-in-out infinite',
                    animationDelay: '0s'
                  }}
                >
                  <Image
                    src="/images/podcast/youtube.png"
                    alt="YouTube"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Apple Podcasts Icon - Right - Larger */}
                <a
                  href="https://podcasts.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-1/2 right-[6%] -translate-y-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 4.5s ease-in-out infinite',
                    animationDelay: '1s'
                  }}
                >
                  <Image
                    src="/images/podcast/ApplePodcasts.png"
                    alt="Apple Podcasts"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Spotify Icon - Left - Larger */}
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-1/2 left-[6%] -translate-y-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 5s ease-in-out infinite',
                    animationDelay: '2s'
                  }}
                >
                  <Image
                    src="/images/podcast/Spotify.png"
                    alt="Spotify"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>

                {/* Amazon Music Icon - Bottom - Larger */}
                <a
                  href="https://music.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl shadow-lg hover:scale-125 transition-all duration-300"
                  style={{
                    animation: 'zoomInOut 5.5s ease-in-out infinite',
                    animationDelay: '3s'
                  }}
                >
                  <Image
                    src="/images/podcast/amazonMusic.png"
                    alt="Amazon Music"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Webinars Section */}
          <div id="webinars-section" className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Webinars</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Join our interactive webinars and get notified when we go live
            </p>

            {/* Square Webinar Design - Similar to Podcast but Square */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Square Border with Emerald Color */}
                <div className="absolute inset-0 border-4 border-emerald rounded-2xl bg-gradient-to-br  shadow-2xl"></div>
                
                {/* Inner Square Border */}
                <div className="absolute inset-4 border-2 border-emerald/30 rounded-xl"></div>
                
                {/* Central Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {/* Live Indicator */}
                  <div className="w-4 h-4 bg-emerald rounded-full animate-pulse mb-4"></div>
                  
                  {/* Main Text */}
                  <h4 className="text-lg font-bold text-foreground mb-2">Get Notified</h4>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Subscribe to get notified when we go live with healthcare webinars
                  </p>
                  
                  {/* Buttons */}
                  <div className="space-y-3 w-full max-w-52">
                    <a
                      href="https://www.youtube.com/hadsulltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-4 py-2 w-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all animate-pulse">
                        Subscribe
                      </Button>
                    </a>
                    
                    <a
                      href="https://www.youtube.com/hadsulltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white rounded-full px-4 py-2 w-full text-sm font-semibold transition-all">
                        Previous Recordings
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-emerald rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}