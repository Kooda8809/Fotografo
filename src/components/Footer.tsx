import React, { useState, useRef } from 'react';
import { LegalDocType } from './LegalModal';
import { Instagram, MessageCircle, Phone, Mail, ArrowUpRight, AtSign } from 'lucide-react';

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
      id: 'hero',
      label: 'Inicio',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      tag: 'Carlota Lagunas · Portada'
    },
    {
      id: 'portfolio',
      label: 'Galería',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      tag: 'Reportajes en Zaragoza'
    },
    {
      id: 'servicios',
      label: 'Especialidades',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      tag: 'Newborn, Embarazo, Smash Cake, Familia'
    },
    {
      id: 'precios',
      label: 'Precios y Tarifas',
      image: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=800&q=80',
      tag: 'Packs digitales, madera y álbumes'
    },
    {
      id: 'regalar-sesion',
      label: 'Regalar Sesión',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      tag: 'Tarjetas regalo con 6 meses de validez'
    },
    {
      id: 'sobre-mi',
      label: 'Sobre Mí',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      tag: 'Conoce a Carlota Lagunas'
    },
    {
      id: 'contacto',
      label: 'Contacto & Cita Previa',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      tag: 'Estudio en el Actur, Zaragoza'
    },
    {
      id: 'blog',
      label: 'Blog & Consejos',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      tag: 'Guías de preparación newborn y embarazo'
    }
  ];

  // Mouse tracking within footer for the floating preview square
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
      className="relative bg-white text-black border-t border-neutral-200 pt-16 sm:pt-20 pb-12 overflow-hidden select-none"
      aria-label="Pie de página de navegación"
    >
      {/* FLOATING PREVIEW IMAGE */}
      {hoveredItem && (
        <div
          className="pointer-events-none hidden md:block z-30 transition-all duration-150 ease-out"
          style={{
            left: `${Math.min(mousePos.x + 28, 880)}px`,
            top: `${Math.max(mousePos.y - 100, 20)}px`,
            position: 'absolute'
          }}
        >
          <div className="relative w-56 aspect-[16/11] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <img
              src={hoveredItem.image}
              alt={hoveredItem.label}
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                {hoveredItem.label}
              </span>
              <span className="text-xs font-sans font-medium line-clamp-1 text-white">
                {hoveredItem.tag}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* COLUMN 1: Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-editorial text-2xl tracking-tight text-black block">
                carlota lagunas
              </span>
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                Fotografía Infantil y Familiar en Zaragoza
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-sm">
              Creamos recuerdos naturales, delicados y eternos de los primeros días, el embarazo y la infancia de tus hijos en nuestro estudio de Zaragoza.
            </p>
          </div>

          {/* COLUMN 2: Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-sans font-bold text-black tracking-tight">
              Navegación
            </h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  onMouseEnter={() => setHoveredItem(link)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group text-left text-xs sm:text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-black" />
                </button>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: Contact Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-sans font-bold text-black tracking-tight">
              Estudio & Contacto
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              <p className="font-medium text-black">Carlota Lagunas Fotografía</p>
              <p>C/ Rosalía de Castro, 15, local</p>
              <p>Barrio del Actur · 50018 Zaragoza, España</p>
              <div className="pt-2 space-y-1.5">
                <p>
                  <a
                    href="https://wa.me/34687707029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-800" />
                    <span>+34 687 707 029</span>
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@carlotalagunas.com"
                    className="hover:text-black transition-colors flex items-center gap-1.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                    <span>info@carlotalagunas.com</span>
                  </a>
                </p>
                <p className="pt-1 text-[11px] text-neutral-500 font-mono">
                  Visitas con cita previa obligatoria
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Redes Sociales */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-sans font-bold text-black tracking-tight">
              Síguenos
            </h4>
            
            <div className="flex flex-col space-y-2.5">
              <a
                href="https://www.instagram.com/carlotalagunasfotografia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-600 hover:text-black transition-colors group"
              >
                <div className="w-7 h-7 rounded-full border border-neutral-300 group-hover:border-black group-hover:bg-neutral-100 flex items-center justify-center transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span>@carlotalagunasfotografia</span>
              </a>

              <a
                href="https://wa.me/34687707029"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-600 hover:text-black transition-colors group"
              >
                <div className="w-7 h-7 rounded-full border border-neutral-300 group-hover:border-black group-hover:bg-neutral-100 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp (687 707 029)</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span>Zaragoza, Aragón</span>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA & LEGAL BAR */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <div>
            © 2026 CARLOTA LAGUNAS FOTOGRAFIA SL — Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
            {onReplaySplash && (
              <button
                onClick={onReplaySplash}
                className="hover:text-black transition-colors cursor-pointer underline underline-offset-4"
              >
                Ver Splash
              </button>
            )}
            <button
              onClick={() => onOpenLegal('privacidad')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Política de privacidad
            </button>
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Política de cookies
            </button>
            <button
              onClick={() => onOpenLegal('aviso')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Aviso legal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
