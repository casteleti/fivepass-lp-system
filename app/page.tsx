import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { StickyCtaMobile } from "@/components/ui/StickyCtaMobile"
import { Hero } from "@/components/sections/Hero"
import { PainPoints } from "@/components/sections/PainPoints"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Benefits } from "@/components/sections/Benefits"
import { SocialProof } from "@/components/sections/SocialProof"
import { UseCases } from "@/components/sections/UseCases"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 01 */} <Hero />
        {/* 02 */} <PainPoints />
        {/* 03 */} <HowItWorks />
        {/* 04 */} <Benefits />
        {/* 05 */} <SocialProof />
        {/* 06 */} <UseCases />
        {/* 07 */} <FAQ />
        {/* 08 */} <FinalCTA />
      </main>
      <Footer />
      <StickyCtaMobile />
    </>
  )
}
