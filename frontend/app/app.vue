<template>
  <!-- A fixed key keeps the page mounted when the locale prefix changes -->
  <NuxtPage page-key="index" />
</template>

<script lang="ts" setup>
const localeHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang },
  link: localeHead.value.link,
  meta: localeHead.value.meta
}))
</script>
