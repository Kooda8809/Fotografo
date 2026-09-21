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

  // 5-thumbnail preview window matching user's visual identity attachment 2
  const thumbnailIndices = React.useMemo(() => {
    if (photos.length <= 5) {
      return photos.map((_, i) => i);
    }
    const count = 5;
    let start = currentIndex - Math.floor(count / 2);
    if (start < 0) start = 0;
    if (start + count > photos.length) start = photos.length - count;
    return Array.from({ length: count }, (_, i) => start + i);
  }, [photos, currentIndex]);

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
      <div className="relative z-20 flex items-center justify-between px-6 py-3 sm:px-8 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-baseline gap-3">
          <span className="font-editorial text-lg text-white font-medium">Carlota Lagunas</span>
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
            className="p-2 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-none border border-white/20 transition-colors focus:outline-none cursor-pointer"
            aria-label="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden">
        {/* Navigation Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-none border border-white/20 transition-all backdrop-blur-sm focus:outline-none cursor-pointer"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Photo with straight rectilinear corners (rounded-none) */}
        <div className="relative max-h-full max-w-full flex items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="max-h-[62vh] sm:max-h-[66vh] max-w-full w-auto h-auto object-contain rounded-none shadow-2xl transition-opacity duration-300 ease-out"
          />
        </div>

        {/* Navigation Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-none border border-white/20 transition-all backdrop-blur-sm focus:outline-none cursor-pointer"
          aria-label="Fotografía siguiente"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 5-Thumbnail Strip with straight rectilinear corners */}
      <div className="relative z-20 px-6 sm:px-8 pb-3 max-w-2xl w-full mx-auto">
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5">
          {thumbnailIndices.map((idx) => {
            const photo = photos[idx];
            if (!photo) return null;
            const isSelected = idx === currentIndex;
            return (
              <button
                key={photo.id}
                onClick={() => onNavigate(idx)}
                className={`relative aspect-[4/3] rounded-none overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-white scale-105 shadow-xl opacity-100 ring-2 ring-white/30'
                    : 'border-transparent opacity-50 hover:opacity-100 hover:scale-102'
                }`}
                aria-label={`Ver foto ${idx + 1}`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover rounded-none"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Info Bar */}
      {showInfo && (
        <div className="relative z-20 px-6 sm:px-8 py-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="space-y-0.5 max-w-2xl">
            <h2 className="font-editorial text-base sm:text-lg text-white font-normal leading-tight">
              {currentPhoto.title}
            </h2>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed line-clamp-1">
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
