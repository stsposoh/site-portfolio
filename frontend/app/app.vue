<template>
  <div class="app-content" :class="{ 'is-content-open': isOpen }">
    <TheHeader />

    <div class="app-content__hero">
      <TheMenu :hidden="isOpen" />

      <SVGScene />
    </div>

    <main class="app-content__main js-app-content-main">
      <Content
        color="purple"
        :title="aboutHeading?.title"
        :subtitle="aboutHeading?.description"
        :image="aboutHeading?.image?.url"
        :image-alt="aboutHeading?.image?.alternativeText"
        @close="closeHandler"
      >
        <ContentAbout />
      </Content>

      <Content
        color="teal"
        :title="skillsHeading?.title"
        :subtitle="skillsHeading?.description"
        :image="skillsHeading?.image?.url"
        :image-alt="skillsHeading?.image?.alternativeText"
        @close="closeHandler"
      >
        <ContentSkills />
      </Content>

      <Content
        color="orange"
        title="Сертификаты"
        subtitle="Курсы и сертификации"
        image="/images/profile-photo.jpg"
        @close="closeHandler"
      >
        <ContentCertificates />
      </Content>

      <Content
        color="coral"
        title="Портфолио"
        subtitle="Выбранные проекты и кейсы"
        image="/images/profile-photo.jpg"
        @close="closeHandler"
      >
        <ContentPortfolio />
      </Content>

      <Content
        color="mint"
        title="Контакты"
        subtitle="Связь — email и соцсети"
        image="/images/profile-photo.jpg"
        @close="closeHandler"
      >
        <ContentContacts />
      </Content>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { isOpen, closeHandler } = useBlobMenu()
const { data: globalSettings } = useGlobalSettings()
const { aboutBlock, skillsBlock } = useLandingPage()

const aboutHeading = computed(() => aboutBlock.value?.heading)
const skillsHeading = computed(() => skillsBlock.value?.heading)

useSeoMeta({
  title: globalSettings.value?.title,
  description: globalSettings.value?.description
})
</script>

<style lang="scss">
.app-content {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow-x: hidden;

  &__hero {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    min-height: 100%;
    width: 100%;
    padding-left: 60%;
    overflow: hidden;

    @include m.max-width(sm) {
      padding-left: 1.6rem;
      justify-content: center;
    }

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
