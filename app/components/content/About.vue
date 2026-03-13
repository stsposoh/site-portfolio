<template>
  <div class="about-content">
    <div class="about-content__text">
      <p>
        Веб-разработкой занимаюсь с 2016 года. Основное направление — фронтенд:
        SPA, лендинги, корпоративные сайты, а также сайты на WordPress.
      </p>
      <p class="about-content__experience-wrap">
        <span class="about-content__experience"
          >Опыт: {{ experienceText }}</span
        >
      </p>
      <p class="about-content__tech-wrap">
        Основной стек:
        <span class="about-content__tech-pill">Vue 3</span>
        <span class="about-content__tech-pill">Nuxt 3</span>
        <span class="about-content__tech-pill">TypeScript</span>
        <span class="about-content__tech-pill">WordPress</span>
      </p>
      <p>
        Активно использую AI инструменты, что позволяет ускорять процесс
        разработки без потери качества. Это не автоматическая генерация кода (не
        вайбкодинг!) — я сознательно применяю AI как помощника, опираясь на
        многолетний опыт и глубокое понимание фронтенда.
      </p>
      <p>
        Отлично работаю в команде, ценю чистый код и понятную архитектуру
        проектов. Люблю создавать интерфейсы, которые удобны пользователю и
        просты в поддержке. Постоянно изучаю новые технологии и не боюсь брать
        нестандартные задачи.
      </p>

      <InfoCard
        title="Место работы"
        logo="/images/profile-photo.jpg"
        organization-name="SOLAR Digital"
        organization-url="https://solar-digital.com/"
        meta="2019 — настоящее время"
      >
        <p>Фронтенд-разработчик</p>
      </InfoCard>

      <InfoCard
        title="Образование"
        logo="/images/profile-photo.jpg"
        organization-name="Открытый Международный Университет Развития Человека «УКРАИНА»"
        organization-url="https://uu.edu.ua/"
        meta="2004 — 2008"
      >
        <p>Факультет <strong>«Право»</strong></p>
        <p>Специальность: <strong>бакалавр права</strong></p>
        <p>
          Специализация:
          <strong>административно-хозяйственная деятельность</strong>
        </p>
      </InfoCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { experienceText } = useExperience()
</script>

<style lang="scss">
.about-content {
  &__experience-wrap {
    margin: 0 0 1.2rem;
  }

  &__experience {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    margin: 0;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6f22b9, #3a3d98);
    border-radius: 0.6rem;
    white-space: nowrap;
  }

  &__tech-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 1.5rem !important;
  }

  &__tech-pill {
    display: inline-block;
    padding: 0.35rem 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: v.$color-primary;
    background: rgba(111, 34, 185, 0.08);
    border: 0.1rem solid rgba(111, 34, 185, 0.2);
    border-radius: 0.6rem;
  }

}
</style>
