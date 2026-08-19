import { business, reviews } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Testimonials() {
  const { ref, visible } = useInView<HTMLElement>(0.06);
  const [featured, ...rest] = reviews;

  return (
    <section id="reviews" ref={ref} className="bg-ink px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Reviews"
            title="1,437+ chairs filled."
            copy="Pulled from the studio’s Google reviews — the words are theirs."
          />
          <p className="flex items-baseline gap-3">
            <span className="silver-text font-display text-6xl leading-none">{business.rating}</span>
            <span className="text-sm text-mute">
              <span aria-hidden="true" className="text-silver-2">★★★★★</span>
              <br />
              {business.reviewCountLabel} Google reviews
            </span>
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article
            className={cn(
              "reveal relative flex flex-col border border-line bg-ink-2 p-5 sm:p-8 md:p-12",
              visible && "visible",
            )}
          >
            <span
              className="pointer-events-none absolute top-2 left-4 font-display text-[5rem] leading-none text-white/6 select-none sm:top-4 sm:left-6 sm:text-[8rem]"
              aria-hidden="true"
            >
              “
            </span>
            <p className="text-[0.62rem] tracking-[0.24em] text-silver uppercase">{featured.source} review</p>
            <blockquote className="mt-5 flex-1 font-display text-xl leading-snug font-medium text-white sm:mt-6 sm:text-[1.6rem] md:text-[2rem]">
              “{featured.text}”
            </blockquote>
            <footer className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-silver/50" aria-hidden="true" />
              <p className="text-sm text-snow/85">{featured.name}</p>
            </footer>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((review, index) => (
              <article
                key={review.name}
                className={cn(
                  "reveal flex flex-col border border-line bg-ink-2/70 p-5 transition-colors hover:border-line-strong sm:p-7",
                  visible && "visible",
                  `delay-${index + 1}`,
                )}
              >
                <p className="text-[0.85rem] tracking-[0.12em] text-silver-2" aria-hidden="true">
                  ★★★★★
                </p>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-snow/85">
                  “{review.text}”
                </blockquote>
                <footer className="mt-6">
                  <p className="text-sm text-white">{review.name}</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.22em] text-dim uppercase">
                    {review.source}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
