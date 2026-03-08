<template>
  <div class="stack-technologies">
    <div class="stack-technologies__card">
      <section
        v-for="(category, catIndex) in skillCategories"
        :key="category.title"
        class="stack-technologies__category"
      >
        <h3 class="stack-technologies__category-title">{{ category.title }}</h3>
        <ul class="stack-technologies__list">
          <Technologia
            v-for="(skill, skillIndex) in category.skills"
            :key="`${category.title}-${skill.title}`"
            :src="skill.src"
            :title="skill.title"
            :is-main="skill.isMain"
            :animation-delay="(catIndex * 15 + skillIndex) * 40"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { skillCategories } from '~/data/skills'
</script>

<style lang="scss" scoped>
.stack-technologies {
  &__card {
    padding: 1.8rem 2rem;
    background: #f8f7fa;
    border-radius: 1.2rem;
    border-left: 0.4rem solid #07d89d;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.04);
  }

  &__category {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__category-title {
    margin: 0 0 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
