import { Navbar }      from '@/components/layout/Navbar'
import { Footer }      from '@/components/layout/Footer'
import { Hero }        from '@/components/home/Hero'
import { Ticker }      from '@/components/home/Ticker'
import { ProductDemo } from '@/components/home/ProductDemo'
import { Diagnosis }   from '@/components/home/Diagnosis'
import { Process }     from '@/components/home/Process'
import { Modules }     from '@/components/home/Modules'
import { BeforeAfter } from '@/components/home/BeforeAfter'
import { PriceAnchor } from '@/components/home/PriceAnchor'
import { FAQ }         from '@/components/home/FAQ'
import { CtaFinal }    from '@/components/home/CtaFinal'

/*
  Section order follows the CRO mental-state map:
  01 NAV         — authority
  02 HERO        — result + terminal proof
  03 TICKER      — credibility rhythm
  04 PRODUCT     — live demonstration (pos 2, before explanation)
  05 DIAGNOSIS   — pain identification
  06 PROCESS     — effort reduction
  07 MODULES     — platform vision
  08 BEFORE/AFTER — specific proof
  09 PRICE ANCHOR — cost comparison
  10 FAQ         — objection removal
  11 CTA FINAL   — micro-commitment
  12 FOOTER      — institutional validation
*/

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Ticker />
        <ProductDemo />
        <Diagnosis />
        <Process />
        <Modules />
        <BeforeAfter />
        <PriceAnchor />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
