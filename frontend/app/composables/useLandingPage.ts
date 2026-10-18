/** Section heading with title, description and image */
export interface LandingPageSectionHeading {
  title: string
  description: string
  image?: {
    url: string
    alternativeText?: string
  }
}

/** Stack item from shared.text-items */
export interface LandingPageStackItem {
  id: number
  item: string
}

/** Key-value pair from shared.key-value */
export interface LandingPageKeyValue {
  id: number
  key: string
  value: string
}

/** Link from shared.link */
export interface LandingPageLink {
  id: number
  label: string
  slug: string
  isExternal?: boolean
}

/** Info card from shared.info-card */
export interface LandingPageInfoCard {
  id: number
  years: string
  image?: {
    url: string
    alternativeText?: string
  }
  link?: LandingPageLink
  description?: LandingPageKeyValue[]
}

/** About block from landing page */
export interface LandingPageAboutBlock {
  __component: 'blocks.about'
  id: number
  shortText: string
  stackText: string
  content?: unknown
  stackItems?: LandingPageStackItem[]
  infoCards?: LandingPageInfoCard[]
  heading: LandingPageSectionHeading
  /** Plural forms separated by "|", in Intl.PluralRules category order */
  experienceLabel?: string
  sitesCount?: number
  sitesLabel?: string
  certificatesLabel?: string
}

/** Skill item from shared.skill */
export interface LandingPageSkill {
  id: number
  skillName: string
  icon?: {
    url: string
    alternativeText?: string
  }
}

/** Skill block (category) from shared.skill-block */
export interface LandingPageSkillBlock {
  id: number
  title: string
  skills?: LandingPageSkill[]
}

/** Skills block from landing page */
export interface LandingPageSkillsBlock {
  __component: 'blocks.skills'
  heading: LandingPageSectionHeading
  skills?: LandingPageSkillBlock[]
}

/** Landing page from Strapi API */
export interface LandingPage {
  id: number
  blocks?: (LandingPageAboutBlock | LandingPageSkillsBlock)[]
  certificatesHeading?: LandingPageSectionHeading
  portfolioHeading?: LandingPageSectionHeading
  contactsHeading?: LandingPageSectionHeading
}

interface StrapiLandingPageResponse {
  data: LandingPage
}

export function useLandingPage() {
  const config = useRuntimeConfig()
  const mediaUrl = config.public.mediaUrl as string

  const { data: response, ...rest } = useStrapiFetch<StrapiLandingPageResponse>(
    'landing-page',
    '/api/landing-page'
  )

  const data = computed(() => response.value?.data ?? null)

  const withFullImageUrl = (img: { url: string; alternativeText?: string } | undefined) => {
    if (!img?.url) return undefined
    return { ...img, url: `${mediaUrl}${img.url}` }
  }

  const aboutBlock = computed(() => {
    const blocks = data.value?.blocks ?? []
    const block = blocks.find((b): b is LandingPageAboutBlock => b.__component === 'blocks.about')
    if (!block) return null

    const headingImage = withFullImageUrl(block.heading?.image)
    const infoCards = block.infoCards?.map((card) => ({
      ...card,
      image: card.image ? { ...card.image, url: `${mediaUrl}${card.image.url}` } : undefined
    }))

    return {
      ...block,
      heading: block.heading
        ? { ...block.heading, image: headingImage ?? block.heading.image }
        : block.heading,
      infoCards
    }
  })

  const skillsBlock = computed(() => {
    const blocks = data.value?.blocks ?? []
    const block = blocks.find((b): b is LandingPageSkillsBlock => b.__component === 'blocks.skills')
    if (!block) return null

    const headingImage = withFullImageUrl(block.heading?.image)
    const skills = block.skills?.map((skillBlock) => ({
      ...skillBlock,
      skills: skillBlock.skills?.map((skill) => ({
        ...skill,
        icon: skill.icon ? { ...skill.icon, url: `${mediaUrl}${skill.icon.url}` } : undefined
      }))
    }))

    return {
      ...block,
      heading: block.heading
        ? { ...block.heading, image: headingImage ?? block.heading.image }
        : block.heading,
      skills
    }
  })

  const withHeadingImage = (heading: LandingPageSectionHeading | undefined) =>
    heading ? { ...heading, image: withFullImageUrl(heading.image) } : undefined

  const sectionHeadings = computed(() => ({
    certificates: withHeadingImage(data.value?.certificatesHeading),
    portfolio: withHeadingImage(data.value?.portfolioHeading),
    contacts: withHeadingImage(data.value?.contactsHeading)
  }))

  return {
    data,
    aboutBlock,
    skillsBlock,
    sectionHeadings,
    ...rest
  }
}
