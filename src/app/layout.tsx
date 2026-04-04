import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import PageTransition from "@/components/PageTransition";
import SupportWidget from "@/components/SupportWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alimnet | Conectando con alimentos cuidados",
  description: "Descubrí productores, abastecedores, restaurantes y chefs que trabajan con alimentos conscientes.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Alimnet | Conectando con alimentos cuidados",
    description: "Plataforma para descubrir proyectos de alimentos conscientes.",
    url: "https://alimnet.com",
    siteName: "Alimnet",
    images: [
      {
        url: "/og-alimnet.png",
        width: 1200,
        height: 630,
        alt: "Alimnet - Alimentos Cuidados",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alimnet | Alimentos Cuidados",
    description: "Conectamos personas con alimentos conscientes.",
    images: ["/og-alimnet.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <PageTransition>{children}</PageTransition>
        <SupportWidget />
      </body>
    </html>
  );
}
