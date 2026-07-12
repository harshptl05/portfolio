import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

// Display headings — editorial serif (400 only; that's its whole character)
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Body / UI — Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "I build full-stack products and AI agents that actually ship. Full-Stack & AI Engineer based in Dallas, TX.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hpatelportfolio.vercel.app"),
  title: "Harsh Patel — Full-Stack & AI Engineer",
  description,
  openGraph: {
    title: "Harsh Patel — Full-Stack & AI Engineer",
    description,
    type: "website",
    siteName: "Harsh Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Patel — Full-Stack & AI Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
