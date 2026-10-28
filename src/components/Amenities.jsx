import { motion } from "framer-motion";
import { BadgePercent, DoorOpen, Sun, UtensilsCrossed } from "lucide-react";
import { scrollToId } from "../lib/lenis";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const card =
  "relative overflow-hidden rounded-[28px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40";

export default function Amenities() {
  return (
    <section className="grain bg-espresso pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p {...reveal} className="eyebrow text-gold">Good to know</motion.p>
        <motion.h2 {...reveal} className="mt-5 text-4xl font-normal leading-[1.1] text-cream sm:text-6xl">
          Come hungry, stay <em className="text-gold">a while.</em>
        </motion.h2>

        <div className="mt-14 grid auto-rows-[260px] grid-cols-1 gap-5 md:grid-cols-12">
          {/* Offer */}
          <motion.div
            {...reveal}
            className={`${card} bg-terracotta text-cream md:col-span-7 md:row-span-2 min-h-[520px]`}
          >
            <div className="relative z-10 flex h-full max-w-[60%] flex-col justify-between p-7 sm:p-9">
              <span className="eyebrow w-fit rounded-full border border-cream/40 px-3 py-1.5">Dining offer</span>
              <div>
                <BadgePercent size={30} />
                <p className="mt-3 font-serif text-[clamp(4.5rem,11vw,7.5rem)] leading-none">
                  20<span className="text-[0.6em]">%</span>
                  <span className="ml-1 align-top font-serif text-2xl italic">off</span>
                </p>
                <p className="mt-4 text-[15px] text-cream/90">Flat 20% off on dining.</p>
                <button
                  onClick={() => scrollToId("reserve")}
                  className="btn mt-5 bg-espresso text-cream hover:bg-black"
                >
                  Book a table
                </button>
              </div>
            </div>
            <div className="absolute -bottom-16 -right-24 h-[340px] w-[340px] overflow-hidden rounded-full sm:h-[420px] sm:w-[420px]">
              <img src="/images/hero-pizza.jpg" alt="Wood-fired pizza" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          {/* All you can eat */}
          <motion.div {...reveal} className={`${card} flex flex-col justify-between bg-paper p-7 text-espresso md:col-span-5`}>
            <UtensilsCrossed size={30} className="text-terracotta" />
            <div>
              <h3 className="font-serif text-3xl">All you can eat</h3>
              <p className="mt-2 text-muted">Bring the appetite.</p>
            </div>
          </motion.div>

          {/* Outdoor */}
          <motion.div {...reveal} className={`${card} bg-[#2a211b] md:col-span-5`}>
            <img src="/images/outdoor.jpg" alt="Outdoor seating under string lights" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 flex h-full flex-col justify-between p-7 text-cream">
              <Sun size={28} className="text-gold" />
              <div>
                <h3 className="font-serif text-3xl">Outdoor seating</h3>
                <p className="mt-2 text-cream/80">Eat in the open air.</p>
              </div>
            </div>
          </motion.div>

          {/* Private dining */}
          <motion.div {...reveal} className={`${card} bg-[#2a211b] md:col-span-12`}>
            <img src="/images/private-dining.jpg" alt="Private dining room" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col justify-end p-7 text-cream sm:p-9">
              <DoorOpen size={28} className="mb-3 text-gold" />
              <h3 className="font-serif text-3xl sm:text-4xl">Private dining room</h3>
              <p className="mt-2 max-w-md text-cream/80">A room of your own for the table.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}