import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PrimaryCTAProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "lg" | "md";
}

/** Magnetic hover CTA with a restrained emerald glow. */
const PrimaryCTA = ({ children, onClick, className = "", size = "lg" }: PrimaryCTAProps) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.14, y: y * 0.24 });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-glow transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_0_54px_hsl(var(--primary)/0.45)] sm:w-auto ${
        size === "lg"
          ? "px-7 py-4 text-[13px] sm:px-10 sm:py-[1.15rem] sm:text-[15px]"
          : "px-6 py-3.5 text-[12.5px] sm:text-sm"
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 text-center font-display font-semibold tracking-[-0.01em] leading-tight">
        {children}
      </span>
    </button>
  );
};

export default PrimaryCTA;
