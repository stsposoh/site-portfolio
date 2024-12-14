<script setup lang="ts">
import SplitType from 'split-type';
import anime from 'animejs';

const isPageLoaded = ref<boolean>(false);

onMounted(() => {
  new SplitType('.header__title', { types: 'chars' });
  new SplitType('.header__text', { types: 'chars' });

  isPageLoaded.value = true;

  const tl = anime.timeline({
    easing: 'easeOutExpo',
  });

  tl
    .add({
      targets: '.header__title .char',
      opacity: [0, 1],
      rotateY: [90, 0],
      easing: 'easeOutQuad',
      delay: anime.stagger(100),
      duration: 400
    })
    .add({
      targets: '.header__text .char',
      opacity: [0, 1],
      rotateY: [90, 0],
      easing: 'easeOutQuad',
      delay: anime.stagger(60),
      duration: 200
    }, '-=400')
});
</script>

<template>
  <header class="header">
    <div
      v-show="isPageLoaded"
      class="header__inner">
      <h1
        ref="headerRef"
        class="header__title">
        Stan Posokhov
      </h1>

      <div class="header__text">
        frontend developer
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
    max-width: 1100px;
    width: 100%;
    margin: auto;
    padding: 20px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    color: white;
  }

  &__title {
    font-weight: 300;
    font-size: 23px;
    margin: 0 15px 0 0;
  }

  &__text {
    font-size: 14px;
    font-weight: 100;
  }

  &__title,
  &__text {
    .char {
      opacity: 0;
    }
  }
}
</style>
