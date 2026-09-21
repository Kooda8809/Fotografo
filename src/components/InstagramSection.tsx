import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const instagramImages = [
    {
      url: '/images/real/session-17.webp',
      caption: 'Sesión de embarazo al atardecer en Zaragoza'
    },
    {
      url: '/images/real/session-42.webp',
      caption: 'Pequeños detalles que enamoran en el estudio'
    },
    {
      url: '/images/real/session-44.webp',
      caption: 'Celebrando su primer añito con Smash Cake'
    },
    {
      url: '/images/real/session-45.webp',
      caption: 'Pura magia e ilusión en su Primera Comunión'
    }
  ];

  return (
    <section
      id="instagram"
      className="py-20 sm:py-28 bg-white text-black border-t border-neutral-200"
      aria-label="Perfil de Instagram de Carlota Lagunas Fotografía"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-black font-normal">
              Historias en Curso & Detrás de Cámara
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.instagram.com/carlotalagunasfotografia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 rounded-none text-xs font-mono uppercase tracking-wider text-black transition-colors cursor-pointer"
            >
              <span>@carlotalagunasfotografia</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Dynamic Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramImages.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/carlotalagunasfotografia/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-none bg-neutral-100 border border-neutral-200 shadow-xs"
            >
              <img
                src={post.url}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-sans leading-tight line-clamp-2">
                    {post.caption}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest mt-1 block">
                    Ver en Instagram
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
