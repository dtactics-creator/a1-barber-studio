import { useState } from "react";
import { faqs } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function FAQ() {
  const { ref, visible } = useInView<HTMLElement>();
  const [open, setOpen] = useState(0);

  return (
    <section ref={ref} className="bg-ink-2 px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <SectionHeading
          eyebrow="Questions"
          title="Before you book."
          copy="Practical answers about services, barbers, timing, and the Water Street studio."
        />

        <div className={cn("reveal delay-2 divide-y divide-line border-y border-line", visible && "visible")}>
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="font-display text-lg leading-snug font-semibold text-white sm:text-2xl md:text-[1.7rem]">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block shrink-0 text-xl text-silver-2 transition-transform duration-300 sm:mt-2",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div className={cn("accordion-body", isOpen && "open")}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-sm leading-relaxed text-mute sm:pb-6 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
