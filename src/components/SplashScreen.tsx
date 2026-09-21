import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // States: 'white' (Estado 1 - Inicial) | 'red' (Estado 2 - Ação de Clique) | 'fading' (Ação Final) | 'finished'
  const [splashState, setSplashState] = useState<'white' | 'red' | 'fading' | 'finished'>('white');
  
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
      // Linear interpolation (lerp) for smooth easing
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

    // Estado 2 (Ação de Clique - Imagem Vermelha):
    // Fundo muda instantaneamente para vermelho escuro, texto preto, botão inverte cores, imagens somem
    setSplashState('red');

    // Ação Final:
    // Após a mudança para o estado vermelho, fade-out revelando o conteúdo real do site
    setTimeout(() => {
      setSplashState('fading');
      setTimeout(() => {
        setSplashState('finished');
        onComplete();
      }, 750); // Duração da animação de saída (fade-out)
    }, 700); // Tempo de permanência no estado vermelho
  };

  if (splashState === 'finished') return null;

  const isRed = splashState === 'red' || splashState === 'fading';
  const isFading = splashState === 'fading';

  // Colorful abstract image blocks matching the blurred reference
  const blurredBlocks = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80', // Colorful warm art
      className: 'top-[-5%] left-[2%] w-[32vw] max-w-[380px] h-[46vh]',
      speedX: 1.3,
      speedY: 1.1
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80', // Vibrant fluid color
      className: 'top-[2%] left-[34%] w-[30vw] max-w-[360px] h-[48vh]',
      speedX: 0.7,
      speedY: 0.9
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', // Violet & pink glow
      className: 'top-[4%] right-[2%] w-[28vw] max-w-[350px] h-[42vh]',
      speedX: 1.4,
      speedY: 1.2
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', // Golden peach abstract
      className: 'top-[36%] left-[8%] w-[26vw] max-w-[320px] h-[48vh]',
      speedX: 1.5,
      speedY: 0.8
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80', // Soft pastel portraiture
      className: 'top-[34%] left-[37%] w-[28vw] max-w-[340px] h-[52vh]',
      speedX: 0.8,
      speedY: 1.3
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', // Neon magenta & cobalt
      className: 'top-[32%] right-[4%] w-[26vw] max-w-[320px] h-[50vh]',
      speedX: 1.2,
      speedY: 1.4
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', // Warm oil painting
      className: 'bottom-[-6%] left-[12%] w-[28vw] max-w-[340px] h-[35vh]',
      speedX: 1.1,
      speedY: 1.0
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', // Gentle floral lavender
      className: 'bottom-[-6%] left-[45%] w-[27vw] max-w-[330px] h-[36vh]',
      speedX: 0.6,
      speedY: 0.9
    }
  ];

  return (
    <div
      id="splash-screen-overlay"
      className={`fixed inset-0 w-screen h-screen z-[99999] flex flex-col justify-between select-none ${
        isRed ? 'bg-[#7a0909]' : 'bg-white'
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
      {/* 
        Estado 1: Imagens Abstratas Coloridas com Forte Efeito de Desfoque (Blur) e Parallax Suave.
        Estado 2: Desaparecem instantaneamente (opacity-0).
      */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-150 ${
          isRed ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {blurredBlocks.map((block) => (
          <div
            key={block.id}
            className={`absolute ${block.className} rounded-sm overflow-hidden`}
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
          <span
            className={`block w-6 h-[2px] transition-colors duration-150 ${
              isRed ? 'bg-black' : 'bg-black'
            }`}
          />
          <span
            className={`block w-6 h-[2px] transition-colors duration-150 ${
              isRed ? 'bg-black' : 'bg-black'
            }`}
          />
          <span
            className={`block w-6 h-[2px] transition-colors duration-150 ${
              isRed ? 'bg-black' : 'bg-black'
            }`}
          />
        </div>
      </header>

      {/* Center Content Section */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto my-auto space-y-5 sm:space-y-6">
        
        {/* Emblem Monogram */}
        <BrandLogo
          variant="icon"
          className="h-14 sm:h-20 w-auto mb-1 opacity-90 transition-transform duration-300"
        />

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
        <div
          className={`w-10 sm:w-12 h-[1px] my-1 transition-colors duration-150 ${
            isRed ? 'bg-black' : 'bg-neutral-300'
          }`}
        />

        {/* Subtitle in Montserrat */}
        <p
          className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-sans transition-colors duration-150 ${
            isRed ? 'text-black font-semibold' : 'text-neutral-500 font-medium'
          }`}
        >
          ZARAGOZA · ESTUDIO EN ACTUR
        </p>

        {/* CTA Button */}
        <div className="pt-3 sm:pt-4">
          <button
            id="splash-cta-btn"
            onClick={handleCtaClick}
            disabled={isRed}
            className={`px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-medium tracking-[0.2em] uppercase transition-all duration-150 cursor-pointer shadow-sm ${
              isRed
                ? 'bg-black text-white border border-black scale-[0.98]'
                : 'bg-transparent text-black border border-black hover:bg-black/5 active:scale-95'
            }`}
          >
            ENTRAR AL ESTUDIO
          </button>
        </div>
      </main>

      {/* Bottom Footer Note */}
      <footer className="relative z-20 w-full px-8 pb-8 sm:pb-10 flex items-center justify-center">
        <span
          className={`text-[10px] uppercase tracking-[0.25em] font-mono transition-colors duration-150 ${
            isRed ? 'text-black font-medium' : 'text-neutral-500'
          }`}
        >
          Zaragoza · Barrio del Actur · Aragón
        </span>
      </footer>
    </div>
  );
};
