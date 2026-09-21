import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Acceso directo a WhatsApp"
      className="fixed bottom-6 right-6 z-30 sm:hidden"
    >
      <a
        href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20una%20sesi%C3%B3n%20en%20Zaragoza"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-black shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Contactar por WhatsApp directo con Carlota Lagunas"
      >
        <MessageSquare className="w-5 h-5 fill-black" />
      </a>
    </aside>
  );
};
