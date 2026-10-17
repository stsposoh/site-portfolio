import { prefersReducedMotion } from '~/utils/motion'

const TILT_PROPERTIES = ['--tilt-x', '--tilt-y', '--glare-x', '--glare-y']

/** Writes pointer-driven tilt and glare position as CSS variables on the element */
export function applyTilt(event: PointerEvent, maxAngle = 14): void {
  if (event.pointerType !== 'mouse' || prefersReducedMotion()) return

  const el = event.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  el.style.setProperty('--tilt-x', `${((0.5 - y) * maxAngle).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${((x - 0.5) * maxAngle).toFixed(2)}deg`)
  el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`)
  el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`)
}

export function resetTilt(event: PointerEvent): void {
  const el = event.currentTarget as HTMLElement
  TILT_PROPERTIES.forEach((property) => el.style.removeProperty(property))
}
