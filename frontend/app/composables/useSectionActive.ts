import type { InjectionKey, Ref } from 'vue'

export const SECTION_ACTIVE_KEY: InjectionKey<Ref<boolean>> =
  Symbol('sectionActive')

export const useSectionActive = () => inject(SECTION_ACTIVE_KEY, ref(false))
