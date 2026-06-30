import { TICKER_ITEMS } from '@/config/content'

/**
 * Faixa de scroll infinito com nomes de clientes reais.
 * Mantém momentum visual entre Hero e ProductDemo sem exigir leitura.
 */
export function Ticker() {
  // Duplicamos a lista para o efeito de loop contínuo
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="border-y border-[rgba(100,100,180,0.12)] bg-pit py-3.5 overflow-hidden"
      aria-label="Clientes que usam a Sampa Vision AI"
    >
      <div className="flex whitespace-nowrap animate-ticker" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 px-8 font-mono text-mono-sm uppercase tracking-[0.2em] text-ash"
          >
            <span className="w-1 h-1 rounded-full bg-electric shadow-[0_0_6px_rgba(0,102,255,0.8)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
