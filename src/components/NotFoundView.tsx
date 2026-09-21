import React from 'react';
import { Camera, ArrowLeft } from 'lucide-react';

interface NotFoundViewProps {
  onBackToHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onBackToHome }) => {
  return (
    <main
      id="not-found-screen"
      className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center space-y-8 select-none"
    >
      <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black">
        <Camera className="w-8 h-8 stroke-[1.2]" />
      </div>

      <div className="space-y-3 max-w-md">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
          Error 404 · Carlota Lagunas Fotografía
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-black font-normal leading-tight">
          Parece que este recuerdo se ha perdido...
        </h1>
        <p className="text-sm text-neutral-600 font-light leading-relaxed">
          La página o fotografía que buscas ya no se encuentra en esta dirección. Pero no te preocupes, siempre puedes regresar a nuestra galería principal para seguir descubriendo recuerdos llenos de emoción.
        </p>
      </div>

      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>
      </div>
    </main>
  );
};
