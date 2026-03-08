<template>
  <div class="about-content">
    <div class="about-content__photo">
      <img
        src="/images/profile-photo.jpg"
        alt="Stanislav Posokhov"
        width="200"
        height="200"
      />
    </div>
    <div class="about-content__text">
      <p>
        Веб-разработкой занимаюсь с 2016 года — уже {{ experienceText }} опыта в
        создании сайтов и приложений. Основное направление — фронтенд: SPA,
        лендинги, корпоративные сайты, а также сайты на WordPress. Работаю с
        современным стеком: Vue 3, Nuxt 3 и TypeScript.
      </p>
      <p>
        Активно использую инструменты искусственного интеллекта, что позволяет
        ускорять процесс разработки без потери качества. Это не автоматическая
        генерация кода — я сознательно применяю ИИ как помощника, опираясь на
        многолетний опыт и глубокое понимание фронтенда.
      </p>
      <p>
        Отлично работаю в команде, ценю чистый код и понятную архитектуру
        проектов. Люблю создавать интерфейсы, которые удобны пользователю и
        просты в поддержке. Постоянно изучаю новые технологии и не боюсь брать
        нестандартные задачи.
      </p>

      <section class="about-content__education">
        <h3 class="about-content__education-title">Образование</h3>
        <p class="about-content__education-uni">
          <strong>Открытый Международный Университет Развития Человека «УКРАИНА»</strong>
        </p>
        <p class="about-content__education-meta">2004 — 2008</p>
        <p>Факультет <strong>«Право»</strong></p>
        <p>Специальность: <strong>бакалавр права</strong></p>
        <p>Специализация: <strong>административно-хозяйственная деятельность</strong></p>
        <p class="about-content__education-courses"><strong>Курсы</strong></p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatYears, formatMonths } from '~/utils/pluralize'

const calculateExperience = (): string => {
  const startDate = new Date(2016, 0, 1)
  const now = new Date()

  let years = now.getFullYear() - startDate.getFullYear()
  let months = now.getMonth() - startDate.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  const yearsText = formatYears(years)
  const monthsText = formatMonths(months)

  return `${yearsText}${monthsText}`
}

const experienceText = computed(() => calculateExperience())
</script>

<style lang="scss" scoped>
.about-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
}

.about-content__photo {
  flex-shrink: 0;
  width: 180px;

  @media (max-width: 767px) {
    width: 150px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 16px;
    object-fit: cover;
    border: 2px solid rgba(111, 34, 185, 0.2);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.04);
  }
}

.about-content__text {
  flex: 1;
  min-width: 0;
}

.about-content__education {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e8e6ef;
}

.about-content__education-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.about-content__education-uni {
  margin: 0 0 0.25rem;
}

.about-content__education-meta {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  color: #555;
}

.about-content__education p {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  color: #444;
}

.about-content__education-courses {
  margin-top: 1rem !important;
}
</style>
