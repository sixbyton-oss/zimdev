/* 
   LOGO SLIDER — Text-pill brand slider (no images needed)
   Smooth left-scrolling infinite carousel of featured partners
   ZimDev dark-neon blue theme
*/

interface Brand {
  name: string;
  tagline?: string;
  color: string;      // Tailwind text/color class
  bg: string;         // Tailwind background class
  border: string;     // Tailwind border class
}

// Brand list — clean text-pill style (no images to break on deploy)
const BRANDS: Brand[] = [
  { name: 'ZimDev',           tagline: 'Your Partner', color: 'text-cyan-200',      bg: 'bg-cyan-950/50',    border: 'border-cyan-700/60' },
  { name: 'EcoCash',          tagline: 'Mobile Money', color: 'text-blue-200',      bg: 'bg-blue-950/50',    border: 'border-blue-700/60' },
  { name: 'InnBucks',         tagline: 'Digital Wallet', color: 'text-purple-200',    bg: 'bg-purple-950/50',  border: 'border-purple-700/60' },
  { name: 'Visa',              tagline: 'Card Payments', color: 'text-sky-200',       bg: 'bg-sky-950/50',     border: 'border-sky-700/60' },
  { name: 'Mastercard',        tagline: 'Card Payments', color: 'text-orange-200',    bg: 'bg-orange-950/50',  border: 'border-orange-700/60' },
  { name: 'Spaceship',         tagline: 'Hosting',        color: 'text-indigo-200',    bg: 'bg-indigo-950/50',   border: 'border-indigo-700/60' },
  { name: 'Almobak Resources', tagline: 'Mining Group',   color: 'text-amber-200',     bg: 'bg-amber-950/50',    border: 'border-amber-700/60' },
  { name: 'Crypto Maker',      tagline: 'Web3 Projects', color: 'text-yellow-200',    bg: 'bg-yellow-950/40',  border: 'border-yellow-700/40' },
  { name: 'Tech God',          tagline: 'AI & ML Labs',  color: 'text-fuchsia-200',   bg: 'bg-fuchsia-950/40', border: 'border-fuchsia-700/40' },
  { name: 'BrenalDMedia',      tagline: 'Video & Dev',   color: 'text-emerald-200',   bg: 'bg-emerald-950/50', border: 'border-emerald-700/60' }
];

interface Props {
  title?: string;
  speed?: number;  // seconds per loop (smaller = faster)
  size?: 'compact' | 'normal' | 'large';
}

export default function LogoSlider({
  title = 'Featured Partners & Brands We Work With',
  speed = 35,
  size = 'normal'
}: Props) {

  // Size mapping
  const heightMap: Record<string, string> = {
    compact: 'py-4 text-sm',
    normal:  'py-6 text-base',
    large:   'py-8 text-lg'
  };
  const brandPadding: Record<string, string> = {
    compact: 'px-4 py-2',
    normal:  'px-6 py-3',
    large:   'px-8 py-4'
  };

  // Duplicate brands so CSS -50% loop is seamless
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <div className="relative w-full overflow-hidden py-5">
      
      {/* Label (optional) */}
      {title && (
        <div className="flex justify-center mb-1">
          <span className="text-[11px] sm:text-xs font-bold tracking-[4px] uppercase text-slate-400 relative inline-flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></span>
            {title}
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></span>
          </span>
        </div>
      )}

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-20"></div>

      {/* Scrolling track — always moving, smooth, linear, no jerks */}
      <div
        className={`flex gap-5 ${heightMap[size]} whitespace-nowrap will-change-transform`}
        style={{
          width: 'max-content',
          animation: `brand-scroll ${speed}s linear infinite`,
        }}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className={`shrink-0 rounded-2xl border-2 ${brand.border} ${brand.bg} ${brandPadding[size]} shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-[1.04] hover:shadow-[0_4px_18px_rgba(6,182,212,0.18)]`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold ${brand.color}`}>{brand.name}</span>
              {brand.tagline && (
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">• {brand.tagline}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes brand-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        /* Pause very very slightly on hover — pleasant, not intrusive */
        [class*="brand-scroll"]:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          [class*="brand-scroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
