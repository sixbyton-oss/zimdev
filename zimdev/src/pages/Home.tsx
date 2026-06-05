import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe, Code, Zap, ShieldCheck } from 'lucide-react';
import LogoSlider from '../components/LogoSlider';



declare global {
  interface Window { _zimdevAudio?: HTMLAudioElement; }
}

/* ───────────────────────────────
   RELIABLE AUDIO (stops-halfway fix)
─────────────────────────────── */
const AUDIO_URL = 'https://files.catbox.moe/7bpnco.MP3';
let globalAudio: HTMLAudioElement | null = null;
let audioStarted = false;

function startAudio() {
  if (audioStarted && globalAudio && !globalAudio.paused) return;

  if (!globalAudio) {
    globalAudio = new Audio(AUDIO_URL);
    globalAudio.loop = true;
    globalAudio.volume = 0.35;
    globalAudio.preload = 'auto';
    (window as any)._zimdevAudio = globalAudio;

    // Auto-recover if it stops midway
    globalAudio.addEventListener('stalled', () => {
      const a = globalAudio;
      if (!a) return;
      a.load();
      a.play().catch(() => {});
    });
    globalAudio.addEventListener('waiting', () => {
      if (!globalAudio) return;
      const audio2 = globalAudio;
      setTimeout(() => audio2.play().catch(() => {}), 400);
    });
    globalAudio.addEventListener('error', () => {
      const a = globalAudio;
      if (!a) return;
      a.currentTime = 0;
      a.play().catch(() => {});
    });
    globalAudio.addEventListener('pause', () => {
      const a = globalAudio;
      // Never let it stay paused on first-load
      if (!audioStarted) return;
      if (a) a.play().catch(() => {});
    });
  }

  const play = () => {
    if (globalAudio && globalAudio.paused) {
      globalAudio.play().then(() => { audioStarted = true; }).catch(() => {});
    }
  };

  // Aggressive retries for first page load
  play();
  setTimeout(play, 50);
  setTimeout(play, 300);
  setTimeout(play, 800);
  setTimeout(play, 2000);
  setTimeout(play, 4500);

  const onInteract = () => play();
  document.addEventListener('click', onInteract, { once: true });
  document.addEventListener('touchstart', onInteract, { once: true, passive: true });
}

/* ───────────────────────────────
   VANTA.BIRDS (runs across full lower half of home)
─────────────────────────────── */
let vantaBirds: any = null;
let vantaScriptsReady = false;

function startVantaBirds() {
  if (vantaBirds) return;
  if (!vantaScriptsReady) {
    // Load three.js once, then vanta.birds
    if (!(window as any).THREE) {
      const s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      s1.async = true;
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js';
        s2.async = true;
        s2.onload = () => {
          vantaScriptsReady = true;
          launchVantaBirds();
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    } else {
      // three.js already loaded — just load vanta.birds
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js';
      s.async = true;
      s.onload = () => { vantaScriptsReady = true; launchVantaBirds(); };
      document.head.appendChild(s);
    }
    return;
  }
  launchVantaBirds();
}

function launchVantaBirds() {
  if (vantaBirds) return;
  if (!(window as any).VANTA || !(window as any).THREE) return;
  try {
    const VANTA = (window as any).VANTA;
    const target = document.getElementById('birds-zone');
    vantaBirds = VANTA.BIRDS({
      el: target || document.body,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200, minWidth: 200,
      scale: 1.00, scaleMobile: 1.00,
      birdSize: 1.30,
      separation: 88, alignment: 76, cohesion: 79,
      backgroundAlpha: 0,
      color1: 0x00a3ff, // neon blue
      color2: 0xffd60a  // yellow
    });
  } catch (e) {}
}

/* ───────────────────────────────
   VANTA.GLOBE (runs in hero zone + loading screen)
─────────────────────────────── */
let vantaGlobe: any = null;
let globeScriptsReady = false;

function startVantaGlobe(targetId: string) {
  if (vantaGlobe) return;
  if (!globeScriptsReady) {
    if (!(window as any).THREE) {
      const s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      s1.async = true;
      s1.onload = () => injectGlobeScript(targetId);
      document.head.appendChild(s1);
    } else {
      injectGlobeScript(targetId);
    }
    return;
  }
  launchVantaGlobe(targetId);
}

function injectGlobeScript(targetId: string) {
  if ((window as any).VANTA && (window as any).VANTA.GLOBE) {
    globeScriptsReady = true;
    launchVantaGlobe(targetId);
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js';
  s.async = true;
  s.onload = () => { globeScriptsReady = true; launchVantaGlobe(targetId); };
  document.head.appendChild(s);
}

function launchVantaGlobe(targetId: string) {
  if (vantaGlobe) return;
  if (!(window as any).VANTA) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const VANTA = (window as any).VANTA;
    vantaGlobe = VANTA.GLOBE({
      el: target,
      mouseControls: true, touchControls: true, gyroControls: false,
      minHeight: 200, minWidth: 200,
      scale: 1.00, scaleMobile: 1.00,
      color: 0x4dabff,
      color2: 0xffffff,
      backgroundAlpha: 0,
      size: 0.7
    });
  } catch (e) {}
}

/* ───────────────────────────────
   FADE-IN ON SCROLL (agency-style reveal)
─────────────────────────────── */
function useRevealOnScroll() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ================================================================
   HOME COMPONENT
=============================================================== */
export default function Home() {
  useRevealOnScroll();

  // Start audio, globe (hero), and birds (full lower home page) on first mount
  useEffect(() => {
    startAudio();
    startVantaGlobe('hero-globe-zone');
    startVantaBirds();
  }, []);

  return (
    <div className="flex flex-col relative">

      {/* ─── HERO SECTION — VANTA.GLOBE background ─── */}
      <section className="relative overflow-hidden">
        {/* GLOBE CANVAS — fills hero */}
        <div id="hero-globe-zone" className="absolute inset-0 w-full h-full z-[1]"></div>

        <div className="relative z-10 pt-20 pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-8 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <Zap className="h-4 w-4" />
                <span>Zimbabwe's Premier Web Agency</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Build Your Dream Website with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">ZimDev</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                We create affordable, professional, and mobile-friendly websites for Zimbabwean businesses.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/packages" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                  Get Started <ChevronRight className="h-5 w-5" />
                </Link>
                <Link to="/guide" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-medium text-lg transition-all duration-300 hover:bg-slate-800 flex items-center justify-center gap-2">
                  View Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BIRDS ZONE — from features all the way to bottom of home ─── */}
      <div id="birds-zone" className="relative z-[1]">

        {/* Features */}
        <section data-reveal className="py-24 bg-slate-900/40 border-y border-cyan-900/30 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose ZimDev?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">We make getting online simple, affordable, and stress-free for local businesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { Icon: Globe,      title: 'Beginner Friendly', text: "You don't need any technical skills. We handle the design, hosting, and setup. You just tell us about your business." },
                { Icon: ShieldCheck, title: 'Secure & Fast',    text: 'All our websites are optimized for speed and include SSL certificates to keep your customers data safe.' },
                { Icon: Code,       title: 'Modern Design',     text: 'Get a premium, professional look that builds trust with your clients and works perfectly on mobile phones.' }
              ].map((card, i) => {
                const IconComponent = card.Icon;
                return (
                <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300 group">
                  <div className="h-14 w-14 bg-cyan-950 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                    <IconComponent className="h-7 w-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400">{card.text}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vanta.GLOBE middle section */}
        <section data-reveal className="relative overflow-hidden py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div id="middle-globe-zone" ref={(el) => { if (el && !(window as any)._middleGlobeStarted) { (window as any)._middleGlobeStarted = true; setTimeout(() => startVantaGlobe('middle-globe-zone'), 100); } }}
                className="h-[380px] w-full rounded-3xl border border-slate-800 shadow-[0_0_40px_rgba(6,182,212,0.08)] overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.15),rgba(59,130,246,0.05),rgba(34,211,238,0.15))] blur-2xl opacity-60 animate-pulse"></div>
                </div>
                <span className="absolute top-4 left-4 text-[10px] tracking-[4px] uppercase font-bold text-cyan-400/60 border border-cyan-500/20 rounded-full px-3 py-1 bg-slate-900/60">Live 3D Globe</span>
              </div>

              <div>
                <span className="inline-block text-[11px] tracking-[4px] font-bold text-cyan-400 uppercase mb-3">Global Reach</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                  Your Website
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Seen by the World</span>
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  We build modern, performance-driven websites designed to make your Zimbabwean business visible, memorable and professional. Beautiful design, mobile-first, lightning-fast.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { big: '24h', small: 'Avg. Delivery' },
                    { big: '100%', small: 'Mobile Ready' },
                    { big: 'SSL', small: 'Secure' }
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-4 text-center">
                      <p className="text-2xl font-extrabold text-cyan-400">{s.big}</p>
                      <p className="text-xs text-slate-400 mt-1">{s.small}</p>
                    </div>
                  ))}
                </div>
                <Link to="/packages" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all duration-300 shadow-[0_0_18px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:-translate-y-0.5">
                  Explore Packages <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Logo slider */}
        <section data-reveal className="relative py-6 overflow-hidden">
          <LogoSlider title="Featured Partners & Brands We Work With" speed={38} size="normal" />
        </section>

        {/* Packages CTA */}
        <section data-reveal className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]">Development Package</span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                Starter from just $20/yr, Classic for growing businesses at $35/yr, or go Pro with full features at $50/yr.
              </p>
              <Link to="/packages" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:-translate-y-1">
                View All Packages & Pricing <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
              {[
                { name: 'Starter', price: '$20/yr' },
                { name: 'Classic', price: '$35/yr' },
                { name: 'Pro', price: '$50/yr' }
              ].map((pkg) => (
                <div key={pkg.name} className="px-5 py-3 bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-xl flex items-baseline gap-2">
                  <span className="text-sm font-medium text-slate-200">{pkg.name}</span>
                  <span className="text-base font-extrabold text-cyan-400">{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support teaser */}
        <section data-reveal className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need Help Deciding?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Our team is ready to help you choose the right package for your business needs.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-medium transition-all hover:bg-slate-700">
              Contact Support
            </Link>
          </div>
        </section>

      </div>{/* end of birds-zone */}

      {/* Scroll-reveal styles */}
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 750ms ease, transform 750ms cubic-bezier(0.22,1,0.36,1);
          will-change: opacity, transform;
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        /* Stagger effect */
        [data-reveal]:nth-child(2) { transition-delay: 100ms; }
        [data-reveal]:nth-child(3) { transition-delay: 200ms; }
        [data-reveal]:nth-child(4) { transition-delay: 300ms; }
      `}</style>
    </div>
  );
}
