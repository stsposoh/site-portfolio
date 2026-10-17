<template>
  <div class="portfolio">
    <FilterTabs v-if="technologies.length" v-model="activeTab" :tabs="tabs" />

    <TransitionGroup
      v-if="revealCount > 0"
      :key="revealCount"
      tag="ul"
      name="list-item"
      class="portfolio__list"
      appear
      @before-leave="pin"
    >
      <li
        v-for="(project, index) in visibleProjects"
        :key="project.id"
        :ref="register(project.id)"
        class="portfolio__item"
        :style="{ '--i': index }"
      >
        <PortfolioCard
          :title="project.title"
          :description="project.description"
          :link="project.link"
          :src="project.src"
          :srcset="project.srcset"
          :width="project.width"
          :height="project.height"
          :technologies="project.technologies"
          @open="openViewer(index, $event)"
        />
      </li>
    </TransitionGroup>

    <ImageViewer
      :open="viewerProject !== null"
      :src="viewerProject?.src ?? ''"
      :alt="viewerProject?.title ?? ''"
      scrollable
      :origin-rect="viewerOrigin"
      :can-prev="viewerIndex !== null && viewerIndex > 0"
      :can-next="
        viewerIndex !== null && viewerIndex < visibleProjects.length - 1
      "
      @prev="stepViewer(-1)"
      @next="stepViewer(1)"
      @close="viewerIndex = null"
    />
  </div>
</template>

<script lang="ts" setup>
const ALL_LABEL = 'Все'

const { projects, technologies } = useProjects()
const isActive = useSectionActive()
const { elements, register, capture, pin } = useLeavePinning<number>()

const activeTab = ref(0)
const viewerIndex = ref<number | null>(null)
const viewerOrigin = ref<DOMRect | null>(null)

// The list renders on first open (so images don't load up front) and remounts on every open to replay the cascade
const revealCount = ref(0)

const tabs = computed(() => [
  { label: ALL_LABEL, count: projects.value.length },
  ...technologies.value.map(({ name, count }) => ({ label: name, count }))
])

const visibleProjects = computed(() => {
  const technology = technologies.value[activeTab.value - 1]?.name
  return technology
    ? projects.value.filter((project) =>
        project.technologies.some(({ name }) => name === technology)
      )
    : projects.value
})

const viewerProject = computed(() =>
  viewerIndex.value === null
    ? null
    : (visibleProjects.value[viewerIndex.value] ?? null)
)

const previewRect = (id: number) =>
  elements
    .get(id)
    ?.querySelector('.portfolio-card__preview')
    ?.getBoundingClientRect() ?? null

function openViewer(index: number, rect: DOMRect) {
  viewerOrigin.value = rect
  viewerIndex.value = index
}

function stepViewer(delta: number) {
  if (viewerIndex.value === null) return

  const next = viewerIndex.value + delta
  const project = visibleProjects.value[next]
  if (!project) return

  viewerIndex.value = next
  viewerOrigin.value = previewRect(project.id)
}

watch(activeTab, capture)

watch(isActive, (active) => {
  if (active) revealCount.value++
})
</script>

<style lang="scss">
.portfolio {
  --tabs-gradient: linear-gradient(135deg, #9d316e, #de2d3e);

  &__list {
    --columns: 1;
    --gap: 1.6rem;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;

    @include m.min-width(sm) {
      --columns: 2;
    }

    @include m.min-width(lg) {
      --columns: 3;
      --gap: 2rem;
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
