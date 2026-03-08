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
        Веб-разработкой занимаюсь с 2016 года —
        <span class="about-content__experience"
          >уже {{ experienceText }} опыта</span
        >
        в создании сайтов и приложений. Основное направление — фронтенд: SPA,
        лендинги, корпоративные сайты, а также сайты на WordPress.
      </p>
      <p class="about-content__tech-wrap">
        Основной стек:
        <span class="about-content__tech-pill">Vue 3</span>
        <span class="about-content__tech-pill">Nuxt 3</span>
        <span class="about-content__tech-pill">TypeScript</span>
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
        <div class="about-content__education-body">
          <p class="about-content__education-uni">
            <strong
              >Открытый Международный Университет Развития Человека
              «УКРАИНА»</strong
            >
          </p>
          <p class="about-content__education-meta">2004 — 2008</p>
          <p>Факультет <strong>«Право»</strong></p>
          <p>Специальность: <strong>бакалавр права</strong></p>
          <p>
            Специализация:
            <strong>административно-хозяйственная деятельность</strong>
          </p>
        </div>
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

  @media (max-width: 77rem) {
    flex-direction: column;
    align-items: center;
  }
}

.about-content__photo {
  flex-shrink: 0;
  width: 18rem;

  @media (max-width: 77rem) {
    width: 15rem;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 1.6rem;
    object-fit: cover;
    border: 0.2rem solid rgba(111, 34, 185, 0.25);
    box-shadow:
      0 0.8rem 2.4rem rgba(111, 34, 185, 0.15),
      0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
  }

  &:hover img {
    box-shadow:
      0 1rem 3rem rgba(111, 34, 185, 0.2),
      0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  }
}

.about-content__experience {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6f22b9, #3a3d98);
  border-radius: 0.6rem;
  white-space: nowrap;
}

.about-content__tech-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.5rem !important;
}

.about-content__tech-pill {
  display: inline-block;
  padding: 0.35rem 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #6f22b9;
  background: rgba(111, 34, 185, 0.08);
  border: 0.1rem solid rgba(111, 34, 185, 0.2);
  border-radius: 0.6rem;
}

.about-content__text {
  flex: 1;
  min-width: 0;
}

.about-content__education {
  margin-top: 2rem;
}

.about-content__education-title {
  margin: 0 0 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
}

.about-content__education-body {
  padding: 1.5rem 1.8rem;
  background: #f8f7fa;
  border-radius: 1.2rem;
  border-left: 0.4rem solid #6f22b9;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.04);
}

.about-content__education-uni {
  margin: 0 0 0.4rem;
}

.about-content__education-meta {
  margin: 0 0 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #6f22b9;
}

.about-content__education p {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  color: #444;
}
</style>
