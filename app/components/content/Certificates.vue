<template>
  <div class="certificates">
    <ul class="certificates__nav-list" role="tablist">
      <li
        v-for="(label, i) in tabLabels"
        :key="i"
        class="certificates__nav-item"
        :class="{ '--active': activeTabIndex === i }"
        role="tab"
        :aria-selected="activeTabIndex === i"
        @click="activeTabIndex = i"
      >
        {{ label }}
      </li>
    </ul>
    <div class="certificates__cont" :style="containerStyle">
      <div ref="wrapperRef" class="certificates__wrapper" :style="wrapperStyle">
        <ul
          v-for="(group, groupIndex) in tabLabels"
          :key="groupIndex"
          class="certificates__list"
        >
          <li
            v-for="(cert, certIndex) in filteredByTab(groupIndex)"
            :key="cert.id"
            class="certificates__list-item"
          >
            <Certificate
              :thumb-src="cert.thumbSrc"
              :full-src="cert.fullSrc"
              :alt="cert.alt"
              @click="openViewer(cert)"
            />
          </li>
        </ul>
      </div>
    </div>

    <ImageViewer
      :open="!!viewerCert"
      :src="viewerCert?.fullSrc ?? ''"
      :alt="viewerCert?.alt ?? ''"
      @close="viewerCert = null"
    />
  </div>
</template>

<script lang="ts" setup>
type Cert = {
  id: number
  thumbSrc: string
  fullSrc: string
  alt: string
  category: 'Курсы' | 'Тесты' | 'Разное'
}

const tabLabels = ['Показать все', 'Курсы', 'Тесты', 'Разное']

const certificates = ref<Cert[]>([
  { id: 1, thumbSrc: '/images/certificates/small/1.jpg', fullSrc: '/images/certificates/big/1.jpg', alt: 'Сертификат 1', category: 'Курсы' },
  { id: 2, thumbSrc: '/images/certificates/small/2.jpg', fullSrc: '/images/certificates/big/2.jpg', alt: 'Сертификат 2', category: 'Курсы' },
  { id: 3, thumbSrc: '/images/certificates/small/3.jpg', fullSrc: '/images/certificates/big/3.jpg', alt: 'Сертификат 3', category: 'Тесты' },
  { id: 4, thumbSrc: '/images/certificates/small/4.jpg', fullSrc: '/images/certificates/big/4.jpg', alt: 'Сертификат 4', category: 'Курсы' },
  { id: 5, thumbSrc: '/images/certificates/small/5.jpg', fullSrc: '/images/certificates/big/5.jpg', alt: 'Сертификат 5', category: 'Разное' },
  { id: 6, thumbSrc: '/images/certificates/small/6.jpg', fullSrc: '/images/certificates/big/6.jpg', alt: 'Сертификат 6', category: 'Курсы' },
  { id: 7, thumbSrc: '/images/certificates/small/7.jpg', fullSrc: '/images/certificates/big/7.jpg', alt: 'Сертификат 7', category: 'Тесты' },
  { id: 8, thumbSrc: '/images/certificates/small/8.jpg', fullSrc: '/images/certificates/big/8.jpg', alt: 'Сертификат 8', category: 'Курсы' },
  { id: 9, thumbSrc: '/images/certificates/small/9.jpg', fullSrc: '/images/certificates/big/9.jpg', alt: 'Сертификат 9', category: 'Разное' },
  { id: 10, thumbSrc: '/images/certificates/small/10.jpg', fullSrc: '/images/certificates/big/10.jpg', alt: 'Сертификат 10', category: 'Курсы' },
  { id: 11, thumbSrc: '/images/certificates/small/11.jpg', fullSrc: '/images/certificates/big/11.jpg', alt: 'Сертификат 11', category: 'Тесты' },
  { id: 12, thumbSrc: '/images/certificates/small/12.jpg', fullSrc: '/images/certificates/big/12.jpg', alt: 'Сертификат 12', category: 'Курсы' },
  { id: 13, thumbSrc: '/images/certificates/small/13.jpg', fullSrc: '/images/certificates/big/13.jpg', alt: 'Сертификат 13', category: 'Разное' },
  { id: 14, thumbSrc: '/images/certificates/small/14.jpg', fullSrc: '/images/certificates/big/14.jpg', alt: 'Сертификат 14', category: 'Курсы' },
  { id: 15, thumbSrc: '/images/certificates/small/15.jpg', fullSrc: '/images/certificates/big/15.jpg', alt: 'Сертификат 15', category: 'Тесты' },
])

const activeTabIndex = ref(0)
const viewerCert = ref<Pick<Cert, 'fullSrc' | 'alt'> | null>(null)

function filteredByTab(tabIndex: number): Cert[] {
  if (tabIndex === 0) return certificates.value
  const category = tabLabels[tabIndex]
  return certificates.value.filter((c) => c.category === category)
}

const containerHeight = ref(0)
const wrapperRef = ref<HTMLElement | null>(null)

const containerStyle = computed(() => ({
  height: containerHeight.value ? `${containerHeight.value}px` : 'auto',
}))

const wrapperStyle = computed(() => ({
  transform: `translate3d(-${100 * activeTabIndex.value}%, 0, 0)`,
}))

function setHeight() {
  if (!wrapperRef.value) return
  const panels = wrapperRef.value.querySelectorAll('.certificates__list')
  const activePanel = panels[activeTabIndex.value]
  containerHeight.value = activePanel ? activePanel.scrollHeight : 0
}

function openViewer(cert: Cert) {
  viewerCert.value = { fullSrc: cert.fullSrc, alt: cert.alt }
}

watch(activeTabIndex, () => {
  nextTick(setHeight)
})

onMounted(() => {
  nextTick(setHeight)
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', setHeight)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', setHeight)
  }
})
</script>

<style lang="scss" scoped>
$accent-color: #6f22b9;

.certificates {
  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.25rem;
    margin: 0 0 1.5rem;
    padding: 0;
    list-style: none;
  }

  &__nav-item {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #888;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #555;
    }

    &.--active {
      color: $accent-color;
    }
  }

  &__cont {
    position: relative;
    overflow: hidden;
    transition: height 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  &__wrapper {
    display: flex;
    will-change: transform;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  &__list {
    flex: 0 0 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  &__list-item {
    display: inline-block;
    margin: 5px;
  }
}
</style>
