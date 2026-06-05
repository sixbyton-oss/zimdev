import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {

  // ── Use the EXISTING audio (created once in LoadingScreen) ──
  useEffect(() => {
    const audio = window._zimdevAudio;
    
    if (!audio) return; // No audio instance yet (shouldn't happen but safety check)

    const tryPlay = () => {
      if (audio && !audio.paused) return; // already playing
      audio.play().catch(() => {}); 
    };

    // If loading screen already played it, no-op here
    // But try once more just in case browser blocked during loading
    setTimeout(tryPlay, 100);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* ════════════════════════════════════════════════════
          MATRIX RAIN BACKGROUND EFFECT
          Slowed: 150s → 280s for subtlety
          ════════════════════════════════════════════════════ */}
      <div className="matrix-rain-bg fixed inset-0 z-0 pointer-events-none" aria-hidden="true"></div>

      {/* Background glow effects */}
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
      </div>

      {/* Main content area above all backgrounds */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* ════ MATRIX RAIN CSS STYLES ════ */}
      <style>{`
        .matrix-rain-bg,
        .matrix-rain-bg::after {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .matrix-rain-bg::after {
          content: "";
          z-index: 1;
          background-image: radial-gradient(
            ellipse 1.5px 2px at 1.5px 50%,
            #0000 0,
            #0000 90%,
            rgba(6,182,212,0.08) 100%
          );
          background-size: 25px 8px;
        }

        .matrix-rain-bg {
          --c: #22d3ee; /* cyan-400 */
          background-color: transparent;
          
          background-image:
            radial-gradient(4px 100px at 0px   235px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 235px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 117.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   252px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 252px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 126px,   var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   150px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 150px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 75px,   var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   253px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 253px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 126.5px,var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   204px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 204px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 102px,  var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   134px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 134px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 67px,   var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   179px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 179px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 89.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   299px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 299px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 149.5px,var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   215px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 215px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 107.5px,var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   281px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 281px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 140.5px,var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   158px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 158px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 79px,   var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px   210px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 210px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 105px,  var(--c) 100%, #0000 150%);

          background-size:
            300px 235px,  300px 235px,  300px 235px,
            300px 252px,  300px 252px,  300px 252px,
            300px 150px,  300px 150px,  300px 150px,
            300px 253px,  300px 253px,  300px 253px,
            300px 204px,  300px 204px,  300px 204px,
            300px 134px,  300px 134px,  300px 134px,
            300px 179px,  300px 179px,  300px 179px,
            300px 299px,  300px 299px,  300px 299px,
            300px 215px,  300px 215px,  300px 215px,
            300px 281px,  300px 281px,  300px 281px,
            300px 158px,  300px 158px,  300px 158px,
            300px 210px,  300px 210px,  300px 210px;

          /* SLOWER ANIMATION: was 150s → now 280s */
          animation: matrix-fall 280s linear infinite;
          opacity: 0.35;
        }

        @keyframes matrix-fall {
          0% {
            background-position:
              0px 220px,   3px 220px,   151.5px 337.5px,
              25px 24px,    28px 24px,    176.5px 150px,
              50px 16px,    53px 16px,    201.5px 91px,
              75px 224px,   78px 224px,   226.5px 350.5px,
              100px 19px,   103px 19px,   251.5px 121px,
              125px 120px,  128px 120px,  276.5px 187px,
              150px 31px,   153px 31px,   301.5px 120.5px,
              175px 235px,  178px 235px,  326.5px 384.5px,
              200px 121px,  203px 121px,  351.5px 228.5px,
              225px 224px,  228px 224px,  376.5px 364.5px,
              250px 26px,    253px 26px,    401.5px 105px,
              275px 75px,    278px 75px,    426.5px 180px;
          }
          to {
            background-position:
              0px 6800px,   3px 6800px,   151.5px 6917.5px,
              25px 13632px,  28px 13632px,  176.5px 13758px,
              50px 5416px,   53px 5416px,   201.5px 5491px,
              75px 17175px,  78px 17175px,  226.5px 17301.5px,
              100px 5119px,  103px 5119px,  251.5px 5221px,
              125px 8428px,  128px 8428px,  276.5px 8495px,
              150px 9876px,  153px 9876px,  301.5px 9965.5px,
              175px 13391px, 178px 13391px, 326.5px 13540.5px,
              200px 14741px, 203px 14741px, 351.5px 14848.5px,
              225px 18770px, 228px 18770px, 376.5px 18910.5px,
              250px 5082px,  253px 5082px,  401.5px 5161px,
              275px 6375px,  278px 6375px,  426.5px 6480px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .matrix-rain-bg {
            animation-duration: 0s !important;
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
