import Logo from "./Logo";
import { CAFE } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="grain overflow-hidden bg-espresso pt-20 text-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-serif text-[clamp(5rem,22vw,16rem)] italic leading-[0.9] text-terracotta">
          Sláinte.
        </p>

        <div className="mt-14 grid gap-10 border-t border-cream/10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">{CAFE.address}</p>
          </div>
          <div>
            <p className="eyebrow text-gold">Get in touch</p>
            <ul className="mt-4 space-y-2 text-cream/80">
              <li><a href={CAFE.tel} className="transition-colors duration-200 hover:text-gold">{CAFE.phoneDisplay}</a></li>
              <li><a href={CAFE.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-gold">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold">Hours</p>
            <p className="mt-4 text-cream/80">Open till 11 pm</p>
          </div>
        </div>

        <p className="border-t border-cream/10 py-6 text-xs text-cream/40">
          © {new Date().getFullYear()} The Irish Cafe, Madurai.
        </p>
      </div>
    </footer>
  );
}