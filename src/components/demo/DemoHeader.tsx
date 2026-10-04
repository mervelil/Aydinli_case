import Image from "next/image";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const MenuIcon = () => (
  <svg {...iconProps}>
    <path d="M4 7h16M4 12h12M4 17h16" />
  </svg>
);
const SearchIcon = () => (
  <svg {...iconProps} width={16} height={16}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
);
const HeartIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);
const BagIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <rect x="4" y="7" width="16" height="13" rx="1.5" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);
const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
  </svg>
);

/** Demo amaçlı site header'ı (desktop ve mobil düzen Figma'ya göre). */
export function DemoHeader() {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-8">
        <button type="button" aria-label="Menü" className="text-ink">
          <MenuIcon />
        </button>
        <button type="button" aria-label="Ara" className="text-ink md:hidden">
          <SearchIcon />
        </button>

        <a href="#" className="mx-auto md:mx-0" aria-label="Ana sayfa">
          <Image src="/logo.svg" alt="" width={140} height={34} priority />
        </a>

        <label className="mx-auto hidden h-9 w-full max-w-sm items-center gap-2 rounded border border-ink/40 px-3 text-sm md:flex">
          <SearchIcon />
          <input
            type="search"
            placeholder="T-shirt, Gömlek"
            className="w-full bg-transparent outline-none placeholder:text-ink/60"
          />
        </label>

        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline">Fatih</span>
          <span className="md:hidden">
            <UserIcon />
          </span>
          <span className="hidden md:inline">
            <HeartIcon />
          </span>
          <span className="flex items-center gap-1">
            2 <BagIcon />
          </span>
        </div>
      </div>
      {/* Header altı çizgi seti */}
      <div className="h-0.5 bg-brand-red" />
      <div className="mt-0.5 h-1 bg-navy" />
    </header>
  );
}
