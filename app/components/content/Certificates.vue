<template>
  <div class="certificates">
    <div class="certificates__nav-wrap" role="tablist">
      <button
        v-for="(label, i) in tabLabels"
        :key="i"
        type="button"
        class="certificates__nav-item"
        :class="{ '--active': activeTabIndex === i }"
        role="tab"
        :aria-selected="activeTabIndex === i"
        @click="activeTabIndex = i"
      >
        <span class="certificates__nav-label">{{ label }}</span>
        <span class="certificates__nav-count">{{ tabCounts[i] }}</span>
      </button>
    </div>
    <div class="certificates__cont certificates__cont--card">
      <ul class="certificates__list">
        <li
          v-for="cert in filteredByTab(activeTabIndex)"
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

    <ImageViewer
      :open="!!viewerCert"
      :src="viewerCert?.fullSrc ?? ''"
      :alt="viewerCert?.alt ?? ''"
      @close="viewerCert = null"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Cert } from '~/types'
import { certificatesData } from '~/data/certificates'

const tabLabels = ['Показать все', 'Курсы', 'Тесты', 'Разное'] as const

const certificates = certificatesData
const activeTabIndex = ref(0)
const viewerCert = ref<Pick<Cert, 'fullSrc' | 'alt'> | null>(null)

const tabCounts = computed(() => {
  const all = certificates.length
  const courses = certificates.filter((c) => c.category === 'Курсы').length
  const tests = certificates.filter((c) => c.category === 'Тесты').length
  const other = certificates.filter((c) => c.category === 'Разное').length
  return [all, courses, tests, other]
})

function filteredByTab(tabIndex: number): Cert[] {
  if (tabIndex === 0) return certificates
  const category = tabLabels[tabIndex]
  return certificates.filter((c) => c.category === category)
}

function openViewer(cert: Cert) {
  viewerCert.value = { fullSrc: cert.fullSrc, alt: cert.alt }
}
</script>

<style lang="scss" scoped>
$accent: #ee2d29;
$accent-light: #f8ae2c;

.certificates {
  &__nav-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 0 0 2rem;
    padding: 0.4rem;
    background: #f3f2f6;
    border-radius: 1.2rem;
    width: fit-content;
  }

  &__nav-item {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.4rem;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #666;
    background: transparent;
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: #333;
      background: rgba(255, 255, 255, 0.8);
    }

    &.--active {
      color: #fff;
      background: linear-gradient(135deg, $accent, $accent-light);
      box-shadow: 0 0.2rem 0.8rem rgba(238, 45, 41, 0.35);

      .certificates__nav-count {
        background: rgba(255, 255, 255, 0.35);
      }
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 0.2rem solid $accent;
      outline-offset: 0.2rem;
    }
  }

  &__nav-label {
    line-height: 1;
  }

  &__nav-count {
    padding: 0.2rem 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 0.4rem;
  }

  &__cont {
    position: relative;
    min-height: 20rem;

    &--card {
      padding: 1.5rem;
      background: #f8f7fa;
      border-radius: 1.2rem;
      border-left: 0.4rem solid #ee2d29;
      box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.04);
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__list-item {
    flex: 0 0 calc((100% - 4 * 1.5rem) / 5);
  }
}
</style>
