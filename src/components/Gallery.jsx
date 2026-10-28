import { motion } from "framer-motion";

const DISHES = [
  { src: "/images/gallery/1.jpg", name: "Pasta Pescatore" },
  { src: "/images/gallery/2.jpg", name: "Pasta Alfredo" },
  { src: "/images/gallery/3.jpg", name: "Lasagna" },
  { src: "/images/gallery/4.jpg", name: "Spaghetti Bolognese" },
  { src: "/images/gallery/5.jpg", name: "Mafia Burger" },
  { src: "/images/gallery/6.jpg", name: "Club Sandwich" },
  { src: "/images/gallery/7.jpg", name: "Cheesy Garlic Bread" },
  { src: "/images/gallery/8.jpg", name: "Mushroom Garden" },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function Row({ hidden = false }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {DISHES.map((d, i) => {
        const arch = i % 2 === 0;
        const low = i % 2 === 1;
        return (
          <figure key={d.name} className={`w-[260px] shrink-0 pr-6 sm:w-[340px] ${low ? "mt-14" : ""}`}>
            <div
              className={`aspect-[4/5] w-full overflow-hidden bg-cream/5 ${
                arch ? "arch" : "rounded-[28px]"
              }`}
            >
              <img
                src={d.src}
                alt={hidden ? "" : d.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline gap-3 text-cream">
              <span className="font-mono text-[11px] tracking-widest text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-lg">{d.name}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="grain overflow-hidden bg-espresso py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p {...reveal} className="eyebrow text-gold">From our kitchen</motion.p>
        <motion.h2 {...reveal} className="mt-5 text-4xl font-normal leading-[1.1] text-cream sm:text-6xl">
          Plates worth <em className="text-gold">the wait.</em>
        </motion.h2>
      </div>

      <div className="mt-14 pb-10">
        <div className="gallery-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}