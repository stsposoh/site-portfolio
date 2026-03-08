/** Portfolio project item */
export interface PortfolioItem {
  id: string
  siteName: string
  linkTo: string
  imgSrcSmall: string
  imgSrcBig: string
  desc: string
}

/** Certificate category for filtering */
export type CertCategory = 'Курсы' | 'Тесты' | 'Разное'

/** Certificate item */
export interface Cert {
  id: number
  thumbSrc: string
  fullSrc: string
  alt: string
  category: CertCategory
}

/** Individual skill/technology */
export interface Skill {
  src: string
  title: string
  isMain?: boolean
}

/** Skill category with grouped skills */
export interface SkillCategory {
  title: string
  skills: Skill[]
}
