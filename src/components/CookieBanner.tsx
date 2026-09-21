import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('adp_cookie_consent');
    if (!consent) {
      // Small delay to prevent layout pop and ensure smooth appearance
      const timer = setTimeout(() => {
        setIsRendered(true);
        requestAnimationFrame(() => setIsVisible(true));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('adp_cookie_consent', 'accepted');
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400);
  };

  const handleDecline = () => {
    localStorage.setItem('adp_cookie_consent', 'essential_only');
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400);
  };

  if (!isRendered) return null;

  return (
    <aside
      aria-label="Consentimiento de cookies y privacidad"
      className={`fixed bottom-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-10px_35px_rgba(0,0,0,0.07)] transition-transform duration-500 ease-out select-none ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 sm:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
        
        {/* Left Column: Heading, Badge, and RGPD Explanation */}
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-editorial text-base sm:text-lg text-black font-medium tracking-tight">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>Privacidad y Cookies</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              UE · RGPD
            </span>
          </div>

          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Utilizamos cookies técnicas para garantizar la óptima visualización del portfolio y la experiencia fotográfica.{' '}
            <button
              onClick={onOpenCookiesPolicy}
              className="text-black font-medium underline underline-offset-2 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              Leer política
            </button>
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-initial py-2.5 px-4 rounded-full border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer text-center"
          >
            Solo Esenciales
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-initial py-2.5 px-6 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer text-center"
          >
            Aceptar
          </button>
        </div>

      </div>
    </aside>
  );
};
