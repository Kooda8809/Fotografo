import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('adp_cookie_consent');
    if (!consent) {
      // Small delay to prevent layout pop
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('adp_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('adp_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Consentimiento de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-neutral-200 p-5 rounded-sm shadow-2xl text-xs text-neutral-700 font-light space-y-3.5 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-editorial text-sm text-black font-medium">
          Privacidad y Cookies
        </span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
          UE / RGPD
        </span>
      </div>

      <p className="leading-relaxed text-neutral-600">
        Utilizamos cookies técnicas para garantizar la óptima visualización del portfolio y la experiencia fotográfica.{' '}
        <button
          onClick={onOpenCookiesPolicy}
          className="text-black font-medium underline hover:text-neutral-600 cursor-pointer"
        >
          Leer política
        </button>
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-3.5 bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors text-center cursor-pointer shadow-sm"
        >
          Aceptar
        </button>
        <button
          onClick={handleDecline}
          className="py-2 px-3.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 text-[11px] uppercase tracking-wider rounded-full transition-colors text-center cursor-pointer"
        >
          Solo Esenciales
        </button>
      </div>
    </aside>
  );
};
