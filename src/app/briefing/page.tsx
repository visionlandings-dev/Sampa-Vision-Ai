import { Navbar } from '@/components/layout/Navbar'
import { BriefingWizard } from '@/components/briefing/BriefingWizard'

export const metadata = {
  title: 'Briefing — Sampa Vision AI',
  description: 'Responda 7 perguntas e receba um rascunho gerado em segundos — versão final em até 72 horas.',
}

export default function BriefingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pt-28 pb-20 px-4">
        <div className="container-main">
          <div className="mb-12">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              Esteira V2 — Aurora
            </span>
            <h1 className="font-display font-extrabold text-display-md text-bone">
              Conte sobre o seu negócio.
            </h1>
            <p className="font-body text-body-lg text-fog mt-2">
              7 perguntas. 2 minutos. Rascunho em segundos, versão final em até 72h.
            </p>
          </div>
          <BriefingWizard />
        </div>
      </main>
    </>
  )
}
