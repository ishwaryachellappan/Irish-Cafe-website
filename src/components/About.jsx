import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "4.2★", label: "on Google" },
  { value: "₹200–1,200", label: "per person" },
  { value: "20m–2h", label: "typical visit" },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const fade = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="hearth" ref={ref} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative pb-12">
          <motion.div style={{ y }} className="arch aspect-[4/5] w-full max-w-md overflow-hidden bg-paper">
            <img src="/images/oven-fire.jpg" alt="Flames inside the wood-fired oven" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            {...fade}
            className="absolute -bottom-2 right-0 w-40 overflow-hidden rounded-[28px] border-4 border-cream shadow-xl sm:right-8 sm:w-52"
          >
            <img src="/images/interior.jpg" alt="Cozy wooden dining room" className="aspect-square w-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        <div>
          <motion.p {...fade} className="eyebrow text-terracotta">The hearth</motion.p>
          <motion.h2 {...fade} className="mt-5 text-4xl font-normal leading-[1.1] sm:text-5xl">
            Italian at heart, <em className="text-terracotta">Madurai</em> by nature.
          </motion.h2>
          <motion.p {...fade} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Guests come for the wood-fired pizzas, pasta and desserts. They stay for a room that feels cozy and inviting, honest value, and a team that treats the table like family.
          </motion.p>
          <motion.dl {...fade} className="mt-10 grid grid-cols-3 gap-4 border-t border-espresso/15 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-2xl sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}