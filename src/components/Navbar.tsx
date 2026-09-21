import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenQuoteModal: (initialService?: string) => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoteModal,
  onNavigate,
  activeSection
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor overall window scroll for sticky navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are at the Hero section
  const isHeroMode = activeSection === 'hero' && !scrolled;

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'portfolio', label: 'Galería' },
    { id: 'servicios', label: 'Especialidades' },
    { id: 'precios', label: 'Precios' },
    { id: 'regalar-sesion', label: 'Tarjetas Regalo' },
    { id: 'sobre-mi', label: 'Sobre Mí' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Dynamic Header: Transforms between Text Header (in Hero) and Hamburger Menu (out of Hero / other pages) */}
      {/* Dynamic Header: Transforms between Text Header (in Hero) and Sticky Atelier Bar (out of Hero / on subpages) */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 lg:px-16 transition-all duration-300 ease-out flex justify-between ${
          isHeroMode
            ? 'py-6 sm:py-8 items-start bg-transparent border-b border-transparent pointer-events-none'
            : 'py-3 sm:py-3.5 items-center bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-2xs pointer-events-auto'
        }`}
      >
        {/* Brand Official Logo 'Carlota Lagunas' (Visible outside of Hero & on subpages) */}
        <div className="flex items-center min-h-[36px] sm:min-h-[40px]">
          <button
            onClick={() => handleLinkClick('hero')}
            className={`group text-left focus:outline-none cursor-pointer transition-all duration-300 flex items-center ${
              !isHeroMode
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Ir al inicio"
          >
            <BrandLogo className="h-7 sm:h-8 w-auto max-h-8 sm:max-h-9 object-contain group-hover:opacity-80 transition-opacity" />
          </button>
        </div>

        {/* Right side container: Either Hero Text Navigation or Compact Controls */}
        <div className={`flex relative ${isHeroMode ? 'items-start gap-8 sm:gap-12' : 'items-center gap-3 sm:gap-4'}`}>
          
          {/* STATE 1: Hero Text Navigation (Active ONLY in Hero section) */}
          <div
            className={`flex items-start gap-8 sm:gap-10 transition-all duration-300 ease-out ${
              isHeroMode
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-4 pointer-events-none absolute right-0 top-0'
            }`}
          >
            {/* Vertical list of sections */}
            <nav className="hidden sm:flex flex-col text-right space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-xs font-sans tracking-tight transition-all duration-200 text-right cursor-pointer ${
                    activeSection === item.id
                      ? 'text-black font-semibold'
                      : 'text-neutral-700 hover:text-black font-normal'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA item to the right */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="text-xs font-sans font-semibold text-black hover:opacity-75 transition-opacity cursor-pointer pt-0.5 whitespace-nowrap"
            >
              Disponibilidad
            </button>
          </div>

          {/* STATE 2: Controls (Active in all other sections outside the Hero and on subpages) */}
          <div
            className={`transition-all duration-300 ease-out flex items-center gap-2.5 sm:gap-3 ${
              !isHeroMode
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none scale-90 -translate-y-2 absolute right-0 top-0'
            }`}
          >
            {/* Quick Quote / Contact button when scrolled / in other sections */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="pointer-events-auto hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-xs cursor-pointer border border-black"
            >
              <span>Disponibilidad</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* 3-line Hamburger Icon button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10 rounded-none bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black text-black transition-all focus:outline-none flex flex-col justify-center items-center gap-1.5 shadow-2xs group cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <span className="block w-4 sm:w-5 h-[1.5px] bg-black group-hover:scale-x-110 transition-transform duration-200" />
              <span className="block w-4 sm:w-5 h-[1.5px] bg-black group-hover:scale-x-110 transition-transform duration-200" />
              <span className="block w-4 sm:w-5 h-[1.5px] bg-black group-hover:scale-x-110 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Fullscreen Drawer in Crisp White Theme */}
      {menuOpen && (
        <div
          id="navigation-menu-drawer"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md text-black flex flex-col justify-between p-8 sm:p-12 lg:p-16 animate-in fade-in duration-200"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-left cursor-pointer focus:outline-none"
              aria-label="Ir al inicio"
            >
              <BrandLogo className="h-10 sm:h-12 w-auto" />
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-none transition-colors focus:outline-none cursor-pointer border border-neutral-200"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="flex flex-col space-y-3 sm:space-y-4 my-auto max-w-2xl">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="group text-left flex items-center justify-between text-2xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-800 hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs sm:text-sm text-neutral-400 font-normal">
                    0{index + 1}
                  </span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-black" />
              </button>
            ))}

            <button
              onClick={() => handleLinkClick('blog')}
              className="group text-left flex items-center justify-between text-xl sm:text-2xl font-sans font-normal tracking-tight text-neutral-500 hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer pt-2"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs sm:text-sm text-neutral-400 font-normal">
                  07
                </span>
                <span>Blog & Consejos</span>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-black" />
            </button>
          </div>

          {/* Drawer Footer info */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:info@carlotalagunas.com" className="hover:text-black flex items-center gap-2 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>info@carlotalagunas.com</span>
              </a>
              <a href="https://wa.me/34687707029" target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-2 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+34 687 707 029</span>
              </a>
            </div>
            <span>Zaragoza, Aragón · Estudio en Actur</span>
          </div>
        </div>
      )}
    </>
  );
};
