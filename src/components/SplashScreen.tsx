import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onComplete: () => void;
  onStartTransition?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, onStartTransition }) => {
  // States: 'white' (Estado 1 - Inicial) | 'paint' (Estado 2 - Balde de Tinta Colorida) | 'fading' (Ação Final) | 'finished'
  const [splashState, setSplashState] = useState<'white' | 'paint' | 'fading' | 'finished'>('white');
  
  // Parallax animation state using direct DOM transform to eliminate 60fps React re-renders
  const mousePosRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const containerParallaxRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Lock body scroll and prevent any scroll while splash screen is active
  useEffect(() => {
    if (splashState !== 'finished') {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [splashState]);

  // Smooth lerped parallax loop - only on desktop pointer devices
  useEffect(() => {
    if (splashState !== 'white') return;

    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        (window.matchMedia && window.matchMedia('(max-width: 767px)').matches));

    if (isTouch) return; // Save 100% CPU on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      mousePosRef.current.targetX = (e.clientX / w - 0.5) * 45;
      mousePosRef.current.targetY = (e.clientY / h - 0.5) * 45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      const p = mousePosRef.current;
      p.currentX += (p.targetX - p.currentX) * 0.08;
      p.currentY += (p.targetY - p.currentY) * 0.08;

      if (containerParallaxRef.current) {
        containerParallaxRef.current.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px, 0)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [splashState]);

  const handleCtaClick = () => {
    if (splashState !== 'white') return;

    // Immediately trigger mounting background route components so they render during transition
    onStartTransition?.();

    // Estado 2 (Ação de Clique - Balde de Tinta Colorida):
    // As cores se misturam como tintas líquidas derramadas em um balde
    setSplashState('paint');

    // Ação Final:
    // Após admirar o mix de cores, fade-out suave revelando o site
    setTimeout(() => {
      setSplashState('fading');
      setTimeout(() => {
        setSplashState('finished');
        onComplete();
      }, 750); // Duração da animação de saída (fade-out)
    }, 1000); // Tempo de permanência do balde de tinta líquida
  };

  if (splashState === 'finished') return null;

  const isPaint = splashState === 'paint' || splashState === 'fading';
  const isFading = splashState === 'fading';

  // Colorful abstract image blocks with harmonious mobile-first & desktop positioning
  const blurredBlocks = [
    {
      id: 1,
      src: '/images/splash/splash-01.webp',
      className: 'top-[-4%] left-[-4%] w-[52vw] h-[34vh] sm:top-[-5%] sm:left-[2%] sm:w-[32vw] sm:max-w-[380px] sm:h-[46vh]',
      speedX: 1.3,
      speedY: 1.1
    },
    {
      id: 2,
      src: '/images/splash/splash-02.webp',
      className: 'top-[-3%] right-[-4%] w-[52vw] h-[36vh] sm:top-[2%] sm:left-[34%] sm:w-[30vw] sm:max-w-[360px] sm:h-[48vh]',
      speedX: 0.7,
      speedY: 0.9
    },
    {
      id: 3,
      src: '/images/splash/splash-03.webp',
      className: 'top-[26%] left-[-5%] w-[48vw] h-[34vh] sm:top-[4%] sm:right-[2%] sm:w-[28vw] sm:max-w-[350px] sm:h-[42vh]',
      speedX: 1.4,
      speedY: 1.2
    },
    {
      id: 4,
      src: '/images/splash/splash-04.webp',
      className: 'top-[25%] right-[-5%] w-[48vw] h-[35vh] sm:top-[36%] sm:left-[8%] sm:w-[26vw] sm:max-w-[320px] sm:h-[48vh]',
      speedX: 1.5,
      speedY: 0.8
    },
    {
      id: 5,
      src: '/images/splash/splash-05.webp',
      className: 'top-[52%] left-[-4%] w-[50vw] h-[32vh] sm:top-[34%] sm:left-[37%] sm:w-[28vw] sm:max-w-[340px] sm:h-[52vh]',
      speedX: 0.8,
      speedY: 1.3
    },
    {
      id: 6,
      src: '/images/splash/splash-06.webp',
      className: 'top-[50%] right-[-4%] w-[50vw] h-[32vh] sm:top-[32%] sm:right-[4%] sm:w-[26vw] sm:max-w-[320px] sm:h-[50vh]',
      speedX: 1.2,
      speedY: 1.4
    },
    {
      id: 7,
      src: '/images/splash/splash-07.webp',
      className: 'bottom-[-5%] left-[-4%] w-[52vw] h-[30vh] sm:bottom-[-6%] sm:left-[12%] sm:w-[28vw] sm:max-w-[340px] sm:h-[35vh]',
      speedX: 1.1,
      speedY: 1.0
    },
    {
      id: 8,
      src: '/images/splash/splash-08.webp',
      className: 'bottom-[-5%] right-[-4%] w-[52vw] h-[30vh] sm:bottom-[-6%] sm:left-[45%] sm:w-[27vw] sm:max-w-[330px] sm:h-[36vh]',
      speedX: 0.6,
      speedY: 0.9
    }
  ];

  return (
    <div
      id="splash-screen-overlay"
      className={`fixed inset-0 w-screen h-screen z-[99999] flex flex-col justify-between select-none overflow-hidden ${
        isPaint ? 'bg-[#fffaf0]' : 'bg-white'
      } ${
        isFading
          ? 'opacity-0 transition-opacity duration-750 ease-out pointer-events-none'
          : 'opacity-100'
      }`}
      style={{
        width: '100vw',
        height: '100vh',
        touchAction: 'none'
      }}
    >
      {/* Scoped CSS animations for the colorful paint bucket swirl */}
      <style>{`
        @keyframes paintBucketSwirl {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.12);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes paintBlobWobble1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate3d(30px, -20px, 0) scale(1.15) rotate(40deg);
          }
          66% {
            transform: translate3d(-25px, 25px, 0) scale(0.95) rotate(-30deg);
          }
        }

        @keyframes paintBlobWobble2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate3d(-35px, 20px, 0) scale(1.1) rotate(-50deg);
          }
          66% {
            transform: translate3d(25px, -30px, 0) scale(1.05) rotate(35deg);
          }
        }

        @keyframes paintBlobWobble3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, 30px, 0) scale(1.2);
          }
        }

        @keyframes paintBurstZoom {
          0% {
            transform: scale(0.35);
            opacity: 0;
          }
          60% {
            transform: scale(1.04);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-paint-swirl {
          animation: paintBucketSwirl 16s linear infinite;
        }

        .animate-paint-blob-1 {
          animation: paintBlobWobble1 7s ease-in-out infinite;
        }

        .animate-paint-blob-2 {
          animation: paintBlobWobble2 8s ease-in-out infinite;
        }

        .animate-paint-blob-3 {
          animation: paintBlobWobble3 6s ease-in-out infinite;
        }

        .animate-paint-burst {
          animation: paintBurstZoom 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* SVG Liquid Filter for organic marbled paint distortion */}
      {isPaint && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <filter id="paint-bucket-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="46" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}

      {/* 
        ESTADO 1: Imagens Abstratas Coloridas com Forte Efeito de Desfoque (Blur) e Parallax Suave.
        Desaparecem suavemente quando o clique acontece.
      */}
      <div
        ref={containerParallaxRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-200 will-change-transform ${
          isPaint ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {blurredBlocks.map((block) => (
          <div
            key={block.id}
            className={`absolute ${block.className} rounded-none overflow-hidden`}
            style={{
              filter: 'blur(30px) saturate(1.3)',
              WebkitFilter: 'blur(30px) saturate(1.3)',
            }}
          >
            <img
              src={block.src}
              alt=""
              width={220}
              height={275}
              className="w-full h-full object-cover brightness-100"
              loading="eager"
              decoding="async"
              fetchPriority={(block.id === 1 || block.id === 2 || block.id === 4) ? 'high' : 'auto'}
            />
          </div>
        ))}
        {/* Soft atmospheric white veil for pristine contrast without stacked backdrop blur */}
        <div className="absolute inset-0 bg-white/40" />
      </div>

      {/* 
        ESTADO 2: BALDE DE TINTA COLORIDA (Colorful Liquid Paint Bucket Pour & Swirl)
        Uma explosão rica de tintas acrílicas líquidas e cores vibrantes misturando-se
      */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
          isPaint ? 'opacity-100 animate-paint-burst' : 'opacity-0'
        }`}
      >
        {/* Base multi-color radiant background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #fef08a 0%, #f472b6 28%, #818cf8 56%, #34d399 78%, #fb923c 100%)'
          }}
        />

        {/* Swirling Liquid Paint Streams with organic turbulence filter */}
        <div
          className="absolute inset-[-25%] w-[150%] h-[150%] animate-paint-swirl"
          style={{
            filter: 'url(#paint-bucket-filter) blur(24px) contrast(1.45) saturate(1.9)',
            WebkitFilter: 'url(#paint-bucket-filter) blur(24px) contrast(1.45) saturate(1.9)'
          }}
        >
          {/* Cor 1: Magenta / Rosa Choque */}
          <div className="absolute top-[8%] left-[12%] w-[55vmin] h-[55vmin] sm:w-[48vw] sm:h-[48vw] rounded-full bg-[#ec4899] mix-blend-multiply opacity-95 animate-paint-blob-1" />
          
          {/* Cor 2: Azul Cobalto & Ciano Elétrico */}
          <div className="absolute top-[15%] right-[10%] w-[52vmin] h-[52vmin] sm:w-[45vw] sm:h-[45vw] rounded-full bg-[#00d2ff] mix-blend-multiply opacity-90 animate-paint-blob-2" />
          
          {/* Cor 3: Amarelo Solar & Ouro */}
          <div className="absolute bottom-[10%] left-[15%] w-[52vmin] h-[52vmin] sm:w-[44vw] sm:h-[44vw] rounded-full bg-[#facc15] mix-blend-multiply opacity-95 animate-paint-blob-3" />
          
          {/* Cor 4: Roxo Real / Violeta */}
          <div className="absolute bottom-[12%] right-[15%] w-[56vmin] h-[56vmin] sm:w-[50vw] sm:h-[50vw] rounded-full bg-[#7c3aed] mix-blend-multiply opacity-90 animate-paint-blob-1" />
          
          {/* Cor 5: Laranja Tangerina Vivo */}
          <div className="absolute top-[32%] left-[28%] w-[48vmin] h-[48vmin] sm:w-[40vw] sm:h-[40vw] rounded-full bg-[#ff5400] mix-blend-multiply opacity-90 animate-paint-blob-2" />
          
          {/* Cor 6: Verde Esmeralda & Menta */}
          <div className="absolute top-[36%] right-[25%] w-[46vmin] h-[46vmin] sm:w-[38vw] sm:h-[38vw] rounded-full bg-[#10b981] mix-blend-multiply opacity-90 animate-paint-blob-3" />
          
          {/* Cor 7: Vermelho Coral & Carmim (no centro como gota principal) */}
          <div className="absolute top-[24%] left-[22%] w-[60vmin] h-[60vmin] sm:w-[54vw] sm:h-[54vw] rounded-full bg-[#e11d48] mix-blend-multiply opacity-85 animate-paint-blob-1" />

          {/* Cor 8: Turquesa Tropical */}
          <div className="absolute bottom-[28%] left-[35%] w-[50vmin] h-[50vmin] sm:w-[42vw] sm:h-[42vw] rounded-full bg-[#06b6d4] mix-blend-multiply opacity-90 animate-paint-blob-2" />
        </div>

        {/* Conic marble paint swirl for authentic vortex mixing texture */}
        <div
          className="absolute inset-0 opacity-45 mix-blend-overlay animate-paint-swirl"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #ff0077 0deg, #ff9900 60deg, #ffee00 120deg, #00ff88 180deg, #00d4ff 240deg, #7c3aed 300deg, #ff0077 360deg)',
            filter: 'blur(30px) saturate(2)'
          }}
        />

        {/* Glossy liquid acrylic sheen highlight */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-8 sm:px-14 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex items-center">
          <BrandLogo className="h-9 sm:h-11 w-auto" />
        </div>

        {/* 3-bar hamburger icon */}
        <button
          type="button"
          className="flex flex-col gap-1.5 cursor-pointer p-2 transition-colors duration-150 border-0 bg-transparent"
          aria-label="Menú de navegación"
        >
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
        </button>
      </header>

      {/* Center Content Section - Clean, without white card window and without center logo */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto my-auto space-y-5 sm:space-y-6 bg-transparent select-none">
        {/* Main Hero Title - Harmonized with Hero (Cormorant Garamond) */}
        <h1
          className="font-serif font-normal tracking-tight text-black text-center leading-[0.92] select-none transition-colors duration-150"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7.5rem)'
          }}
        >
          Carlota Lagunas
          <span className="block font-serif text-[0.42em] sm:text-[0.45em] font-light italic tracking-normal text-neutral-600 mt-1">
            Fotografía Infantil & Familiar
          </span>
        </h1>

        {/* Thin Divider Line */}
        <div className="w-10 sm:w-12 h-[1px] my-1 bg-neutral-300 transition-colors duration-150" />

        {/* Subtitle in Montserrat */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-sans text-neutral-700 font-medium transition-colors duration-150">
          ZARAGOZA · ESTUDIO EN ACTUR
        </p>

        {/* CTA Button */}
        <div className="pt-3 sm:pt-4">
          <button
            id="splash-cta-btn"
            onClick={handleCtaClick}
            disabled={isPaint}
            className={`px-10 sm:px-14 py-3.5 sm:py-4 rounded-none text-xs sm:text-sm font-sans font-medium tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-sm ${
              isPaint
                ? 'bg-black text-white border border-black scale-[0.98] shadow-xl'
                : 'bg-transparent text-black border border-black hover:bg-black/5 active:scale-95'
            }`}
          >
            ENTRAR AL ESTUDIO
          </button>
        </div>
      </main>

      {/* Bottom Footer Note */}
      <footer className="relative z-20 w-full px-8 pb-8 sm:pb-10 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-600 font-medium transition-colors duration-150">
          Zaragoza · Barrio del Actur · Aragón
        </span>
      </footer>
    </div>
  );
};

