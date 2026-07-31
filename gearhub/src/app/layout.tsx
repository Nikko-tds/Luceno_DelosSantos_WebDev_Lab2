import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/types/AppStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GearHub Mini E-Commerce",
  description: "Tech accessories store built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}