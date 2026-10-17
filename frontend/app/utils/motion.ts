export const prefersReducedMotion = (): boolean =>
  import.meta.client &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
