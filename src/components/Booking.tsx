import { useEffect, useMemo, useState } from "react";
import { barbers, business, services, timeSlots } from "../data/content";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export type BookingIntent = {
  serviceId: string | null;
  barber: string | null;
  n: number;
};

type Step = 1 | 2 | 3 | 4 | "done";

const FIRST_AVAILABLE = "First available";
const STEPS = ["Service", "Barber", "Date & Time", "Confirm"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function slotTaken(iso: string, time: string) {
  let h = 0;
  const s = iso + time;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
  return h % 97 < 17;
}

function slotInPast(iso: string, time: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const slot = new Date(y, m - 1, d, hh, mm);
  return slot.getTime() <= Date.now() + 45 * 60 * 1000;
}

function formatTime(time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour}:${String(mm).padStart(2, "0")} ${suffix}`;
}

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function Booking({ intent }: { intent: BookingIntent }) {
  const { ref, visible } = useInView<HTMLElement>(0.04);
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barber, setBarber] = useState<string>(FIRST_AVAILABLE);
  const [dateISO, setDateISO] = useState<string>(() => toISO(new Date()));
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [refCode, setRefCode] = useState("");

  const service = services.find((s) => s.id === serviceId) ?? null;

  const days = useMemo(() => {
    const list: { iso: string; weekday: string; dayNum: number; label: string }[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      list.push({
        iso: toISO(d),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        label: i === 0 ? "Today" : i === 1 ? "Tmrw" : d.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }
    return list;
  }, []);

  useEffect(() => {
    if (!intent.n) return;
    if (intent.serviceId) {
      setServiceId(intent.serviceId);
      setStep((prev) => (prev === "done" ? 2 : Math.min(Math.max(prev, 2), 4) as Step));
    }
    if (intent.barber) {
      setBarber(intent.barber);
      setStep((prev) => (prev === "done" ? 1 : prev));
    }
  }, [intent.n, intent.serviceId, intent.barber]);

  useEffect(() => {
    setTime(null);
  }, [dateISO, serviceId, barber]);

  const canContinue =
    (step === 1 && serviceId !== null) ||
    (step === 2 && barber.length > 0) ||
    (step === 3 && time !== null);

  const submit = () => {
    const nextErrors: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Please enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    let h = 7;
    const s = `${serviceId}${barber}${dateISO}${time}${name}`;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 46656;
    setRefCode(`A1-${h.toString(36).toUpperCase().padStart(3, "0")}`);
    setStep("done");
  };

  const reset = () => {
    setStep(1);
    setServiceId(null);
    setBarber(FIRST_AVAILABLE);
    setTime(null);
    setName("");
    setPhone("");
    setErrors({});
    setRefCode("");
  };

  return (
    <section id="book" ref={ref} className="relative overflow-hidden border-y border-line bg-ink-2 px-5 py-24 md:px-8 md:py-32">
      <div
        className="outline-text pointer-events-none absolute top-6 right-0 font-display text-[26vw] leading-none font-semibold select-none"
        aria-hidden="true"
      >
        BOOK
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Book online"
            title="Reserve your chair."
            copy="Service, barber, date, and time — all right here. No redirects, no phone tag."
          />
          <p className="max-w-xs border-l border-line-strong pl-5 text-sm leading-relaxed text-dim">
            Prefer to talk it through? Call{" "}
            <a href={business.phoneHref} className="text-silver-2 underline-offset-4 hover:underline">
              {business.phone}
            </a>{" "}
            during open hours.
          </p>
        </div>

        <div className={cn("reveal mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]", visible && "visible")}>
          {/* Flow panel */}
          <div className="min-w-0 border border-line bg-ink p-6 md:p-10">
            {step !== "done" ? (
              <>
                <ol className="flex flex-wrap items-center gap-2" aria-label="Booking progress">
                  {STEPS.map((label, index) => {
                    const num = index + 1;
                    const isActive = step === num;
                    const isDone = step > num;
                    return (
                      <li key={label} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => isDone && setStep(num as Step)}
                          disabled={!isDone && !isActive}
                          className={cn(
                            "flex items-center gap-2 border px-3 py-2 text-[0.62rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                            isActive
                              ? "border-silver bg-white text-ink"
                              : isDone
                                ? "cursor-pointer border-line-strong text-silver-2 hover:border-silver"
                                : "border-line text-dim",
                          )}
                          aria-current={isActive ? "step" : undefined}
                        >
                          <span>{isDone ? "✓" : String(index + 1).padStart(2, "0")}</span>
                          {label}
                        </button>
                        {index < STEPS.length - 1 ? (
                          <span className="hidden h-px w-6 bg-edge sm:block" aria-hidden="true" />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <div key={step} className="step-panel mt-8">
                  {step === 1 ? (
                    <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose a service">
                      {services.map((s) => {
                        const selected = serviceId === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setServiceId(s.id)}
                            className={cn(
                              "flex flex-col border p-5 text-left transition-all duration-300",
                              selected
                                ? "border-silver bg-white/[0.07]"
                                : "border-line bg-ink-2 hover:border-line-strong hover:bg-ink-3",
                            )}
                          >
                            <span className="flex w-full items-baseline justify-between gap-3">
                              <span className="font-display text-xl text-white md:text-2xl">{s.name}</span>
                              <span className="silver-text font-display text-xl">{s.price}</span>
                            </span>
                            <span className="mt-2 text-[0.62rem] tracking-[0.22em] text-dim uppercase">
                              {s.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose a barber">
                      {[FIRST_AVAILABLE, ...barbers.map((b) => b.name)].map((b) => {
                        const selected = barber === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setBarber(b)}
                            className={cn(
                              "flex items-center justify-between border px-5 py-4 text-left transition-all duration-300",
                              selected
                                ? "border-silver bg-white/[0.07]"
                                : "border-line bg-ink-2 hover:border-line-strong hover:bg-ink-3",
                            )}
                          >
                            <span>
                              <span className="block font-display text-xl text-white">{b}</span>
                              <span className="mt-1 block text-[0.62rem] tracking-[0.2em] text-dim uppercase">
                                {b === FIRST_AVAILABLE ? "Earliest open chair" : "A1 Barber Studio"}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full border text-[0.6rem] text-ink",
                                selected ? "border-silver bg-silver-2" : "border-edge",
                              )}
                              aria-hidden="true"
                            >
                              {selected ? "✓" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div>
                      <p className="text-[0.62rem] tracking-[0.24em] text-dim uppercase">Choose a day</p>
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                        {days.map((d) => {
                          const selected = dateISO === d.iso;
                          return (
                            <button
                              key={d.iso}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => setDateISO(d.iso)}
                              className={cn(
                                "flex w-[4.6rem] shrink-0 flex-col items-center border py-3 transition-all duration-300",
                                selected
                                  ? "border-silver bg-white text-ink"
                                  : "border-line bg-ink-2 text-snow hover:border-line-strong",
                              )}
                            >
                              <span className="text-[0.58rem] tracking-[0.18em] uppercase opacity-70">
                                {d.label}
                              </span>
                              <span className="mt-1 font-display text-2xl leading-none">{d.dayNum}</span>
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-6 text-[0.62rem] tracking-[0.24em] text-dim uppercase">
                        Available times · {formatDay(dateISO)}
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6" role="group" aria-label="Choose a time">
                        {timeSlots.map((t) => {
                          const taken = slotTaken(dateISO, t);
                          const past = slotInPast(dateISO, t);
                          const disabled = taken || past;
                          const selected = time === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={disabled}
                              aria-pressed={selected}
                              onClick={() => setTime(t)}
                              className={cn(
                                "border py-2.5 text-sm transition-all duration-200",
                                disabled
                                  ? "cursor-not-allowed border-line text-edge line-through"
                                  : selected
                                    ? "border-silver bg-white font-semibold text-ink"
                                    : "border-line bg-ink-2 text-snow hover:border-line-strong hover:bg-ink-3",
                              )}
                            >
                              {formatTime(t)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="max-w-xl">
                      <p className="text-[0.62rem] tracking-[0.24em] text-dim uppercase">Your details</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-[0.62rem] tracking-[0.2em] text-mute uppercase">
                            Full name
                          </span>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            className={cn(
                              "w-full border bg-ink-2 px-4 py-3 text-snow placeholder:text-dim focus:border-silver focus:outline-none",
                              errors.name ? "border-red-400/70" : "border-line",
                            )}
                            placeholder="Jordan Smith"
                          />
                          {errors.name ? <span className="mt-2 block text-xs text-red-300">{errors.name}</span> : null}
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-[0.62rem] tracking-[0.2em] text-mute uppercase">
                            Phone
                          </span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="tel"
                            className={cn(
                              "w-full border bg-ink-2 px-4 py-3 text-snow placeholder:text-dim focus:border-silver focus:outline-none",
                              errors.phone ? "border-red-400/70" : "border-line",
                            )}
                            placeholder="(604) 555-0123"
                          />
                          {errors.phone ? <span className="mt-2 block text-xs text-red-300">{errors.phone}</span> : null}
                        </label>
                      </div>
                      <p className="mt-6 border border-line bg-ink-2/70 p-4 text-sm leading-relaxed text-mute">
                        <span className="text-silver-2">Studio policy — </span>
                        {business.bookingPolicy}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((prev) => (prev !== "done" && prev > 1 ? ((prev - 1) as Step) : prev))}
                    className={cn(
                      "text-[0.66rem] font-semibold tracking-[0.24em] uppercase transition-colors",
                      step === 1 ? "cursor-default text-edge" : "text-mute hover:text-white",
                    )}
                    disabled={step === 1}
                  >
                    ← Back
                  </button>
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => setStep((step + 1) as Step)}
                      disabled={!canContinue}
                      className={cn(
                        "px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] uppercase transition-all duration-300",
                        canContinue
                          ? "sheen bg-[linear-gradient(115deg,#f5f5f5,#cfcfcf_55%,#e4e4e4)] text-ink hover:brightness-110"
                          : "cursor-not-allowed bg-ink-3 text-edge",
                      )}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      className="sheen bg-[linear-gradient(115deg,#f5f5f5,#cfcfcf_55%,#e4e4e4)] px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-ink uppercase transition-all duration-300 hover:brightness-110"
                    >
                      Request Appointment
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="step-panel py-6 text-center md:py-12">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-silver bg-white/[0.06]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-silver-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-4xl text-white md:text-5xl">Request received.</h3>
                <p className="mx-auto mt-4 max-w-md text-mute">
                  Your appointment request is in, {name.trim().split(" ")[0]}. Reference{" "}
                  <span className="silver-text font-display text-xl">{refCode}</span>. Need to change
                  anything? Call{" "}
                  <a href={business.phoneHref} className="text-silver-2 underline-offset-4 hover:underline">
                    {business.phone}
                  </a>
                  .
                </p>
                <div className="mx-auto mt-8 max-w-md border border-line bg-ink-2/80 p-6 text-left">
                  <SummaryRow label="Service" value={service ? `${service.name} · ${service.price}` : "—"} />
                  <SummaryRow label="Barber" value={barber} />
                  <SummaryRow label="When" value={time ? `${formatDay(dateISO)} · ${formatTime(time)}` : "—"} />
                  <SummaryRow label="Duration" value={service?.duration ?? "—"} last />
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 border border-line-strong px-6 py-3 text-[0.66rem] font-semibold tracking-[0.24em] text-snow uppercase transition-colors hover:border-silver"
                >
                  Make another booking
                </button>
              </div>
            )}
          </div>

          {/* Summary rail */}
          <aside
            className="h-fit border border-line bg-ink p-6 md:p-8 lg:sticky lg:top-28"
            aria-live="polite"
          >
            <p className="text-[0.62rem] tracking-[0.28em] text-silver uppercase">Your booking</p>
            <div className="mt-6">
              <SummaryRow label="Service" value={service ? service.name : "Select a service"} />
              <SummaryRow label="Barber" value={barber} />
              <SummaryRow
                label="Date"
                value={time !== null || (step !== "done" && step >= 3) ? formatDay(dateISO) : "—"}
              />
              <SummaryRow label="Time" value={time ? formatTime(time) : "—"} />
              <SummaryRow label="Duration" value={service?.duration ?? "—"} />
            </div>
            <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
              <span className="text-[0.62rem] tracking-[0.24em] text-dim uppercase">Total</span>
              <span className="silver-text font-display text-4xl">{service ? service.price : "$—"}</span>
            </div>
            <div className="mt-6 border border-line bg-ink-2/70 p-4">
              <p className="text-[0.6rem] tracking-[0.24em] text-silver uppercase">Studio</p>
              <p className="mt-2 text-sm text-snow/85">{business.address}</p>
              <p className="mt-1 text-sm text-mute">
                {business.hoursNote} · {business.hours}
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-dim">
              Arrive 5–10 minutes early. Requests are reviewed by the studio during open hours.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 py-3", !last && "border-b border-line")}>
      <span className="text-[0.62rem] tracking-[0.24em] text-dim uppercase">{label}</span>
      <span className="text-right text-sm text-snow">{value}</span>
    </div>
  );
}
