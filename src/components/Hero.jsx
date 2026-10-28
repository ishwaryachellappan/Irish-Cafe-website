import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, Star } from "lucide-react";
import { scrollToId } from "../lib/lenis";

const LINES = [
  { text: "Fire,", cls: "text-cream" },
  { text: "flour &", cls: "italic text-gold" },
  { text: "a family", cls: "text-cream" },
  { text: "welcome.", cls: "text-terracotta" },
];

function Badge() {
  return (
    <div className="absolute -bottom-6 -left-4 h-32 w-32 sm:-left-12 sm:h-40 sm:w-40">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spinSlow" aria-hidden="true">
        <defs>
          <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-cream font-mono" style={{ fontSize: 14, letterSpacing: "0.28em" }}>
          <textPath href="#circ">453 REVIEWS · WOOD-FIRED · MADURAI ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-terracotta text-cream">
        <Star size={14} fill="currentColor" />
        <span className="font-serif text-xl leading-none">4.2</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // 3D tilt following the mouse (spring)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 14, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), spring);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-screen items-center overflow-hidden bg-espresso pb-16 pt-28"
    >
      {/* Ember glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] animate-ember rounded-full bg-terracotta/30 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow flex items-center gap-4 text-gold"
          >
            <span className="h-px w-8 bg-gold" />
            KK Nagar · Madurai · Open till 11 pm
          </motion.p>

          <h1 className="mt-7 text-[clamp(3.6rem,13vw,8.5rem)] font-light leading-[0.95] tracking-tight">
            {LINES.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className={`block ${l.cls}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-cream/75"
          >
            A cozy cafe for wood-fired pizzas, pasta and desserts worth saving room for. Pull up a chair.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button className="btn-primary" onClick={() => scrollToId("reserve")}>
              Reserve a table <ArrowDownRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => scrollToId("menu")}>
              See the menu
            </button>
          </motion.div>
        </div>

        {/* Right: arch photo */}
        <motion.div style={{ y: reduce ? 0 : parallaxY }} className="relative mx-auto w-full max-w-[440px]">
          <div
            style={{ perspective: 1000 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.3, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="arch aspect-[4/5] w-full overflow-hidden bg-[#2a211b]"
              >
                <img
                  src="/images/hero-pizza.jpg"
                  alt="Wood-fired pizza in front of the oven fire"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </motion.div>
              <Badge />
            </motion.div>
          </div>

          <span
            aria-hidden="true"
            className="eyebrow absolute -right-9 top-10 hidden text-cream/40 [writing-mode:vertical-rl] xl:block"
          >
            Karumbalai Main Rd
          </span>
        </motion.div>
      </div>
    </section>
  );
}