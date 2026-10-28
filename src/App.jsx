import { useEffect } from "react";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Amenities from "./components/Amenities";
import Reviews from "./components/Reviews";
import Reserve from "./components/Reserve";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import { setLenis } from "./lib/lenis";

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null); };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Gallery />
        <Amenities />
        <Reviews />
        <Reserve />
        <Visit />
      </main>
      <Footer />
    </>
  );
}