import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://inteligento.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
      'en-US': '/en-US',
    }
  },
  title: "Inteligento",
  description: "Flashcards para estudos. By: Henrique Heron",
  openGraph: {
    images: '/study-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <div id="main-container">{children}</div>
      </body>
    </html>
  );
}
