import {
  Zap, Globe, Link2, BarChart3, Search,
  type LucideIcon
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap: Zap,
  Globe: Globe,
  Link: Link2,
  BarChart3: BarChart3,
  Search: Search,
};

export function FeaturesSection() {
  return (
    <section
      id="produto"
      className="px-[4vw] py-section border-t border-border"
      aria-label="Funcionalidades"
    >
      <Reveal>
        <SectionLabel>O que você ganha</SectionLabel>
        <h2 className="font-display font-bold text-display text-bone mt-4">
          Uma plataforma.{" "}
          <em className="not-italic text-electric [text-shadow:0_0_20px_rgba(91,110,255,0.4)]">
            Potencial infinito.
          </em>
        </h2>
      </Reveal>

      {/* Bento grid */}
      <div className="mt-10 border border-border grid grid-cols-1 md:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = ICON_MAP[feature.icon];
          const isLarge = feature.size === "large";

          return (
            <Reveal
              key={feature.id}
              delay={i * 0.06}
              className={cn(
                "group relative border-r border-b border-border overflow-hidden",
                "transition-colors duration-300 hover:bg-pit",
                isLarge && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-450 origin-left shadow-[0_0_8px_#5B6EFF]" />

              <div className={cn("flex flex-col gap-4 p-7", isLarge && "p-10")}>
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 border border-border-hover flex items-center justify-center text-electric flex-shrink-0">
                    {Icon && <Icon className="w-4 h-4" strokeWidth={1.5} aria-hidden />}
                  </div>
                  {feature.badge && (
                    <Badge
                      variant={feature.badge === "Disponível" ? "live" : "soon"}
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className={cn(
                      "font-display font-bold text-bone leading-snug",
                      isLarge ? "text-[1.6rem]" : "text-[1rem]"
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-stone mt-0.5">
                    {feature.subtitle}
                  </p>
                  <p className="text-[0.78rem] font-light text-ash leading-[1.85] mt-3">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* Hover arrow */}
              <span
                className="absolute top-6 right-6 text-stone group-hover:text-electric group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg"
                aria-hidden
              >
                ↗
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
