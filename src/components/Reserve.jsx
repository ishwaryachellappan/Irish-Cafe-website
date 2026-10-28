import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { CAFE } from "../lib/constants";

const SEATING = ["Indoor", "Outdoor", "Private dining room"];

const todayStr = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const field =
  "w-full border-0 border-b border-cream/25 bg-transparent py-3 text-cream placeholder:text-cream/35 transition-colors duration-200 focus:border-gold focus:outline-none";
const label = "eyebrow block text-[10px] text-cream/50";

const prettyDate = (s) =>
  new Date(`${s}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

const prettyTime = (t) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

export default function Reserve() {
  const [form, setForm] = useState({
    name: "", phone: "", date: todayStr(), time: "19:30",
    guests: 2, seating: "Indoor", notes: "",
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const guests = (n) => setForm((f) => ({ ...f, guests: Math.min(40, Math.max(1, f.guests + n)) }));

  const validate = () => {
    const e = {};
    const digits = form.phone.replace(/\D/g, "");
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (digits.length < 10 || digits.length > 13) e.phone = "Enter a valid phone number";
    if (!form.date || form.date < todayStr()) e.date = "Pick today or a later date";
    if (!form.time || form.time >= "23:00") e.time = "We close at 11 pm, pick an earlier time";
    return e;
  };

  const buildLink = (f) => {
    const lines = [
      "Hi The Irish Cafe, I'd like to reserve a table.",
      "",
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Date: ${prettyDate(f.date)}`,
      `Time: ${prettyTime(f.time)}`,
      `Guests: ${f.guests}`,
      `Seating: ${f.seating}`,
    ];
    if (f.notes.trim()) lines.push(`Notes: ${f.notes.trim()}`);
    return `${CAFE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const link = buildLink(form);
    window.open(link, "_blank", "noopener,noreferrer");
    setDone({ ...form, link });
  };

  const reset = () => {
    setDone(null);
    setForm((f) => ({ ...f, notes: "" }));
  };

  const Err = ({ k }) =>
    errors[k] ? <p className="mt-1.5 text-xs text-[#ff9b7a]">{errors[k]}</p> : null;

  return (
    <section id="reserve" className="grain bg-espresso">
      <div className="grid lg:grid-cols-2">
        {/* Photo side */}
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[680px]">
          <img src="/images/interior.jpg" alt="Cozy wooden dining room" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-espresso/60" />
          <div className="relative flex h-full min-h-[380px] flex-col justify-end p-7 sm:p-12 lg:min-h-[680px]">
            <p className="eyebrow text-gold">Reserve a table</p>
            <h2 className="mt-4 text-5xl font-normal leading-[1.05] text-cream sm:text-6xl">
              Save us <em className="text-gold">your</em> evening.
            </h2>
            <p className="mt-5 max-w-sm text-cream/80">
              Usually no wait, but we'll keep a table warm. Prefer to talk? Call{" "}
              <a href={CAFE.tel} className="underline underline-offset-4 hover:text-gold">{CAFE.phoneDisplay}</a>.
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="px-5 py-14 sm:px-12 sm:py-20">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mx-auto max-w-lg space-y-8"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="r-name" className={label}>Your name</label>
                    <input id="r-name" className={field} placeholder="Priya Kumar" value={form.name} onChange={set("name")} autoComplete="name" />
                    <Err k="name" />
                  </div>
                  <div>
                    <label htmlFor="r-phone" className={label}>Phone</label>
                    <input id="r-phone" className={field} placeholder="98XXX XXXXX" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                    <Err k="phone" />
                  </div>
                  <div>
                    <label htmlFor="r-date" className={label}>Date</label>
                    <input id="r-date" type="date" min={todayStr()} className={field} style={{ colorScheme: "dark" }} value={form.date} onChange={set("date")} />
                    <Err k="date" />
                  </div>
                  <div>
                    <label htmlFor="r-time" className={label}>Time</label>
                    <input id="r-time" type="time" className={field} style={{ colorScheme: "dark" }} value={form.time} onChange={set("time")} />
                    <Err k="time" />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <span className={label}>Guests</span>
                    <div className="mt-3 flex items-center gap-4">
                      <button type="button" onClick={() => guests(-1)} disabled={form.guests <= 1} aria-label="Fewer guests"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-[transform,border-color] duration-200 hover:border-cream active:scale-90 disabled:opacity-30">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-serif text-3xl text-cream" aria-live="polite">{form.guests}</span>
                      <button type="button" onClick={() => guests(1)} disabled={form.guests >= 40} aria-label="More guests"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-[transform,border-color] duration-200 hover:border-cream active:scale-90 disabled:opacity-30">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className={label}>Seating</span>
                    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Seating">
                      {SEATING.map((s) => {
                        const on = form.seating === s;
                        return (
                          <button key={s} type="button" role="radio" aria-checked={on}
                            onClick={() => setForm((f) => ({ ...f, seating: s }))}
                            className={`rounded-full border px-4 py-2 text-sm transition-[transform,background-color,color,border-color] duration-200 active:scale-95 ${
                              on ? "border-cream bg-cream text-espresso" : "border-cream/30 text-cream hover:border-cream/70"
                            }`}>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="r-notes" className={label}>Notes (optional)</label>
                  <input id="r-notes" maxLength={500} className={field} placeholder="Birthday, high chair, window table..." value={form.notes} onChange={set("notes")} />
                </div>

                <button type="submit" className="btn-primary w-full !py-4">Request table on WhatsApp</button>
                <p className="text-center text-xs text-cream/45">
                  This opens WhatsApp with your details filled in. Press Send there to reach us.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-lg text-cream"
                role="status"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta"><Check size={26} /></span>
                <h3 className="mt-6 font-serif text-4xl">Almost there, {done.name.trim().split(" ")[0]}.</h3>
                <p className="mt-3 text-cream/75">
                  WhatsApp should have opened with your request. <strong className="text-cream">Press Send there</strong> and we'll confirm your table.
                </p>
                <dl className="mt-8 divide-y divide-cream/10 border-y border-cream/10 text-[15px]">
                  {[
                    ["Date", prettyDate(done.date)],
                    ["Time", prettyTime(done.time)],
                    ["Guests", done.guests],
                    ["Seating", done.seating],
                    ...(done.notes.trim() ? [["Notes", done.notes.trim()]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 py-3">
                      <dt className="text-cream/55">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={done.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Open WhatsApp again</a>
                  <button onClick={reset} className="btn-ghost">New request</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}