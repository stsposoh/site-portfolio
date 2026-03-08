<template>
  <div class="app-content" :class="{ 'is-content-open': isOpen }">
    <TheHeader />

    <div class="app-content__hero">
      <TheMenu :hidden="isOpen" />

      <SVGScene />
    </div>

    <main class="app-content__main js-app-content-main">
      <ContentSection
        color="purple"
        title="Станислав Посохов"
        subtitle="Frontend-разработчик, ориентированный на чистый код и современный стек"
        @close="closeHandler"
      >
        <ContentAbout />
      </ContentSection>

      <ContentSection
        color="teal"
        title="Навыки"
        subtitle="Используемые мной технологии"
        @close="closeHandler"
      >
        <ContentSkills />
      </ContentSection>

      <ContentSection
        color="orange"
        title="Сертификаты"
        subtitle="Курсы и сертификации"
        @close="closeHandler"
      >
        <ContentCertificates />
      </ContentSection>

      <ContentSection
        color="coral"
        title="Портфолио"
        subtitle="Выбранные проекты и кейсы"
        @close="closeHandler"
      >
        <ContentPortfolio />
      </ContentSection>

      <ContentSection
        color="mint"
        title="Контакты"
        subtitle="Связь — email и соцсети"
        @close="closeHandler"
      >
        <ContentContacts />
      </ContentSection>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { isOpen, closeHandler } = useBlobMenu()
</script>

<style lang="scss">
.app-content {
  position: relative;
  z-index: 1;
  height: 100vh;

  &__hero {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    min-height: 100%;
    width: 100%;
    padding-left: 60%;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
    }
  }

  &__main {
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
  }
}
</style>
