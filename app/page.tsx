import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { StickyCtaMobile } from "@/components/ui/StickyCtaMobile"
import { Quiz } from "@/components/ui/Quiz"
import { Hero } from "@/components/sections/Hero"
import { HeroPitch } from "@/components/sections/HeroPitch"
import { Loss } from "@/components/sections/Loss"
import { PainPoints } from "@/components/sections/PainPoints"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Benefits } from "@/components/sections/Benefits"
import { Plataforma } from "@/components/sections/Plataforma"
import { SocialProof } from "@/components/sections/SocialProof"
import { FAQ } from "@/components/sections/FAQ"
import { UseCases } from "@/components/sections/UseCases"
import { Urgency } from "@/components/sections/Urgency"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 01 · preto  */} <Hero />
        {/* 01b · mobile */} <HeroPitch />
        {/* 02 · azul   */} <Loss />
        {/* 03 · preto  */} <PainPoints />
        {/* 04 · branco */} <HowItWorks />
        {/* 05 · azul   */} <Benefits />
        {/* 05b· branco */} <Plataforma />
        {/* 06 · preto  */} <SocialProof />
        {/* 07 · branco */} <FAQ />
        {/* 08 · azul   */} <UseCases />
        {/* 09 · preto  */} <Urgency />
        {/* 10 · azul+  */} <FinalCTA />
      </main>
      <Footer />
      <StickyCtaMobile />
      <Quiz />
    </>
  )
}
