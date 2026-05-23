import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Lumière - Premium Beauty E-Commerce",
  description: "A gorgeous, high-end e-commerce experience for curated skincare and makeup. Shop our custom Hyaluronic Cleansers, Eyeshadows, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream-base text-charcoal-base">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
