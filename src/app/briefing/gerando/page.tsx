import { Navbar } from '@/components/layout/Navbar'
import { GeneratingScreen } from '@/components/briefing/GeneratingScreen'

export const metadata = {
  title: 'Gerando sua página — Sampa Vision AI',
}

export default function GerandoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pt-28 pb-20 px-4">
        <div className="container-main">
          <div className="mb-10 text-center">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              Aurora · Processando
            </span>
            <h1 className="font-display font-extrabold text-display-md text-bone">
              Gerando sua página.
            </h1>
            <p className="font-body text-body-lg text-fog mt-2">
              Não feche esta aba.
            </p>
          </div>
          <GeneratingScreen />
        </div>
      </main>
    </>
  )
}
