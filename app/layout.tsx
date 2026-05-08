import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const syne = Syne({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Coaching Hub",
  description: "VOD Reviews & Anti-Strats — Eden1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmMono.variable} ${syne.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
