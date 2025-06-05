import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import { FooterSection } from '@/components/Footer'
import { TeamStoreInitializer } from '@/components/utils/TeamInitiliazer'
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
// import { ThemeProvider } from "@/components/theme-provider"
import GlobalLoader from "@/components/GlobalLoader"
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'PlayerHubs',
  description: 'Demo',
  generator: 'PlayerHubs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLoader />
          <TeamStoreInitializer/>
          <Nav />
          <main className='flex-grow'>
            {children}
          </main>
          <FooterSection/>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
