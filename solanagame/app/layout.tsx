import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ASTA ESTE LINIA MAGICĂ CARE LIPSEA SAU NU MERGEA!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NomNom Stake",
  description: "Un joc simplu pe blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}