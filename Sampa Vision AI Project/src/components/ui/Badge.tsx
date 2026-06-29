import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "soon";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-mono text-[0.52rem] tracking-[0.18em] uppercase",
        "px-2.5 py-1 border",
        {
          "border-border-hover text-electric bg-electric/5":
            variant === "default",
          "border-electric/40 text-electric bg-electric/8":
            variant === "live",
          "border-stone text-fog bg-transparent":
            variant === "soon",
        },
        className
      )}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-dot shadow-[0_0_6px_#5B6EFF]" />
      )}
      {children}
    </span>
  );
}
