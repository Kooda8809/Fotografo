import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // States: 'white' (Estado 1 - Inicial) | 'paint' (Estado 2 - Balde de Tinta Colorida) | 'fading' (Ação Final) | 'finished'
  const [splashState, setSplashState] = useState<'white' | 'paint' | 'fading' | 'finished'>('white');
  
  // Parallax animation state using lerp for silky smooth movement
  const mousePosRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });
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

  // Smooth lerped parallax loop
  useEffect(() => {
    if (splashState !== 'white') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePosRef.current.targetX = (e.clientX / innerWidth - 0.5) * 60;
      mousePosRef.current.targetY = (e.clientY / innerHeight - 0.5) * 60;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      mousePosRef.current.targetX = (touch.clientX / innerWidth - 0.5) * 45;
      mousePosRef.current.targetY = (touch.clientY / innerHeight - 0.5) * 45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      const p = mousePosRef.current;
      p.currentX += (p.targetX - p.currentX) * 0.08;
      p.currentY += (p.targetY - p.currentY) * 0.08;

      setRenderPos({ x: p.currentX, y: p.currentY });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [splashState]);

  const handleCtaClick = () => {
    if (splashState !== 'white') return;

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

  // Colorful abstract image blocks matching the initial blurred state
  const blurredBlocks = [
    {
      id: 1,
      src: '/images/real/session-01.webp',
      className: 'top-[-5%] left-[2%] w-[32vw] max-w-[380px] h-[46vh]',
      speedX: 1.3,
      speedY: 1.1
    },
    {
      id: 2,
      src: '/images/real/session-02.webp',
      className: 'top-[2%] left-[34%] w-[30vw] max-w-[360px] h-[48vh]',
      speedX: 0.7,
      speedY: 0.9
    },
    {
      id: 3,
      src: '/images/real/session-03.webp',
      className: 'top-[4%] right-[2%] w-[28vw] max-w-[350px] h-[42vh]',
      speedX: 1.4,
      speedY: 1.2
    },
    {
      id: 4,
      src: '/images/real/session-04.webp',
      className: 'top-[36%] left-[8%] w-[26vw] max-w-[320px] h-[48vh]',
      speedX: 1.5,
      speedY: 0.8
    },
    {
      id: 5,
      src: '/images/real/session-05.webp',
      className: 'top-[34%] left-[37%] w-[28vw] max-w-[340px] h-[52vh]',
      speedX: 0.8,
      speedY: 1.3
    },
    {
      id: 6,
      src: '/images/real/session-06.webp',
      className: 'top-[32%] right-[4%] w-[26vw] max-w-[320px] h-[50vh]',
      speedX: 1.2,
      speedY: 1.4
    },
    {
      id: 7,
      src: '/images/real/session-07.webp',
      className: 'bottom-[-6%] left-[12%] w-[28vw] max-w-[340px] h-[35vh]',
      speedX: 1.1,
      speedY: 1.0
    },
    {
      id: 8,
      src: '/images/real/session-08.webp',
      className: 'bottom-[-6%] left-[45%] w-[27vw] max-w-[330px] h-[36vh]',
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
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          }
          33% {
            transform: translate(30px, -20px) scale(1.15) rotate(40deg);
            border-radius: 58% 42% 38% 62% / 55% 65% 35% 45%;
          }
          66% {
            transform: translate(-25px, 25px) scale(0.95) rotate(-30deg);
            border-radius: 35% 65% 60% 40% / 60% 30% 70% 40%;
          }
        }

        @keyframes paintBlobWobble2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          33% {
            transform: translate(-35px, 20px) scale(1.1) rotate(-50deg);
            border-radius: 40% 60% 70% 30% / 40% 40% 60% 60%;
          }
          66% {
            transform: translate(25px, -30px) scale(1.05) rotate(35deg);
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
          }
        }

        @keyframes paintBlobWobble3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
          }
          50% {
            transform: translate(20px, 30px) scale(1.2);
            border-radius: 65% 35% 60% 40% / 50% 40% 60% 50%;
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
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="paint-bucket-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="46" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 
        ESTADO 1: Imagens Abstratas Coloridas com Forte Efeito de Desfoque (Blur) e Parallax Suave.
        Desaparecem suavemente quando o clique acontece.
      */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-200 ${
          isPaint ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {blurredBlocks.map((block) => (
          <div
            key={block.id}
            className={`absolute ${block.className} rounded-none overflow-hidden`}
            style={{
              transform: `translate3d(${renderPos.x * block.speedX}px, ${renderPos.y * block.speedY}px, 0)`,
              filter: 'blur(34px) saturate(1.4)',
              WebkitFilter: 'blur(34px) saturate(1.4)',
              willChange: 'transform'
            }}
          >
            <img
              src={block.src}
              alt=""
              className="w-full h-full object-cover brightness-100"
              loading="eager"
            />
          </div>
        ))}
        {/* Soft atmospheric white veil for pristine contrast */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[4px]" />
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
          <div className="absolute top-[8%] left-[12%] w-[48vw] h-[48vw] rounded-full bg-[#ec4899] mix-blend-multiply opacity-95 animate-paint-blob-1" />
          
          {/* Cor 2: Azul Cobalto & Ciano Elétrico */}
          <div className="absolute top-[15%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#00d2ff] mix-blend-multiply opacity-90 animate-paint-blob-2" />
          
          {/* Cor 3: Amarelo Solar & Ouro */}
          <div className="absolute bottom-[10%] left-[15%] w-[44vw] h-[44vw] rounded-full bg-[#facc15] mix-blend-multiply opacity-95 animate-paint-blob-3" />
          
          {/* Cor 4: Roxo Real / Violeta */}
          <div className="absolute bottom-[12%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#7c3aed] mix-blend-multiply opacity-90 animate-paint-blob-1" />
          
          {/* Cor 5: Laranja Tangerina Vivo */}
          <div className="absolute top-[32%] left-[28%] w-[40vw] h-[40vw] rounded-full bg-[#ff5400] mix-blend-multiply opacity-90 animate-paint-blob-2" />
          
          {/* Cor 6: Verde Esmeralda & Menta */}
          <div className="absolute top-[36%] right-[25%] w-[38vw] h-[38vw] rounded-full bg-[#10b981] mix-blend-multiply opacity-90 animate-paint-blob-3" />
          
          {/* Cor 7: Vermelho Coral & Carmim (no centro como gota principal) */}
          <div className="absolute top-[24%] left-[22%] w-[54vw] h-[54vw] rounded-full bg-[#e11d48] mix-blend-multiply opacity-85 animate-paint-blob-1" />

          {/* Cor 8: Turquesa Tropical */}
          <div className="absolute bottom-[28%] left-[35%] w-[42vw] h-[42vw] rounded-full bg-[#06b6d4] mix-blend-multiply opacity-90 animate-paint-blob-2" />
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
        <div
          className="flex flex-col gap-1.5 cursor-pointer p-2 transition-colors duration-150"
          aria-label="Menu"
        >
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
          <span className="block w-6 h-[2px] bg-black transition-colors duration-150" />
        </div>
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

