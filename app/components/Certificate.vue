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
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6f22b9;
  }

  &__img {
    display: block;
    width: 200px;
    height: auto;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>
