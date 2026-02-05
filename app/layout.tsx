import React from "react"
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SAJIS FOOD PRODUCTS | Just like home just like mom',
  description: 'Traditionally blended homemade spices from Kerala. Experience the authentic taste of 100% pure, aromatic spices crafted with care and tradition.',
  keywords: ['spices', 'Kerala spices', 'homemade spices', 'Indian spices', 'chilli powder', 'turmeric', 'garam masala', 'pure spices'],
  authors: [{ name: 'SAJIS FOOD PRODUCTS' }],
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'SAJIS FOOD PRODUCTS | Just like home just like mom',
    description: 'Traditionally blended homemade spices from Kerala.',
    type: 'website',
    locale: 'en_IN',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
