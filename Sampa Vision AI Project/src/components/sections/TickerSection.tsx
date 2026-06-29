import { TICKER_ITEMS } from "@/lib/constants";

export function TickerSection() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="border-t border-b border-border overflow-hidden whitespace-nowrap py-3.5 bg-pit"
      aria-hidden="true"
    >
      <div className="inline-flex animate-ticker will-change-transform">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 px-8 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-ash"
          >
            <span className="w-1 h-1 rounded-full bg-electric shadow-[0_0_5px_#5B6EFF] flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
