import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "line";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({ href, children, variant = "primary", className, onClick }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.1}px, ${y * 0.16}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.7rem] font-semibold tracking-[0.24em] uppercase transition-all duration-300",
        variant === "primary" &&
          "sheen bg-[linear-gradient(115deg,#f5f5f5_0%,#cfcfcf_45%,#b8b8b8_70%,#e4e4e4_100%)] text-ink shadow-silver hover:brightness-110",
        variant === "secondary" &&
          "border border-line-strong bg-white/[0.02] text-snow hover:border-silver hover:bg-white/[0.06]",
        variant === "line" &&
          "border-b border-silver/40 px-0 py-2 text-silver-2 hover:border-silver-2 hover:text-white",
        className,
      )}
    >
      {children}
    </a>
  );
}
