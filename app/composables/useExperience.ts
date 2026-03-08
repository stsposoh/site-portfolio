import { formatYears, formatMonths } from '~/utils/pluralize'

const CAREER_START = new Date(2016, 0, 1)

/**
 * Calculates years and months of experience since career start
 * and formats them with correct Russian grammatical cases
 */
export function useExperience() {
  const experienceText = computed(() => {
    const now = new Date()
    let years = now.getFullYear() - CAREER_START.getFullYear()
    let months = now.getMonth() - CAREER_START.getMonth()

    if (months < 0) {
      years -= 1
      months += 12
    }

    return `${formatYears(years)}${formatMonths(months)}`
  })

  return { experienceText }
}
