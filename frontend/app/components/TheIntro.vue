<script lang="ts" setup>
import SplitType from 'split-type'
import anime from 'animejs'
import { prefersReducedMotion } from '~/utils/motion'

const props = defineProps<{
  title?: string
  targetSelector: string
}>()

const emit = defineEmits<{
  start: []
  land: []
}>()

const titleEl = ref<HTMLElement | null>(null)
const isReady = ref(false)

const fontSize = (el: Element) => parseFloat(getComputedStyle(el).fontSize)

onMounted(async () => {
  const el = titleEl.value
  const target = document.querySelector(props.targetSelector)

  if (prefersReducedMotion() || !el || !target || !props.title) {
    emit('start')
    emit('land')
    return
  }

  const { chars } = new SplitType(el, { types: 'chars' })
  isReady.value = true

  await anime({
    targets: chars,
    opacity: [0, 1],
    translateY: ['0.5em', 0],
    rotateX: [-80, 0],
    delay: anime.stagger(45),
    duration: 900,
    easing: 'easeOutExpo'
  }).finished

  const from = el.getBoundingClientRect()
  const to = target.getBoundingClientRect()

  emit('start')

  await anime({
    targets: el,
    translateX: to.left - from.left,
    translateY: to.top - from.top,
    scale: fontSize(target) / fontSize(el),
    delay: 250,
    duration: 1000,
    easing: 'easeInOutExpo'
  }).finished

  emit('land')
})
</script>

<template>
  <div class="intro" aria-hidden="true">
    <span
      ref="titleEl"
      class="intro__title"
      :class="{ '--ready': isReady }"
      >{{ title }}</span
    >
  </div>
</template>

<style lang="scss">
.intro {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &__title {
    font-size: clamp(4rem, 10vw, 12rem);
    font-weight: 600;
    color: white;
    white-space: nowrap;
    transform-origin: 0 0;
    opacity: 0;
    perspective: 60rem;

    &.--ready {
      opacity: 1;
    }

    .char {
      opacity: 0;
    }
  }
}
</style>
