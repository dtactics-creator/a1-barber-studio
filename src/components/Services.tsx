import { services } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

type ServicesProps = {
  onSelect: (serviceId: string) => void;
};

export function Services({ onSelect }: ServicesProps) {
  const { ref, visible } = useInView<HTMLElement>(0.06);

  return (
    <section id="services" ref={ref} className="bg-ink px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The menu"
            title="Every cut, priced straight."
            copy="Choose a service to start your booking — the calendar opens right here, no redirects."
          />
          <p className="max-w-xs border-l border-line-strong pl-5 text-sm leading-relaxed text-dim">
            All prices in CAD. Combined services include extra chair time so
            nothing gets rushed.
          </p>
        </div>

        <div className="mt-14 border-t border-line">
          {services.map((service, index) => (
            <a
              key={service.id}
              href="#book"
              onClick={() => onSelect(service.id)}
              className={cn(
                "reveal group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-line px-2 py-7 transition-colors duration-500 hover:bg-ink-2 md:grid-cols-[4rem_1fr_auto_auto] md:items-center md:gap-x-8 md:px-6",
                visible && "visible",
                index % 2 === 0 ? "delay-1" : "delay-2",
              )}
            >
              <span className="font-display text-xl text-dim transition-colors group-hover:text-silver-2 md:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-4">
                  <span className="font-display text-3xl text-white transition-transform duration-500 group-hover:translate-x-1.5 md:text-4xl">
                    {service.name}
                  </span>
                  <span className="text-[0.66rem] tracking-[0.22em] text-dim uppercase">
                    {service.duration}
                  </span>
                </span>
                <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-mute">
                  {service.description}
                </span>
              </span>
              <span className="silver-text col-start-2 font-display text-3xl md:col-start-auto md:text-4xl">
                {service.price}
              </span>
              <span className="col-start-2 flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.24em] text-silver-2 uppercase transition-colors group-hover:text-white md:col-start-auto">
                Select
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
