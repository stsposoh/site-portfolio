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
  menu: GlobalSettingMenu
  ui?: GlobalSettingUiLabels
}

/** Interface strings that are not tied to a particular section */
export interface GlobalSettingUiLabels {
  allLabel?: string
  copyLabel?: string
  copiedLabel?: string
  closeLabel?: string
  previousImageLabel?: string
  nextImageLabel?: string
  imageViewerLabel?: string
  visitSiteLabel?: string
  languageLabel?: string
}

/** Strapi single types return data in data property */
interface StrapiGlobalSettingResponse {
  data: GlobalSetting
}

export function useGlobalSettings() {
  const { data: response, ...rest } = useStrapiFetch<StrapiGlobalSettingResponse>(
    'global-settings',
    '/api/global-setting'
  )

  const data = computed(() => response.value?.data ?? null)
  const ui = computed(() => data.value?.ui ?? {})

  return {
    data,
    ui,
    ...rest
  }
}
