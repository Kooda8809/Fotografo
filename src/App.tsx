import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { IntegratedHeroPortfolio } from './components/IntegratedHeroPortfolio';
import { AboutADP } from './components/AboutADP';
import type { ActiveModalSection } from './components/MenuSectionModal';
import { Footer } from './components/Footer';
import type { LegalDocType } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotFoundView } from './components/NotFoundView';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyADP } from './components/WhyADP';
import { PricingNotice } from './components/PricingNotice';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { InstagramSection } from './components/InstagramSection';
import { HomeClosingCTA } from './components/HomeClosingCTA';
import { StudioMapSection } from './components/StudioMapSection';

// Code-split secondary sub-pages with React.lazy
const PortfolioPage = lazy(() => import('./components/pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const ServiceDetailPage = lazy(() => import('./components/pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const QuotePage = lazy(() => import('./components/pages/QuotePage').then((m) => ({ default: m.QuotePage })));
const BlogPage = lazy(() => import('./components/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const PricingPage = lazy(() => import('./components/pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const GiftSessionPage = lazy(() => import('./components/pages/GiftSessionPage').then((m) => ({ default: m.GiftSessionPage })));

// Code-split heavy interactive modals
const MenuSectionModal = lazy(() => import('./components/MenuSectionModal').then((m) => ({ default: m.MenuSectionModal })));
const Lightbox = lazy(() => import('./components/Lightbox').then((m) => ({ default: m.Lightbox })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then((m) => ({ default: m.QuoteModal })));
const LegalModal = lazy(() => import('./components/LegalModal').then((m) => ({ default: m.LegalModal })));

import { PhotoItem } from './types';
import { portfolioPhotos } from './data/portfolio';
import { servicesList } from './data/services';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const p = window.location.pathname.replace(/^\/+|\/+$/g, '');
    return p ? `/${p}` : '/';
  });

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return true;
    const p = window.location.pathname.replace(/^\/+|\/+$/g, '');
    return !p || p === 'inicio';
  });

  const [contentMounted, setContentMounted] = useState(!showSplash);

  useEffect(() => {
    if (!showSplash) {
      setContentMounted(true);
      return;
    }
    // Defer loading heavy gallery & background elements until after initial paint
    const timer = setTimeout(() => {
      setContentMounted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [showSplash]);

  const [activeModalSection, setActiveModalSection] = useState<ActiveModalSection>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('');
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  // Lightbox state
  const [lightboxPhotos, setLightboxPhotos] = useState<PhotoItem[]>(portfolioPhotos);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Synchronize browser history and popstate for back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/^\/+|\/+$/g, '');
      setCurrentPath(p ? `/${p}` : '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((routeOrId: string) => {
    setActiveModalSection(null);

    // Normalize route
    let target = routeOrId.startsWith('/') ? routeOrId : `/${routeOrId}`;
    if (target === '/hero' || target === '/inicio') {
      target = '/';
    }

    // Alias legacy routes
    if (target === '/sobre-adp') {
      target = '/sobre-mi';
    }
    if (target === '/galeria') {
      target = '/portfolio';
    }
    if (target === '/tarjetas-regalo') {
      target = '/regalar-sesion';
    }

    // Check if target is a known anchor or route
    const isServiceSlug = servicesList.some((s) => `/${s.slug}` === target);
    const validRoutes = [
      '/',
      '/portfolio',
      '/servicios',
      '/sobre-mi',
      '/precios',
      '/regalar-sesion',
      '/contacto',
      '/presupuesto',
      '/blog',
      '/404'
    ];

    if (validRoutes.includes(target) || isServiceSlug) {
      if (window.location.pathname !== target) {
        window.history.pushState(null, '', target);
      }
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If navigating to an on-page section while on home
      if (currentPath === '/') {
        const el = document.getElementById(routeOrId.replace('/', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      // If modal section is requested
      if (['proyectos', 'servicios', 'sobre-adp', 'tarifas', 'contacto'].includes(routeOrId)) {
        setActiveModalSection(routeOrId as ActiveModalSection);
      } else {
        // Fallback to 404
        window.history.pushState(null, '', target);
        setCurrentPath('/404');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentPath]);

  const handleOpenQuoteModal = (serviceName: string = '') => {
    setQuoteService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleOpenLightbox = (photos: PhotoItem[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleOpenLightboxWithUrls = (urls: string[], initialIndex: number) => {
    const customPhotos: PhotoItem[] = urls.map((url, i) => ({
      id: `proj-photo-${i}`,
      title: `Recuerdo ${i + 1}`,
      category: 'Infantil',
      location: 'Zaragoza, Aragón',
      imageUrl: url,
      aspectRatio: 'aspect-[16/10]',
      description: 'Reportaje fotográfico infantil y familiar en Zaragoza.',
      year: '2025'
    }));
    setLightboxPhotos(customPhotos);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  // Find active service if path is an individual service route
  const currentService = servicesList.find((s) => `/${s.slug}` === currentPath);

  // Render Page Content based on Path
  const renderMainContent = () => {
    if (currentPath === '/404') {
      return (
        <NotFoundView
          onBackToHome={() => handleNavigate('/')}
        />
      );
    }

    if (currentPath === '/portfolio') {
      return (
        <PortfolioPage
          onPhotoClick={handleOpenLightbox}
          onOpenQuoteModal={handleOpenQuoteModal}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/sobre-mi') {
      return (
        <AboutPage
          onOpenQuoteModal={handleOpenQuoteModal}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/precios') {
      return (
        <PricingPage
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onNavigateContact={() => handleNavigate('contacto')}
          onNavigateGift={() => handleNavigate('regalar-sesion')}
        />
      );
    }

    if (currentPath === '/regalar-sesion') {
      return (
        <GiftSessionPage
          onNavigateContact={() => handleNavigate('contacto')}
          onOpenQuoteModal={() => handleOpenQuoteModal('Tarjeta Regalo')}
        />
      );
    }

    if (currentPath === '/contacto') {
      return (
        <ContactPage
          onOpenPrivacyModal={() => setLegalDoc('privacidad')}
        />
      );
    }

    if (currentPath === '/presupuesto') {
      return (
        <QuotePage />
      );
    }

    if (currentPath === '/blog') {
      return (
        <BlogPage
          onOpenQuoteModal={handleOpenQuoteModal}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/servicios') {
      return (
        <div className="pt-20 bg-white min-h-screen">
          <ServicesSection
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigate={handleNavigate}
          />
          <ProcessSection />
          <WhyADP />
        </div>
      );
    }

    if (currentService) {
      return (
        <ServiceDetailPage
          service={currentService}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenLightbox={handleOpenLightbox}
          onNavigate={handleNavigate}
        />
      );
    }

    // Default: Home Page
    return (
      <main className="flex-1">
        <IntegratedHeroPortfolio
          onPhotoClick={handleOpenLightbox}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onNavigate={handleNavigate}
        />
        <AboutADP
          onOpenQuoteModal={() => handleOpenQuoteModal('Sesión Infantil / Familiar')}
          onNavigate={handleNavigate}
        />
        <HomeClosingCTA
          onOpenQuoteModal={() => handleOpenQuoteModal('Reserva')}
          onNavigate={handleNavigate}
        />
      </main>
    );
  };

  return (
    <div className={`min-h-screen bg-white text-[#111111] font-sans selection:bg-neutral-800 selection:text-white flex flex-col ${showSplash ? 'h-screen overflow-hidden max-h-screen' : ''}`}>
      {/* Optional Interactive Entry Splash Screen */}
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setContentMounted(true);
            setShowSplash(false);
          }}
        />
      )}

      {contentMounted && (
        <>
          {/* Header with brand links and navigation */}
          <Navbar
            onOpenQuoteModal={() => handleOpenQuoteModal()}
            onNavigate={handleNavigate}
            activeSection={currentPath.replace('/', '') || 'hero'}
          />

          {/* Main Content Area */}
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
            {renderMainContent()}
          </Suspense>

          {/* Studio Location Map above Footer adapted to Visual Identity */}
          {currentPath !== '/404' && <StudioMapSection />}

          {/* Editorial Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenLegal={(type) => setLegalDoc(type)}
            onReplaySplash={() => setShowSplash(true)}
          />
        </>
      )}

      {/* Fullscreen Section Modal for Quick Nav */}
      {activeModalSection && (
        <Suspense fallback={null}>
          <MenuSectionModal
            activeModalSection={activeModalSection}
            onClose={() => setActiveModalSection(null)}
            onOpenQuoteModal={handleOpenQuoteModal}
            onOpenLightboxWithUrls={handleOpenLightboxWithUrls}
            onNavigate={handleNavigate}
          />
        </Suspense>
      )}

      {/* Interactive Lightbox for High-Res inspection */}
      {isLightboxOpen && (
        <Suspense fallback={null}>
          <Lightbox
            isOpen={isLightboxOpen}
            photos={lightboxPhotos}
            currentIndex={lightboxIndex}
            onClose={() => setIsLightboxOpen(false)}
            onNavigate={(index) => setLightboxIndex(index)}
          />
        </Suspense>
      )}

      {/* Quote Request Modal */}
      {isQuoteOpen && (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            preselectedService={quoteService}
          />
        </Suspense>
      )}

      {/* Legal & Compliance Modal */}
      {legalDoc && (
        <Suspense fallback={null}>
          <LegalModal
            docType={legalDoc}
            onClose={() => setLegalDoc(null)}
          />
        </Suspense>
      )}

      {/* RGPD Cookie Banner */}
      <CookieBanner onOpenCookiesPolicy={() => setLegalDoc('cookies')} />

      {/* Direct WhatsApp Contact Button */}
      <FloatingWhatsApp />
    </div>
  );
}
