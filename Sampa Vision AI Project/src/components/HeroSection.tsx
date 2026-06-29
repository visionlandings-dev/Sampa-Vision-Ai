"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const REASSURANCES = ["Primeira página grátis", "Sem cartão de crédito", "Publicado em minutos"];

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end px-[4vw] pb-[10vh] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(150,150,220,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,220,0.07) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 60% at 50% 0%,black 40%,transparent 100%)",
        }}
      />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className={`absolute w-[700px] h-[700px] top-[-200px] right-[-150px] rounded-full pointer-events-none blur-[90px] ${reduced ? "" : "animate-orb-drift"}`}
        style={{
          background:
            "radial-gradient(circle,rgba(91,110,255,0.13) 0%,transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute w-[450px] h-[450px] bottom-[-100px] left-[-100px] rounded-full pointer-events-none blur-[90px] ${reduced ? "" : "animate-orb-drift2"}`}
        style={{
          background:
            "radial-gradient(circle,rgba(120,60,255,0.07) 0%,transparent 70%)",
        }}
      />

      {/* Scan lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.012) 3px,rgba(0,0,0,0.012) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-[5]">
        {/* Live badge */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Badge variant="live">
            2.400 landing pages geradas esta semana
          </Badge>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-black leading-[0.92] tracking-[-0.025em] text-hero mb-0">
          {["Pare de pagar agência", "para fazer o que IA", "faz em 3 minutos."].map(
            (line, i) => (
              <div key={line} className="overflow-hidden mb-1">
                <motion.span
                  className={`block ${i === 1 ? "text-electric [text-shadow:0_0_40px_rgba(91,110,255,0.4)]" : "text-bone"}`}
                  initial={reduced ? {} : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </div>
            )
          )}
        </h1>

        {/* Sub-row */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end"
        >
          {/* Subtext */}
          <p className="text-[0.88rem] font-light text-fog leading-[1.9] max-w-[420px] border-l border-border-hover pl-5">
            Briefing → IA → Landing page publicada.{" "}
            <span className="text-ghost">Sem reunião. Sem espera. Sem código.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:justify-end">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 bg-electric text-white px-7 py-4 font-mono text-[0.65rem] tracking-[0.14em] uppercase no-underline transition-all duration-200 hover:bg-electric-hover hover:shadow-[0_0_24px_rgba(91,110,255,0.4),0_4px_20px_rgba(91,110,255,0.25)] hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              Gerar minha primeira página
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-fog hover:text-bone transition-colors duration-200 no-underline border-b border-stone hover:border-bone pb-px"
            >
              Ver demo
              <ChevronDown className="w-3 h-3 animate-bounce" aria-hidden />
            </a>
          </div>
        </motion.div>

        {/* Reassurances */}
        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5"
          aria-label="Garantias"
        >
          {REASSURANCES.map((item) => (
            <span
              key={item}
              className="font-mono text-[0.58rem] tracking-[0.1em] text-ash flex items-center gap-1.5"
            >
              <span className="text-electric" aria-hidden>✓</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-[4vw] z-[5] flex items-center gap-3"
        aria-hidden="true"
      >
        <div className="relative w-10 h-px overflow-hidden">
          <span className="block h-full bg-gradient-to-r from-electric to-transparent" />
          <span className="absolute top-0 left-0 w-full h-full bg-electric animate-line-run" />
        </div>
        <span className="font-mono text-[0.52rem] tracking-[0.28em] uppercase text-ash">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
