import { Navbar } from '@/components/layout/Navbar'
import { GeneratedResult } from '@/components/briefing/GeneratedResult'

export const metadata = {
  title: 'Sua página gerada — Sampa Vision AI',
}

export default function ResultadoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pt-28 pb-20 px-4">
        <div className="container-main">
          <div className="mb-10">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              Aurora · Concluído
            </span>
            <h1 className="font-display font-extrabold text-display-md text-bone">
              Sua página está pronta.
            </h1>
          </div>
          <GeneratedResult />
        </div>
      </main>
    </>
  )
}
