import { Reveal } from "@/components/ui/Reveal";
import { STATS, TESTIMONIALS } from "@/lib/constants";

export function SocialProofSection() {
  const anchor = TESTIMONIALS[0]; // Lucas Prado — highest specificity

  return (
    <section
      className="border-t border-border"
      aria-label="Prova social"
    >
      {/* Anchor testimonial */}
      <Reveal>
        <blockquote className="px-[4vw] py-10 border-b border-border bg-cave">
          <p className="font-display font-semibold text-[1.1rem] text-bone leading-snug max-w-2xl">
            &ldquo;{anchor.quote}&rdquo;
          </p>
          <footer className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 border border-border-hover flex items-center justify-center font-mono text-[0.6rem] text-electric bg-electric/5 flex-shrink-0">
              {anchor.initials}
            </div>
            <div>
              <p className="text-[0.8rem] text-ghost font-medium">{anchor.author}</p>
              <p className="font-mono text-[0.58rem] text-ash tracking-[0.06em]">
                {anchor.role} · {anchor.company}
              </p>
            </div>
            <span className="ml-auto font-mono text-[0.6rem] tracking-[0.1em] uppercase text-electric border border-border-hover px-2.5 py-1 hidden sm:block">
              {anchor.metric}
            </span>
          </footer>
        </blockquote>
      </Reveal>

      {/* Stats row */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        aria-label="Métricas da plataforma"
      >
        {STATS.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 0.07}>
            <div className="px-6 py-8 border-r border-b md:border-b-0 border-border last:border-r-0 hover:bg-pit transition-colors duration-250 group">
              <p className="font-display font-black text-[2.4rem] text-bone leading-none group-hover:text-electric transition-colors duration-250">
                {value}
              </p>
              <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-ash mt-1.5">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
