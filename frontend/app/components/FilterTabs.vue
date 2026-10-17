<template>
  <div ref="navEl" class="filter-tabs" role="tablist">
    <span
      class="filter-tabs__indicator"
      :style="indicatorStyle"
      aria-hidden="true"
    />
    <button
      v-for="(tab, index) in tabs"
      :key="tab.label"
      :ref="(el) => (tabEls[index] = el as HTMLElement)"
      type="button"
      class="filter-tabs__item"
      :class="{ '--active': modelValue === index }"
      role="tab"
      :aria-selected="modelValue === index"
      @click="emit('update:modelValue', index)"
    >
      <span class="filter-tabs__label">{{ tab.label }}</span>
      <span class="filter-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tabs: { label: string; count: number }[]
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [index: number]
}>()

const isActive = useSectionActive()

const navEl = ref<HTMLElement | null>(null)
const tabEls = ref<HTMLElement[]>([])
const indicatorStyle = ref<Record<string, string>>({ opacity: '0' })

function moveIndicator() {
  const tab = tabEls.value[props.modelValue]
  if (!tab) return

  indicatorStyle.value = {
    width: `${tab.offsetWidth}px`,
    height: `${tab.offsetHeight}px`,
    transform: `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`
  }
}

watch(
  () => props.modelValue,
  () => nextTick(moveIndicator)
)

watch(isActive, (active) => {
  if (active) nextTick(moveIndicator)
})

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  moveIndicator()
  if (!navEl.value) return
  resizeObserver = new ResizeObserver(moveIndicator)
  resizeObserver.observe(navEl.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style lang="scss">
.filter-tabs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 2.4rem;
  padding: 0.4rem;
  background-color: rgba(255, 255, 255, 0.06);
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;

  &__indicator {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 1rem;
    background: var(--tabs-gradient, var(--accent));
    box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.3);
    transition:
      transform 0.5s cubic-bezier(0.2, 1, 0.3, 1),
      width 0.5s cubic-bezier(0.2, 1, 0.3, 1),
      height 0.5s cubic-bezier(0.2, 1, 0.3, 1);
  }

  &__item {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 1.4rem;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.65);
    background: none;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: color 0.3s;

    &.--active {
      color: #fff;

      .filter-tabs__count {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    &:hover {
      color: #fff;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 0.2rem solid var(--accent);
      outline-offset: 0.2rem;
    }
  }

  &__label {
    line-height: 1;
  }

  &__count {
    padding: 0.2rem 0.6rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.2;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.6rem;
    transition: background-color 0.3s;
  }
}
</style>
