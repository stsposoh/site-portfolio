/**
 * Formats years with correct Russian grammatical case
 * @param n - number of years
 * @returns string like "1 год", "2 года", "5 лет"
 */
export const formatYears = (n: number): string => {
  const lastDigit = n % 10
  const lastTwoDigits = n % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${n} лет`
  if (lastDigit === 1) return `${n} год`
  if (lastDigit >= 2 && lastDigit <= 4) return `${n} года`
  return `${n} лет`
}

/**
 * Formats months with correct Russian grammatical case
 * @param n - number of months
 * @returns string like " и 1 месяц", " и 2 месяца", " и 5 месяцев"
 */
export const formatMonths = (n: number): string => {
  if (n === 0) return ''

  const lastDigit = n % 10
  const lastTwoDigits = n % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return ` и ${n} месяцев`
  if (lastDigit === 1) return ` и ${n} месяц`
  if (lastDigit >= 2 && lastDigit <= 4) return ` и ${n} месяца`
  return ` и ${n} месяцев`
}
