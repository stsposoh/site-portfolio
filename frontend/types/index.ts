/** Portfolio project item */
export interface PortfolioItem {
  id: string
  siteName: string
  linkTo: string
  imgSrcSmall: string
  imgSrcBig: string
  desc: string
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
