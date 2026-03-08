import anime from 'animejs'

interface DOMRect {
  left: number
  top: number
  width: number
  height: number
}

/** Debounce function with proper TypeScript typing */
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- required for proper `this` binding in closure
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/** Animated blob element for menu navigation */
class MenuBlob {
  private DOM: { el: Element }
  private rect!: DOMRect
  private descriptions: string[] = []
  private layers: SVGPathElement[] = []

  constructor(el: Element) {
    this.DOM = { el }
    this.init()
  }

  private init(): void {
    this.rect = (this.DOM.el as HTMLElement).getBoundingClientRect()
    this.layers = Array.from(this.DOM.el.querySelectorAll('path'), (path) => {
      const p = path as SVGPathElement
      const originX = this.rect.left + this.rect.width / 2
      const originY = this.rect.top + this.rect.height / 2
      p.style.transformOrigin = `${originX}px ${originY}px`
      p.style.opacity = '0'
      const d = p.getAttribute('d')
      this.descriptions.push(d ?? '')
      return p
    })

    window.addEventListener(
      'resize',
      debounce(() => {
        this.rect = (this.DOM.el as HTMLElement).getBoundingClientRect()
        const originX = this.rect.left + this.rect.width / 2
        const originY = this.rect.top + this.rect.height / 2
        this.layers.forEach(
          (layer) => (layer.style.transformOrigin = `${originX}px ${originY}px`)
        )
      }, 20)
    )
  }

  intro(): Promise<void> {
    return new Promise((resolve) => {
      anime.remove(this.layers)
      anime({
        targets: this.layers,
        duration: 1800,
        delay: (_t, i) => i * 120,
        easing: 'cubicBezier(0.2, 1, 0.1, 1)',
        scale: [0.2, 1],
        opacity: {
          value: [0, 1],
          duration: 300,
          delay: (_t, i) => i * 120,
          easing: 'linear'
        },
        complete: () => resolve()
      })
    })
  }

  expand(): Promise<void> {
    return new Promise((resolve) => {
      this.layers.forEach((layer) => {
        layer.style.opacity = '1'
        ;(layer as HTMLElement).style.transform = 'scale(1)'
      })

      anime({
        targets: this.layers,
        duration: 1000,
        delay: (_t, i) => i * 50 + 200,
        easing: 'cubicBezier(0.8, 0, 0.1, 0)',
        d: (el) => (el as SVGPathElement).getAttribute('pathdata:id'),
        complete: () => resolve()
      })
    })
  }

  collapse(): Promise<void> {
    return new Promise((resolve) => {
      anime({
        targets: this.layers,
        duration: 800,
        delay: (_t, i, total) => (total - i - 1) * 50 + 400,
        easing: 'cubicBezier(0.2, 1, 0.1, 1)',
        d: (_t, i) => this.descriptions[i],
        complete: () => resolve()
      })
    })
  }

  hide(): void {
    anime.remove(this.layers)
    anime({
      targets: this.layers,
      duration: 800,
      delay: (_t, i, total) => (total - i - 1) * 80,
      easing: 'easeInOutExpo',
      scale: 0,
      opacity: {
        value: 0,
        duration: 500,
        delay: (_t, i, total) => (total - i - 1) * 80,
        easing: 'linear'
      }
    })
  }

  show(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.intro().then(() => resolve())
      }, 400)
    })
  }

  breathe(): void {
    anime.remove(this.layers)
    this.layers.forEach((layer, i) => {
      anime({
        targets: layer,
        scale: [1, 1.035],
        duration: 3500 + Math.random() * 1500,
        delay: i * 200 + Math.random() * 500,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
      })
    })
  }

  stopBreathe(): void {
    anime.remove(this.layers)
  }
}

const MENU_TO_BLOB_INDEX = [0, 1, 2, 3, 4] as const

export function useBlobMenu() {
  const isOpen = ref(false)
  const animationInProgress = ref(false)
  const closeHandler = ref<() => void>(() => {})

  onMounted(() => {
    const svgEl = document.querySelector('.svg-scene')
    if (!svgEl) return

    const blobs: MenuBlob[] = []
    Array.from(svgEl.querySelectorAll('g')).forEach((el) => {
      const blob = new MenuBlob(el)
      blobs.push(blob)
      blob.intro().then(() => blob.breathe())
    })

    const contentEl = document.querySelector('.js-app-content-main')
    if (!contentEl) return

    const contentInner = Array.from(
      contentEl.querySelectorAll('.content-section')
    )
    const links = Array.from(document.querySelectorAll('.main-menu__link'))

    let currentIndex = -1

    links.forEach((link, pos) => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault()
        openSection(pos)
      })
    })

    function openSection(pos: number): void {
      isOpen.value = true
      animationInProgress.value = true
      currentIndex = pos

      const blobIndex = MENU_TO_BLOB_INDEX[pos]
      const currentBlob = blobs[blobIndex]
      const contentSection = contentInner[pos]
      const closeBtn = contentSection.querySelector('.content-section__close')

      currentBlob.stopBreathe()
      currentBlob.expand().then(() => {
        animationInProgress.value = false
        ;(contentEl as HTMLElement).style.pointerEvents = 'auto'
        ;(contentSection as HTMLElement).style.pointerEvents = 'auto'
        ;(contentSection as HTMLElement).style.opacity = '1'

        const toShow = [
          contentSection.querySelector('.content-section__title'),
          contentSection.querySelector('.content-section__subtitle'),
          contentSection.querySelector('.content-section__body'),
          closeBtn
        ].filter(Boolean)

        anime({
          targets: toShow,
          duration: 300,
          easing: 'easeOutQuad',
          opacity: [0, 1]
        })
      })

      blobs
        .filter((_, i) => i !== blobIndex)
        .forEach((blob) => {
          blob.stopBreathe()
          blob.hide()
        })
    }

    function close(): void {
      if (!isOpen.value) return
      animationInProgress.value = true

      const prevIndex = currentIndex
      const prevBlobIndex = MENU_TO_BLOB_INDEX[prevIndex]
      const blobToCollapse = blobs[prevBlobIndex]
      const contentSection = contentInner[prevIndex]
      const closeBtn = contentSection.querySelector('.content-section__close')

      const toHide = [
        contentSection.querySelector('.content-section__title'),
        contentSection.querySelector('.content-section__subtitle'),
        contentSection.querySelector('.content-section__body'),
        closeBtn
      ].filter(Boolean)

      anime({
        targets: toHide,
        duration: 200,
        easing: 'easeInQuad',
        opacity: 0,
        complete: () => {
          ;(contentSection as HTMLElement).style.opacity = '0'
          ;(contentSection as HTMLElement).style.pointerEvents = 'none'
          ;(contentEl as HTMLElement).style.pointerEvents = 'none'
        }
      })

      setTimeout(() => {
        isOpen.value = false
      }, 1000)

      const collapsePromise = blobToCollapse.collapse()
      const showPromises = blobs
        .filter((_, i) => i !== prevBlobIndex)
        .map((blob) => blob.show())

      currentIndex = -1

      Promise.all([collapsePromise, ...showPromises]).then(() => {
        animationInProgress.value = false
        blobs.forEach((blob) => blob.breathe())
      })
    }

    closeHandler.value = close
  })

  return {
    isOpen,
    closeHandler,
    animationInProgress
  }
}
