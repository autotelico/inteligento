import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inteligento",
  description: "Flashcards para estudos. By: Henrique Heron",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
        {children}
        </body>
    </html>
  );
}