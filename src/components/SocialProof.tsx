import { business, services } from "../data/content";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

export function SocialProof() {
  const { ref, visible } = useInView<HTMLElement>();
  const rating = useCountUp(business.rating, visible, 1100);
  const count = useCountUp(business.reviewCount, visible, 1600);

  return (
    <section ref={ref} className="border-b border-line bg-ink-2/70" aria-label="Client reputation">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        <div className="border-b border-line px-4 py-7 sm:px-5 sm:py-10 md:px-8 lg:border-r lg:border-b-0">
          <p className="text-[0.58rem] tracking-[0.2em] text-dim uppercase sm:text-[0.62rem] sm:tracking-[0.28em]">
            Client rating
          </p>
          <p className="silver-text mt-2 font-display text-4xl leading-none sm:mt-3 sm:text-6xl md:text-7xl">
            {rating.toFixed(1)}
          </p>
          <p className="mt-2 text-xs text-mute sm:mt-3 sm:text-sm" aria-hidden="true">
            ★★★★★ <span className="text-dim">from Google</span>
          </p>
        </div>
        <div className="border-b border-line px-4 py-7 sm:px-5 sm:py-10 md:px-8 lg:border-r lg:border-b-0">
          <p className="text-[0.58rem] tracking-[0.2em] text-dim uppercase sm:text-[0.62rem] sm:tracking-[0.28em]">
            Reviews
          </p>
          <p className="mt-2 font-display text-4xl leading-none text-white sm:mt-3 sm:text-6xl md:text-7xl">
            {Math.round(count).toLocaleString()}
            <span className="text-silver-2">+</span>
          </p>
          <p className="mt-2 text-xs text-mute sm:mt-3 sm:text-sm">Clients who rated the chair</p>
        </div>
        <div className="border-r border-line px-4 py-7 sm:px-5 sm:py-10 md:px-8 lg:border-r-0">
          <p className="text-[0.58rem] tracking-[0.2em] text-dim uppercase sm:text-[0.62rem] sm:tracking-[0.28em]">
            Services
          </p>
          <p className="mt-2 font-display text-4xl leading-none text-white sm:mt-3 sm:text-6xl md:text-7xl">
            {services.length}
          </p>
          <p className="mt-2 text-xs text-mute sm:mt-3 sm:text-sm">Cuts, tapers, and beard work</p>
        </div>
        <div className="px-4 py-7 sm:px-5 sm:py-10 md:px-8">
          <p className="text-[0.58rem] tracking-[0.2em] text-dim uppercase sm:text-[0.62rem] sm:tracking-[0.28em]">
            Hours
          </p>
          <p className="mt-2 font-display text-2xl leading-tight text-white sm:mt-3 sm:text-4xl md:text-5xl">
            9–8:30
          </p>
          <p className="mt-2 text-xs text-mute sm:mt-3 sm:text-sm">{business.hoursNote} on Water Street</p>
        </div>
      </div>
    </section>
  );
}
