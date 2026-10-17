const CAREER_START = new Date(2016, 0, 1)

/** Years and months since career start, plus a localized "10 years and 9 months" text */
export function useExperience() {
  const { locale } = useI18n()

  const experience = computed(() => {
    const now = new Date()
    let years = now.getFullYear() - CAREER_START.getFullYear()
    let months = now.getMonth() - CAREER_START.getMonth()

    if (months < 0) {
      years -= 1
      months += 12
    }

    return { years, months }
  })

  const experienceText = computed(() => {
    const format = (value: number, unit: 'year' | 'month') =>
      new Intl.NumberFormat(locale.value, {
        style: 'unit',
        unit,
        unitDisplay: 'long'
      }).format(value)

    const { years, months } = experience.value
    const parts = [format(years, 'year')]
    if (months) parts.push(format(months, 'month'))

    return new Intl.ListFormat(locale.value, { type: 'conjunction' }).format(parts)
  })

  const experienceYears = computed(() => experience.value.years)

  return { experienceText, experienceYears }
}
