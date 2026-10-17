<template>
  <article class="portfolio-card" :style="{ '--scroll-duration': scrollDuration }">
    <div ref="previewEl" class="portfolio-card__preview">
      <img
        class="portfolio-card__img"
        :src="src"
        :srcset="srcset"
        sizes="(min-width: 1024px) 36rem, (min-width: 480px) 45vw, 90vw"
        alt=""
        :width="width"
        :height="height"
        loading="lazy"
      />
    </div>

    <div class="portfolio-card__body">
      <div class="portfolio-card__head">
        <h3 class="portfolio-card__title">
          <button
            type="button"
            class="portfolio-card__open"
            @click="openPreview"
          >
            {{ title }}
          </button>
        </h3>
        <a
          v-if="link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="portfolio-card__link"
          :aria-label="`Перейти на сайт ${title}`"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>

      <p v-if="description" class="portfolio-card__desc">{{ description }}</p>

      <ul v-if="technologies.length" class="portfolio-card__tags">
        <li
          v-for="technology in technologies"
          :key="technology.name"
          class="portfolio-card__tag"
        >
          <img
            v-if="technology.icon"
            :src="technology.icon"
            alt=""
            width="14"
            height="14"
          />
          {{ technology.name }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { ProjectTechnology } from '~/composables/useProjects'

const props = defineProps<{
  title: string
  description?: string
  link?: string
  src: string
  srcset: string
  width: number
  height: number
  technologies: ProjectTechnology[]
}>()

const emit = defineEmits<{
  open: [rect: DOMRect]
}>()

const PREVIEW_RATIO = 10 / 16

const previewEl = ref<HTMLElement | null>(null)

// Taller screenshots scroll longer on hover so the speed stays similar
const scrollDuration = computed(() => {
  const hiddenHeight = props.height / props.width - PREVIEW_RATIO
  return `${Math.min(Math.max(hiddenHeight * 2.5, 2), 12).toFixed(1)}s`
})

function openPreview() {
  if (previewEl.value) emit('open', previewEl.value.getBoundingClientRect())
}
</script>

<style lang="scss">
.portfolio-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.05);
  border: 0.1rem solid rgba(255, 255, 255, 0.12);
  border-radius: 1.6rem;
  transition:
    transform 0.4s cubic-bezier(0.2, 1, 0.3, 1),
    border-color 0.3s,
    box-shadow 0.4s;

  &:hover,
  &:focus-within {
    transform: translateY(-0.4rem);
    border-color: var(--accent);
    box-shadow: 0 1.6rem 4rem color-mix(in srgb, var(--accent) 25%, transparent);

    .portfolio-card__img {
      object-position: 50% 100%;
      transition-duration: var(--scroll-duration);
      transition-timing-function: ease-in-out;
    }
  }

  &__preview {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.06);
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 0;
    transition: object-position 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.4rem 1.6rem 1.6rem;
  }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.3;
    word-break: break-word;
  }

  &__open {
    padding: 0;
    font: inherit;
    color: #fff;
    text-align: left;
    background: none;
    border: none;
    cursor: zoom-in;

    // Stretches the click area over the whole card
    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }

    &:focus {
      outline: none;
    }
  }

  &__link {
    position: relative;
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.08);
    border: 0.1rem solid rgba(255, 255, 255, 0.16);
    border-radius: 50%;
    transition:
      background-color 0.3s,
      border-color 0.3s;

    &:hover,
    &:focus-visible {
      color: #fff;
      background-color: color-mix(in srgb, var(--accent) 30%, transparent);
      border-color: var(--accent);
    }
  }

  &__desc {
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.7);
  }

  &__tags {
    @include m.normalize-list;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: auto;
    padding-top: 0.4rem;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    background-color: color-mix(in srgb, var(--accent) 16%, transparent);
    border: 0.1rem solid color-mix(in srgb, var(--accent) 40%, transparent);
    border-radius: 99rem;

    img {
      width: 1.4rem;
      height: 1.4rem;
      object-fit: contain;
    }
  }
}
</style>
