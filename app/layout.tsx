import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Favicon from '@/public/favicon.ico'

import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: "Inteligento",
    description: "Flashcards para estudos. By: Henrique Heron",
    openGraph: {
      images: [Favicon.src],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div id="main-container">{children}</div>
      </body>
    </html>
  );
}
