import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Subscription Products",
  description: "Choose the perfect subscription plan for your organization. Gold On Demand, Platinum Selection, Emerald Global, and Hadsul House - flexible healthcare solutions with expert support.",
  keywords: ['healthcare subscription', 'Gold On Demand', 'Platinum Selection', 'Emerald Global', 'Hadsul House', 'healthcare plans UK'],
  alternates: {
    canonical: 'https://hadsul.co.uk/products',
  },
  openGraph: {
    title: 'Subscription Products | Hadsul',
    description: 'Flexible subscription plans for healthcare organizations - from on-demand support to comprehensive partnerships',
    url: 'https://hadsul.co.uk/products',
    images: ['/images/logo.png'],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
