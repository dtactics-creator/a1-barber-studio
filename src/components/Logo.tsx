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
      className={cn("group flex shrink-0 items-center gap-2 no-underline sm:gap-3", className)}
      aria-label="A1 Barber Studio — home"
    >
      <span
        className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] sm:h-11 sm:w-11"
        aria-hidden="true"
      >
        <img
          src="./images/logo.webp"
          alt=""
          className="h-9 w-9 object-contain sm:h-11 sm:w-11 rounded-full"
          loading="eager"
          decoding="async"
        />
      </span>
      <span className="leading-none">
        <span className="silver-text block font-display text-[1.1rem] font-semibold tracking-[0.16em] sm:text-[1.35rem] sm:tracking-[0.22em]">
          A1
        </span>
        <span className="mt-1 hidden text-[0.6rem] font-medium tracking-[0.36em] text-mute sm:block">
          BARBER STUDIO
        </span>
      </span>
    </a>
  );
}
