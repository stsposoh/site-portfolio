/** Locale-aware Strapi request, keyed as `${name}-${locale}` */
export function useStrapiFetch<T>(name: string, path: string, query: Record<string, unknown> = {}) {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string
  const nuxtApp = useNuxtApp()
  const { locale } = useI18n()
  const localePath = useLocalePath()
  const key = computed(() => `${name}-${locale.value}`)

  return useAsyncData<T>(key, async () => {
    // A static build has no CMS: on a locale switch the locale changes before Nuxt
    // loads the target page's payload, so read that prerendered payload directly
    if (import.meta.client && nuxtApp.payload.prerenderedAt) {
      const payload = await loadPayload(localePath('/'))
      return payload?.data[key.value]
    }
    return $fetch<T>(`${apiUrl}${path}`, {
      query: { ...query, locale: locale.value }
    })
  })
}
