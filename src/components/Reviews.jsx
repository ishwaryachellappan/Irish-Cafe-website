import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const QUOTES = [
  { text: "Order a white sauce pasta, BBQ chicken and irish breakfast pizza.", dark: false, offset: "" },
  { text: "The restaurant staff and manager also treated us like family.", dark: true, offset: "md:ml-14" },
  { text: "They serve some fine quality Italian and continental food.", dark: false, offset: "md:mr-14" },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <motion.p {...reveal} className="eyebrow text-terracotta">What guests say</motion.p>
          <motion.p {...reveal} className="mt-4 font-serif text-[clamp(7rem,18vw,11rem)] font-light leading-none">
            4.2
          </motion.p>
          <motion.div {...reveal} className="mt-2 flex gap-1 text-terracotta" aria-label="4.2 out of 5 stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={20} fill={n <= 4 ? "currentColor" : "none"} />
            ))}
          </motion.div>
          <motion.p {...reveal} className="mt-3 text-muted">453 reviews on Google</motion.p>
          <motion.p {...reveal} className="mt-8 max-w-sm border-l-2 border-terracotta pl-5 text-[15px] leading-relaxed text-muted">
            Diners like the Italian and American dishes, the cozy atmosphere, good value and friendly staff. Some mention service can be slow.
          </motion.p>
        </div>

        <div className="space-y-5">
          {QUOTES.map((q) => (
            <motion.figure
              key={q.text}
              {...reveal}
              className={`rounded-[28px] p-8 sm:p-10 ${q.offset} ${
                q.dark ? "bg-espresso text-cream" : "bg-paper text-espresso"
              }`}
            >
              <Quote size={28} className={q.dark ? "text-gold" : "text-terracotta"} />
              <blockquote className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">
                “{q.text}”
              </blockquote>
              <figcaption className="eyebrow mt-6 opacity-60">Google review</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}