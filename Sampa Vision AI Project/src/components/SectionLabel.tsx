import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        "font-mono text-[0.58rem] tracking-[0.28em] uppercase text-electric",
        className
      )}
    >
      <span
        className="w-4 h-px bg-electric shadow-[0_0_6px_#5B6EFF]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
