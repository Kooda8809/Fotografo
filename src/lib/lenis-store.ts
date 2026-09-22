// Lightweight singleton reference to Lenis to avoid pulling motion/react or lenis into the initial splash chunk
export interface LenisLike {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; duration?: number; offset?: number }
  ) => void;
  destroy?: () => void;
  raf?: (time: number) => void;
  options?: any;
}

let lenisInstance: LenisLike | null = null;

export function setGlobalLenis(instance: LenisLike | null) {
  lenisInstance = instance;
}

export function getGlobalLenis(): LenisLike | null {
  return lenisInstance;
}
