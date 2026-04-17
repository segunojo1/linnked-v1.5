import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import MobileWrapper from "./mobile-wrapper";

export const metadata: Metadata = {
  title: "Linnked",
  description: "Linnked - Valentines ",
};

// const PPNeueBit = PP_NeueBit({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const PPNeueBit = localFont({
  src: "/fonts/ppneuebit-bold.otf",
  variable: "--font-pp-neue-bit",
});

const PPMondWest = localFont({
  src: "/fonts/ppmondwest-regular.otf",
  variable: "--font-pp-mondwest",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${PPNeueBit.variable} ${PPMondWest.variable} `}>
      <body className="antialiased font-pp-neuebit">
        <MobileWrapper>{children}</MobileWrapper>
        <Toaster />
      </body>
    </html>
  );
}
