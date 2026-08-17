import { BOOK_ANCHOR, business } from "../data/content";
import { useInView } from "../hooks/useInView";
import { Button } from "./Button";
import { cn } from "../utils/cn";

export function FinalCTA() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      <div
        className="outline-text pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-display text-[22vw] leading-none font-semibold whitespace-nowrap select-none"
        aria-hidden="true"
      >
        A1 STUDIO
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_26rem_at_50%_50%,rgba(217,217,217,0.07),transparent_65%)]" aria-hidden="true" />

      <div className={cn("reveal relative mx-auto max-w-3xl text-center", visible && "visible")}>
        <p className="text-[0.66rem] font-semibold tracking-[0.4em] text-silver uppercase">
          Vancouver · Gastown · Water St
        </p>
        <h2 className="mt-6 font-display text-[clamp(3rem,8vw,6.4rem)] leading-[0.9] font-bold text-white">
          Walk in.
          <span className="silver-text font-semibold"> Walk out sharp.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-mute">
          Pick your service, pick your barber, lock the time — the calendar is
          right on this page. {business.hoursNote.toLowerCase()}, {business.hours}.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={BOOK_ANCHOR} className="min-w-[240px]">
            Book an Appointment
          </Button>
          <Button href={business.phoneHref} variant="secondary" className="min-w-[240px]">
            {business.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
