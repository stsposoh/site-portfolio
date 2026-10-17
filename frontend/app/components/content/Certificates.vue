<template>
  <div class="certificates">
    <div ref="navEl" class="certificates__nav" role="tablist">
      <span
        class="certificates__nav-indicator"
        :style="indicatorStyle"
        aria-hidden="true"
      />
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :ref="(el) => (tabEls[index] = el as HTMLElement)"
        type="button"
        class="certificates__nav-item"
        :class="{ '--active': activeTab === index }"
        role="tab"
        :aria-selected="activeTab === index"
        @click="activeTab = index"
      >
        <span class="certificates__nav-label">{{ tab.label }}</span>
        <span class="certificates__nav-count">{{ tab.count }}</span>
      </button>
    </div>

    <TransitionGroup
      :key="revealCount"
      tag="ul"
      name="certificates-item"
      class="certificates__list"
      appear
      @before-leave="pinLeavingItem"
    >
      <li
        v-for="(cert, index) in visibleCertificates"
        :key="cert.id"
        :ref="(el) => cardEls.set(cert.id, el as HTMLElement)"
        class="certificates__item"
        :style="{ '--i': index }"
      >
        <Certificate
          :src="cert.src"
          :srcset="cert.srcset"
          :alt="cert.alt"
          :width="cert.width"
          :height="cert.height"
          @open="openViewer(index, $event)"
        />
      </li>
    </TransitionGroup>

    <ImageViewer
      :open="viewerCert !== null"
      :src="viewerCert?.src ?? ''"
      :alt="viewerCert?.alt ?? ''"
      :origin-rect="viewerOrigin"
      :can-prev="viewerIndex !== null && viewerIndex > 0"
      :can-next="
        viewerIndex !== null && viewerIndex < visibleCertificates.length - 1
      "
      @prev="stepViewer(-1)"
      @next="stepViewer(1)"
      @close="viewerIndex = null"
    />
  </div>
</template>

<script lang="ts" setup>
const ALL_LABEL = 'Показать все'

const { certificates, categories } = useCertificates()
const isActive = useSectionActive()

const activeTab = ref(0)
const navEl = ref<HTMLElement | null>(null)
const tabEls = ref<HTMLElement[]>([])
const cardEls = new Map<number, HTMLElement>()
const indicatorStyle = ref<Record<string, string>>({ opacity: '0' })

const viewerIndex = ref<number | null>(null)
const viewerOrigin = ref<DOMRect | null>(null)

// Remounting the list on every open replays the cascade
const revealCount = ref(0)

const tabs = computed(() => [
  { label: ALL_LABEL, count: certificates.value.length },
  ...categories.value.map((category) => ({
    label: category,
    count: certificates.value.filter((cert) => cert.category === category)
      .length
  }))
])

const visibleCertificates = computed(() => {
  const category = categories.value[activeTab.value - 1]
  return category
    ? certificates.value.filter((cert) => cert.category === category)
    : certificates.value
})

const viewerCert = computed(() =>
  viewerIndex.value === null
    ? null
    : (visibleCertificates.value[viewerIndex.value] ?? null)
)

function moveIndicator() {
  const tab = tabEls.value[activeTab.value]
  if (!tab) return

  indicatorStyle.value = {
    width: `${tab.offsetWidth}px`,
    height: `${tab.offsetHeight}px`,
    transform: `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`
  }
}

// Leaving items go absolute one by one and reflow the rest, so positions are captured before the update
const itemPositions = new Map<HTMLElement, { left: number; top: number; width: number }>()

function captureItemPositions() {
  itemPositions.clear()
  cardEls.forEach((el) => {
    if (!el) return
    itemPositions.set(el, {
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth
    })
  })
}

function pinLeavingItem(el: Element) {
  const item = el as HTMLElement
  const position = itemPositions.get(item)
  if (!position) return

  item.style.left = `${position.left}px`
  item.style.top = `${position.top}px`
  item.style.width = `${position.width}px`
}

function openViewer(index: number, rect: DOMRect) {
  viewerOrigin.value = rect
  viewerIndex.value = index
}

function stepViewer(delta: number) {
  if (viewerIndex.value === null) return

  const next = viewerIndex.value + delta
  const cert = visibleCertificates.value[next]
  if (!cert) return

  viewerIndex.value = next
  viewerOrigin.value = cardEls.get(cert.id)?.getBoundingClientRect() ?? null
}

watch(activeTab, () => {
  captureItemPositions()
  nextTick(moveIndicator)
})

watch(isActive, (active) => {
  if (!active) return
  revealCount.value++
  nextTick(moveIndicator)
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
.certificates {
  &__nav {
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
  }

  &__nav-indicator {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 1rem;
    background: linear-gradient(135deg, #ee2d29, #f8ae2c);
    box-shadow: 0 0.6rem 2rem rgba(238, 45, 41, 0.35);
    transition:
      transform 0.5s cubic-bezier(0.2, 1, 0.3, 1),
      width 0.5s cubic-bezier(0.2, 1, 0.3, 1),
      height 0.5s cubic-bezier(0.2, 1, 0.3, 1);
  }

  &__nav-item {
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

      .certificates__nav-count {
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

  &__nav-label {
    line-height: 1;
  }

  &__nav-count {
    padding: 0.2rem 0.6rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.2;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.6rem;
    transition: background-color 0.3s;
  }

  &__list {
    --columns: 2;
    --gap: 1.2rem;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;

    @include m.min-width(md) {
      --columns: 3;
      --gap: 1.6rem;
    }

    @include m.min-width(lg) {
      --columns: 4;
    }

    @include m.min-width(xl) {
      --columns: 5;
    }
  }

  &__item {
    flex: 0 0 auto;
    width: calc(
      (100% - (var(--columns) - 1) * var(--gap)) / var(--columns)
    );
  }
}

.certificates-item-move,
.certificates-item-enter-active,
.certificates-item-leave-active {
  transition:
    transform 0.6s cubic-bezier(0.2, 1, 0.3, 1),
    opacity 0.4s ease;
}

.certificates-item-enter-active {
  transition-delay: calc(var(--i) * 40ms);
}

.certificates-item-enter-from {
  opacity: 0;
  transform: translateY(2rem) scale(0.9);
}

.certificates-item-leave-active {
  position: absolute;
}

.certificates-item-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
