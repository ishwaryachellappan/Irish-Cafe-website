const WORDS = [
  "Wood-fired pizza",
  "Pasta Alfredo",
  "Lasagna",
  "Mafia Burger",
  "All you can eat",
  "Outdoor seating",
  "Private dining",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-serif text-4xl italic text-espresso sm:text-6xl">{w}</span>
          <span className="h-3 w-3 shrink-0 rounded-full bg-terracotta" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-espresso/10 bg-paper py-8" aria-label="Highlights">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </section>
  );
}