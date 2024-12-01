import { Urbanist } from 'next/font/google'
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

export const metadata: Metadata = {
  title: 'Akshey\'s Portfolio',
  description: 'Akshey\s Portfolio Website, built using NextJS',
}

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${urbanist} scroll-smooth`}>
      <body>
        {children}
        <SpeedInsights/>
        <Analytics/>
        </body>
    </html>
  );
}

