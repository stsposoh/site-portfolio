<script lang="ts" setup>
const props = defineProps<{
  hidden?: boolean
  activeIndex?: number | null
}>()

const emit = defineEmits<{
  hover: [index: number | null]
  select: [index: number]
}>()

const { data: globalSettings } = useGlobalSettings()

const navItems = computed(
  () => globalSettings.value?.menu?.navItems ?? []
)

const showDecoration = ref(false)
const visibleItems = ref<number[]>([])
let timers: ReturnType<typeof setTimeout>[] = []

function hideMenuItems() {
  timers.forEach(clearTimeout)
  timers = []
  showDecoration.value = false
  visibleItems.value = []
}

function showMenuItems() {
  hideMenuItems()
  navItems.value.forEach((_, i) => {
    timers.push(setTimeout(() => visibleItems.value.push(i), i * 80))
  })
  timers.push(setTimeout(() => (showDecoration.value = true), 700))
}

const links: HTMLAnchorElement[] = []
let selectedIndex: number | null = null

function select(index: number) {
  selectedIndex = index
  emit('select', index)
}

watch(
  () => props.hidden,
  (hidden) => {
    if (hidden) return hideMenuItems()
    showMenuItems()

    // Focus was inside the closed section, which is inert now
    if (selectedIndex !== null && document.activeElement === document.body) {
      nextTick(() => links[selectedIndex!]?.focus({ preventScroll: true }))
    }
  }
)

watch(navItems, (items) => {
  if (!props.hidden && items.length > 0) showMenuItems()
})

onMounted(() => {
  if (!props.hidden) showMenuItems()
})

onBeforeUnmount(hideMenuItems)
</script>

<template>
  <nav class="main-menu" :class="{ '--hidden': hidden }" :inert="hidden">
    <div
      v-for="(item, index) in navItems"
      :key="item.id"
      class="main-menu__item"
      :class="{
        '--visible': visibleItems.includes(index),
        '--active': activeIndex === index,
        '--dimmed': activeIndex != null && activeIndex !== index
      }"
    >
      <a
        :ref="(el) => (links[index] = el as HTMLAnchorElement)"
        href="#"
        class="main-menu__link"
        :class="{ '--decorated': showDecoration }"
        @mouseenter="emit('hover', index)"
        @mouseleave="emit('hover', null)"
        @focus="emit('hover', index)"
        @blur="emit('hover', null)"
        @click.prevent="select(index)"
        >{{ item.label }}</a
      >
    </div>
  </nav>
</template>

<style lang="scss">
.main-menu {
  position: relative;
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
  font-size: clamp(2.4rem, 6.5vw, 3.2rem);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @include m.min-width(sm) {
    gap: 0;
    font-size: clamp(3rem, 5vw, 6.4rem);
  }

  &.--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &__item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &.--visible {
      opacity: 1;
      transform: translateY(0);
    }

    &.--visible.--dimmed {
      opacity: 0.4;
    }

    &.--active .main-menu__link.--decorated::before {
      transform: scale3d(1.2, 1, 1);
      height: 0.44em;
    }

    &:nth-child(1) .main-menu__link::before {
      background: linear-gradient(45deg, #3a3d98, #6f22b9);
    }

    &:nth-child(2) .main-menu__link::before {
      background: linear-gradient(45deg, #0947db, #07d89d);
    }

    &:nth-child(3) .main-menu__link::before {
      background: linear-gradient(45deg, #ee2d29, #f8ae2c);
    }

    &:nth-child(4) .main-menu__link::before {
      background: linear-gradient(45deg, #9d316e, #de2d3e);
    }

    &:nth-child(5) .main-menu__link::before {
      background: linear-gradient(45deg, #1d6449, #07d89d);
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
      &::before {
        height: 0.39em;
        transition:
          height 0.8s cubic-bezier(0.2, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
        transform: scale3d(1, 1, 1);
      }

      &:hover::before {
        transform: scale3d(1.2, 1, 1);
        height: 0.44em;
      }
    }

    &::before {
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
