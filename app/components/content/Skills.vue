<template>
  <div class="stack-technologies">
    <ul class="stack-technologies__list">
      <Technologia
        v-for="(skill, index) in skills"
        :key="index"
        :src="skill.src"
        :title="skill.title"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
const skills = [
  { src: '/icons/technologies/1.svg', title: 'HTML5' },
  { src: '/icons/technologies/2.svg', title: 'CSS3' },
  { src: '/icons/technologies/3.svg', title: 'Less' },
  { src: '/icons/technologies/4.svg', title: 'Stylus' },
  { src: '/icons/technologies/5.svg', title: 'JavaScript' },
  { src: '/icons/technologies/6.svg', title: 'ES6' },
  { src: '/icons/technologies/7.svg', title: 'jQuery' },
  { src: '/icons/technologies/8.svg', title: 'Bootstrap' },
  { src: '/icons/technologies/9.svg', title: 'WordPress' },
  { src: '/icons/technologies/10.svg', title: 'PHP основы' },
  { src: '/icons/technologies/11.svg', title: 'MySQL основы' },
  { src: '/icons/technologies/12.svg', title: 'Git' },
  { src: '/icons/technologies/20.svg', title: 'Bitbucket' },
  { src: '/icons/technologies/13.svg', title: 'Bower' },
  { src: '/icons/technologies/14.svg', title: 'npm' },
  { src: '/icons/technologies/24.svg', title: 'Yarn' },
  { src: '/icons/technologies/15.svg', title: 'Gulp' },
  { src: '/icons/technologies/22.svg', title: 'Webpack' },
  { src: '/icons/technologies/25.svg', title: 'Parcel' },
  { src: '/icons/technologies/16.svg', title: 'Markdown' },
  { src: '/icons/technologies/17.svg', title: 'OpenCart' },
  { src: '/icons/technologies/18.svg', title: 'SVG' },
  { src: '/icons/technologies/19.svg', title: 'BEM naming' },
  { src: '/icons/technologies/23.svg', title: 'Unyson' },
  { src: '/icons/technologies/21.svg', title: 'Vue.js' },
  { src: '/icons/technologies/26.svg', title: 'Nuxt' },
  { src: '/icons/technologies/Vuetify.svg', title: 'Vuetify' },
  { src: '/icons/technologies/21.svg', title: 'Vue Router' },
  { src: '/icons/technologies/21.svg', title: 'Vuex' },
  { src: '/icons/technologies/firebase.svg', title: 'Firebase' },
]
</script>

<style lang="scss" scoped>
.stack-technologies {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
