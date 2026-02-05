import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kinenovaa | Estética & Kinesiología",
  description: "Tratamientos estéticos y kinesiológicos de vanguardia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 pt-[72px]">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
