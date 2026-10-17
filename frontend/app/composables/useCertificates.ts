import { buildSrcset, type StrapiImage } from '~/utils/strapiImage'

interface StrapiCertificate {
  id: number
  image: StrapiImage
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
    (response.value?.data ?? []).map(({ id, image, category }) => ({
      id,
      category: category?.name ?? '',
      alt: image.alternativeText ?? '',
      src: `${apiUrl}${image.url}`,
      srcset: buildSrcset(apiUrl, image),
      width: image.width,
      height: image.height
    }))
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
