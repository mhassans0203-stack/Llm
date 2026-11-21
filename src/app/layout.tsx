import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forno Antico | Artisanal Neapolitan Wood-Fired Pizza",
  description:
    "Experience authentic Neapolitan pizza crafted with 48-hour fermented sourdough, San Marzano D.O.P. tomatoes, and baked at 450°C in an artisanal oak wood oven.",
  keywords: [
    "pizza",
    "neapolitan pizza",
    "artisan pizza",
    "wood fired pizza",
    "italian restaurant",
    "forno antico",
    "pizza delivery",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0F0E0D] text-[#F3ECE0] font-sans antialiased selection:bg-[#C92A2A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
