"use client"

import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { StickyCtaMobile } from "@/components/ui/StickyCtaMobile"
import { Hero } from "@/components/sections/Hero"
import { PainPoints } from "@/components/sections/PainPoints"
import { Positioning } from "@/components/sections/Positioning"
import { Pillars } from "@/components/sections/Pillars"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Benefits } from "@/components/sections/Benefits"
import { FinancialDifferential } from "@/components/sections/FinancialDifferential"
import { SocialProof } from "@/components/sections/SocialProof"
import { UseCases } from "@/components/sections/UseCases"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero onCtaClick={scrollToCTA} />
        <PainPoints />
        <Positioning />
        <Pillars />
        <HowItWorks />
        <Benefits />
        <FinancialDifferential />
        <SocialProof />
        <UseCases />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCtaMobile />
    </>
  )
}
