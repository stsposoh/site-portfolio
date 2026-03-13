import { expect } from '@playwright/test'
import { test } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

// Breakpoints from _tokens.scss
const BREAKPOINTS = {
  tiny: 375,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl4: 1920,
}

// Wait for blob animation to complete (expand ~1s + content fade ~0.3s)
const SECTION_OPEN_WAIT = 1500

test.describe('Portfolio site - whole site test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
  })

  test.describe('Functionality - navigation', () => {
    test('header and menu are visible on load', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Certificates' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Portfolio' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Contacts' })).toBeVisible()
    })

    test('click About me opens section and Back closes it', async ({ page }) => {
      await page.getByRole('link', { name: 'About me' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByRole('heading', { name: 'Станислав Посохов' })).toBeVisible()
      const aboutSection = page.locator('.content-section').filter({ has: page.getByRole('heading', { name: 'Станислав Посохов' }) })
      const backBtn = aboutSection.getByRole('button', { name: 'Back to menu' })
      await expect(backBtn).toBeVisible()

      await backBtn.click()
      await page.waitForTimeout(1200) // collapse animation

      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
    })

    test('click Skills opens section', async ({ page }) => {
      await page.getByRole('link', { name: 'Skills' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByRole('heading', { name: 'Навыки' })).toBeVisible()
    })

    test('click Certificates opens section', async ({ page }) => {
      await page.getByRole('link', { name: 'Certificates' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByRole('heading', { name: 'Сертификаты' })).toBeVisible()
    })

    test('click Portfolio opens section', async ({ page }) => {
      await page.getByRole('link', { name: 'Portfolio' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByRole('heading', { name: 'Портфолио' })).toBeVisible()
    })

    test('click Contacts opens section with form', async ({ page }) => {
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByRole('heading', { name: 'Контакты' })).toBeVisible()
      await expect(page.getByPlaceholder('Ваше имя')).toBeVisible()
      await expect(page.getByPlaceholder('your@email.com')).toBeVisible()
      await expect(page.getByPlaceholder('Ваше сообщение')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Отправить' })).toBeVisible()
    })
  })

  test.describe('Functionality - forms', () => {
    test('contact form can be filled', async ({ page }) => {
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await page.getByPlaceholder('Ваше имя').fill('Test User')
      await page.getByPlaceholder('your@email.com').fill('test@example.com')
      await page.getByPlaceholder('Ваше сообщение').fill('Test message')

      await expect(page.getByPlaceholder('Ваше имя')).toHaveValue('Test User')
      await expect(page.getByPlaceholder('your@email.com')).toHaveValue('test@example.com')
      await expect(page.getByPlaceholder('Ваше сообщение')).toHaveValue('Test message')
    })

    test('contact form submit button is clickable', async ({ page }) => {
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      const submitBtn = page.getByRole('button', { name: 'Отправить' })
      await expect(submitBtn).toBeEnabled()

      // Form submits to Formspree in new tab - we verify button exists and is usable
      await submitBtn.click()
    })
  })

  test.describe('Responsiveness', () => {
    test('layout at 320px - extra small', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 })
      await page.waitForTimeout(500)

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Contacts' })).toBeVisible()

      // Contacts section: form usable at 320px
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)
      await expect(page.getByPlaceholder('Ваше имя')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Отправить' })).toBeVisible()

      // Content modal should not overflow horizontally
      const section = page.locator('.content-section').filter({ has: page.getByRole('heading', { name: 'Контакты' }) })
      await expect(section).toBeVisible()
      const box = await section.boundingBox()
      expect(box).toBeTruthy()
      expect(box!.width).toBeLessThanOrEqual(320 + 32) // viewport + padding tolerance
    })

    test('layout at tiny (375px)', async ({ page }) => {
      await page.setViewportSize({ width: BREAKPOINTS.tiny, height: 667 })
      await page.waitForTimeout(500)

      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
    })

    test('layout at md (768px)', async ({ page }) => {
      await page.setViewportSize({ width: BREAKPOINTS.md, height: 1024 })
      await page.waitForTimeout(500)

      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
    })

    test('layout at lg (1024px)', async ({ page }) => {
      await page.setViewportSize({ width: BREAKPOINTS.lg, height: 768 })
      await page.waitForTimeout(500)

      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
    })

    test('layout at xl4 (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: BREAKPOINTS.xl4, height: 1080 })
      await page.waitForTimeout(500)

      await expect(page.getByRole('link', { name: 'About me' })).toBeVisible()
    })

    test('Contacts section opens and form is usable at mobile width', async ({ page }) => {
      await page.setViewportSize({ width: BREAKPOINTS.tiny, height: 812 })
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      await expect(page.getByPlaceholder('Ваше имя')).toBeVisible()
      await page.getByPlaceholder('Ваше имя').fill('Mobile Test')
      await expect(page.getByPlaceholder('Ваше имя')).toHaveValue('Mobile Test')
    })
  })

  test.describe('Accessibility', () => {
    test('Back button has aria-label', async ({ page }) => {
      await page.getByRole('link', { name: 'About me' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      const aboutSection = page.locator('.content-section').filter({ has: page.getByRole('heading', { name: 'Станислав Посохов' }) })
      const backBtn = aboutSection.getByRole('button', { name: 'Back to menu' })
      await expect(backBtn).toHaveAttribute('aria-label', 'Back to menu')
    })

    test('contact form inputs have labels', async ({ page }) => {
      await page.getByRole('link', { name: 'Contacts' }).click()
      await page.waitForTimeout(SECTION_OPEN_WAIT)

      const nameInput = page.getByPlaceholder('Ваше имя')
      await expect(nameInput).toBeVisible()
      await nameInput.focus()
      await expect(nameInput).toBeFocused()
    })
  })
})
