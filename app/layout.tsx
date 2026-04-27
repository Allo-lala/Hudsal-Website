import React from "react"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { LoadingProvider } from '@/components/loading-provider'
import { ScrollToTop } from '@/components/scroll-to-top'
import './globals.css'


const poppins = localFont({
  src: [
    {
      path: '../public/fonts/Poppins/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/Poppins/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Poppins/Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hadsul.vercel.app'),
  title: {
    default: 'Hadsul Limited',
    template: '%s | Hadsul'
  },
  description: 'CQC registered healthcare staffing, consultancy, and IT solutions provider. Offering NHS compliant services including nursing care, residential care, professional training, and software solutions across the UK.',
  keywords: [
    'h\Healthcare staffing UK',
    'CQC registered',
    'NHS compliant',
    'Personal Protective Equipment',
    'Healthcare consultancy',
    'Care home staffing',
    'IT solutions',
    'residential care',
    'Financial consultancy',
    'Healthcare recruitment',
    'Staff training ',
    'CRM healthcare',
    'Real estate',
    'Software licensing'
  ],
  authors: [{ name: 'Hadsul Limited' }],
  creator: 'Hadsul Limited',
  publisher: 'Hadsul Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://hadsul.vercel.app',
    siteName: 'Hadsul Limited',
    title: 'Hadsul Limited - Best Healthcare Staffing, Consultancy & IT Solutions',
    // description: 'CQC registered healthcare staffing, consultancy, and IT solutions provider. Offering NHS compliant services including nursing care, residential care, professional training, and software solutions.',
    images: [
      {
        url: 'https://hadsul.vercel.app/favicon-2.png',
        width: 512,
        height: 512,
        alt: 'Hadsul Limited',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Hadsul Limited - Healthcare Staffing & Consultancy',
    description: 'CQC registered healthcare staffing, consultancy, and IT solutions provider. NHS compliant services across the UK.',
    images: ['https://hadsul.vercel.app/favicon-2.png'],
    creator: '@hadsulltd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "HealthcareOrganization",
    "name": "Hadsul Limited",
    "url": "https://hadsul.vercel.app",
    "logo": "https://hadsul.vercel.app/favicon-2.png",
    "description": "CQC registered and consultancy services across the UK",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "West Sussex, England"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "admin@hadsul.co.uk",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/hadsul",
      "https://x.com/hadsulltd"
    ]
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hadsul Limited",
    "image": "https://hadsul.vercel.app/favicon-2.png",
    "@id": "https://hadsul.vercel.app",
    "url": "https://hadsul.vercel.app",
    "telephone": "+44-739-948-3885",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <LoadingProvider>
          <ScrollToTop />
          {children}
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  )
}
