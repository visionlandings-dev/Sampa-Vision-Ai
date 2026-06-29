import Link from "next/link";
import { SITE } from "@/lib/constants";

const FOOTER_NAV = [
  {
    title: "Plataforma",
    links: [
      { label: "AI Landing Engine", href: "#produto"   },
      { label: "AI Branding Engine", href: "#roadmap"  },
      { label: "AI Copy Engine",     href: "#roadmap"  },
      { label: "Roadmap",            href: "#roadmap"  },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre",      href: "#sobre"     },
      { label: "Manifesto",  href: "#manifesto" },
      { label: "Changelog",  href: "#changelog" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Acesso antecipado", href: "#contact"  },
      { label: "Email",             href: "#contact"  },
      { label: "WhatsApp",          href: "#contact"  },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "/privacy" },
      { label: "Termos",      href: "/terms"   },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-pit"
      aria-label="Rodapé"
    >
      <div className="px-[4vw] pt-16 pb-12 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-20">
        {/* Brand */}
        <div>
          <p className="font-display font-black text-[1.1rem] tracking-[0.06em] uppercase text-bone">
            Sampa<span className="text-electric">.Vision</span>
            <sup className="font-mono text-[0.4em] text-fog align-super ml-0.5">AI</sup>
          </p>
          <p className="font-mono text-[0.64rem] font-light text-fog leading-relaxed mt-3 max-w-[220px] tracking-[0.03em]">
            A plataforma de IA para criar, automatizar e escalar ativos digitais.
            Construída para a próxima geração de empresas.
          </p>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_NAV.map(({ title, links }) => (
            <div key={title}>
              <p className="font-mono text-[0.56rem] tracking-[0.25em] uppercase text-electric mb-3">
                {title}
              </p>
              <ul className="space-y-2 list-none m-0 p-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-mono text-[0.63rem] text-fog hover:text-bone transition-colors duration-200 no-underline tracking-[0.05em] block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-[4vw] py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-ash">
          © 2026 {SITE.name} · Todos os direitos reservados
        </p>
        <p className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-ash">
          Global · Est. 2025
        </p>
      </div>
    </footer>
  );
}
