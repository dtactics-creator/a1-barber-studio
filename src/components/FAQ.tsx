import { useState } from "react";
import { faqs } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function FAQ() {
  const { ref, visible } = useInView<HTMLElement>();
  const [open, setOpen] = useState(0);

  return (
    <section ref={ref} className="bg-ink-2 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
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
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="font-display text-2xl text-cream md:text-[1.7rem]">{item.q}</span>
                    <span
                      className={cn(
                        "mt-2 block text-gold transition-transform duration-300",
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
                    <p className="pb-6 max-w-2xl text-stone">{item.a}</p>
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
