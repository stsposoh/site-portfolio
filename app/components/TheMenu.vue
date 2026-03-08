<script lang="ts" setup>
const props = defineProps<{
  hidden?: boolean
}>()

const showDecoration = ref(false)
const visibleItems = ref<number[]>([])

watch(
  () => props.hidden,
  (newVal) => {
    if (!newVal) {
      // Меню появляется - показываем пункты каскадом
      visibleItems.value = []
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          visibleItems.value.push(i)
        }, i * 80)
      }

      // Добавляем декорацию после появления всех пунктов
      setTimeout(() => {
        showDecoration.value = true
      }, 700)
    } else {
      // Меню скрывается - убираем всё
      showDecoration.value = false
      visibleItems.value = []
    }
  },
  { immediate: true }
)
</script>

<template>
  <nav class="main-menu" :class="{ 'main-menu--hidden': hidden }">
    <div
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(0) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >About me</a
      >
    </div>
    <div
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(1) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >Skills</a
      >
    </div>
    <div
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(2) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >Certificates</a
      >
    </div>
    <div
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(3) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >Portfolio</a
      >
    </div>
    <div
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(4) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >Contacts</a
      >
    </div>
  </nav>
</template>

<style lang="scss">
.main-menu {
  position: relative;
  z-index: 11;
  font-size: clamp(3rem, 5vw, 6.4rem);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &__item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &--visible {
      opacity: 1;
      transform: translateY(0);
    }

    &:nth-child(1) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #3a3d98, #6f22b9);
        }
      }
    }

    &:nth-child(2) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #0947db, #07d89d);
        }
      }
    }

    &:nth-child(3) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #ee2d29, #f8ae2c);
        }
      }
    }

    &:nth-child(4) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #9d316e, #de2d3e);
        }
      }
    }

    &:nth-child(5) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #1d6449, #07d89d);
        }
      }
    }
  }

  &__link {
    display: inline-block;
    color: white;
    line-height: 1.25;
    letter-spacing: -0.025em;
    text-indent: -0.025em;
    font-weight: 700;
    position: relative;

    &:hover,
    &:focus {
      color: v.$color-menu-hover;
    }

    &.--decorated {
      &:before {
        height: 2.5rem;
        transition:
          height 0.8s cubic-bezier(0.2, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
        transform: scale3d(1, 1, 1);
      }

      &:hover {
        &:before {
          transform: scale3d(1.2, 1, 1);
          height: 2.8rem;
        }
      }
    }

    &:before {
      content: '';
      width: 60%;
      height: 0;
      background: linear-gradient(45deg, #f19872, #e86c9a);
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: 0 0;
      transform: scale3d(0, 1, 1);
      z-index: -1;
    }
  }
}
</style>
