import { cn } from "../utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      <p className="text-[0.68rem] font-semibold tracking-[0.38em] text-gold uppercase">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.02em]",
          light ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[1.02rem] leading-relaxed",
            light ? "text-ink-4/80" : "text-stone",
            align === "center" && "mx-auto",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
