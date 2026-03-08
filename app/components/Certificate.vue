<template>
  <button
    type="button"
    class="certificate"
    @click="$emit('click')"
  >
    <img
      class="certificate__img"
      :src="thumbSrc"
      :alt="alt"
      loading="lazy"
    />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  thumbSrc: string
  fullSrc: string
  alt: string
}>()

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.certificate {
  display: block;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0;
  border-radius: 0.8rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem #6f22b9;
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.15);
  }
}
</style>
