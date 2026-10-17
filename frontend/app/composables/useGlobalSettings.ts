/** Nav item from Strapi global settings menu */
export interface GlobalSettingNavItem {
  id: number
  label: string
  slug?: string
}

/** Menu structure from Strapi */
export interface GlobalSettingMenu {
  id: number
  navItems: GlobalSettingNavItem[]
}

/** Global settings from Strapi API */
export interface GlobalSetting {
  id: number
  title: string
  description: string
  headerTitle: string
  headerPosition: string
  backButtonLabel: string
  menu: GlobalSettingMenu
}

/** Strapi single types return data in data property */
interface StrapiGlobalSettingResponse {
  data: GlobalSetting
}

export function useGlobalSettings() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  const { data: response, ...rest } = useFetch<StrapiGlobalSettingResponse>(
    `${apiUrl}/api/global-setting`,
    { key: 'global-settings' }
  )

  const data = computed(() => response.value?.data ?? null)

  return {
    data,
    ...rest
  }
}
