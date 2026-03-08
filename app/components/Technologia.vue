<template>
  <li class="technologia" :class="{ 'technologia--main': isMain }" :style="animationStyle">
    <div class="technologia__item-back">
      <img :src="src" :alt="title" loading="lazy" />
    </div>
    <div class="technologia__item-front">
      <span class="technologia__item-front-text">{{ title }}</span>
    </div>
  </li>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src: string
    title: string
    isMain?: boolean
    animationDelay?: number
  }>(),
  { animationDelay: 0 }
)

const animationStyle = computed(() => ({
  animationDelay: `${props.animationDelay}ms`
}))
</script>

<style lang="scss" scoped>
$size: 8rem;
$border-color: #e0dde8;
$accent-color: #6f22b9;

.technologia {
  position: relative;
  height: $size;
  width: $size;
  margin: 0.8rem;
  border: 0.1rem solid $border-color;
  border-radius: 50%;
  transform-style: preserve-3d;
  opacity: 0;
  animation: technologiaFadeIn 0.4s ease forwards;

  &--main {
    border-color: rgba(111, 34, 185, 0.4);
    box-shadow: 0 0 0 0.15rem rgba(111, 34, 185, 0.15);

    .technologia__item-front-text {
      color: #6f22b9;
      font-weight: 700;
    }
  }

  &:hover {
    .technologia__item-back {
      transform: rotate3d(0, 1, 0, 180deg);
    }

    .technologia__item-front {
      transform: rotate3d(0, 1, 0, 0deg);
    }
  }

  &__item-back,
  &__item-front {
    position: absolute;
    inset: 0;
    width: $size;
    height: $size;
    border-radius: 50%;
    transition: transform 0.8s ease;
    backface-visibility: hidden;
  }

  &__item-back {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  &__item-front {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate3d(0, 1, 0, 180deg);

    &-text {
      margin: 0;
      font-size: 1.4rem;
      line-height: 1.2;
      color: $accent-color;
      font-weight: 600;
      text-align: center;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    object-fit: contain;
  }
}
</style>

<style lang="scss">
@keyframes technologiaFadeIn {
  to {
    opacity: 1;
  }
}
</style>
