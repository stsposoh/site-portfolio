<template>
  <li class="portfolio-card">
    <div
      class="portfolio-card__preview"
      :style="{ backgroundImage: `url('${imgSrcSmall}')` }"
    >
      <button
        type="button"
        class="portfolio-card__zoom"
        @click="$emit('open-preview')"
      >
        Увеличить
      </button>
    </div>
    <div class="portfolio-card__body">
      <h3 class="portfolio-card__title">{{ siteName }}</h3>
      <p class="portfolio-card__desc">{{ desc }}</p>
      <a
        v-if="linkTo"
        :href="linkTo"
        target="_blank"
        rel="noopener noreferrer"
        class="portfolio-card__link"
      >
        Перейти на сайт
      </a>
    </div>
  </li>
</template>

<script lang="ts" setup>
defineProps<{
  imgSrcBig: string
  imgSrcSmall: string
  linkTo: string
  siteName: string
  desc?: string
}>()

defineEmits<{
  'open-preview': []
}>()
</script>

<style lang="scss" scoped>
.portfolio-card {
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  margin: 0;
  background: #fff;
  border: 0.1rem solid v.$color-border;
  border-radius: 1.2rem;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.2s;

  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.12);
  }

  &__preview {
    position: relative;
    height: 13.9rem;
    background-size: cover;
    background-position: center;
    background-color: #f4f4f4;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 40%);
      pointer-events: none;
    }
  }

  &__zoom {
    position: absolute;
    bottom: 1rem;
    left: 1.2rem;
    z-index: 1;
    padding: 0.6rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    background: rgba(222, 45, 62, 0.9);
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: #de2d3e;
      transform: scale(1.03);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(222, 45, 62, 0.4);
    }
  }

  &__body {
    padding: 1.2rem 1.4rem 1.6rem;
  }

  &__title {
    margin: 0 0 0.35em;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  &__desc {
    margin: 0 0 0.75rem;
    font-size: 1.4rem;
    line-height: 1.4;
    color: #555;
  }

  &__link {
    font-size: 1.3rem;
    font-weight: 600;
    color: #de2d3e;
    text-decoration: none;
    border-bottom: 0.1rem solid currentColor;
    transition: color 0.2s;

    &:hover {
      color: #b83c85;
    }
  }
}
</style>
