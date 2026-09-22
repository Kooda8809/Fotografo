import React, { useState, useRef } from 'react';
import { LegalDocType } from './LegalModal';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (type: LegalDocType) => void;
  onReplaySplash?: () => void;
}

interface FooterNavItem {
  id: string;
  label: string;
  image: string;
  tag: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onReplaySplash }) => {
  const [hoveredItem, setHoveredItem] = useState<FooterNavItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);

  const quickLinks: FooterNavItem[] = [
    {
      id: 'portfolio',
      label: 'Galería',
      image: '/images/real/session-10.webp',
      tag: 'Galería & Reportajes en Zaragoza'
    },
    {
      id: 'servicios',
      label: 'Especialidades',
      image: '/images/real/session-22.webp',
      tag: 'Newborn, Embarazo, Smash Cake, Familia'
    },
    {
      id: 'precios',
      label: 'Tarifas',
      image: '/images/real/session-32.webp',
      tag: 'Packs digitales, madera y álbumes'
    },
    {
      id: 'regalar-sesion',
      label: 'Tarjetas Regalo',
      image: '/images/real/session-real-008.webp',
      tag: 'El regalo que dura para siempre'
    },
    {
      id: 'sobre-mi',
      label: 'Sobre Mí',
      image: '/images/real/carlota-perfil.webp',
      tag: 'Conoce a Carlota Lagunas'
    },
    {
      id: 'contacto',
      label: 'Contacto',
      image: '/images/real/session-15.webp',
      tag: 'Estudio en Actur, Zaragoza'
    }
  ];

  // Mouse tracking within footer for floating thumbnail preview
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <footer
      ref={footerRef}
      id="main-footer"
      onMouseMove={handleMouseMove}
      className="relative bg-white text-black border-t border-neutral-200/90 pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden select-none"
      aria-label="Pie de página de navegación"
    >
      {/* FLOATING PREVIEW IMAGE ON HOVER */}
      {hoveredItem && (
        <div
          className="pointer-events-none hidden md:block z-30 transition-all duration-150 ease-out"
          style={{
            left: `${Math.min(mousePos.x + 28, 920)}px`,
            top: `${Math.max(mousePos.y - 120, 20)}px`,
            position: 'absolute'
          }}
        >
          <div className="relative w-64 aspect-[16/11] rounded-none overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <img
              src={hoveredItem.image}
              alt={hoveredItem.label}
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                {hoveredItem.label}
              </span>
              <span className="text-xs font-sans font-medium line-clamp-1 text-white/95">
                {hoveredItem.tag}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* FOOTER TOP: BRAND LOGO ON LEFT + 4 COLUMNS TO THE RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 sm:pb-24 items-start">
          
          {/* BRAND LOGO COLUMN (LEFT) */}
          <div className="lg:col-span-3 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="group text-left focus:outline-none cursor-pointer block"
              aria-label="Ir al inicio"
            >
              <BrandLogo className="h-10 sm:h-12 w-auto max-w-[190px] object-contain group-hover:opacity-80 transition-opacity" />
            </button>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs">
              Fotografía infantil, recién nacidos y familia en Zaragoza. Sesiones cuidadas y sin prisas en el Barrio del Actur.
            </p>
          </div>

          {/* 4 COLUMNS: LOCATION, GALLERY, CONTACT, LEGAL */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            
            {/* COLUMN 1: LOCATION */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 font-medium">
                UBICACIÓN
              </h4>
              <div className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed space-y-1">
                <p className="font-medium text-black">Zaragoza, Aragón</p>
                <p>C/ Rosalía de Castro, 15</p>
                <p className="text-neutral-500">Actur · España</p>
              </div>
            </div>

            {/* COLUMN 2: GALLERY (WITH PRESERVED THUMBNAIL HOVER) */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 font-medium">
                SECCIONES
              </h4>
              <nav className="flex flex-col space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    onMouseEnter={() => setHoveredItem(link)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group text-left text-xs sm:text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none w-fit"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-black" />
                  </button>
                ))}
              </nav>
            </div>

            {/* COLUMN 3: CONTACT */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 font-medium">
                CONTACTO
              </h4>
              <div className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed space-y-2">
                <a
                  href="mailto:info@carlotalagunas.com"
                  className="block text-neutral-700 hover:text-black transition-colors break-all"
                >
                  info@carlotalagunas.com
                </a>
                <a
                  href="https://wa.me/34687707029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-neutral-700 hover:text-black transition-colors"
                >
                  +34 687 707 029
                </a>
                <a
                  href="https://www.instagram.com/carlotalagunasfotografia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-neutral-500 hover:text-black transition-colors"
                >
                  @carlotalagunasfotografia
                </a>
              </div>
            </div>

            {/* COLUMN 4: LEGAL */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 font-medium">
                LEGAL
              </h4>
              <div className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed space-y-2">
                <p className="text-neutral-500">
                  © 2026 Todos los derechos reservados
                </p>
                <div className="flex flex-col space-y-1.5 pt-1">
                  <button
                    onClick={() => onOpenLegal('privacidad')}
                    className="text-left text-neutral-600 hover:text-black transition-colors cursor-pointer w-fit"
                  >
                    Privacidad
                  </button>
                  <button
                    onClick={() => onOpenLegal('cookies')}
                    className="text-left text-neutral-600 hover:text-black transition-colors cursor-pointer w-fit"
                  >
                    Cookies
                  </button>
                  <button
                    onClick={() => onOpenLegal('aviso')}
                    className="text-left text-neutral-600 hover:text-black transition-colors cursor-pointer w-fit"
                  >
                    Aviso Legal
                  </button>
                  {onReplaySplash && (
                    <button
                      onClick={onReplaySplash}
                      className="text-left text-neutral-400 hover:text-black transition-colors cursor-pointer w-fit underline underline-offset-4 pt-1"
                    >
                      Ver Splash
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* GIANT INFINITE SLOW MARQUEE SIGNATURE (GLIDING TO THE LEFT) */}
      <div className="w-full border-t border-neutral-200/80 pt-4 sm:pt-6 overflow-hidden select-none whitespace-nowrap">
        <style>{`
          @keyframes footerMarqueeGlide {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .footer-marquee-track {
            display: flex !important;
            width: max-content !important;
            animation: footerMarqueeGlide 25s linear infinite !important;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .footer-marquee-track {
              animation: footerMarqueeGlide 25s linear infinite !important;
            }
          }
        `}</style>
        <a
          href="https://www.instagram.com/carlotalagunasfotografia/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden py-1 cursor-pointer"
          aria-label="Instagram @carlotalagunasfotografia"
        >
          <div className="footer-marquee-track flex items-center">
            {/* Loop Segment 1 */}
            <div className="flex items-center shrink-0">
              <span className="font-sans font-black tracking-tighter text-[11vw] sm:text-[12.5vw] leading-none text-black block uppercase pr-8 sm:pr-14 group-hover:text-neutral-700 transition-colors">
                @CARLOTALAGUNAS
              </span>
              <span className="text-[6vw] font-serif text-neutral-300 font-light pr-8 sm:pr-14">
                ✦
              </span>
              <span className="font-sans font-black tracking-tighter text-[11vw] sm:text-[12.5vw] leading-none text-black block uppercase pr-8 sm:pr-14 group-hover:text-neutral-700 transition-colors">
                @CARLOTALAGUNAS
              </span>
              <span className="text-[6vw] font-serif text-neutral-300 font-light pr-8 sm:pr-14">
                ✦
              </span>
            </div>

            {/* Loop Segment 2 (Identical clone for continuous seamless loop) */}
            <div className="flex items-center shrink-0">
              <span className="font-sans font-black tracking-tighter text-[11vw] sm:text-[12.5vw] leading-none text-black block uppercase pr-8 sm:pr-14 group-hover:text-neutral-700 transition-colors">
                @CARLOTALAGUNAS
              </span>
              <span className="text-[6vw] font-serif text-neutral-300 font-light pr-8 sm:pr-14">
                ✦
              </span>
              <span className="font-sans font-black tracking-tighter text-[11vw] sm:text-[12.5vw] leading-none text-black block uppercase pr-8 sm:pr-14 group-hover:text-neutral-700 transition-colors">
                @CARLOTALAGUNAS
              </span>
              <span className="text-[6vw] font-serif text-neutral-300 font-light pr-8 sm:pr-14">
                ✦
              </span>
            </div>
          </div>
        </a>
      </div>
    </footer>
  );
};
