<template>
  <div class="portfolio">
    <ul class="portfolio__list">
      <PortfolioCard
        v-for="item in portfolio"
        :key="item.id"
        :img-src-big="item.imgSrcBig"
        :img-src-small="item.imgSrcSmall"
        :link-to="item.linkTo"
        :site-name="item.siteName"
        :desc="item.desc"
        @open-preview="openViewer(item)"
      />
    </ul>

    <ImageViewer
      :open="!!viewerItem"
      :src="viewerItem?.imgSrcBig ?? ''"
      :alt="viewerItem?.siteName ?? ''"
      scrollable
      @close="viewerItem = null"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PortfolioItem } from '~/types'
import { portfolioItems } from '~/data/portfolio'

const portfolio = portfolioItems
const viewerItem = ref<PortfolioItem | null>(null)

function openViewer(item: PortfolioItem) {
  viewerItem.value = item
}
</script>

<style lang="scss" scoped>
.portfolio {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
