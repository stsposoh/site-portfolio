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
const { experienceText } = useExperience()
</script>

<style lang="scss" scoped>
.about-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @include m.max-width(xl) {
    flex-direction: column;
    align-items: center;
  }

  &__photo {
    flex-shrink: 0;
    width: 18rem;

    @include m.max-width(xl) {
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

  &__experience {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    margin: 0 0.2rem;
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

  &__text {
    flex: 1;
    min-width: 0;
  }

  &__education {
    margin-top: 2rem;
  }

  &__education-title {
    margin: 0 0 1.2rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  &__education-body {
    padding: 1.5rem 1.8rem;
    background: #f8f7fa;
    border-radius: 1.2rem;
    border-left: 0.4rem solid v.$color-primary;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.04);
  }

  &__education-uni {
    margin: 0 0 0.4rem;
  }

  &__education-meta {
    margin: 0 0 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: v.$color-primary;
  }

  &__education p {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
    color: #444;
  }
}
</style>
