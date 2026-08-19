import { BOOK_ANCHOR } from "../data/content";
import { useInView } from "../hooks/useInView";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function About() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="about" ref={ref} className="bg-ink-2/60 px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={cn("reveal img-zoom relative min-h-[320px] border border-line sm:min-h-[420px] lg:min-h-[480px]", visible && "visible")}>
          <img
            src="/images/about.jpg"
            alt="Consultation in the A1 Barber Studio chair"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.25]"
          />
          <div className="absolute inset-x-4 bottom-4 border border-line bg-ink/75 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
            <p className="text-[0.58rem] tracking-[0.24em] text-silver uppercase sm:text-[0.6rem] sm:tracking-[0.3em]">
              The studio
            </p>
            <p className="mt-2 font-display text-xl text-white sm:text-2xl">332 Water Street, Gastown</p>
          </div>
        </div>

        <div className={cn("reveal delay-2", visible && "visible")}>
          <SectionHeading eyebrow="About A1" title="Craft first. Then the atmosphere." />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-mute sm:mt-8 sm:space-y-5 sm:text-[1.02rem]">
            <p>
              At A1, we focus on men’s grooming as both craft and experience.
              Our goal is to deliver precise, tailored cuts and styles that
              reflect individuality — while creating an environment that feels
              inviting and relaxed.
            </p>
            <p>
              We believe every client deserves access to high-quality grooming
              without compromise. By continuously refining our skills, learning,
              and evolving with new techniques and products, we keep A1 a step
              ahead in modern men’s grooming.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {["Tailored, never templated", "Senior-level barbering", "Consultation before every cut", "Relaxed, professional room"].map(
              (point) => (
                <li key={point} className="flex items-center gap-3 border border-line bg-ink-3/60 px-4 py-3 text-sm text-snow/85">
                  <span className="text-silver-2" aria-hidden="true">◆</span>
                  {point}
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Button href={BOOK_ANCHOR}>Book an Appointment</Button>
            <Button href="#barbers" variant="secondary">
              Meet the Barbers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
