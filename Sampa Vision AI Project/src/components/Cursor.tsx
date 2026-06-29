"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const bigRef    = useRef(false);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    };

    const enlarge = () => {
      if (!bigRef.current) {
        bigRef.current = true;
        cursor.classList.add("big");
      }
    };
    const shrink = () => {
      if (bigRef.current) {
        bigRef.current = false;
        cursor.classList.remove("big");
      }
    };

    document.addEventListener("mousemove", move, { passive: true });

    const targets = document.querySelectorAll(
      "a,button,[role='button'],[data-cursor-big]"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enlarge);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enlarge);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={[
        "fixed z-[9999] pointer-events-none",
        "w-2 h-2 rounded-full bg-electric",
        "-translate-x-1/2 -translate-y-1/2",
        "transition-[width,height] duration-200",
        "shadow-[0_0_8px_#5B6EFF,0_0_20px_rgba(91,110,255,0.16)]",
        "hidden md:block",
        // big state via class
        "[&.big]:w-10 [&.big]:h-10 [&.big]:bg-transparent",
        "[&.big]:border [&.big]:border-electric",
        "[&.big]:shadow-[0_0_16px_rgba(91,110,255,0.3)]",
      ].join(" ")}
    />
  );
}
