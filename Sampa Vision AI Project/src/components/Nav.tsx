"use client";

import Link from "next/link";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const scrolled = useScrolled(50);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[200]",
        "px-[4vw] flex items-center justify-between",
        "border-b transition-all duration-400",
        scrolled
          ? "py-4 bg-void/88 backdrop-blur-xl border-border"
          : "py-7 border-transparent"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display font-black text-[1.1rem] tracking-[0.06em] uppercase text-bone no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
        aria-label="Sampa Vision AI — Home"
      >
        Sampa<span className="text-electric [text-shadow:0_0_16px_rgba(91,110,255,0.5)]">.Vision</span>
        <sup className="font-mono text-[0.4em] text-fog align-super ml-0.5 tracking-[0.1em]">
          AI
        </sup>
      </Link>

      {/* Nav links */}
      <nav aria-label="Navegação principal">
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-fog hover:text-bone transition-colors duration-200 no-underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden md:block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-fog hover:text-bone transition-colors duration-200 no-underline"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className={cn(
            "font-mono text-[0.6rem] tracking-[0.14em] uppercase",
            "px-5 py-2.5 border border-border-hover text-electric",
            "hover:bg-electric hover:text-white hover:shadow-[0_0_20px_rgba(91,110,255,0.3)]",
            "transition-all duration-200 no-underline"
          )}
        >
          Get early access
        </Link>
      </div>
    </header>
  );
}
