import { BOOK_ANCHOR, business } from "../data/content";
import { useInView } from "../hooks/useInView";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Location() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="contact" ref={ref} className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Visit"
          title="Find the studio."
          copy="In Gastown on Water Street — book ahead, then walk in ready for the chair."
        />

        <div className="mt-14 grid overflow-hidden border border-line lg:grid-cols-[0.9fr_1.1fr]">
          <div className={cn("reveal flex flex-col justify-between bg-ink-2 p-8 md:p-12", visible && "visible")}>
            <div>
              <p className="text-[0.66rem] tracking-[0.28em] text-silver uppercase">Address</p>
              <p className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl">
                {business.addressLines[0]}
                <br />
                {business.addressLines[1]}
              </p>
              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-[0.6rem] tracking-[0.24em] text-dim uppercase">Phone</dt>
                  <dd className="mt-2">
                    <a href={business.phoneHref} className="text-lg text-snow transition-colors hover:text-silver-2">
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] tracking-[0.24em] text-dim uppercase">Email</dt>
                  <dd className="mt-2">
                    <a href={business.emailHref} className="text-lg text-snow transition-colors hover:text-silver-2">
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] tracking-[0.24em] text-dim uppercase">Hours</dt>
                  <dd className="mt-2 text-lg text-snow">
                    {business.hoursNote}, {business.hours}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Button href={business.mapsDirections}>Get Directions</Button>
              <Button href={BOOK_ANCHOR} variant="secondary">
                Book Appointment
              </Button>
            </div>
          </div>

          <div className={cn("reveal delay-2 min-h-[420px] bg-ink-4", visible && "visible")}>
            <iframe
              title="A1 Barber Studio on Google Maps"
              src={business.mapsEmbed}
              className="h-full min-h-[420px] w-full grayscale invert-[0.92] contrast-[0.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
