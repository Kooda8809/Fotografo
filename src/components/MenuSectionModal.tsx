import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ServicesSection } from './ServicesSection';
import { FeaturedProjects } from './FeaturedProjects';
import { AboutADP } from './AboutADP';
import { WhyADP } from './WhyADP';
import { ProcessSection } from './ProcessSection';
import { PricingNotice } from './PricingNotice';
import { LocationSection } from './LocationSection';
import { InstagramSection } from './InstagramSection';

export type ActiveModalSection = 'proyectos' | 'servicios' | 'sobre-adp' | 'tarifas' | 'contacto' | null;

interface MenuSectionModalProps {
  activeModalSection: ActiveModalSection;
  onClose: () => void;
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenLightboxWithUrls: (urls: string[], initialIndex: number) => void;
  onNavigate?: (sectionId: string) => void;
}

export const MenuSectionModal: React.FC<MenuSectionModalProps> = ({
  activeModalSection,
  onClose,
  onOpenQuoteModal,
  onOpenLightboxWithUrls,
  onNavigate
}) => {
  if (!activeModalSection) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-white text-neutral-900 overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-8 sm:h-9 w-auto" />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono hidden sm:inline-block">
            {activeModalSection === 'proyectos' && '· Historias de Familia'}
            {activeModalSection === 'servicios' && '· Especialidades de Estudio'}
            {activeModalSection === 'sobre-adp' && '· Sobre Carlota Lagunas'}
            {activeModalSection === 'tarifas' && '· Tarifas & Proceso'}
            {activeModalSection === 'contacto' && '· Contacto & Estudio en Actur'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenQuoteModal()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <span>Disponibilidad</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-100 text-black hover:bg-neutral-200 transition-colors focus:outline-none flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase cursor-pointer"
            aria-label="Cerrar sección"
          >
            <span>Cerrar</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render selected section */}
      <div className="py-8 max-w-7xl mx-auto">
        {activeModalSection === 'proyectos' && (
          <FeaturedProjects
            onOpenLightboxWithUrls={onOpenLightboxWithUrls}
            onOpenQuoteModal={onOpenQuoteModal}
          />
        )}

        {activeModalSection === 'servicios' && (
          <div className="space-y-16">
            <ServicesSection
              onOpenQuoteModal={onOpenQuoteModal}
              onNavigate={(id) => {
                onClose();
                if (onNavigate) onNavigate(id);
              }}
            />
            <ProcessSection />
          </div>
        )}

        {activeModalSection === 'sobre-adp' && (
          <div className="space-y-16">
            <AboutADP
              onOpenQuoteModal={onOpenQuoteModal}
              onNavigate={(id) => {
                onClose();
                if (onNavigate) onNavigate(id);
              }}
            />
            <WhyADP />
          </div>
        )}

        {activeModalSection === 'tarifas' && (
          <div className="space-y-16">
            <PricingNotice
              onOpenQuoteModal={onOpenQuoteModal}
              onNavigatePricing={() => {
                onClose();
                if (onNavigate) onNavigate('precios');
              }}
            />
            <WhyADP />
            <ProcessSection />
          </div>
        )}

        {activeModalSection === 'contacto' && (
          <div className="space-y-16">
            <LocationSection onOpenQuoteModal={onOpenQuoteModal} />
            <InstagramSection />
          </div>
        )}
      </div>
    </div>
  );
};
