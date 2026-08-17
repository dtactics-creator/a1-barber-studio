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
        <div className="border-b border-line px-5 py-10 md:px-8 lg:border-r lg:border-b-0">
          <p className="text-[0.62rem] tracking-[0.28em] text-dim uppercase">Client rating</p>
          <p className="silver-text mt-3 font-display text-6xl leading-none md:text-7xl">
            {rating.toFixed(1)}
          </p>
          <p className="mt-3 text-sm text-mute" aria-hidden="true">
            ★★★★★ <span className="text-dim">from Google</span>
          </p>
        </div>
        <div className="border-b border-line px-5 py-10 md:px-8 lg:border-r lg:border-b-0">
          <p className="text-[0.62rem] tracking-[0.28em] text-dim uppercase">Reviews</p>
          <p className="mt-3 font-display text-6xl leading-none text-white md:text-7xl">
            {Math.round(count).toLocaleString()}
            <span className="text-silver-2">+</span>
          </p>
          <p className="mt-3 text-sm text-mute">Clients who rated the chair</p>
        </div>
        <div className="border-r border-line px-5 py-10 md:px-8 lg:border-r-0">
          <p className="text-[0.62rem] tracking-[0.28em] text-dim uppercase">Services</p>
          <p className="mt-3 font-display text-6xl leading-none text-white md:text-7xl">
            {services.length}
          </p>
          <p className="mt-3 text-sm text-mute">Cuts, tapers, and beard work</p>
        </div>
        <div className="px-5 py-10 md:px-8">
          <p className="text-[0.62rem] tracking-[0.28em] text-dim uppercase">Hours</p>
          <p className="mt-3 font-display text-4xl leading-tight text-white md:text-5xl">
            9–8:30
          </p>
          <p className="mt-3 text-sm text-mute">{business.hoursNote} on Water Street</p>
        </div>
      </div>
    </section>
  );
}
