"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";
import { CartProvider, useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  image: string;
  hoverImage: string;
  description: string;
  colors?: { name: string; hex: string }[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Hand Sanitizer",
    price: "£12.99",
    unit: "each",
    image: "/images/products/sanitizer.png",
    hoverImage: "/images/products/sanitizer-detail.png",
    description: "Hospital-grade hand sanitizer, 70% alcohol. Suitable for all skin types.",
  },
  {
    id: 2,
    name: "Nitrile Gloves",
    price: "£29.51",
    unit: "box",
    image: "/images/products/gloves.png",
    hoverImage: "/images/products/gloves-detail.png",
    description: "Powder-free nitrile examination gloves. Available in S, M, L, XL.",
    colors: [
      { name: "Sky Blue", hex: "#7DD3FC" },
      { name: "Black", hex: "#1F2937" },
      { name: "Purple", hex: "#A78BFA" },
      { name: "White", hex: "#F9FAFB" },
      { name: "Orange", hex: "#FB923C" },
    ],
  },
  {
    id: 3,
    name: "Disposable Face Masks",
    price: "£15.99",
    unit: "box",
    image: "/images/products/face-mask.png",
    hoverImage: "/images/products/face-mask-detail.png",
    description: "3-ply disposable face masks. Fluid resistant with adjustable nose wire.",
    colors: [
      { name: "Sky Blue", hex: "#7DD3FC" },
      { name: "Black", hex: "#1F2937" },
      { name: "White", hex: "#F9FAFB" },
      { name: "Pink", hex: "#F9A8D4" },
      { name: "Green", hex: "#6EE7B7" },
    ],
  },
  {
    id: 4,
    name: "Respirator Face Mask",
    price: "£24.99",
    unit: "each",
    image: "/images/products/respirator.png",
    hoverImage: "/images/products/respirator-detail.png",
    description: "FFP2/FFP3 respirator masks for high-risk environments.",
  },
  {
    id: 5,
    name: "Shoe Covers",
    price: "£8.99",
    unit: "box",
    image: "/images/products/shoe-covers.png",
    hoverImage: "/images/products/shoe-covers-detail.png",
    description: "Disposable non-slip shoe covers. One size fits most.",
    colors: [
      { name: "Sky Blue", hex: "#7DD3FC" },
      { name: "White", hex: "#F9FAFB" },
      { name: "Yellow", hex: "#FDE68A" },
      { name: "Green", hex: "#6EE7B7" },
    ],
  },
  {
    id: 6,
    name: "Disposable Aprons",
    price: "£18.99",
    unit: "box",
    image: "/images/products/aprons.png",
    hoverImage: "/images/products/aprons-detail.png",
    description: "Lightweight disposable aprons for clinical and care settings.",
    colors: [
      { name: "Sky Blue", hex: "#7DD3FC" },
      { name: "White", hex: "#F9FAFB" },
      { name: "Yellow", hex: "#FDE68A" },
      { name: "Green", hex: "#6EE7B7" },
      { name: "Pink", hex: "#F9A8D4" },
      { name: "Red", hex: "#FCA5A5" },
    ],
  },
  {
    id: 7,
    name: "Face Shields",
    price: "£22.99",
    unit: "each",
    image: "/images/products/face-shield.png",
    hoverImage: "/images/products/face-shield-detail.png",
    description: "Full-face anti-fog shields with adjustable headband.",
  },
  {
    id: 8,
    name: "Wipes",
    price: "£9.99",
    unit: "box",
    image: "/images/products/wipes.png",
    hoverImage: "/images/products/wipes-detail.png",
    description: "Antibacterial surface and skin wipes for clinical use.",
  },
  {
    id: 9,
    name: "Surface Cleanser",
    price: "£14.99",
    unit: "each",
    image: "/images/products/surface.png",
    hoverImage: "/images/products/surface_cleanser-detail.png",
    description: "Hospital-grade surface disinfectant. Kills 99.9% of bacteria and viruses.",
  },
];

function ProductCard({
  product,
  onBuyNow,
}: {
  product: Product;
  onBuyNow: (product: Product, color?: string) => void;
}) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );

  const handleAddToCart = () => {
    if (product.colors && !selectedColor) return;
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      unit: product.unit,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (product.colors && !selectedColor) return;
    onBuyNow(product, selectedColor);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <Image
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className={`object-contain p-6 transition-transform duration-300 ${hovered ? "scale-110" : "scale-100"}`}
        />
        <div className={`absolute inset-0 bg-black/5 flex items-end justify-center pb-4 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={handleBuyNow}
            className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs text-gray-400 capitalize mb-1">per {product.unit}</span>
        <h3 className="font-semibold text-gray-900 text-base mb-1">{product.name}</h3>
        <p className="text-emerald-600 font-bold text-lg mb-2">{product.price}</p>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{product.description}</p>

        {/* Color picker */}
        {product.colors && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">
              Colour: <span className="font-medium text-gray-700">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    selectedColor === c.name
                      ? "border-emerald-500 scale-110 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-100 text-emerald-700"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function CartButton() {
  const { totalItems, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="fixed bottom-1/2 translate-y-1/2 right-4 z-30 bg-emerald-600 hover:bg-emerald-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}

function ProductsContent() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { addItem } = useCart();

  const handleBuyNow = (product: Product, color?: string) => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      unit: product.unit,
      color,
    });
    setCheckoutOpen(true);
  };

  return (
    <>
      <Header />

      <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Personal Protective Equipment
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We fulfil small orders, work with you on larger orders and help design a safe and practical PPE programme for your site.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <CartButton />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}

export default function ProductsPage() {
  return (
    <CartProvider>
      <ProductsContent />
    </CartProvider>
  );
}
