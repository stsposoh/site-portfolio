interface StrapiContactItem {
  id: number
  label: string
  value?: string
  url?: string
  copyable?: boolean
  icon?: { url: string }
}

interface StrapiContactsResponse {
  data: {
    items?: StrapiContactItem[]
  }
}

export interface ContactItem {
  id: number
  label: string
  value: string
  url: string
  copyable: boolean
  icon?: string
}

export function useContacts() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  const { data: response, ...rest } = useFetch<StrapiContactsResponse>(
    `${apiUrl}/api/contact`,
    {
      key: 'contacts',
      query: { 'populate[items][populate][icon][fields]': ['url'] }
    }
  )

  /** Items without a value are kept in the admin as placeholders and not shown */
  const contacts = computed<ContactItem[]>(() =>
    (response.value?.data.items ?? [])
      .filter((item) => item.value)
      .map((item) => ({
        id: item.id,
        label: item.label,
        value: item.value ?? '',
        url: item.url ?? '',
        copyable: Boolean(item.copyable),
        icon: item.icon ? `${apiUrl}${item.icon.url}` : undefined
      }))
  )

  return {
    contacts,
    ...rest
  }
}
