<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition :css="false" @enter="onEnter" @leave="onLeave">
        <div
          v-if="open"
          class="image-viewer"
          role="dialog"
          aria-modal="true"
          :aria-label="ui.imageViewerLabel"
          @click.self="close"
        >
          <button
            type="button"
            class="image-viewer__button --close"
            :aria-label="ui.closeLabel"
            @click="close"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            v-if="canPrev"
            type="button"
            class="image-viewer__button --prev"
            :aria-label="ui.previousImageLabel"
            @click="go(-1)"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            v-if="canNext"
            type="button"
            class="image-viewer__button --next"
            :aria-label="ui.nextImageLabel"
            @click="go(1)"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div
            class="image-viewer__content"
            :class="{
              '--scrollable': props.scrollable,
              '--swipeable': canPrev || canNext
            }"
            @pointerdown="onSwipeStart"
            @pointerup="onSwipeEnd"
          >
            <img
              v-if="src"
              :key="src"
              :src="src"
              :alt="alt"
              class="image-viewer__img"
              :class="{ '--full-height': props.scrollable }"
              draggable="false"
              @click.stop
            />
          </div>
        </div>
      </Transition>
    </Teleport>
    <template #fallback />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { prefersReducedMotion } from '~/utils/motion'

const props = withDefaults(
  defineProps<{
    open: boolean
    src: string
    alt?: string
    /** Режим для высоких изображений (скрины): контент можно скроллить */
    scrollable?: boolean
    /** Thumbnail rect to zoom from and back to */
    originRect?: DOMRect | null
    canPrev?: boolean
    canNext?: boolean
  }>(),
  { scrollable: false, originRect: null, canPrev: false, canNext: false }
)

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

const { ui } = useGlobalSettings()

const SWIPE_THRESHOLD = 50
const EASING = 'cubic-bezier(0.2, 1, 0.3, 1)'

let swipeStartX: number | null = null
let lastDirection = 0

function close() {
  emit('close')
}

function go(direction: -1 | 1) {
  if (direction < 0 ? !props.canPrev : !props.canNext) return
  lastDirection = direction
  if (direction < 0) emit('prev')
  else emit('next')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') go(-1)
  if (e.key === 'ArrowRight') go(1)
  if (e.key !== 'Escape') return
  // Keeps the same Escape press from also closing the section underneath
  e.stopPropagation()
  close()
}

function onSwipeStart(e: PointerEvent) {
  swipeStartX = e.clientX
}

function onSwipeEnd(e: PointerEvent) {
  if (swipeStartX === null) return
  const distance = e.clientX - swipeStartX
  swipeStartX = null

  if (distance > SWIPE_THRESHOLD) go(-1)
  if (distance < -SWIPE_THRESHOLD) go(1)
}

/** Long screenshots fly as their scroll frame, everything else as the image itself */
const flyingElement = (viewer: HTMLElement) =>
  viewer.querySelector<HTMLElement>(
    props.scrollable ? '.image-viewer__content' : '.image-viewer__img'
  )

/** Keyframe that places the flying element over the thumbnail it was opened from */
function originKeyframe(el: HTMLElement): Keyframe | null {
  const origin = props.originRect
  const rect = el.getBoundingClientRect()
  if (!origin || !rect.width) return null

  const scale = origin.width / rect.width

  // Long screenshots are shown from the top both in the card and in the viewer
  if (props.scrollable) {
    return {
      transform: `translate(${origin.left - rect.left}px, ${origin.top - rect.top}px) scale(${scale})`,
      transformOrigin: '0 0'
    }
  }

  const dx = origin.left + origin.width / 2 - (rect.left + rect.width / 2)
  const dy = origin.top + origin.height / 2 - (rect.top + rect.height / 2)
  return {
    transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
    transformOrigin: '50% 50%'
  }
}

const animationDuration = (ms: number) => (prefersReducedMotion() ? 1 : ms)

async function onEnter(el: Element, done: () => void) {
  const viewer = el as HTMLElement
  viewer.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: animationDuration(300),
    easing: 'ease'
  })

  const img = viewer.querySelector<HTMLImageElement>('.image-viewer__img')
  const flying = flyingElement(viewer)
  if (!img || !flying) return done()

  img.style.opacity = '0'
  await img.decode().catch(() => {})
  img.style.opacity = ''

  const from = originKeyframe(flying)
  const keyframes = from
    ? [from, { transform: 'none', transformOrigin: from.transformOrigin }]
    : [
        { transform: 'scale(0.95)', opacity: 0 },
        { transform: 'none', opacity: 1 }
      ]

  flying
    .animate(keyframes, {
      duration: animationDuration(from ? 550 : 250),
      easing: EASING
    })
    .finished.then(done, done)
}

function onLeave(el: Element, done: () => void) {
  const viewer = el as HTMLElement
  const flying = flyingElement(viewer)
  const to = flying ? originKeyframe(flying) : null
  const duration = animationDuration(to ? 450 : 250)

  viewer
    .animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: 'ease',
      fill: 'forwards'
    })
    .finished.then(done, done)

  flying?.animate(
    to
      ? [{ transform: 'none', transformOrigin: to.transformOrigin }, to]
      : [{ transform: 'none' }, { transform: 'scale(0.95)' }],
    { duration, easing: EASING, fill: 'forwards' }
  )
}

watch(
  () => props.src,
  (src, previous) => {
    if (!props.open || !previous || !src) return
    nextTick(() => {
      document.querySelector('.image-viewer__content')?.scrollTo(0, 0)
      document.querySelector('.image-viewer__img')?.animate(
        [
          { opacity: 0, transform: `translateX(${lastDirection * 4}rem)` },
          { opacity: 1, transform: 'none' }
        ],
        { duration: animationDuration(400), easing: EASING }
      )
    })
  }
)

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss">
.image-viewer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.85);
  cursor: zoom-out;

  &__button {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.4rem;
    height: 4.4rem;
    padding: 0;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border: 0.1rem solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;

    &.--close {
      top: 1.6rem;
      right: 1.6rem;
    }

    &.--prev,
    &.--next {
      top: 50%;
      transform: translateY(-50%);
    }

    &.--prev {
      left: 1.6rem;
    }

    &.--next {
      right: 1.6rem;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.22);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
    }
  }

  &__content {
    max-width: 90vw;
    max-height: 90vh;
    cursor: default;

    &.--swipeable {
      touch-action: pan-y;
    }

    &.--scrollable {
      overflow-x: auto;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }
  }

  &__img {
    display: block;
    max-width: 100%;
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 0.8rem;
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.4);
    user-select: none;

    &.--full-height {
      max-height: none;
    }
  }
}
</style>
