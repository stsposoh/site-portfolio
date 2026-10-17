<template>
  <nav class="lang-switcher" :aria-label="ui.languageLabel">
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="localePath(item.code)"
      class="lang-switcher__link"
      :class="{ '--active': item.code === locale }"
      :hreflang="item.language"
      :title="item.name"
      :aria-current="item.code === locale ? 'true' : undefined"
    >
      {{ shortName(item.code) }}
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
const SHORT_NAMES: Record<string, string> = { uk: 'UA' }

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { ui } = useGlobalSettings()

// The server never sees the URL hash, so it is added only after hydration
const isMounted = ref(false)
onMounted(() => (isMounted.value = true))

const localePath = (code: string) => {
  const path = switchLocalePath(code)
  return isMounted.value ? path : path.split('#')[0]
}

const shortName = (code: string) => SHORT_NAMES[code] ?? code.toUpperCase()
</script>

<style lang="scss">
.lang-switcher {
  display: flex;
  gap: 0.2rem;
  padding: 0.3rem;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(1.2rem);
  -webkit-backdrop-filter: blur(1.2rem);
  border: 0.1rem solid rgba(255, 255, 255, 0.14);
  border-radius: 99rem;

  &__link {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 99rem;
    transition:
      color 0.3s,
      background-color 0.3s;

    &.--active {
      color: #0a0816;
      background-color: #fff;
    }

    &:hover,
    &:focus-visible {
      color: #fff;
    }

    &.--active:hover,
    &.--active:focus-visible {
      color: #0a0816;
    }
  }
}
</style>
