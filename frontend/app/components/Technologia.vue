<template>
  <li class="technologia" :class="{ '--main': isMain }" :style="animationStyle">
    <img class="technologia__icon" :src="src" alt="" loading="lazy" />
    <span class="technologia__name">{{ title }}</span>
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

<style lang="scss">
.technologia {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 9.6rem;
  min-height: 9.6rem;
  padding: 1.4rem 0.8rem 1rem;
  border-radius: 1.6rem;
  background-color: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 0.1rem solid color-mix(in srgb, var(--accent) 60%, transparent);
  box-shadow: 0 1.2rem 3rem color-mix(in srgb, var(--accent) 25%, transparent);
  opacity: 0;

  &.--main {
    border-color: var(--accent);
  }

  &__icon {
    width: 3.6rem;
    height: 3.6rem;
    object-fit: contain;
  }

  &__name {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.2;
    text-align: center;
    color: #fff;
  }
}
</style>
