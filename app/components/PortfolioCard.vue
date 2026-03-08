<template>
  <li class="portfolio-card">
    <div class="portfolio-card__preview" :style="{ backgroundImage: `url('${imgSrcSmall}')` }">
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
$accent: #6f22b9;
$border: #e8e6ef;

.portfolio-card {
  width: 290px;
  margin: 0;
  background: #fff;
  border: 1px solid $border;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    border-color: #d0cce0;
    box-shadow: 0 4px 16px rgba(111, 34, 185, 0.08);
  }
}

.portfolio-card__preview {
  position: relative;
  height: 139px;
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

.portfolio-card__zoom {
  position: absolute;
  bottom: 10px;
  left: 12px;
  z-index: 1;
  padding: 0.35rem 0.75rem;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  color: #fff;
  background: rgba(111, 34, 185, 0.9);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $accent;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(111, 34, 185, 0.4);
  }
}

.portfolio-card__body {
  padding: 12px 14px 16px;
}

.portfolio-card__title {
  margin: 0 0 0.35em;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.portfolio-card__desc {
  margin: 0 0 0.75rem;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
}

.portfolio-card__link {
  font-size: 13px;
  font-weight: 600;
  color: $accent;
  text-decoration: none;
  border-bottom: 1px solid currentColor;

  &:hover {
    color: #3a3d98;
  }
}
</style>
