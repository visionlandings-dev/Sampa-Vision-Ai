import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Ticker } from '@/components/sections/Ticker'
import { ProductDemo } from '@/components/sections/ProductDemo'
import { ProblemDiagnosis } from '@/components/sections/ProblemDiagnosis'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { AIBrain } from '@/components/sections/AIBrain'
import { PlatformModules } from '@/components/sections/PlatformModules'
import { SocialProof } from '@/components/sections/SocialProof'
import { PriceAnchor } from '@/components/sections/PriceAnchor'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

/**
 * HOME — Sampa Vision AI
 *
 * Ordem das seções segue a arquitetura CRO definida na auditoria:
 * cada seção corresponde a um estado mental específico do visitante,
 * do primeiro contato até a conversão.
 *
 *  01 Nav              → "Onde estou?"             (credibilidade institucional)
 *  02 Hero             → "O que isso faz por mim?" (resultado + CTA único)
 *  03 Ticker           → momentum passivo entre hero e prova
 *  04 ProductDemo      → "Funciona mesmo?"          (demonstração ao vivo)
 *  05 ProblemDiagnosis → "Isso é pra mim?"          (identificação com a dor)
 *  06 ProcessSteps     → "Como funciona?"           (redução de complexidade)
 *  07 AIBrain          → "O que há por trás?"       (pipeline de agentes IA)
 *  08 PlatformModules  → "É uma plataforma real?"   (visão de escala futura)
 *  09 SocialProof      → "Tem prova?"               (before/after específico)
 *  10 PriceAnchor      → "Quanto custa?"            (ancoragem favorável)
 *  11 FAQ              → objeções residuais
 *  12 FinalCTA         → "Vale o risco?"            (eliminação de fricção)
 *  13 Footer           → "É empresa séria?"         (validação institucional)
 */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <Ticker />
        <ProductDemo />
        <ProblemDiagnosis />
        <ProcessSteps />
        <AIBrain />
        <PlatformModules />
        <SocialProof />
        <PriceAnchor />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
