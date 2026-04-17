import type { Metadata } from "next";
import ReceiverLayout from "../receiver-layout";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Linnked",
  description: "Someone has a message for you!",
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
    <div className={`max-h-screen ${PPNeueBit.variable} ${PPMondWest.variable}`} >
      <ReceiverLayout>{children}</ReceiverLayout>
    </div>
  );
}
