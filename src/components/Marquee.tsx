interface MarqueeProps {
  items: string[];
}

/** Infinite horizontal ticker used as the authority strip under the hero. */
const Marquee = ({ items }: MarqueeProps) => {
  const loop = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden border-y border-white/[0.07] bg-surface/60 py-3.5"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:gap-14 sm:text-xs"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
