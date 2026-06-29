import Link from 'next/link'

const cols = [
  { title: 'Produto',  links: [{ l: 'Landing Pages', h: '#produto' }, { l: 'Preços', h: '#precos' }, { l: 'Roadmap', h: '#produto' }] },
  { title: 'Empresa',  links: [{ l: 'Sobre', h: '#' }, { l: 'Blog', h: '#' }, { l: 'Carreiras', h: '#' }] },
  { title: 'Suporte',  links: [{ l: 'Documentação', h: '#' }, { l: 'Status', h: '#' }, { l: 'Contato', h: '#contato' }] },
  { title: 'Legal',    links: [{ l: 'Privacidade', h: '#' }, { l: 'Termos de uso', h: '#' }, { l: 'API', h: '#' }] },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-pit">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <div className="py-16 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 border border-electric/40 text-electric text-xs font-mono">◈</span>
              <span className="font-display font-bold text-sm uppercase tracking-[0.1em] text-bone">
                Sampa<span className="text-electric">.Vision</span>
              </span>
            </div>
            <p className="font-mono text-mono-xs text-ash leading-relaxed max-w-[220px]">
              Plataforma de IA para criação e otimização de ativos digitais. Construída para escala global.
            </p>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-mono-xs uppercase tracking-[0.25em] text-electric mb-4">{col.title}</div>
                <div className="flex flex-col gap-3">
                  {col.links.map((lk) => (
                    <Link key={lk.l} href={lk.h} className="font-mono text-mono-xs text-ash hover:text-bone transition-colors">
                      {lk.l}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-mono text-mono-xs uppercase tracking-[0.14em] text-stone">
            © 2026 Sampa Vision AI · Todos os direitos reservados
          </span>
          <span className="font-mono text-mono-xs tracking-[0.1em] text-stone">
            Global · Est. 2025
          </span>
        </div>
      </div>
    </footer>
  )
}
