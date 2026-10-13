<script lang="ts" setup>
import SplitType from 'split-type'
import anime from 'animejs'

const { data: globalSettings } = useGlobalSettings()

const isPageLoaded = ref<boolean>(false)

onMounted(() => {
  new SplitType('.header__title', { types: 'chars' })
  new SplitType('.header__text', { types: 'chars' })

  isPageLoaded.value = true

  const tl = anime.timeline({
    easing: 'easeOutExpo'
  })

  tl.add({
    targets: '.header__title .char',
    opacity: [0, 1],
    rotateY: [90, 0],
    easing: 'easeOutQuad',
    delay: anime.stagger(100),
    duration: 400
  }).add(
    {
      targets: '.header__text .char',
      opacity: [0, 1],
      rotateY: [90, 0],
      easing: 'easeOutQuad',
      delay: anime.stagger(60),
      duration: 200
    },
    '-=400'
  )
})
</script>

<template>
  <header class="header">
    <div v-show="isPageLoaded" class="header__inner">
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
  }

  &__title {
    font-weight: 600;
    font-size: 2.4rem;
    margin: 0 1.5rem 0 0;

    @include m.max-width(sm) {
      font-size: 2rem;
      margin-right: 1rem;
    }
  }

  &__text {
    font-size: 1.4rem;
    font-weight: 400;

    @include m.max-width(sm) {
      font-size: 1.2rem;
    }
  }

  &__title,
  &__text {
    .char {
      opacity: 0;
    }
  }
}
</style>
