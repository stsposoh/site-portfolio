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
type PortfolioItem = {
  id: string
  siteName: string
  linkTo: string
  imgSrcSmall: string
  imgSrcBig: string
  desc: string
}

const portfolio = ref<PortfolioItem[]>([
  { id: 'tutor', siteName: 'tutor', linkTo: 'http://tutor.ru/', imgSrcSmall: '/images/portfolio/tutor_small.png', imgSrcBig: '/images/portfolio/tutor_big.png', desc: 'Командная разработка образовательного портала' },
  { id: 'mam4', siteName: 'mam4.ru', linkTo: 'http://www.mam4.ru', imgSrcSmall: '/images/portfolio/mam4_small.png', imgSrcBig: '/images/portfolio/mam4_big.png', desc: 'Работал в команде над созданием социальной сети. Разрабатывал фронт на Vue.js' },
  { id: 'vostokvk', siteName: 'vostokvk', linkTo: 'http://vostokvk.ru/', imgSrcSmall: '/images/portfolio/vostokvk_small.png', imgSrcBig: '/images/portfolio/vostokvk_big.png', desc: 'Сайт на WordPress' },
  { id: 'agrosoyuz', siteName: 'agrosoyuz', linkTo: 'http://grey-fox.ru/clients/agrosoyuz/', imgSrcSmall: '/images/portfolio/agro_small.png', imgSrcBig: '/images/portfolio/agro_big.jpg', desc: 'Сайт на WordPress' },
  { id: 'tk-bessarabka', siteName: 'tk-bessarabka', linkTo: 'http://tk-bessarabka.ru/', imgSrcSmall: '/images/portfolio/bessarabka_small.png', imgSrcBig: '/images/portfolio/bessarabka_big.png', desc: 'Сайт на WordPress' },
  { id: 'fortuna', siteName: 'fortuna', linkTo: 'http://fortuna-design.com/', imgSrcSmall: '/images/portfolio/fortuna_small.png', imgSrcBig: '/images/portfolio/fortuna_big.png', desc: 'Сайт на WordPress' },
  { id: 'arbowork', siteName: 'arbowork.com', linkTo: 'https://arbowork.com/', imgSrcSmall: '/images/portfolio/arbo_small.png', imgSrcBig: '/images/portfolio/arbo_big.png', desc: 'Сайт на WordPress' },
  { id: 'temple', siteName: 'temple', linkTo: 'http://temple.polyfill.ru', imgSrcSmall: '/images/portfolio/temple_small.png', imgSrcBig: '/images/portfolio/temple_big.png', desc: 'Сайт на WordPress' },
  { id: 'do-dom', siteName: 'do-dom.ru', linkTo: 'https://do-dom.ru/', imgSrcSmall: '/images/portfolio/dd_small.png', imgSrcBig: '/images/portfolio/dd_big.png', desc: 'Сайт на WordPress с приемом пожертвований через плагин Лейка' },
  { id: 'savethelife', siteName: 'savethelife.ru', linkTo: 'http://savethelife.ru/', imgSrcSmall: '/images/portfolio/podari_small.png', imgSrcBig: '/images/portfolio/podari_big.png', desc: 'Сайт на WordPress с приемом пожертвований через плагин Лейка' },
  { id: 'maps-me', siteName: 'maps.me', linkTo: 'http://maps.me/', imgSrcSmall: '/images/portfolio/maps_me_small.png', imgSrcBig: '/images/portfolio/maps_me_big.png', desc: 'Новогодняя страничка для maps.me' },
  { id: 'routes-maps-me', siteName: 'maps.me routes', linkTo: 'http://maps.me/', imgSrcSmall: '/images/portfolio/routes_maps_me_small.png', imgSrcBig: '/images/portfolio/routes_maps_me_big.png', desc: 'Туристические маршруты для maps.me' },
  { id: 'ingoma', siteName: 'ingoma.ru', linkTo: 'http://ingoma.ru/', imgSrcSmall: '/images/portfolio/Ingoma_small.png', imgSrcBig: '/images/portfolio/Ingoma_big.png', desc: 'Сайт на WordPress' },
  { id: 'dostavkaoptom', siteName: 'dostavkaoptom.ru', linkTo: 'http://dostavkaoptom.ru/', imgSrcSmall: '/images/portfolio/dostavkaoptom_small.png', imgSrcBig: '/images/portfolio/dostavkaoptom_big.png', desc: 'Сайт на WordPress' },
  { id: 'stroydvor', siteName: 'стройдворпетровский.рф', linkTo: 'http://xn--b1aaefqbfg4adbkhfcgmfj.xn--p1ai/', imgSrcSmall: '/images/portfolio/stroydvor_small.png', imgSrcBig: '/images/portfolio/stroydvor_big.png', desc: 'Сайт на WordPress' },
  { id: 'iknagrevateli', siteName: 'iknagrevateli.ru', linkTo: 'http://iknagrevateli.ru/', imgSrcSmall: '/images/portfolio/iknagrevateli_small.png', imgSrcBig: '/images/portfolio/iknagrevateli_big.png', desc: 'Сайт на WordPress' },
  { id: 'detalno', siteName: 'detalno.com.ua', linkTo: 'http://detalno.com.ua/', imgSrcSmall: '/images/portfolio/detalno_small.png', imgSrcBig: '/images/portfolio/detalno_big.png', desc: 'Сайт на WordPress' },
  { id: 'strekoza', siteName: 'strekoza.design', linkTo: 'http://strekoza.design/', imgSrcSmall: '/images/portfolio/strekoza_small.png', imgSrcBig: '/images/portfolio/strekoza_big.png', desc: 'Сайт на WordPress' },
  { id: 'zubiki', siteName: 'm.zubiki.ru', linkTo: 'http://m.zubiki.ru/', imgSrcSmall: '/images/portfolio/zubi_small.png', imgSrcBig: '/images/portfolio/zubi_big.png', desc: 'Мобильная версия сайта' },
  { id: 'gudkov', siteName: 'mundep.gudkov.ru', linkTo: 'https://mundep.gudkov.ru/', imgSrcSmall: '/images/portfolio/gudkov_small.png', imgSrcBig: '/images/portfolio/gudkov_big.png', desc: 'Принимал участие в командной работе над сайтом' },
  { id: 'beautyfit', siteName: 'beautyfit.ru', linkTo: 'http://beautyfit.ru/', imgSrcSmall: '/images/portfolio/tverskaya_small.png', imgSrcBig: '/images/portfolio/tverskaya_big.png', desc: 'Сайт на WordPress' },
  { id: 'mauthausen', siteName: 'mauthausen', linkTo: 'http://camps.polyfill.ru/', imgSrcSmall: '/images/portfolio/mauthausen_small.png', imgSrcBig: '/images/portfolio/mauthausen_big.png', desc: 'Сайт на WordPress' },
  { id: 'funportret', siteName: 'funportret', linkTo: 'http://funportret.ru/', imgSrcSmall: '/images/portfolio/funportrait_small.png', imgSrcBig: '/images/portfolio/funportrait_big.png', desc: 'Сайт на WordPress' },
])

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
    justify-content: center;
    gap: 1.5rem 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
