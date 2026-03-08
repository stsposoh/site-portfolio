<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="viewer">
      <div
        v-if="open"
        class="image-viewer"
        role="dialog"
        aria-modal="true"
        aria-label="Просмотр изображения"
        @click.self="close"
      >
        <button
          type="button"
          class="image-viewer__close"
          aria-label="Закрыть"
          @click="close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div class="image-viewer__content" :class="{ '--scrollable': props.scrollable }">
          <img
            v-if="src"
            :src="src"
            :alt="alt"
            class="image-viewer__img"
            :class="{ '--full-height': props.scrollable }"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </Teleport>
  <template #fallback />
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    open: boolean
    src: string
    alt?: string
    /** Режим для высоких изображений (скрины): контент можно скроллить */
    scrollable?: boolean
  }>(),
  { scrollable: false }
)

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss" scoped>
.image-viewer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.85);
  cursor: zoom-out;

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
    }
  }

  &__content {
    max-width: 90vw;
    max-height: 90vh;
    cursor: default;

    &.--scrollable {
      overflow-x: auto;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }
  }

  &__img {
    display: block;
    max-width: 100%;
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 0.8rem;
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.4);

    &.--full-height {
      max-height: none;
    }
  }
}

.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.25s ease;
}
.viewer-enter-active .image-viewer__content,
.viewer-leave-active .image-viewer__content {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}
.viewer-enter-from .image-viewer__content,
.viewer-leave-to .image-viewer__content {
  transform: scale(0.95);
}
</style>
