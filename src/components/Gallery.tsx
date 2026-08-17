import { useEffect, useState } from "react";
import { gallery } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Gallery() {
  const { ref, visible } = useInView<HTMLElement>(0.06);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((value) => (value === null ? 0 : (value + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((value) => (value === null ? 0 : (value - 1 + gallery.length) % gallery.length));
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="gallery" ref={ref} className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Gallery"
          title="The work, up close."
          copy="Fades, lineups, scissor texture, and beard work — the details that make a cut feel finished."
        />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 xl:columns-3">
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "reveal img-zoom group relative mb-4 block w-full cursor-pointer overflow-hidden border border-line bg-ink-2 text-left transition-colors hover:border-line-strong",
                visible && "visible",
                `delay-${(index % 6) + 1}`,
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover grayscale-[0.35] transition duration-700 group-hover:grayscale-0"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(180deg,transparent,rgba(2,3,0,0.85))] px-5 pt-12 pb-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[0.62rem] tracking-[0.24em] text-snow/90 uppercase">
                  {item.alt}
                </span>
                <span className="text-silver-2" aria-hidden="true">
                  +
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/94 px-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 border border-line-strong px-4 py-2 text-[0.66rem] tracking-[0.24em] text-snow uppercase transition-colors hover:border-silver"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].alt}
            className="max-h-[86vh] max-w-[92vw] border border-line object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
