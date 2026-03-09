import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Services",
  description: "Choose the perfect subscription plan for your organization. Gold On Demand, Platinum Selection, Emerald Global, and Hadsul House - flexible healthcare solutions with expert support.",
  keywords: ['healthcare subscription', 'Gold On Demand', 'Platinum Selection', 'Emerald Global', 'Hadsul House', 'healthcare plans UK'],
  alternates: {
    canonical: 'https://hadsul.co.uk/services',
  },
  openGraph: {
    title: 'Our Services | Hadsul',
    description: 'Flexible subscription plans for healthcare organizations - from on-demand support to comprehensive partnerships',
    url: 'https://hadsul.co.uk/services',
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
