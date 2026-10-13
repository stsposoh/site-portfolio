<template>
  <section class="info-card">
    <h3 class="info-card__title">{{ title }}</h3>
    <div class="info-card__body">
      <p class="info-card__header">
        <img
          v-if="logo"
          :src="logo"
          alt=""
          class="info-card__logo"
          width="32"
          height="32"
        />
        <a
          v-if="organizationUrl"
          :href="organizationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ organizationName }}
        </a>
        <template v-else>{{ organizationName }}</template>
      </p>
      <p v-if="meta" class="info-card__meta">{{ meta }}</p>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  organizationName: string
  organizationUrl?: string
  meta?: string
  logo?: string
}>()
</script>

<style lang="scss">
.info-card {
  margin-top: 2rem;

  &__title {
    margin: 0 0 1.2rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  &__body {
    padding: 1.5rem 1.8rem;
    background: #f8f7fa;
    border-radius: 1.2rem;
    border-left: 0.4rem solid v.$color-primary;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.04);

    a {
      color: #6f22b9;
      text-decoration: none;
      font-weight: 700;
      border-bottom: 0.1rem solid currentColor;

      &:hover {
        color: #3a3d98;
      }
    }

    p {
      margin-top: 0;
      margin-bottom: 7px;
      font-size: 1.4rem;
      color: #444;
    }
  }

  &__meta {
    margin: 0 0 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: v.$color-primary;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0 0 0.4rem;
  }

  &__logo {
    flex-shrink: 0;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 1.2rem;
    object-fit: cover;
  }
}
</style>
