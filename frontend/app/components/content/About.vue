<template>
  <div class="about-content">
    <div class="about-content__text">
      <p v-if="aboutBlock?.shortText">{{ aboutBlock.shortText }}</p>
      <p class="about-content__experience-wrap">
        <span class="about-content__experience"
          >Опыт: {{ experienceText }}</span
        >
      </p>
      <p class="about-content__tech-wrap">
        <template v-if="aboutBlock?.stackText"
          >{{ aboutBlock.stackText }}
        </template>
        <span
          v-for="stackItem in aboutBlock?.stackItems"
          :key="stackItem.id"
          class="about-content__tech-pill"
          >{{ stackItem.item }}</span
        >
      </p>
      <StrapiBlocksText
        v-if="aboutBlock?.content && Array.isArray(aboutBlock.content) && aboutBlock.content.length"
        :nodes="(aboutBlock?.content && Array.isArray(aboutBlock.content) ? aboutBlock.content : [])"
      />

      <InfoCard
        v-for="card in aboutBlock?.infoCards"
        :key="card.id"
        :title="card.description?.[0]?.key ?? ''"
        :organization-name="card.link?.label ?? ''"
        :organization-url="card.link?.slug"
        :meta="card.years"
        :logo="card.image?.url"
      >
        <template v-for="item in card.description" :key="item.id">
          <p v-if="item.value">
            <strong v-if="item.key">{{ item.key }}: </strong>{{ item.value }}
          </p>
        </template>
      </InfoCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { aboutBlock } = useLandingPage()
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
