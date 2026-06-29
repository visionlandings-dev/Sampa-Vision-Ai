"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08, once: true });
  const reduced = useReducedMotion();

  const Tag = as as React.ElementType;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
