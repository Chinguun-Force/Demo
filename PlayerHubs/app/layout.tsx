import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import { FooterSection } from '@/components/Footer'
import { TeamStoreInitializer } from '@/components/utils/TeamInitiliazer'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col overflow-x-hidden'>
        <TeamStoreInitializer/>
        <Nav></Nav>
        <main className='flex-grow'>
          {children}
        </main>
        <FooterSection/>
        </body>
    </html>
  )
}
