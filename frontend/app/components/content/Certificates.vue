<template>
  <div class="certificates">
    <FilterTabs v-model="activeTab" :tabs="tabs" />

    <TransitionGroup
      v-if="revealCount > 0"
      :key="revealCount"
      tag="ul"
      name="list-item"
      class="certificates__list"
      appear
      @before-leave="pin"
    >
      <li
        v-for="(cert, index) in visibleCertificates"
        :key="cert.id"
        :ref="register(cert.id)"
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
const { certificates, categories } = useCertificates()
const { ui } = useGlobalSettings()
const isActive = useSectionActive()
const { elements, register, capture, pin } = useLeavePinning<number>()

const activeTab = ref(0)
const viewerIndex = ref<number | null>(null)
const viewerOrigin = ref<DOMRect | null>(null)

// The list renders on first open (so images don't load up front) and remounts on every open to replay the cascade
const revealCount = ref(0)

const tabs = computed(() => [
  { label: ui.value.allLabel ?? '', count: certificates.value.length },
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
  viewerOrigin.value = elements.get(cert.id)?.getBoundingClientRect() ?? null
}

watch(activeTab, capture)

watch(isActive, (active) => {
  if (active) revealCount.value++
})
</script>

<style lang="scss">
.certificates {
  --tabs-gradient: linear-gradient(135deg, #ee2d29, #f8ae2c);

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
</style>
