<template>
  <div class="content-section" :class="`--${color}`">
    <button
      class="content-section__close"
      type="button"
      aria-label="Close"
      @click="$emit('close')"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>

    <div class="content-section__scroll">
      <header
        v-if="title || subtitle || image"
        class="content-section__header"
      >
        <div v-if="image" class="content-section__header-media">
          <img
            :src="image"
            :alt="imageAlt ?? ''"
            width="120"
            height="120"
            loading="lazy"
          />
        </div>
        <div class="content-section__header-text">
          <h2 v-if="title" class="content-section__title">{{ title }}</h2>
          <p v-if="subtitle" class="content-section__subtitle">{{ subtitle }}</p>
        </div>
      </header>

      <div class="content-section__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  color: 'purple' | 'teal' | 'orange' | 'coral' | 'mint'
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  active?: boolean
}>()

provide(SECTION_ACTIVE_KEY, toRef(props, 'active'))

defineEmits<{
  close: []
}>()
</script>

<style lang="scss">
.content-section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 3.2rem);
  max-width: 120rem;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.85);
  background-color: rgba(10, 8, 22, 0.55);
  backdrop-filter: blur(2.4rem) saturate(140%);
  -webkit-backdrop-filter: blur(2.4rem) saturate(140%);
  border: 0.1rem solid rgba(255, 255, 255, 0.14);
  border-radius: 2rem;
  box-shadow:
    0 3rem 8rem rgba(0, 0, 0, 0.35),
    inset 0 0.1rem 0 rgba(255, 255, 255, 0.12);

  &.--purple {
    --accent: #c9a7ff;
  }

  &.--teal {
    --accent: #5ee9d0;
  }

  &.--orange {
    --accent: #ffc46b;
  }

  &.--coral {
    --accent: #ff8fa3;
  }

  &.--mint {
    --accent: #6ff2c4;
  }

  &__close {
    position: absolute;
    z-index: 2;
    top: 1.2rem;
    right: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.4rem;
    height: 4.4rem;
    padding: 0;
    color: #fff;
    background-color: rgba(10, 8, 22, 0.6);
    backdrop-filter: blur(1.2rem);
    -webkit-backdrop-filter: blur(1.2rem);
    border: 0.1rem solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;

    @include m.min-width(md) {
      top: 2rem;
      right: 2rem;
    }

    svg {
      transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
    }

    &:hover,
    &:focus-visible {
      background-color: color-mix(in srgb, var(--accent) 25%, transparent);
      border-color: var(--accent);

      svg {
        transform: rotate(90deg);
      }
    }

    &:focus {
      outline: none;
    }
  }

  &__scroll {
    position: relative;
    z-index: 0;
    flex: 1;
    min-height: 0;
    padding: 5.5rem 2rem 2.5rem;
    overflow-y: auto;

    @include m.min-width(sm) {
      padding: 5.5rem 2.5rem 2.5rem;
    }

    @include m.min-width(md) {
      @include m.scrollbar-vertical(
        var(--accent),
        transparent,
        rgba(255, 255, 255, 0.9)
      );
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    margin: 0 0 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);

    @include m.min-width(sm) {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }
  }

  &__header-media {
    flex-shrink: 0;
    width: 8rem;
    height: 8rem;

    @include m.min-width(sm) {
      width: 10rem;
      height: 10rem;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 1.6rem;
      object-fit: cover;
      border: 0.2rem solid var(--accent);
    }
  }

  &__header-text {
    flex: 1;
    min-width: 0;
  }

  &__title,
  &__subtitle,
  &__body {
    opacity: 0;
  }

  &__title {
    margin: 0 0 0.35em;
    font-size: clamp(2.6rem, 4vw, 3.6rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    margin: 0;
    font-size: clamp(1.5rem, 2vw, 1.7rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.4;
  }

  &__body {
    font-size: 1.5rem;
    line-height: 1.65;
  }

  &__list {
    margin: 0 0 1em;
    padding-left: 2.2rem;
    list-style: none;

    :deep(li) {
      position: relative;
      margin-bottom: 0.5em;
      padding-left: 0.8rem;

      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.9rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #6f22b9;
      }
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__card {
    padding: 1.6rem 2rem;
    background: #f5f4f8;
    border-radius: 1.2rem;
    border: 0.1rem solid #e8e6ef;
    font-size: 1.4rem;
    color: #444;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:hover {
      border-color: #d0cce0;
      box-shadow: 0 0.2rem 0.8rem rgba(111, 34, 185, 0.06);
    }

    :deep(strong) {
      color: #1a1a1a;
    }
  }
}

// Zero-specificity defaults, so section components can override them
:where(.content-section__body) {
  p {
    margin: 0 0 1em;
  }

  a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 0.1rem solid currentColor;

    &:hover {
      color: #fff;
    }
  }
}
</style>
