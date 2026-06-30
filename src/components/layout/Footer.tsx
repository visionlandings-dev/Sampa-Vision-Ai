import Link from 'next/link'
import { FOOTER_LINKS } from '@/config/content'

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[rgba(100,100,180,0.12)] bg-pit"
    >
      <div className="container-main py-16 grid lg:grid-cols-[280px_1fr] gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 border border-electric/40 text-electric text-xs font-mono">
              ◈
            </span>
            <span className="font-display font-bold text-sm uppercase tracking-[0.1em] text-bone">
              Sampa<span className="text-electric">.Vision</span>
            </span>
          </div>
          <p className="font-mono text-mono-md text-ash leading-relaxed max-w-[240px]">
            Inteligência Artificial aplicada ao marketing digital.
          </p>
        </div>

        {/* Links */}
        <nav
          className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          aria-label="Links institucionais"
        >
          <FooterColumn title="Produto" links={FOOTER_LINKS.produto} />
          <FooterColumn title="Empresa" links={FOOTER_LINKS.empresa} />
          <FooterColumn title="Recursos" links={FOOTER_LINKS.recursos} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(100,100,180,0.12)]">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-mono-xs uppercase tracking-[0.14em] text-stone">
            © {new Date().getFullYear()} Sampa Vision AI · Todos os direitos reservados
          </p>
          <div
            className="flex items-center gap-1.5 font-mono text-mono-xs uppercase tracking-[0.14em] text-ash"
            aria-label="Status do sistema: Operacional"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden="true" />
            Status: Operacional
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-mono text-mono-sm text-ash hover:text-bone transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
