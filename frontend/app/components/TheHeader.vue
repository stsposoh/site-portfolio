<script lang="ts" setup>
import SplitType from 'split-type'
import anime from 'animejs'
import { prefersReducedMotion } from '~/utils/motion'

const props = defineProps<{
  revealed?: boolean
}>()

const { data: globalSettings } = useGlobalSettings()

let chars: HTMLElement[] = []

function revealText() {
  anime({
    targets: chars,
    opacity: [0, 1],
    rotateY: [90, 0],
    easing: 'easeOutQuad',
    delay: anime.stagger(prefersReducedMotion() ? 0 : 40),
    duration: prefersReducedMotion() ? 1 : 300
  })
}

onMounted(() => {
  chars = new SplitType('.header__text', { types: 'chars' }).chars ?? []
  if (props.revealed) revealText()
})

watch(
  () => props.revealed,
  (revealed) => {
    if (revealed) revealText()
  }
)
</script>

<template>
  <header class="header">
    <div class="header__inner" :class="{ '--revealed': revealed }">
      <h1 class="header__title">
        {{ globalSettings?.headerTitle }}
      </h1>

      <div class="header__text">
        {{ globalSettings?.headerPosition }}
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  z-index: 4;
  left: 0;
  right: 0;
  top: 0;

  &__inner {
    max-width: 110rem;
    width: 100%;
    margin: auto;
    padding: 2rem 1.6rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    color: white;

    @include m.max-width(sm) {
      padding: 1.2rem 1.2rem;
    }

    &.--revealed {
      .header__title {
        visibility: visible;
      }

      .header__text {
        opacity: 1;
      }
    }
  }

  &__title {
    visibility: hidden;
    font-weight: 600;
    font-size: 2.4rem;
    margin: 0 1.5rem 0 0;

    @include m.max-width(sm) {
      font-size: 2rem;
      margin-right: 1rem;
    }
  }

  &__text {
    opacity: 0;
    font-size: 1.4rem;
    font-weight: 400;

    @include m.max-width(sm) {
      font-size: 1.2rem;
    }
  }

  &__text .char {
    opacity: 0;
  }
}
</style>
