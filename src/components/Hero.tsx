import { BOOK_ANCHOR, business, services } from "../data/content";
import { Button } from "./Button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="outline-text pointer-events-none absolute -top-10 -left-4 font-display text-[clamp(7rem,34vw,24rem)] leading-none font-semibold tracking-tight select-none sm:-top-16 sm:-left-8"
        aria-hidden="true"
      >
        A1
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-stretch px-4 pt-24 pb-0 sm:px-5 sm:pt-28 md:px-8 md:pt-36">
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="hero-copy flex flex-col justify-center pb-10 sm:pb-14 lg:pb-24">
            <p className="flex items-center gap-3 text-[0.66rem] font-semibold tracking-[0.42em] text-silver uppercase">
              <span className="h-px w-10 bg-silver/60" aria-hidden="true" />
              Gastown · Vancouver
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,10vw,7.6rem)] leading-[0.95] font-bold tracking-[-0.02em] text-white sm:mt-7 sm:leading-[0.88] sm:tracking-[-0.03em]">
              Precision
              <span className="block">grooming,</span>
              <span className="silver-text font-semibold">personalized style.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-mute md:text-lg">
              Men’s haircuts, tapers, scissor work, and beard grooming —
              tailored in a relaxed Water Street studio. Vancouver’s modern
              barber experience.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={BOOK_ANCHOR}>Book an Appointment</Button>
              <Button href="#services" variant="secondary">
                Explore Services
              </Button>
            </div>
            <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] tracking-[0.18em] text-dim uppercase">
              <span className="text-silver-2" aria-hidden="true">
                ★
              </span>
              <span>{business.rating} rating</span>
              <span aria-hidden="true">·</span>
              <span>{business.reviewCountLabel}+ reviews</span>
              <span aria-hidden="true">·</span>
              <span>{business.hoursNote}, 9–8:30</span>
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="hero-media img-zoom relative h-full min-h-[620px] border border-line">
              <img
                src="./images/hero.jpg"
                alt="Barber giving a precision haircut in a dark, warm-lit Vancouver studio"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(200deg,transparent_55%,rgba(2,3,0,0.55)_100%)]" />
            </div>
            <div className="absolute top-1/2 -right-4 translate-x-full -translate-y-1/2 rotate-180 [writing-mode:vertical-rl]">
              <p className="text-[0.62rem] font-medium tracking-[0.5em] text-dim uppercase">
                332 Water St — Vancouver
              </p>
            </div>
          </div>
        </div>

        <div className="hero-media img-zoom relative -mx-4 mt-2 h-[42vh] min-h-[280px] overflow-hidden border-y border-line sm:-mx-5 sm:h-[46vh] sm:min-h-[320px] lg:hidden">
          <img
            src="./images/hero.jpg"
            alt="Barber giving a precision haircut in a dark, warm-lit Vancouver studio"
            className="h-full w-full object-cover object-[center_22%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,0,0.4)_0%,transparent_40%,rgba(2,3,0,0.7)_100%)]" />
        </div>
      </div>

      <div className="relative mt-0 border-b border-line bg-ink-2/60 py-4" aria-hidden="true">
        <div className="marquee">
          {[...services, ...services].map((service, index) => (
            <span
              key={`${service.id}-${index}`}
              className="flex shrink-0 items-center gap-3 text-[0.68rem] tracking-[0.26em] text-mute uppercase"
            >
              {service.name}
              <span className="text-silver">{service.price}</span>
              <span className="text-edge">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
