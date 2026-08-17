import { useEffect, useState } from "react";
import { BOOK_ANCHOR, navLinks } from "../data/content";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.6rem] max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "nav-link text-[0.66rem] font-medium tracking-[0.24em] uppercase transition-colors",
                active === link.href ? "text-white" : "text-mute hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href={BOOK_ANCHOR} className="hidden px-5 py-3 sm:inline-flex">
            Book Appointment
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-line text-snow xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute top-1.5 left-0 block h-px w-full bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-full h-px origin-left bg-[linear-gradient(90deg,#f5f5f5,#8e8e8e)] transition-transform duration-150"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 0.6 : 0 }}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[4.6rem] bottom-0 bg-ink/97 backdrop-blur-2xl transition-all duration-500 xl:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex h-full flex-col justify-between px-6 py-10" aria-label="Mobile">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-4xl text-snow transition-colors hover:text-silver-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button href={BOOK_ANCHOR} className="w-full" onClick={() => setOpen(false)}>
            Book Appointment
          </Button>
        </nav>
      </div>
    </header>
  );
}
