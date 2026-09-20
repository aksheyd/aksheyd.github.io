import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aksheyd.github.io"),
  title: {
    default: "Akshey Deokule",
    template: "%s · Akshey Deokule",
  },
  description:
    "Akshey Deokule's portfolio — projects, games, and a UNIX-style terminal.",
  keywords: ["portfolio", "akshey", "deokule"],
  openGraph: {
    type: "website",
    siteName: "Akshey Deokule",
    title: "Akshey Deokule",
    description:
      "Akshey Deokule's portfolio — projects, games, and a UNIX-style terminal.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aksheyd",
    title: "Akshey Deokule",
    description:
      "Akshey Deokule's portfolio — projects, games, and a UNIX-style terminal.",
  },
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
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
