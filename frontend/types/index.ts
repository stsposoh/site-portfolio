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
