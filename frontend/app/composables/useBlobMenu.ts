import type { Ref } from 'vue'
import anime from 'animejs'
import { prefersReducedMotion } from '~/utils/motion'

const NUMBER_PATTERN = /-?\d*\.?\d+/
const NUMBER_PATTERN_GLOBAL = /-?\d*\.?\d+/g

const WARP_AMPLITUDE = 10
const WARP_FREQUENCY = 0.012
const WARP_SPEED = 0.5
const POINTER_EASING = 0.06

/** Animated blob element for menu navigation */
class MenuBlob {
  private layers: SVGPathElement[]
  private descriptions: string[]
  private numbers: number[][]
  private separators: string[][]
  private phase: number

  constructor(el: SVGGElement, index: number) {
    // Local coordinates, so the origin stays valid when the group itself is transformed
    const box = el.getBBox()
    const origin = `${box.x + box.width / 2}px ${box.y + box.height / 2}px`

    this.layers = Array.from(el.querySelectorAll('path'))
    this.descriptions = this.layers.map((path) => path.getAttribute('d') ?? '')
    this.numbers = this.descriptions.map((d) =>
      (d.match(NUMBER_PATTERN_GLOBAL) ?? []).map(Number)
    )
    this.separators = this.descriptions.map((d) => d.split(NUMBER_PATTERN))
    this.phase = index * 1.7

    this.layers.forEach((path) => {
      path.style.transformOrigin = origin
      path.style.opacity = '0'
    })
  }

  /**
   * Displaces every point by a smooth position-based field, so coincident
   * points (path start/end) move together and the outline stays closed.
   */
  warp(time: number, strength: number): void {
    this.layers.forEach((layer, layerIndex) => {
      const numbers = this.numbers[layerIndex]
      const separators = this.separators[layerIndex]
      const phase = time * WARP_SPEED + this.phase + layerIndex * 0.4
      const amplitude = WARP_AMPLITUDE * strength
      let d = separators[0]

      for (let i = 0; i < numbers.length; i += 2) {
        const x = numbers[i]
        const y = numbers[i + 1]
        const dx = Math.sin(y * WARP_FREQUENCY + phase) * amplitude
        const dy = Math.cos(x * WARP_FREQUENCY + phase * 0.8) * amplitude
        d += `${(x + dx).toFixed(1)}${separators[i + 1]}${(y + dy).toFixed(1)}${separators[i + 2]}`
      }

      layer.setAttribute('d', d)
    })
  }

  intro(duration: number): Promise<void> {
    anime.remove(this.layers)
    return anime({
      targets: this.layers,
      duration,
      delay: (_t, i) => i * duration * 0.07,
      easing: 'cubicBezier(0.2, 1, 0.1, 1)',
      scale: [0.2, 1],
      opacity: {
        value: [0, 1],
        duration: duration * 0.2,
        delay: (_t, i) => i * duration * 0.07,
        easing: 'linear'
      }
    }).finished
  }

  emphasize(isActive: boolean): void {
    anime.remove(this.layers)
    anime({
      targets: this.layers,
      scale: isActive ? 1.08 : 1,
      duration: 900,
      delay: (_t, i) => i * 30,
      easing: 'easeOutElastic(1, 0.7)'
    })
  }

  expand(duration: number): Promise<void> {
    anime.remove(this.layers)
    this.layers.forEach((layer) => {
      layer.style.opacity = '1'
      layer.style.transform = 'scale(1)'
    })

    return anime({
      targets: this.layers,
      duration,
      delay: (_t, i) => i * duration * 0.04,
      easing: 'cubicBezier(0.7, 0, 0.2, 1)',
      d: (el: SVGPathElement) => el.getAttribute('pathdata:id')
    }).finished
  }

  collapse(duration: number): Promise<void> {
    return anime({
      targets: this.layers,
      duration,
      delay: (_t, i, total) => (total - i - 1) * duration * 0.05,
      easing: 'cubicBezier(0.2, 1, 0.1, 1)',
      d: (_t, i) => this.descriptions[i]
    }).finished
  }

  hide(duration: number): void {
    anime.remove(this.layers)
    anime({
      targets: this.layers,
      duration,
      delay: (_t, i, total) => (total - i - 1) * duration * 0.08,
      easing: 'easeInOutExpo',
      scale: 0,
      opacity: {
        value: 0,
        duration: duration * 0.6,
        delay: (_t, i, total) => (total - i - 1) * duration * 0.08,
        easing: 'linear'
      }
    })
  }

  show(delay: number, duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => this.intro(duration).then(resolve), delay)
    })
  }
}

export function useBlobMenu(slugs: Ref<string[]>) {
  const isOpen = ref(false)
  const hoveredIndex = ref<number | null>(null)
  const openedIndex = ref<number | null>(null)
  const introSkipped = ref(false)

  const route = useRoute()
  const router = useRouter()

  const reducedMotion = prefersReducedMotion()
  const duration = (ms: number) => (reducedMotion ? 1 : ms)

  let svgEl: SVGSVGElement | null = null
  let contentEl: HTMLElement | null = null
  let contentSections: HTMLElement[] = []
  let blobs: MenuBlob[] = []
  let currentIndex = -1
  let isBusy = true
  let introRequested = false
  let introStarted = false

  let warpStrength = 0
  let warpTarget = 0
  const pointer = { x: 0, y: 0 }
  const parallax = { x: 0, y: 0 }
  let frame = 0

  const tick = (now: number) => {
    if (warpTarget > 0) {
      warpStrength += (warpTarget - warpStrength) * 0.02
      blobs.forEach((blob) => blob.warp(now / 1000, warpStrength))
    }

    parallax.x += (pointer.x - parallax.x) * POINTER_EASING
    parallax.y += (pointer.y - parallax.y) * POINTER_EASING
    svgEl?.style.setProperty('--parallax-x', parallax.x.toFixed(3))
    svgEl?.style.setProperty('--parallax-y', parallax.y.toFixed(3))

    frame = requestAnimationFrame(tick)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (isOpen.value) return
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
  }

  const startWarp = () => {
    warpStrength = 0
    warpTarget = reducedMotion ? 0 : 1
  }

  const stopWarp = () => {
    warpStrength = 0
    warpTarget = 0
  }

  const sectionKey = (index: number) =>
    slugs.value[index] || `section-${index + 1}`

  const sectionIndexFromHash = () => {
    const key = decodeURIComponent(route.hash.slice(1))
    if (!key) return -1
    return blobs.findIndex((_, index) => sectionKey(index) === key)
  }

  /** Brings the open section in line with the URL hash once animations allow */
  function syncWithLocation(): void {
    if (isBusy) return

    const target = sectionIndexFromHash()
    if (target === currentIndex) return

    if (isOpen.value) close()
    else if (target >= 0) open(target)
  }

  function settle(): void {
    isBusy = false
    syncWithLocation()
  }

  function playIntro(): void {
    if (introStarted) return
    if (!blobs.length) {
      introRequested = true
      return
    }

    introStarted = true
    Promise.all(blobs.map((blob) => blob.intro(duration(1800)))).then(() => {
      startWarp()
      settle()
    })
  }

  function highlight(index: number | null): void {
    if (isOpen.value || hoveredIndex.value === index) return

    const previous = hoveredIndex.value
    hoveredIndex.value = index
    if (isBusy || reducedMotion) return

    if (previous !== null) blobs[previous]?.emphasize(false)
    if (index !== null) blobs[index]?.emphasize(true)
  }

  function open(index: number): void {
    const blob = blobs[index]
    const section = contentSections[index]
    if (isBusy || isOpen.value || !blob || !section || !contentEl) return

    isBusy = true
    isOpen.value = true
    hoveredIndex.value = null
    currentIndex = index
    pointer.x = 0
    pointer.y = 0
    stopWarp()

    const content = contentEl
    blob.expand(duration(650)).then(() => {
      content.style.pointerEvents = 'auto'
      section.style.pointerEvents = 'auto'
      section.style.opacity = '1'
      openedIndex.value = index

      const targets = [
        section.querySelector('.content-section__close'),
        section.querySelector('.content-section__title'),
        section.querySelector('.content-section__subtitle'),
        section.querySelector('.content-section__body')
      ].filter(Boolean)

      anime({
        targets,
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(duration(70)),
        duration: duration(500),
        easing: 'easeOutCubic',
        complete: settle
      })
    })

    blobs
      .filter((_, i) => i !== index)
      .forEach((other) => other.hide(duration(600)))
  }

  function close(): void {
    const blob = blobs[currentIndex]
    const section = contentSections[currentIndex]
    if (isBusy || !isOpen.value || !blob || !section || !contentEl) return

    isBusy = true
    openedIndex.value = null
    const content = contentEl

    anime({
      targets: section.querySelectorAll(
        '.content-section__close, .content-section__title, .content-section__subtitle, .content-section__body'
      ),
      duration: duration(200),
      easing: 'easeInQuad',
      opacity: 0,
      complete: () => {
        section.style.opacity = '0'
        section.style.pointerEvents = 'none'
        content.style.pointerEvents = 'none'
      }
    })

    setTimeout(() => {
      isOpen.value = false
    }, duration(600))

    const collapsed = blob.collapse(duration(700))
    const shown = blobs
      .filter((other) => other !== blob)
      .map((other) => other.show(duration(200), duration(1000)))

    currentIndex = -1

    Promise.all([collapsed, ...shown]).then(() => {
      startWarp()
      settle()
    })
  }

  function openSection(index: number): void {
    if (isBusy || isOpen.value) return
    open(index)
    router.push({ hash: `#${sectionKey(index)}` })
  }

  function requestClose(): void {
    if (isBusy || !isOpen.value) return

    // The section was opened from this page: step back so Back/Forward stay meaningful
    const pageWithoutHash = route.fullPath.replace(route.hash, '')
    if (window.history.state?.back === pageWithoutHash) {
      router.back()
      return
    }

    close()
    router.replace({ hash: '' })
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') requestClose()
  }

  const onBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) requestClose()
  }

  onMounted(() => {
    svgEl = document.querySelector<SVGSVGElement>('.svg-scene')
    contentEl = document.querySelector<HTMLElement>('.js-app-content-main')
    if (!svgEl || !contentEl) return

    blobs = Array.from(
      svgEl.querySelectorAll<SVGGElement>('g'),
      (el, index) => new MenuBlob(el, index)
    )
    contentSections = Array.from(
      contentEl.querySelectorAll<HTMLElement>('.content-section')
    )

    window.addEventListener('keydown', onKeydown)
    contentEl.addEventListener('click', onBackdropClick)

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove)
      frame = requestAnimationFrame(tick)
    }

    const initialIndex = sectionIndexFromHash()
    if (initialIndex >= 0) {
      introStarted = true
      introSkipped.value = true
      isBusy = false
      open(initialIndex)
    } else if (introRequested) {
      playIntro()
    }
  })

  watch(() => route.hash, syncWithLocation)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('keydown', onKeydown)
    contentEl?.removeEventListener('click', onBackdropClick)
  })

  return {
    isOpen,
    hoveredIndex,
    openedIndex,
    introSkipped,
    playIntro,
    highlight,
    openSection,
    closeHandler: requestClose
  }
}
