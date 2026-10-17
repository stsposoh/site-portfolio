const CATEGORY_ORDER = ['zero', 'one', 'two', 'few', 'many', 'other']

/**
 * Picks a plural form from a "|"-separated list given in Intl.PluralRules
 * category order: one|few|many for Ukrainian and Russian, one|other for English
 */
export function pluralForm(n: number, forms: string, locale: string): string {
  const options = forms.split('|')
  const rules = new Intl.PluralRules(locale)
  const categories = [...rules.resolvedOptions().pluralCategories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  )
  const index = categories.indexOf(rules.select(n))
  return options[Math.min(index, options.length - 1)] ?? ''
}
