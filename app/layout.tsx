import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akshey\'s Portfolio',
  description: 'Akshey Deokule\s Portfolio',
  keywords: ['portfolio', 'akshey', 'deokule']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Example ThemeProvider setup for Shadcn dark/light mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 