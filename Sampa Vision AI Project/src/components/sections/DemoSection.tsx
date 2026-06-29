"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { DEMO_STEPS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function TerminalLog({ logs, active }: { logs: readonly string[]; active: boolean }) {
  const [visible, setVisible] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setVisible([]);

    if (!active) return;

    if (reduced) {
      setVisible([...logs]);
      return;
    }

    logs.forEach((log, i) => {
      const t = setTimeout(() => {
        setVisible((prev) => [...prev, log]);
      }, i * 420);
      timerRef.current.push(t);
    });

    return () => timerRef.current.forEach(clearTimeout);
  }, [active, logs, reduced]);

  return (
    <div
      className="bg-well border border-stone font-mono text-[0.7rem] leading-relaxed overflow-hidden"
      role="log"
      aria-label="Pipeline de geração"
      aria-live="polite"
    >
      {/* Terminal bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-stone bg-cave">
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="ml-3 text-ash text-[0.55rem] tracking-widest">
          sampa-vision — generation
        </span>
      </div>

      {/* Log lines */}
      <div className="p-4 space-y-1.5 min-h-[160px]">
        <p className="text-ash">$ generate --brief briefing.json</p>
        <AnimatePresence>
          {visible.map((log, i) => (
            <motion.p
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                log.includes("✓") ? "text-electric" : "text-fog"
              )}
            >
              {log.includes("✓") ? (
                <>
                  <span className="text-electric mr-2">✓</span>
                  {log.replace("✓", "").trim()}
                </>
              ) : (
                <>
                  <span className="text-stone mr-2">&gt;</span>
                  {log}
                </>
              )}
            </motion.p>
          ))}
        </AnimatePresence>
        {active && visible.length < logs.length && (
          <span className="inline-block w-2 h-4 bg-electric animate-blink ml-1" aria-hidden />
        )}
      </div>
    </div>
  );
}

function PagePreview({ step }: { step: string }) {
  const sections = [
    { w: "100%", h: "h-8",  bg: "bg-cave"  },
    { w: "60%",  h: "h-16", bg: "bg-stone" },
    { w: "40%",  h: "h-4",  bg: "bg-cave"  },
    { w: "80%",  h: "h-4",  bg: "bg-cave"  },
    { w: "30%",  h: "h-10", bg: "bg-electric/20 border border-electric/30" },
    { w: "100%", h: "h-20", bg: "bg-cave"  },
    { w: "90%",  h: "h-4",  bg: "bg-cave"  },
    { w: "70%",  h: "h-4",  bg: "bg-cave"  },
  ];

  return (
    <div className="bg-well border border-stone overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone bg-cave">
        <span className="w-2 h-2 rounded-full bg-stone" />
        <span className="w-2 h-2 rounded-full bg-stone" />
        <span className="w-2 h-2 rounded-full bg-stone" />
        <div className="ml-2 flex-1 bg-pit border border-stone px-3 py-1 flex items-center gap-2">
          <span className="text-ash font-mono text-[0.52rem] tracking-wide">
            {step === "publish"
              ? "✓ sampa.vision/seu-projeto"
              : "preview.sampa.vision"}
          </span>
        </div>
      </div>

      {/* Page preview */}
      <div className="p-4 space-y-2.5 min-h-[160px]">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            className={cn("rounded-sm", s.h, s.bg)}
            style={{ width: s.w }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 0.35,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ width: s.w, transformOrigin: "left" }}
          />
        ))}
      </div>
    </div>
  );
}

export function DemoSection() {
  const [activeStep, setActiveStep] = useState(0);
  const reduced = useReducedMotion();

  // Auto-advance steps
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % DEMO_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reduced]);

  const step = DEMO_STEPS[activeStep];

  return (
    <section
      id="demo"
      className="px-[4vw] py-section border-t border-border bg-pit"
      aria-label="Demonstração do produto"
    >
      <Reveal>
        <SectionLabel>Como funciona</SectionLabel>
        <h2 className="font-display font-bold text-display text-bone mt-4 max-w-xl">
          Da ideia ao ar.{" "}
          <em className="not-italic text-electric [text-shadow:0_0_20px_rgba(91,110,255,0.4)]">
            Automaticamente.
          </em>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Steps nav */}
        <Reveal delay={0.1}>
          <nav aria-label="Etapas do processo" className="flex flex-col gap-px">
            {DEMO_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex items-start gap-4 text-left px-5 py-4 border-l-2 transition-all duration-250",
                  "cursor-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
                  i === activeStep
                    ? "border-electric bg-cave text-bone"
                    : "border-stone bg-transparent text-fog hover:text-ghost hover:bg-well/50"
                )}
                aria-current={i === activeStep ? "step" : undefined}
              >
                <span
                  className={cn(
                    "font-mono text-[0.52rem] tracking-[0.2em] uppercase mt-px flex-shrink-0",
                    i === activeStep ? "text-electric" : "text-stone"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[0.68rem] tracking-[0.06em] leading-snug">
                    {s.label.split("—")[1]?.trim()}
                  </p>
                  {i === activeStep && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[0.72rem] text-fog font-light leading-relaxed mt-1.5"
                    >
                      {s.desc}
                    </motion.p>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </Reveal>

        {/* Output panel */}
        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              {/* Step label */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-electric">
                  {step.label}
                </span>
                <span className="font-mono text-[0.56rem] tracking-wide text-ash">
                  {step.title}
                </span>
              </div>

              {/* Terminal */}
              <TerminalLog logs={step.logs} active={true} />

              {/* Preview (only for preview/publish steps) */}
              {(activeStep === 2 || activeStep === 3) && (
                <PagePreview step={step.id} />
              )}

              {/* Completion bar */}
              <div className="h-px bg-stone relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-electric shadow-[0_0_8px_#5B6EFF]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeStep + 1) / DEMO_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="font-mono text-[0.56rem] tracking-wide text-ash text-right">
                {activeStep + 1} / {DEMO_STEPS.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
