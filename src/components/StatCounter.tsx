import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface StatCounterProps {
  /** Numeric target, e.g. 120 */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

/** Counts up to `value` once the element enters the viewport. */
const StatCounter = ({ value, prefix = "", suffix = "", label, duration = 1200 }: StatCounterProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);

  return (
    <div ref={ref} className="border-t border-white/[0.09] pt-5">
      <div className="font-display text-[2.1rem] font-bold leading-none tracking-tight text-foreground sm:text-[2.6rem]">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default StatCounter;
