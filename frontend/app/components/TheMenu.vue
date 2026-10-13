<script lang="ts" setup>
const props = defineProps<{
  hidden?: boolean
}>()

const { data: globalSettings } = useGlobalSettings()

const navItems = computed(
  () => globalSettings.value?.menu?.navItems ?? []
)

const showDecoration = ref(false)
const visibleItems = ref<number[]>([])

function showMenuItems() {
  visibleItems.value = []
  const count = navItems.value.length
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      visibleItems.value.push(i)
    }, i * 80)
  }
  setTimeout(() => {
    showDecoration.value = true
  }, 700)
}

watch(
  () => props.hidden,
  (newVal) => {
    if (!newVal) {
      showMenuItems()
    } else {
      showDecoration.value = false
      visibleItems.value = []
    }
  },
  { immediate: true }
)

watch(navItems, (items) => {
  if (!props.hidden && items.length > 0) {
    showDecoration.value = false
    visibleItems.value = []
    showMenuItems()
  }
})
</script>

<template>
  <nav class="main-menu" :class="{ 'main-menu--hidden': hidden }">
    <div
      v-for="(item, index) in navItems"
      :key="item.id"
      class="main-menu__item"
      :class="{ 'main-menu__item--visible': visibleItems.includes(index) }"
    >
      <a
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        >{{ item.label }}</a
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

  @include m.max-width(sm) {
    font-size: clamp(2.4rem, 6.5vw, 3.2rem);
    max-width: 100%;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
  }

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
        @include m.max-width(sm) {
          height: 2rem;
        }
        transition:
          height 0.8s cubic-bezier(0.2, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
        transform: scale3d(1, 1, 1);
      }

      &:hover {
        &:before {
          transform: scale3d(1.2, 1, 1);
          height: 2.8rem;
          @include m.max-width(sm) {
            height: 2.2rem;
          }
        }
      }
    }

    &:before {
      content: '';
      width: 60%;
      @include m.max-width(sm) {
        width: 100%;
      }
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
