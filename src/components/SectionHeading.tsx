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
      <p className="text-[0.62rem] font-semibold tracking-[0.32em] text-silver uppercase sm:text-[0.68rem] sm:tracking-[0.38em]">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-[clamp(2rem,7vw,4.4rem)] leading-[1] font-bold tracking-[-0.02em] sm:mt-4 sm:leading-[0.95]",
          light ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-[0.95rem] leading-relaxed sm:mt-6 sm:text-[1.02rem]",
            light ? "text-ink-4/80" : "text-mute",
            align === "center" && "mx-auto",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
