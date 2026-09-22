import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  HTMLMotionProps,
  MapInputRange,
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react';
import Lenis from 'lenis';
import { setGlobalLenis, getGlobalLenis } from '../../lib/lenis-store';
export { getGlobalLenis };

export interface UseSmoothScrollOptions {
  duration?: number;
  lerp?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchMultiplier?: number;
  touchInertiaExponent?: number;
  infinite?: boolean;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  easing?: (t: number) => number;
  autoToggle?: boolean;
  prevent?: (node: HTMLElement) => boolean;
}

export const defaultOptions: UseSmoothScrollOptions = {
  duration: 1.35, // Slow, elegant glide for PC wheel scroll
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.88, // Gentle wheel scroll step
  syncTouch: true, // Smooth inertia on touch devices
  syncTouchLerp: 0.075, // Silky deceleration when finger lifts
  touchMultiplier: 1.0, // 1:1 direct tracking while touching
  touchInertiaExponent: 1.65, // Natural glide decay
  infinite: false,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  autoToggle: true,
};

// Singleton Lenis manager to ensure a single, consistent smooth-scroll engine
let globalLenis: Lenis | null = null;
let subscribersCount = 0;
let rafId: number | null = null;

function startGlobalRaf() {
  if (rafId !== null) return;
  function loop(time: number) {
    globalLenis?.raf(time);
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);
}

function stopGlobalRaf() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function isScrollAnimationSectionActive(event?: WheelEvent | TouchEvent): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const hero = document.getElementById('hero');
  if (!hero) return false;

  const rect = hero.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // The hero parallax animation is active while the hero gallery is inside the viewport.
  // Once the user reaches the bottom dual CTAs and About section, rect.bottom drops near or below the viewport.
  return rect.top <= 100 && rect.bottom > 140;
}


export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(globalLenis);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Keep mobile phones native and fast on narrow screens (< 768px).
    // Never test maxTouchPoints or ontouchstart because Windows desktop/laptops report touchpoints!
    const isMobileWidth = window.innerWidth < 768;
    if (isMobileWidth) {
      return;
    }

    subscribersCount++;

    if (!globalLenis) {
      const mergedOptions = { ...defaultOptions, ...options };
      try {
        globalLenis = new Lenis({
          duration: mergedOptions.duration,
          lerp: mergedOptions.lerp,
          smoothWheel: mergedOptions.smoothWheel,
          wheelMultiplier: mergedOptions.wheelMultiplier,
          syncTouch: mergedOptions.syncTouch,
          syncTouchLerp: mergedOptions.syncTouchLerp,
          touchMultiplier: mergedOptions.touchMultiplier,
          touchInertiaExponent: mergedOptions.touchInertiaExponent,
          infinite: mergedOptions.infinite,
          orientation: mergedOptions.orientation,
          gestureOrientation: mergedOptions.gestureOrientation,
          easing: mergedOptions.easing,
          autoToggle: mergedOptions.autoToggle,
          virtualScroll: (data) => {
            if (!globalLenis) return true;

            // Dynamically adapt scroll profile:
            // Slow, luxurious smooth glide strictly within the hero animation section.
            // Standard, fast, and responsive normal scroll in all other sections.
            const isHeroActive = isScrollAnimationSectionActive(data.event);

            if (isHeroActive) {
              globalLenis.options.duration = 1.35;
              globalLenis.options.lerp = 0.08;
              globalLenis.options.wheelMultiplier = 0.88;
              globalLenis.options.syncTouchLerp = 0.075;
            } else {
              globalLenis.options.duration = 0.16;
              globalLenis.options.lerp = 0.55;
              globalLenis.options.wheelMultiplier = 1.15;
              globalLenis.options.syncTouchLerp = 0.35;
            }

            return true;
          },
          prevent: (node) => {
            if (options.prevent && options.prevent(node)) return true;
            return (
              Boolean(node.closest?.('[data-lenis-prevent]')) ||
              Boolean(node.closest?.('.lenis-prevent'))
            );
          },
        });
        setGlobalLenis(globalLenis);
        startGlobalRaf();
      } catch (err) {
        console.warn('Failed to initialize Lenis smooth scroll:', err);
      }
    }

    setLenisInstance(globalLenis);

    return () => {
      subscribersCount--;
      if (subscribersCount <= 0) {
        subscribersCount = 0;
        stopGlobalRaf();
        globalLenis?.destroy();
        globalLenis = null;
        setGlobalLenis(null);
      }
    };
  }, []);

  return {
    lenis: lenisInstance,
  };
}

interface ContainerScrollAnimationContextValue {
  scrollYProgress: MotionValue<number>;
}
const ContainerScrollAnimationContext = React.createContext<
  ContainerScrollAnimationContextValue | undefined
>(undefined);

export function useContainerScrollAnimationContext() {
  const context = React.useContext(ContainerScrollAnimationContext);
  if (!context) {
    throw new Error(
      'useContainerScrollAnimationContext must be used within a ContainerScrollAnimationContextProvider',
    );
  }
  return context;
}

export function ContainerScrollAnimation({
  spacerClass,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { spacerClass?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useSmoothScroll();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollAnimationContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} data-scroll-animation="true" className={cn('relative', className)} {...props}>
        {children}
        <div className={cn('w-full h-96', spacerClass)} />
      </div>
    </ContainerScrollAnimationContext.Provider>
  );
}

export function ContainerScrollInsetX({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const xInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(0px ${xInset}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}
export function ContainerScrollInsetY({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const yInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(${yInset}px 0px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollInset({
  inputRange = [0, 1],
  insetRangeY = [45, 0],
  insetXRange = [45, 0],
  roundednessRange = [16, 16],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  inputRange?: MapInputRange;
  insetRangeY?: unknown[];
  insetXRange?: unknown[];
  roundednessRange?: unknown[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const insetY = useTransform(scrollYProgress, inputRange, insetRangeY);
  const insetX = useTransform(scrollYProgress, inputRange, insetXRange);
  const roundedness = useTransform(
    scrollYProgress,
    inputRange,
    roundednessRange,
  );

  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollTranslate({
  yRange = [0, 384],
  inputRange = [0, 1],
  style,
  className,
  ...props
}: HTMLMotionProps<'div'> & { yRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const y = useTransform(scrollYProgress, inputRange, yRange);
  return (
    <motion.div
      style={{ y, ...style }}
      className={cn('relative', className)}
      {...props}
    />
  );
}

export function ContainerScrollScale({
  scaleRange = [1.2, 1],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { scaleRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);
  return (
    <motion.div className={className} style={{ scale, ...style }} {...props} />
  );
}
export function ContainerScrollRadius({
  radiusRange = [9999, 16],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  radiusRange?: unknown[];
  inputRange?: number[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const borderRadius = useTransform(scrollYProgress, inputRange, radiusRange);
  return (
    <motion.div
      layout
      className={className}
      style={{ borderRadius, ...style }}
      {...props}
    />
  );
}
