<script setup lang="ts">

</script>

<template>
<!--  <div class="Navigation" :class="{ '&#45;&#45;is-open': menuOpen }" >-->
<!--        <span class="Navigation__hamburger" :class="{ '&#45;&#45;is-active': menuOpen }" @click="toggleMenu">-->
<!--            <span class="Navigation__hamburger-line"></span>-->
<!--            <span class="Navigation__hamburger-line"></span>-->
<!--            <span class="Navigation__hamburger-line"></span>-->
<!--        </span>-->
<!--    <transition name="fade" appear>-->
<!--      <nav-list v-show="menuOpen" />-->
      <NavigationList />
<!--    </transition>-->
<!--  </div>-->
</template>

<style scoped lang="scss">

</style>