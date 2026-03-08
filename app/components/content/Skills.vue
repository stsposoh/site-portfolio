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
const skillCategories = [
  {
    title: 'Верстка и стили',
    skills: [
      { src: '/icons/technologies/1.svg', title: 'HTML5' },
      { src: '/icons/technologies/2.svg', title: 'CSS3' },
      { src: '/icons/technologies/3.svg', title: 'Less' },
      { src: '/icons/technologies/4.svg', title: 'Stylus' },
      { src: '/icons/technologies/18.svg', title: 'SVG' },
      { src: '/icons/technologies/19.svg', title: 'BEM naming' },
      { src: '/icons/technologies/8.svg', title: 'Bootstrap' },
    ],
  },
  {
    title: 'JavaScript и фреймворки',
    skills: [
      { src: '/icons/technologies/5.svg', title: 'JavaScript' },
      { src: '/icons/technologies/6.svg', title: 'ES6' },
      { src: '/icons/technologies/7.svg', title: 'jQuery' },
      { src: '/icons/technologies/21.svg', title: 'Vue.js', isMain: true },
      { src: '/icons/technologies/26.svg', title: 'Nuxt', isMain: true },
      { src: '/icons/technologies/Vuetify.svg', title: 'Vuetify' },
      { src: '/icons/technologies/21.svg', title: 'Vue Router' },
      { src: '/icons/technologies/21.svg', title: 'Vuex' },
    ],
  },
  {
    title: 'Инструменты сборки и разработки',
    skills: [
      { src: '/icons/technologies/12.svg', title: 'Git' },
      { src: '/icons/technologies/20.svg', title: 'Bitbucket' },
      { src: '/icons/technologies/13.svg', title: 'Bower' },
      { src: '/icons/technologies/14.svg', title: 'npm' },
      { src: '/icons/technologies/24.svg', title: 'Yarn' },
      { src: '/icons/technologies/15.svg', title: 'Gulp' },
      { src: '/icons/technologies/22.svg', title: 'Webpack' },
      { src: '/icons/technologies/25.svg', title: 'Parcel' },
      { src: '/icons/technologies/16.svg', title: 'Markdown' },
    ],
  },
  {
    title: 'CMS и Backend',
    skills: [
      { src: '/icons/technologies/9.svg', title: 'WordPress' },
      { src: '/icons/technologies/10.svg', title: 'PHP основы' },
      { src: '/icons/technologies/11.svg', title: 'MySQL основы' },
      { src: '/icons/technologies/17.svg', title: 'OpenCart' },
      { src: '/icons/technologies/23.svg', title: 'Unyson' },
      { src: '/icons/technologies/firebase.svg', title: 'Firebase' },
    ],
  },
]
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
    font-family: 'Poppins', sans-serif;
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
