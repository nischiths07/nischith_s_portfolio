import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'PORTFOLIO.NS1',
  description: 'Created by Nischith',
  generator: '.',
  openGraph: {
    title: 'PORTFOLIO.NS1 - Nischith S',
    description: 'Passionate about crafting innovative software solutions, exploring cutting-edge technologies, and creating meaningful digital experiences.',
    url: 'https://nischith-portfolio.vercel.app',
    siteName: 'PORTFOLIO.NS1',
    images: [
      {
        url: '/images/profile-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Nischith S - Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PORTFOLIO.NS1 - Nischith S',
    description: 'Passionate about crafting innovative software solutions, exploring cutting-edge technologies, and creating meaningful digital experiences.',
    images: ['/images/profile-photo.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
