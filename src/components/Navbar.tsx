import { useEffect, useState } from "react";
import { BOOK_ANCHOR, business, navLinks } from "../data/content";
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

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close automatically when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || open
            ? "border-b border-line bg-ink/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[4.6rem] sm:px-5 md:px-8">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Button href={BOOK_ANCHOR} className="hidden px-5 py-3 sm:inline-flex">
              Book Appointment
            </Button>
            <button
              type="button"
              className="relative z-[70] flex h-10 w-10 shrink-0 items-center justify-center border border-line text-snow transition-colors duration-300 hover:border-line-strong sm:h-11 sm:w-11 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-full rounded bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 block h-0.5 w-full rounded bg-current transition-all duration-200",
                    open ? "scale-x-0 opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-full rounded bg-current transition-all duration-300",
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
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 h-full w-full bg-ink/70 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Panel */}
        <nav
          aria-label="Mobile"
          className={cn(
            "absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col overflow-y-auto bg-ink pt-[4.5rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pt-[5rem]",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
            <ol className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-4 border-b border-line py-4 transition-all duration-500 ease-out",
                      open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                      active === link.href ? "text-white" : "text-snow",
                    )}
                    style={{ transitionDelay: open ? `${120 + index * 45}ms` : "0ms" }}
                  >
                    <span className="w-6 font-display text-xs text-dim tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl leading-none font-semibold">
                      {link.label}
                    </span>
                    {active === link.href ? (
                      <span className="ml-auto text-silver-2" aria-hidden="true">
                        ●
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ol>

            <div
              className={cn(
                "mt-6 flex flex-col gap-4 transition-all duration-500 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + navLinks.length * 45}ms` : "0ms" }}
            >
              <a
                href={BOOK_ANCHOR}
                onClick={() => setOpen(false)}
                className="sheen block w-full bg-[linear-gradient(115deg,#f5f5f5_0%,#cfcfcf_45%,#b8b8b8_70%,#e4e4e4_100%)] px-6 py-4 text-center text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase transition-all duration-300 hover:brightness-110"
              >
                Book Appointment
              </a>
              <div className="flex flex-col gap-1 border border-line bg-ink-2/70 px-4 py-3 text-sm">
                <a href={business.phoneHref} className="text-snow transition-colors hover:text-silver-2">
                  {business.phone}
                </a>
                <span className="text-xs text-dim">{business.address}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
