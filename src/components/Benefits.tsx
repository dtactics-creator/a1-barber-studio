import { BOOK_ANCHOR, benefits } from "../data/content";
import { useInView } from "../hooks/useInView";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Benefits() {
  const { ref, visible } = useInView<HTMLElement>(0.06);

  return (
    <section ref={ref} className="border-y border-line bg-ink-2/70 px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="The experience"
            title="Why men book A1."
            copy="Precision, individuality, and a studio that feels considered — not loud, not generic."
          />
          <Button href={BOOK_ANCHOR} variant="secondary" className="mt-10">
            Book an Appointment
          </Button>
        </div>

        <div className="border-t border-line">
          {benefits.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "reveal group grid grid-cols-[3.2rem_1fr] gap-4 border-b border-line py-7 transition-colors hover:bg-ink-3/50 sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:py-9 md:grid-cols-[6rem_1fr]",
                visible && "visible",
                `delay-${(index % 3) + 1}`,
              )}
            >
              <p className="font-display text-3xl leading-none text-edge transition-colors duration-500 group-hover:text-silver-2 sm:text-5xl md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-2xl text-white sm:text-3xl md:text-4xl">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute sm:mt-3 sm:text-base">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
