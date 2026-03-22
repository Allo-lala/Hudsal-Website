"use client";

import { useEffect, useMemo, useState } from "react";
import { X, CheckCircle, Monitor, Apple, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateEmail, validatePhone } from "@/lib/validation";

type SoftwareOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: string;
};

export function SoftwareOrderModal({ isOpen, onClose, category }: SoftwareOrderModalProps) {
  const products = useMemo(() => getCatalogue(category), [category]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedProductIndex(0);
    setSelectedVariant(products[0]?.variants?.[0] ?? "");
    setSelectedPlatform(products[0]?.platforms?.[0] ?? "");
  }, [products]);

  if (!isOpen) return null;

  const selectedProduct = products[selectedProductIndex];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !validateEmail(email) || !validatePhone(phone)) {
      setError("Please fill name + valid email + valid phone.");
      return;
    }
    setError("");

    const order = {
      category,
      product: selectedProduct?.name ? selectedProduct.name : "",
      variant: selectedVariant,
      platform: selectedPlatform,
      name,
      email,
      phone,
      notes,
    };
    console.log("order payload", order);
    alert("Order submitted. Check console for payload.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-600 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="mb-2 text-xl font-semibold">Order {category || "Software"}</h3>

        <p className="mb-4 text-sm text-gray-600">
          Choose product, variant, platform + your details and submit.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product</label>
            <select
              value={selectedProductIndex}
              onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {products.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Variant</label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {selectedProduct?.variants?.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {needsPlatform(category) && selectedProduct?.platforms?.length ? (
            <div>
              <label className="block text-sm font-medium">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                {selectedProduct.platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-medium">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full">
            Submit order
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Product Catalogues ──────────────────────────────────────────────────────

const BUSINESS_PRODUCTS = [
  {
    name: "Microsoft Office 365",
    variants: ["Personal (1 user)", "Home (6 users)", "Business Basic", "Business Standard", "Business Premium"],
    prices: ["£59.99/yr", "£79.99/yr", "£4.99/mo", "£9.99/mo", "£17.99/mo"],
    type: "subscription",
  },
  {
    name: "Microsoft Office 2024",
    variants: ["Home & Student", "Home & Business", "Professional"],
    prices: ["£119.99", "£249.99", "£389.99"],
    type: "perpetual",
    note: "Permanent product key — one-time activation",
  },
  {
    name: "Windows Product Key",
    variants: ["Windows 10 Home", "Windows 10 Pro", "Windows 11 Home", "Windows 11 Pro", "Windows 11 Pro for Workstations"],
    prices: ["£89.99", "£149.99", "£99.99", "£159.99", "£249.99"],
    type: "key",
    note: "Genuine digital licence key — instant delivery",
  },
  {
    name: "QuickBooks",
    variants: ["Simple Start", "Essentials", "Plus", "Advanced"],
    prices: ["£12/mo", "£22/mo", "£32/mo", "£90/mo"],
    type: "subscription",
  },
  {
    name: "Sage Accounting",
    variants: ["Sage Accounting Start", "Sage Accounting", "Sage 50cloud"],
    prices: ["£12/mo", "£24/mo", "£58/mo"],
    type: "subscription",
  },
];

const CREATIVE_PRODUCTS = [
  {
    name: "Adobe Creative Cloud",
    variants: ["Photography Plan", "Single App", "All Apps (Individual)", "All Apps (Business)", "Students & Teachers"],
    prices: ["£9.98/mo", "£19.97/mo", "£54.98/mo", "£69.98/mo", "£19.97/mo"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "Adobe Photoshop 2025",
    variants: ["Single App"],
    prices: ["£19.97/mo"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "Adobe Premiere Pro 2025",
    variants: ["Single App"],
    prices: ["£19.97/mo"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "CorelDRAW Graphics Suite 2024",
    variants: ["Annual Subscription", "Perpetual Licence"],
    prices: ["£299/yr", "£649"],
    platforms: ["windows", "mac"],
    type: "both",
  },
  {
    name: "CorelDRAW Essentials 2024",
    variants: ["Perpetual Licence"],
    prices: ["£199"],
    platforms: ["windows"],
    type: "perpetual",
  },
];

const CAD_PRODUCTS = [
  {
    name: "AutoCAD 2025",
    variants: ["Annual Subscription", "3-Year Subscription"],
    prices: ["£1,865/yr", "£1,680/yr"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "AutoCAD LT 2025",
    variants: ["Annual Subscription"],
    prices: ["£395/yr"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "ArchiCAD 28",
    variants: ["Full Licence", "Annual Subscription"],
    prices: ["£3,499", "£1,199/yr"],
    platforms: ["windows", "mac"],
    type: "both",
  },
  {
    name: "SketchUp Pro 2025",
    variants: ["Annual Subscription"],
    prices: ["£299/yr"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "SolidWorks 2025",
    variants: ["Standard", "Professional", "Premium"],
    prices: ["£3,995", "£5,490", "£7,995"],
    platforms: ["windows"],
    type: "perpetual",
  },
];

const OS_PRODUCTS = [
  {
    name: "Windows 11 Home",
    variants: ["Digital Key"],
    prices: ["£99.99"],
    platforms: ["windows"],
    type: "key",
    note: "Genuine Microsoft licence key",
  },
  {
    name: "Windows 11 Pro",
    variants: ["Digital Key"],
    prices: ["£159.99"],
    platforms: ["windows"],
    type: "key",
    note: "Genuine Microsoft licence key",
  },
  {
    name: "Windows Server 2025",
    variants: ["Standard", "Datacenter"],
    prices: ["£599", "£1,299"],
    platforms: ["windows"],
    type: "key",
  },
  {
    name: "macOS Upgrade Assistance",
    variants: ["Ventura", "Sonoma", "Sequoia"],
    prices: ["£29.99", "£29.99", "£29.99"],
    platforms: ["mac"],
    type: "service",
    note: "Guided installation & setup service",
  },
  {
    name: "Norton 360",
    variants: ["Standard (1 device)", "Deluxe (5 devices)", "Premium (10 devices)"],
    prices: ["£19.99/yr", "£34.99/yr", "£44.99/yr"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
  {
    name: "Bitdefender Total Security",
    variants: ["1 device", "3 devices", "5 devices"],
    prices: ["£24.99/yr", "£34.99/yr", "£44.99/yr"],
    platforms: ["windows", "mac"],
    type: "subscription",
  },
];

const AUTOMOTIVE_PRODUCTS = [
  { name: "XENTRY / DAS (Mercedes-Benz)", variants: ["Annual Licence"], prices: ["£299/yr"], note: "Full diagnostic suite for Mercedes-Benz & Smart vehicles" },
  { name: "ISTA (BMW / MINI)", variants: ["Annual Licence"], prices: ["£249/yr"], note: "BMW Group diagnostic & programming software" },
  { name: "ODIS (VW / Audi / Seat / Skoda)", variants: ["Annual Licence"], prices: ["£249/yr"], note: "Official VAG group diagnostic platform" },
  { name: "Ford IDS / FDRS", variants: ["Annual Licence"], prices: ["£199/yr"], note: "Ford & Lincoln diagnostic software" },
  { name: "TechStream (Toyota / Lexus)", variants: ["Annual Licence"], prices: ["£179/yr"], note: "Toyota & Lexus OEM diagnostic tool" },
  { name: "AutoData", variants: ["Monthly", "Annual"], prices: ["£39.99/mo", "£349/yr"], note: "Technical data for all makes & models" },
  { name: "Haynes Pro", variants: ["Monthly", "Annual"], prices: ["£29.99/mo", "£249/yr"], note: "Workshop manuals & wiring diagrams" },
  { name: "Mitchell1 ProDemand", variants: ["Monthly", "Annual"], prices: ["£49.99/mo", "£449/yr"], note: "OEM repair information & diagnostics" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

type Product = { name: string; variants: string[]; prices: string[]; platforms?: string[]; type?: string; note?: string };

function getCatalogue(category: string): Product[] {
  if (category.includes("Business")) return BUSINESS_PRODUCTS;
  if (category.includes("Creative")) return CREATIVE_PRODUCTS;
  if (category.includes("Engineering")) return CAD_PRODUCTS;
  if (category.includes("Operating")) return OS_PRODUCTS;
  if (category.includes("Automotive")) return AUTOMOTIVE_PRODUCTS;
  return [];
}

function needsPlatform(category: string) {
  return category.includes("Creative") || category.includes("Engineering") || category.includes("Operating");
}

function isAI(category: string) {
  return category.includes("AI");
}
