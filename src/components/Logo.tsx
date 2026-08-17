import { cn } from "../utils/cn";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export function Logo({ className, onClick }: LogoProps) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className={cn("group flex items-center gap-3 no-underline", className)}
      aria-label="A1 Barber Studio — home"
    >
      <span
        className="relative flex h-11 items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        <img src="/images/logo.webp" alt="A1 Barber Studio Logo" className="h-11 w-auto object-contain rounded-full" />
      </span>
      <span className="leading-none">
        <span
          className="silver-text block font-display text-[1.35rem] font-semibold tracking-[0.22em]"
        >
          A1
        </span>
        <span className="mt-1 block text-[0.6rem] font-medium tracking-[0.36em] text-mute">
          BARBER STUDIO
        </span>
      </span>
    </a>
  );
}
