<template>
  <div class="app-content" :class="{ 'is-content-open': isOpen }">
    <TheHeader :revealed="introDone" />

    <TheIntro
      v-if="!introDone"
      :title="globalSettings?.headerTitle"
      target-selector=".header__title"
      @start="playIntro"
      @land="introLanded = true"
    />

    <div class="app-content__hero">
      <TheMenu
        :hidden="isOpen || !introDone"
        :active-index="hoveredIndex"
        @hover="highlight"
        @select="openSection"
      />

      <SVGScene
        :active-index="hoveredIndex"
        @hover="highlight"
        @select="openSection"
      />
    </div>

    <main class="app-content__main js-app-content-main">
      <Content
        color="purple"
        :active="openedIndex === 0"
        @close="closeHandler"
      >
        <ContentAbout />
      </Content>

      <Content
        color="teal"
        :active="openedIndex === 1"
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
        :active="openedIndex === 2"
        :title="sectionHeadings.certificates?.title"
        :subtitle="sectionHeadings.certificates?.description"
        :image="sectionHeadings.certificates?.image?.url"
        :image-alt="sectionHeadings.certificates?.image?.alternativeText"
        @close="closeHandler"
      >
        <ContentCertificates />
      </Content>

      <Content
        color="coral"
        :active="openedIndex === 3"
        :title="sectionHeadings.portfolio?.title"
        :subtitle="sectionHeadings.portfolio?.description"
        :image="sectionHeadings.portfolio?.image?.url"
        :image-alt="sectionHeadings.portfolio?.image?.alternativeText"
        @close="closeHandler"
      >
        <ContentPortfolio />
      </Content>

      <Content
        color="mint"
        :active="openedIndex === 4"
        :title="sectionHeadings.contacts?.title"
        :subtitle="sectionHeadings.contacts?.description"
        :image="sectionHeadings.contacts?.image?.url"
        :image-alt="sectionHeadings.contacts?.image?.alternativeText"
        @close="closeHandler"
      >
        <ContentContacts />
      </Content>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data: globalSettings } = useGlobalSettings()
const sectionSlugs = computed(
  () => globalSettings.value?.menu?.navItems.map((item) => item.slug ?? '') ?? []
)

const {
  isOpen,
  hoveredIndex,
  openedIndex,
  introSkipped,
  playIntro,
  highlight,
  openSection,
  closeHandler
} = useBlobMenu(sectionSlugs)
const introLanded = ref(false)
const introDone = computed(() => introLanded.value || introSkipped.value)
const { aboutBlock, skillsBlock, sectionHeadings } = useLandingPage()

const skillsHeading = computed(() => skillsBlock.value?.heading)

const { siteUrl } = useRuntimeConfig().public
const ogImage = computed(() => {
  const url = aboutBlock.value?.heading?.image?.url
  return url ? new URL(url, siteUrl as string).href : undefined
})

useSeoMeta({
  title: () => globalSettings.value?.title,
  description: () => globalSettings.value?.description,
  ogType: 'website',
  ogTitle: () => globalSettings.value?.title,
  ogDescription: () => globalSettings.value?.description,
  ogImage,
  twitterCard: 'summary'
})

const { contacts } = useContacts()

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: globalSettings.value?.title,
        jobTitle: globalSettings.value?.headerPosition,
        description: globalSettings.value?.description,
        url: siteUrl,
        image: ogImage.value,
        email: contacts.value
          .find(({ url }) => url.startsWith('mailto:'))
          ?.url.replace('mailto:', ''),
        sameAs: contacts.value
          .map(({ url }) => url)
          .filter((url) => url.startsWith('https://'))
      })
    }
  ]
}))
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
