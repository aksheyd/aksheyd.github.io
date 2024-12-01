import { Urbanist } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Aksheys portfolio',
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
      <body>{children}</body>
    </html>
  );
}

