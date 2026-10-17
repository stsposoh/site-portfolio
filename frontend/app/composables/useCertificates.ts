interface StrapiImageFormat {
  url: string
  width: number
}

interface StrapiCertificate {
  id: number
  image: StrapiImageFormat & {
    height: number
    alternativeText?: string
    formats?: Record<string, StrapiImageFormat>
  }
  category?: {
    name: string
  }
}

interface StrapiCertificatesResponse {
  data: StrapiCertificate[]
}

export interface Certificate {
  id: number
  category: string
  alt: string
  src: string
  srcset: string
  width: number
  height: number
}

export function useCertificates() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  const { data: response, ...rest } = useFetch<StrapiCertificatesResponse>(
    `${apiUrl}/api/certificates`,
    {
      key: 'certificates',
      query: {
        'populate[image][fields]': ['url', 'width', 'height', 'formats', 'alternativeText'],
        'populate[category][fields]': ['name'],
        'pagination[pageSize]': 100,
        sort: 'id'
      }
    }
  )

  const certificates = computed<Certificate[]>(() =>
    (response.value?.data ?? []).map(({ id, image, category }) => {
      const sources = [...Object.values(image.formats ?? {}), image]
        .sort((a, b) => a.width - b.width)
        .map((source) => `${apiUrl}${source.url} ${source.width}w`)

      return {
        id,
        category: category?.name ?? '',
        alt: image.alternativeText ?? '',
        src: `${apiUrl}${image.url}`,
        srcset: sources.join(', '),
        width: image.width,
        height: image.height
      }
    })
  )

  const categories = computed(() => [
    ...new Set(certificates.value.map((cert) => cert.category).filter(Boolean))
  ])

  return {
    certificates,
    categories,
    ...rest
  }
}
