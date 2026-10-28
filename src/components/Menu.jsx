import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MENU } from "../lib/menuData";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function DietMark({ type }) {
  const Square = ({ color, label }) => (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-cream"
      style={{ borderColor: color }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
  if (type === "veg") return <Square color="#2E7D32" label="Vegetarian" />;
  if (type === "non") return <Square color="#C62828" label="Non-vegetarian" />;
  return (
    <span className="flex gap-1">
      <Square color="#2E7D32" label="Vegetarian option" />
      <Square color="#C62828" label="Non-vegetarian option" />
    </span>
  );
}

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const current = MENU.find((c) => c.id === active);

  return (
    <section id="menu" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.p {...reveal} className="eyebrow text-terracotta">The menu</motion.p>
            <motion.h2 {...reveal} className="mt-5 text-4xl font-normal leading-[1.1] sm:text-6xl">
              From the <em>oven &amp; the pan</em>
            </motion.h2>
          </div>
          <motion.div {...reveal} className="flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2"><DietMark type="veg" /> Veg</span>
            <span className="flex items-center gap-2"><DietMark type="non" /> Non-veg</span>
          </motion.div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {MENU.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={`relative shrink-0 rounded-full border px-6 py-2.5 text-[15px] transition-colors duration-300 active:scale-95 ${
                  on ? "border-transparent text-cream" : "border-espresso/15 text-espresso hover:border-espresso/40"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="arch relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-espresso/10 lg:max-w-none">
              {MENU.map((c) => (
                <motion.img
                  key={c.id}
                  src={c.image}
                  alt={`${c.label} at The Irish Cafe`}
                  loading="lazy"
                  initial={false}
                  animate={{ opacity: c.id === active ? 1 : 0, scale: c.id === active ? 1 : 1.06 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <span className="eyebrow absolute bottom-5 left-5 rounded-full bg-cream/90 px-4 py-2 text-espresso">
                {current.label}
              </span>
            </div>
          </div>

          {/* Dish list */}
          <div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {current.items.map((item) => (
                  <li key={item.name} className="border-b border-espresso/10 py-5 first:pt-0">
                    <div className="flex items-baseline gap-3">
                      <span className="self-center"><DietMark type={item.type} /></span>
                      <h3 className="font-serif text-xl sm:text-2xl">{item.name}</h3>
                      <span className="mb-1 min-w-4 flex-1 border-b border-dotted border-espresso/30" aria-hidden="true" />
                      <span className="shrink-0 font-mono text-sm">₹{item.price}</span>
                    </div>
                    {item.desc && <p className="mt-1.5 pl-7 text-sm text-muted">{item.desc}</p>}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            {current.note && <p className="mt-5 text-sm italic text-muted">{current.note}</p>}
          </div>
        </div>

        <motion.p {...reveal} className="mt-14 text-sm text-muted">
          Prices in ₹. Ask your server for pizzas, desserts and today's specials.
        </motion.p>
      </div>
    </section>
  );
}