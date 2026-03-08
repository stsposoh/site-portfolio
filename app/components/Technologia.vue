<template>
  <li class="technologia">
    <div class="technologia__item-back">
      <img :src="src" :alt="title" loading="lazy" />
    </div>
    <div class="technologia__item-front">
      <span class="technologia__item-front-text">{{ title }}</span>
    </div>
  </li>
</template>

<script lang="ts" setup>
defineProps<{
  src: string
  title: string
}>()
</script>

<style lang="scss" scoped>
$size: 80px;
$border-color: #e0dde8;
$accent-color: #6f22b9;

.technologia {
  position: relative;
  height: $size;
  width: $size;
  margin: 8px;
  border: 1px solid $border-color;
  border-radius: 50%;
  transform-style: preserve-3d;

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
    padding: 15px;
  }

  &__item-front {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate3d(0, 1, 0, 180deg);

    &-text {
      margin: 0;
      font-size: 14px;
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
