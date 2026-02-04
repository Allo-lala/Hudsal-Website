import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LoadingProvider } from '@/components/loading-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Hudsal Limited',
    template: '%s | Hudsal '
  },
  description: 'Hudsal provides healthcare staffing, care home services, IT solutions for care providers, and certified healthcare products. CQC & NHS compliant.',
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
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  )
}
