import type { Metadata } from "next";
import SidebarShell from "@/components/sidebar-shell";
import ClientLayout from "../client-layout";
import localFont from "next/font/local";
import InitialLoadGate from "../initial-layout";

export const metadata: Metadata = {
  title: "Linnked",
  description: "Linnked - Valentines ",
};

const PPNeueBit = localFont({
  src: "../fonts/ppneuebit-bold.otf",
  variable: "--font-pp-neue-bit",
});

const PPMondWest = localFont({
  src: "../fonts/ppmondwest-regular.otf",
  variable: "--font-pp-mondwest",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${PPNeueBit.variable} ${PPMondWest.variable}`}>
      <body className="antialiased font-pp-neuebit">
        <InitialLoadGate>{children}</InitialLoadGate>
      </body>
    </html>
  );
}
