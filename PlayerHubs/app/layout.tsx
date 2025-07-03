import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Nav from "@/components/Nav";
import { FooterSection } from "@/components/Footer";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import GlobalLoader from "@/components/GlobalLoader";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlayerHubs",
  description: "Demo",
  generator: "PlayerHubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLoader />
          <Nav />
          <main className="flex-grow">{children}</main>
          <FooterSection />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
