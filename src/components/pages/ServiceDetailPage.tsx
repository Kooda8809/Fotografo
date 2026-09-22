import React from 'react';
import { ServiceItem, PhotoItem } from '../../types';
import { portfolioPhotos } from '../../data/portfolio';
import { servicesList } from '../../data/services';
import { ArrowUpRight, CheckCircle2, MessageSquare, ArrowLeft, Camera, Phone } from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenLightbox: (photos: PhotoItem[], index: number) => void;
  onNavigate: (sectionId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onOpenQuoteModal,
  onOpenLightbox,
  onNavigate
}) => {
  // Select sample photos related to this service
  const relatedPhotos = portfolioPhotos.filter((p) => {
    if (service.slug === 'embarazo-zaragoza') return p.category === 'Embarazo';
    if (service.slug === 'newborn-zaragoza') return p.category === 'Newborn';
    if (service.slug === 'smash-cake-zaragoza') return p.category === 'Smash Cake';
    if (service.slug === 'fotografia-infantil-zaragoza') return p.category === 'Infantil' || p.category === 'Bebés';
    if (service.slug === 'fotografia-familiar-zaragoza') return p.category === 'Familia';
    if (service.slug === 'comuniones-zaragoza') return p.category === 'Comuniones';
    if (service.slug === 'fine-art') return p.category === 'Fine Art';
    return true;
  }).slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hola Carlota, me gustaría consultar disponibilidad para una sesión de ${service.title} en Zaragoza.`
  );

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Back breadcrumb link */}
        <div>
          <button
            onClick={() => onNavigate('servicios')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Especialidades</span>
          </button>
        </div>

        {/* Hero Section of the Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-neutral-200 pb-16">
          <div className="lg:col-span-7 space-y-6">

            <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              {service.description}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuoteModal(service.title)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-none hover:bg-neutral-800 transition-colors shadow-md cursor-pointer border border-black"
              >
                <span>Consultar Disponibilidad</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/34687707029?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-none transition-colors cursor-pointer bg-white"
              >
                <MessageSquare className="w-3.5 h-3.5 text-black" />
                <span>WhatsApp (687 707 029)</span>
              </a>
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-none overflow-hidden bg-neutral-900 border border-neutral-200 shadow-xl group">
              <img
                src={service.heroImage}
                alt={`${service.title} en Zaragoza por Carlota Lagunas Fotografía`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs text-white font-mono uppercase tracking-widest">
                  Zaragoza · Estudio Carlota Lagunas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Highlights & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
              Cómo trabajamos esta sesión
            </h2>
            <div className="space-y-3">
              {service.details.map((detail, idx) => (
                <div key={idx} className="p-4 rounded-none bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
              Qué incluye tu experiencia
            </h2>
            <div className="space-y-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-none bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-none bg-black shrink-0 mt-2" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Work Gallery */}
        {relatedPhotos.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-black font-normal mt-1">
                  Momentos Capturados en Zaragoza
                </h3>
              </div>
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black hover:text-neutral-600 underline underline-offset-4 cursor-pointer"
              >
                <span>Ver toda la galería</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => onOpenLightbox(relatedPhotos, i)}
                  className="group relative aspect-[4/3] rounded-none overflow-hidden bg-neutral-900 border border-neutral-200 shadow-sm cursor-pointer"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                    <span className="text-[11px] font-sans font-medium line-clamp-1">{photo.title}</span>
                    <span className="text-[9px] font-mono text-neutral-300">{photo.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other services switcher bar */}
        <div className="pt-12 border-t border-neutral-200">
          <div className="flex flex-wrap gap-2.5">
            {servicesList
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <button
                  key={s.slug}
                  onClick={() => onNavigate(s.slug)}
                  className="px-4 py-2 rounded-none bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {s.shortTitle}
                </button>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};
