import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google'; 
import { ThemeProvider } from "@/components/ThemeProvider"
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

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
      <body className={`${inter.className} ${playfair.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}