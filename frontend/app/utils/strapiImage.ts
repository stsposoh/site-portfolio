export interface StrapiImageFormat {
  url: string
  width: number
}

export interface StrapiImage extends StrapiImageFormat {
  height: number
  alternativeText?: string
  formats?: Record<string, StrapiImageFormat>
}

/** Absolute srcset over the original image and all its generated formats */
export function buildSrcset(apiUrl: string, image: StrapiImage): string {
  return [...Object.values(image.formats ?? {}), image]
    .sort((a, b) => a.width - b.width)
    .map((source) => `${apiUrl}${source.url} ${source.width}w`)
    .join(', ')
}
