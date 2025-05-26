import React from "react"
import HeroSection from "@/components/HeroSection"
import { FeatureSection } from "@/components/FeatureSection"


export default function Main() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 w-screen flex flex-col justify-center items-center">
      
      <HeroSection/>
      <FeatureSection/>
    </main>
  )
}