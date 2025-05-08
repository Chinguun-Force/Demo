import React from 'react'
import InfoCard from './InfoCard'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="container px-4 md:px-6 flex ">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect Players, Teams, and Fans in One Platform
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Whether you're a team owner, player, or fan, PlayerHub brings the sports community together. Track
                stats, follow careers, and support your favorite athletes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/players">
                <Button size="lg" variant="outline">
                  Browse Players
                </Button>
              </Link>
            </div>
          </div>
          <InfoCard/>
        </div>
      </div>
  )
}

export default HeroSection
