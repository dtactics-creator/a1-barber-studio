import { barbers } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

type BarbersProps = {
  onSelect: (barberName: string) => void;
};

export function Barbers({ onSelect }: BarbersProps) {
  const { ref, visible } = useInView<HTMLElement>(0.06);

  return (
    <section id="barbers" ref={ref} className="bg-ink-2/60 px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The team"
            title="Barbers worth naming."
            copy="Pick the barber who already knows your hair — or let the first available chair take you."
          />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {barbers.map((barber, index) => (
            <a
              key={barber.name}
              href="#book"
              onClick={() => onSelect(barber.name)}
              className={cn(
                "reveal group relative block min-h-[400px] overflow-hidden border border-line bg-ink-3 sm:min-h-[460px] lg:min-h-[560px]",
                visible && "visible",
                `delay-${Math.min(index + 1, 5)}`,
              )}
            >
              <div className="img-zoom absolute inset-0">
                <img
                  src={barber.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-[0.15]"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,0,0.25)_0%,rgba(2,3,0,0.05)_45%,rgba(2,3,0,0.94)_100%)]" />
              <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                <span className="flex items-center justify-between">
                  <span className="font-display text-4xl text-white/35 sm:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="border border-white/20 px-3 py-1.5 text-[0.58rem] font-semibold tracking-[0.22em] text-snow/85 uppercase backdrop-blur-sm transition-colors group-hover:border-silver group-hover:text-white">
                    Book →
                  </span>
                </span>
                <span className="block">
                  <span className="block text-[0.62rem] tracking-[0.28em] text-silver uppercase">
                    {barber.role}
                  </span>
                  <span className="mt-2 block font-display text-4xl text-white">{barber.name}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-snow/72">
                    {barber.note}
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
