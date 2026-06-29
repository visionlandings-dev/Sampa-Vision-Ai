import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { HERO_FRICTION_KILLERS } from '@/config/content'

export function CtaFinal() {
  return (
    <section id="contato" className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06] bg-pit relative overflow-hidden">
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-radial-gradient blur-[80px] opacity-40 pointer-events-none" aria-hidden />

      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)] relative z-10">
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionLabel>Pronto para começar</SectionLabel>
            <div className="font-display font-bold mt-4 mb-4 leading-[0.92] tracking-[-0.03em]">
              <div className="text-hero text-bone">SUA PRIMEIRA</div>
              <div className="text-hero text-electric" style={{ textShadow: '0 0 40px rgba(0,102,255,0.4)' }}>PÁGINA</div>
              <div
                className="text-hero font-bold"
                style={{ WebkitTextStroke: '1px rgba(243,244,246,0.18)', color: 'transparent' }}
              >
                EM 60 SEGUNDOS.
              </div>
            </div>
            <p className="text-sm font-light text-fog leading-relaxed max-w-[340px] mt-6">
              Responda o briefing e nossa IA cria, publica e ativa sua landing page com copy estratégico e design premium.
            </p>
            <div className="mt-8 space-y-1">
              {[...HERO_FRICTION_KILLERS, 'Suporte em português'].map((item) => (
                <div key={item} className="flex items-center gap-3 font-mono text-mono-xs text-ash border-l-2 border-transparent hover:border-electric hover:text-bone hover:pl-2 transition-all duration-200 py-2 px-3 bg-well cursor-default">
                  <span className="w-1 h-1 rounded-full bg-electric shrink-0" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="font-display font-bold text-lg text-bone mb-1 tracking-wide">COMECE AQUI</div>
            <div className="font-mono text-mono-xs text-ash mb-8">Beta privado · Sem compromisso · Primeira página grátis</div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-mono-xs uppercase tracking-[0.2em] text-stone mb-1.5">Nome</label>
                  <input
                    type="text" placeholder="Seu nome"
                    className="w-full px-3 py-2.5 bg-well border border-white/[0.06] text-bone text-sm font-light placeholder:text-stone focus:border-electric focus:bg-cave focus:outline-none transition-colors rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-mono-xs uppercase tracking-[0.2em] text-stone mb-1.5">WhatsApp</label>
                  <input
                    type="tel" placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2.5 bg-well border border-white/[0.06] text-bone text-sm font-light placeholder:text-stone focus:border-electric focus:bg-cave focus:outline-none transition-colors rounded-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-mono-xs uppercase tracking-[0.2em] text-stone mb-1.5">E-mail profissional</label>
                <input
                  type="email" placeholder="voce@empresa.com"
                  className="w-full px-3 py-2.5 bg-well border border-white/[0.06] text-bone text-sm font-light placeholder:text-stone focus:border-electric focus:bg-cave focus:outline-none transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block font-mono text-mono-xs uppercase tracking-[0.2em] text-stone mb-1.5">Empresa</label>
                <input
                  type="text" placeholder="Nome da sua empresa"
                  className="w-full px-3 py-2.5 bg-well border border-white/[0.06] text-bone text-sm font-light placeholder:text-stone focus:border-electric focus:bg-cave focus:outline-none transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block font-mono text-mono-xs uppercase tracking-[0.2em] text-stone mb-1.5">O que você está construindo?</label>
                <textarea
                  rows={3} placeholder="Breve descrição do seu projeto e objetivos…"
                  className="w-full px-3 py-2.5 bg-well border border-white/[0.06] text-bone text-sm font-light placeholder:text-stone focus:border-electric focus:bg-cave focus:outline-none transition-colors resize-none rounded-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full mt-2">
                Responder o briefing (2 minutos)
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Button>

              <p className="text-center font-mono text-mono-xs text-stone mt-2">
                🔒 Seus dados são confidenciais. Sem spam.
              </p>
            </form>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <Link href="/entrar" className="font-mono text-mono-xs text-ash hover:text-bone transition-colors">Já tem conta? Entrar →</Link>
              <Link href="mailto:oi@sampa.vision" className="font-mono text-mono-xs text-ash hover:text-bone transition-colors">Falar com um humano →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
