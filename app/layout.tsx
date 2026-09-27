import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const description = "Akshey Deokule writes software at xAI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aksheyd.github.io"),
  title: {
    default: "Akshey Deokule",
    template: "%s · Akshey Deokule",
  },
  description,
  keywords: ["portfolio", "akshey", "deokule"],
  openGraph: {
    type: "website",
    siteName: "Akshey Deokule",
    title: "Akshey Deokule",
    description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aksheyd",
    title: "Akshey Deokule",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
