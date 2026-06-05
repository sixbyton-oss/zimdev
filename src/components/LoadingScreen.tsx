import { useState, useEffect } from 'react';

declare global {
  interface Window { _zimdevAudio?: HTMLAudioElement; _loadingGlobeStarted?: boolean; }
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Keep it simple — 6 full seconds
  const LOAD_MS = 6000;

  useEffect(() => {
    // Start the loading-screen 3D GLOBE behind "ZimDev"
    if (!(window as any)._loadingGlobeStarted) {
      (window as any)._loadingGlobeStarted = true;

      const startGlobe = () => {
        if (!(window as any).VANTA || !(window as any).THREE) return;
        try {
          (window as any).VANTA.GLOBE({
            el: document.getElementById('loading-globe'),
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200, minWidth: 200,
            scale: 1.00, scaleMobile: 1.00,
            color: 0x4dabff,
            color2: 0xffffff,
            backgroundAlpha: 0,
            size: 0.7
          });
        } catch (e) {}
      };

      // Inject three.js & vanta.globe.min.js
      if (!(window as any).THREE) {
        const s1 = document.createElement('script');
        s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        s1.async = true;
        s1.onload = () => {
          const s2 = document.createElement('script');
          s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js';
          s2.async = true;
          s2.onload = startGlobe;
          document.head.appendChild(s2);
        };
        document.head.appendChild(s1);
      } else {
        startGlobe();
      }
    }

    // Smooth progress bar — requestAnimationFrame
    const startTs = performance.now();
    const raf = () => {
      const now = performance.now();
      const pct = Math.min(100, ((now - startTs) / LOAD_MS) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Audio starts during loading
    let audio: HTMLAudioElement | null = null;
    const tryAudio = () => {
      if (!audio) {
        audio = new Audio('https://files.catbox.moe/7bpnco.MP3');
        audio.loop = true;
        audio.volume = 0.35;
        (window as any)._zimdevAudio = audio;
      }
      audio.play().catch(() => {});
    };
    tryAudio();
    setTimeout(tryAudio, 300);
    setTimeout(tryAudio, 800);
    setTimeout(tryAudio, 2000);
    document.addEventListener('click', tryAudio, { once: true });
    document.addEventListener('touchstart', tryAudio, { once: true, passive: true });

    // 6-second timer — fade out, then unmount
    const timer = setTimeout(() => {
      const loader = document.getElementById('zimdev-loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => setVisible(false), 900);
      } else {
        setVisible(false);
      }
    }, LOAD_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const pct = Math.max(0, Math.min(100, progress));

  return (
    <div
      id="zimdev-loader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
      style={{ transition: 'opacity 900ms ease-out' }}
    >
      {/* GLOBE CANVAS — behind the text */}
      <div id="loading-globe" className="absolute inset-0 w-full h-full"></div>

      {/* Radial fade for text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,6,23,0.7)_100%)]"></div>

      {/* ===================================================== */}
      {/*  ONE SINGLE HUGE GLOWING "ZIMDEV"  */}
      {/* ===================================================== */}
      <h1
        className="relative z-10 text-center select-none"
        style={{
          fontSize: 'clamp(80px, 22vw, 280px)',
          letterSpacing: '12px',
          fontWeight: 900,
          lineHeight: 1,
          color: '#f8fbff',
          textTransform: 'uppercase',
          textShadow: `
            0 0 6px rgba(34,211,238,0.95),
            0 0 16px rgba(34,211,238,0.75),
            0 0 32px rgba(34,211,238,0.6),
            0 0 64px rgba(6,182,212,0.55),
            0 0 110px rgba(6,182,212,0.45),
            0 0 160px rgba(6,182,212,0.28)
          `,
          fontFamily: 'system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif',
          animation: 'zimdev-glow 1.8s ease-in-out infinite alternate'
        }}
      >
        ZimDev
      </h1>

      {/* Small tagline under ZimDev */}
      <p
        className="relative z-10 mt-12 text-center text-sm sm:text-lg tracking-[8px] uppercase font-semibold"
        style={{ color: '#99e6ff', textShadow: '0 0 10px rgba(34,211,238,0.7)' }}
      >
        Zimbabwe&apos;s Premier Web Agency
      </p>

      {/* ────────── GREEN LIQUID PROGRESS BAR ────────── */}
      <div className="relative z-10 mt-20 w-[320px] sm:w-[460px]">
        <div
          className="relative w-full h-3 overflow-hidden rounded-full"
          style={{
            background: 'rgba(30,41,59,0.55)',
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.6), 0 0 20px rgba(6,182,212,0.08)',
            border: '1px solid rgba(34,211,238,0.18)'
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(
                90deg,
                #065f46 0%,
                #10b981 20%,
                #34d399 45%,
                #a7f3d0 55%,
                #34d399 70%,
                #10b981 100%
              )`,
              boxShadow: `
                0 0 10px rgba(16,185,129,0.55),
                0 0 22px rgba(16,185,129,0.45),
                0 0 40px rgba(52,211,153,0.35),
                inset 0 0 12px rgba(255,255,255,0.45),
                inset 0 0 6px rgba(255,255,255,0.75)
              `,
              transition: 'width 60ms linear'
            }}
          >
            <div
              className="absolute top-0 h-full w-1/3"
              style={{
                left: `${(pct * 0.85) - 33}%`,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                filter: 'blur(2px)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center text-xs font-bold tracking-widest uppercase">
          <span style={{ color: '#a7f3d0', textShadow: '0 0 6px rgba(52,211,153,0.5)' }}>
            Loading Experience
          </span>
          <span
            style={{
              color: '#d1fae5',
              textShadow: '0 0 6px rgba(52,211,153,0.6)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {Math.floor(pct)}%
          </span>
        </div>
      </div>

      {/* CSS keyframes for the ZimDev glow pulsing */}
      <style>{`
        @keyframes zimdev-glow {
          0% { filter: drop-shadow(0 0 14px rgba(34,211,238,0.55)) brightness(0.95); }
          100% { filter: drop-shadow(0 0 30px rgba(34,211,238,0.9)) brightness(1.15); }
        }
        .fade-out { opacity: 0 !important; }
      `}</style>
    </div>
  );
}
