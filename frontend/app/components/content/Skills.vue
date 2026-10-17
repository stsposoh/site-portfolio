<template>
  <div class="stack-technologies">
    <div
      v-if="skillsBlock?.skills?.length"
      :key="revealCount"
      class="stack-technologies__card"
      :class="{ '--revealed': revealCount > 0 }"
    >
      <section
        v-for="(category, catIndex) in skillsBlock.skills"
        :key="category.id"
        class="stack-technologies__category"
      >
        <h3 class="stack-technologies__category-title">{{ category.title }}</h3>
        <ul class="stack-technologies__list">
          <Technologia
            v-for="(skill, skillIndex) in (category.skills ?? [])"
            :key="skill.id"
            :src="skill.icon?.url ?? ''"
            :title="skill.skillName"
            :animation-delay="(Number(catIndex) * 10 + Number(skillIndex)) * 30"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { skillsBlock } = useLandingPage()
const isActive = useSectionActive()

// Remounting the card on every open replays the tile cascade
const revealCount = ref(0)

watch(isActive, (active) => {
  if (active) revealCount.value++
})
</script>

<style lang="scss">
.stack-technologies {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__card {
    &.--revealed .technologia {
      animation: technologiaReveal 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards;
    }
  }

  &__category {
    margin-bottom: 2.8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__category-title {
    margin: 0 0 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

@keyframes technologiaReveal {
  from {
    opacity: 0;
    translate: 0 1.2rem;
    scale: 0.9;
  }

  to {
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }
}
</style>
