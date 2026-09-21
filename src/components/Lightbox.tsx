import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfo((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only trigger if horizontal swipe is significantly stronger than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (diffY > 80 && Math.abs(diffX) < 40) {
      // Swipe down to close
      onClose();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      ref={containerRef}
      id="lightbox-view"
      role="dialog"
      aria-modal="true"
      aria-label="Visor fotográfico a pantalla completa"
      className="fixed inset-0 z-50 bg-[#080809]/98 flex flex-col justify-between backdrop-blur-xl animate-in fade-in duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 sm:px-8 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-baseline gap-3">
          <span className="font-editorial text-lg text-white font-medium">ADP</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            {currentPhoto.category}
          </span>
        </div>

        {/* Counter */}
        <div className="text-xs font-mono tracking-widest text-neutral-300">
          <span className="text-white font-medium">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>{' '}
          / <span className="text-neutral-500">{String(photos.length).padStart(2, '0')}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`hidden sm:inline-flex px-2.5 py-1 text-[11px] uppercase tracking-wider rounded border transition-colors ${
              showInfo
                ? 'border-white/40 text-white bg-white/10'
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
            title="Alternar información (I)"
          >
            Info
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex p-2 text-neutral-400 hover:text-white transition-colors"
            title="Pantalla completa"
            aria-label="Pantalla completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-colors focus:outline-none"
            aria-label="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
        {/* Navigation Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm focus:outline-none"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Photo */}
        <div className="relative max-h-full max-w-full flex items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="max-h-[78vh] sm:max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-sm shadow-2xl transition-opacity duration-300 ease-out"
          />
        </div>

        {/* Navigation Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm focus:outline-none"
          aria-label="Fotografía siguiente"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Info Bar */}
      {showInfo && (
        <div className="relative z-20 px-6 sm:px-8 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 max-w-2xl">
            <h2 className="font-editorial text-lg sm:text-xl text-white font-normal leading-tight">
              {currentPhoto.title}
            </h2>
            <p className="text-neutral-400 font-sans text-xs sm:text-[13px] leading-relaxed">
              {currentPhoto.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-neutral-400 font-sans shrink-0">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>{currentPhoto.location}</span>
            </div>
            {currentPhoto.year && <span>· {currentPhoto.year}</span>}
          </div>
        </div>
      )}
    </div>
  );
};
