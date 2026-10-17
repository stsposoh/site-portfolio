<template>
  <button
    type="button"
    class="certificate"
    @click="emit('open', ($event.currentTarget as HTMLElement).getBoundingClientRect())"
    @pointermove="applyTilt($event, 12)"
    @pointerleave="resetTilt"
  >
    <img
      class="certificate__img"
      :src="src"
      :srcset="srcset"
      sizes="(min-width: 1280px) 22rem, (min-width: 768px) 30vw, 50vw"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
    />
  </button>
</template>

<script lang="ts" setup>
import { applyTilt, resetTilt } from '~/utils/tilt'

defineProps<{
  src: string
  srcset: string
  alt: string
  width: number
  height: number
}>()

const emit = defineEmits<{
  open: [rect: DOMRect]
}>()
</script>

<style lang="scss">
.certificate {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 0;
  background: none;
  border: 0.1rem solid rgba(255, 255, 255, 0.14);
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
  cursor: zoom-in;
  transform: perspective(80rem) rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));
  transition:
    transform 0.4s cubic-bezier(0.2, 1, 0.3, 1),
    box-shadow 0.4s,
    border-color 0.3s;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--glare-x, 50%) var(--glare-y, 50%),
      rgba(255, 255, 255, 0.35),
      transparent 55%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 1.6rem 4rem color-mix(in srgb, var(--accent) 30%, transparent);

    &::after {
      opacity: 1;
    }
  }

  &:focus {
    outline: none;
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
