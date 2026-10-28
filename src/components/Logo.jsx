export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#1C1613" />
      <circle cx="32" cy="20" r="10" fill="#C85A32" />
      <circle cx="21" cy="34" r="10" fill="#C85A32" />
      <circle cx="43" cy="34" r="10" fill="#C85A32" />
      <path d="M32 36 C32 46 30 52 26 56" stroke="#E0A96D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Logo({ tone = "light" }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className={`font-serif text-xl ${tone === "light" ? "text-cream" : "text-espresso"}`}>
        The Irish <em className="text-terracotta">Cafe</em>
      </span>
    </span>
  );
}