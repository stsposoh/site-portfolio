import { buildSrcset, type StrapiImage } from '~/utils/strapiImage'

interface StrapiProject {
  id: number
  title: string
  description?: string
  link?: string
  screenshot: StrapiImage
  technologies?: {
    name: string
    icon?: { url: string }
  }[]
}

interface StrapiProjectsResponse {
  data: StrapiProject[]
}

export interface ProjectTechnology {
  name: string
  icon?: string
}

export interface Project {
  id: number
  title: string
  description: string
  link: string
  src: string
  srcset: string
  width: number
  height: number
  technologies: ProjectTechnology[]
}

export function useProjects() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string
  const { locale } = useI18n()

  const { data: response, ...rest } = useFetch<StrapiProjectsResponse>(
    `${apiUrl}/api/projects`,
    {
      key: computed(() => `projects-${locale.value}`),
      query: {
        locale,
        'populate[screenshot][fields]': ['url', 'width', 'height', 'formats'],
        'populate[technologies][fields]': ['name'],
        'populate[technologies][populate][icon][fields]': ['url'],
        'pagination[pageSize]': 100,
        sort: ['featured:desc', 'id:asc']
      }
    }
  )

  const projects = computed<Project[]>(() =>
    (response.value?.data ?? []).map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description ?? '',
      link: project.link ?? '',
      src: `${apiUrl}${project.screenshot.url}`,
      srcset: buildSrcset(apiUrl, project.screenshot),
      width: project.screenshot.width,
      height: project.screenshot.height,
      technologies: (project.technologies ?? []).map(({ name, icon }) => ({
        name,
        icon: icon ? `${apiUrl}${icon.url}` : undefined
      }))
    }))
  )

  /** Technology names ordered by how many projects use them */
  const technologies = computed(() => {
    const counts = new Map<string, number>()
    projects.value.forEach((project) =>
      project.technologies.forEach(({ name }) =>
        counts.set(name, (counts.get(name) ?? 0) + 1)
      )
    )
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  return {
    projects,
    technologies,
    ...rest
  }
}
