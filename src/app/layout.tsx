import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import Link from 'next/link';
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FictShop",
  description: "Your one-stop shop for impossible products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold">
                FictShop
              </Link>
              <nav className="flex gap-6">
                <Link 
                  href="/products" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Products
                </Link>
                <Link 
                  href="/products" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View Cart
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
