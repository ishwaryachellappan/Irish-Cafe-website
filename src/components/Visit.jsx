import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { CAFE, DIRECTIONS, MAP_EMBED, SWIGGY, ZOMATO } from "../lib/constants";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const DELIVERY = [
  { name: "Swiggy", href: SWIGGY, dot: "#FC8019" },
  { name: "Zomato", href: ZOMATO, dot: "#E23744" },
];

export default function Visit() {
  return (
    <section id="visit" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p {...reveal} className="eyebrow text-terracotta">Order in or drop by</motion.p>
        <motion.h2 {...reveal} className="mt-5 text-4xl font-normal leading-[1.1] sm:text-6xl">
          Find us in <em className="text-terracotta">KK Nagar.</em>
        </motion.h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {DELIVERY.map((d) => (
            <motion.a
              key={d.name}
              {...reveal}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[28px] bg-cream p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-espresso/10"
            >
              <span className="flex items-center gap-4">
                <span className="h-3.5 w-3.5 rounded-full" style={{ background: d.dot }} />
                <span className="font-serif text-2xl sm:text-3xl">Order on {d.name}</span>
              </span>
              <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...reveal} className="flex flex-col justify-between rounded-[28px] bg-espresso p-7 text-cream sm:p-9">
            <div className="space-y-6">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-gold" size={20} />
                <span className="text-lg leading-relaxed">{CAFE.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="shrink-0 text-gold" size={20} />
                <span><span className="text-gold">Open today</span> · Closes 11 pm</span>
              </p>
              <p className="text-sm text-cream/60">₹200–1,200 per person · Outdoor seating · Private dining room</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CAFE.tel} className="btn-primary"><Phone size={16} /> Call</a>
              <a href={CAFE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={16} /> WhatsApp</a>
              <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Navigation size={16} /> Directions</a>
            </div>
          </motion.div>

          <motion.div {...reveal} className="min-h-[360px] overflow-hidden rounded-[28px] bg-espresso/10">
            <iframe
              title="Map showing The Irish Cafe, KK Nagar, Madurai"
              src={MAP_EMBED}
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}