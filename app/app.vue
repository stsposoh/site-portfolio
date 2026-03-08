<template>
  <div class="app-content" :class="{ 'is-content-open': isOpen }">
    <TheHeader />

    <div class="app-content__hero">
      <TheMenu :hidden="isOpen" />

      <SVGScene />
    </div>

    <main class="app-content__main js-app-content-main">
      <ContentSection
        color="purple"
        title="Станислав Посохов"
        subtitle="Frontend-разработчик, ориентированный на чистый код и современный стек"
        @close="closeHandler"
      >
        <ContentAbout />
      </ContentSection>

      <ContentSection
        color="teal"
        title="Навыки"
        subtitle="Используемые мной технологии"
        @close="closeHandler"
      >
        <ContentSkills />
      </ContentSection>

      <ContentSection
        color="orange"
        title="Сертификаты"
        subtitle="Курсы и сертификации"
        @close="closeHandler"
      >
        <ContentCertificates />
      </ContentSection>

      <ContentSection
        color="coral"
        title="Портфолио"
        subtitle="Выбранные проекты и кейсы"
        @close="closeHandler"
      >
        <ContentPortfolio />
      </ContentSection>

      <ContentSection
        color="mint"
        title="Контакты"
        subtitle="Связь — email и соцсети"
        @close="closeHandler"
      >
        <ContentContacts />
      </ContentSection>
    </main>
  </div>
</template>

<script lang="ts" setup>
import anime from 'animejs'

const isOpen = ref(false)
const animationInProgress = ref(false)
const closeHandler = ref<() => void>(() => {})

onMounted(() => {
  function debounce(func, wait, immediate) {
    var timeout
    return function () {
      var context = this,
        args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  class Blob {
    constructor(el, options) {
      this.DOM = {}
      this.DOM.el = el
      this.options = {}
      Object.assign(this.options, options)
      this.init()
    }
    init() {
      this.rect = this.DOM.el.getBoundingClientRect()
      this.descriptions = []
      this.layers = Array.from(this.DOM.el.querySelectorAll('path'), (t) => {
        t.style.transformOrigin = `${this.rect.left + this.rect.width / 2}px ${this.rect.top + this.rect.height / 2}px`
        t.style.opacity = 0
        this.descriptions.push(t.getAttribute('d'))
        return t
      })

      window.addEventListener(
        'resize',
        debounce(() => {
          this.rect = this.DOM.el.getBoundingClientRect()
          this.layers.forEach(
            (layer) =>
              (layer.style.transformOrigin = `${this.rect.left + this.rect.width / 2}px ${this.rect.top + this.rect.height / 2}px`)
          )
        }, 20)
      )
    }
    intro() {
      return new Promise((resolve) => {
        anime.remove(this.layers)

        anime({
          targets: this.layers,
          duration: 1800,
          delay: (t, i) => i * 120,
          easing: 'cubicBezier(0.2, 1, 0.1, 1)',
          scale: [0.2, 1],
          opacity: {
            value: [0, 1],
            duration: 300,
            delay: (t, i) => i * 120,
            easing: 'linear'
          },
          complete: function () {
            resolve()
          }
        })
      })
    }
    expand() {
      return new Promise((resolve, reject) => {
        let halfway = false

        // Ensure layers are visible before expanding
        // (in case intro() animation was interrupted by rapid clicks)
        this.layers.forEach((layer) => {
          layer.style.opacity = '1'
          layer.style.transform = 'scale(1)'
        })

        anime({
          targets: this.layers,
          duration: 1000,
          delay: (t, i) => i * 50 + 200,
          easing: 'cubicBezier(0.8, 0, 0.1, 0)',
          d: (t) => t.getAttribute('pathdata:id'),
          complete: function () {
            resolve()
          }
        })
      })
    }
    collapse() {
      return new Promise((resolve, reject) => {
        anime({
          targets: this.layers,
          duration: 800,
          delay: (t, i, total) => (total - i - 1) * 50 + 400,
          easing: 'cubicBezier(0.2, 1, 0.1, 1)',
          d: (t, i) => this.descriptions[i],
          complete: function () {
            resolve()
          }
        })
      })
    }
    hide() {
      anime.remove(this.layers)
      anime({
        targets: this.layers,
        duration: 800,
        delay: (t, i, total) => (total - i - 1) * 80,
        easing: 'easeInOutExpo',
        scale: 0,
        opacity: {
          value: 0,
          duration: 500,
          delay: (t, i, total) => (total - i - 1) * 80,
          easing: 'linear'
        }
      })
    }
    show() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.intro().then(() => {
            resolve()
          })
        }, 400)
      })
    }
    breathe() {
      anime.remove(this.layers)

      this.layers.forEach((layer, i) => {
        anime({
          targets: layer,
          scale: [1, 1.035],
          duration: 3500 + Math.random() * 1500,
          delay: i * 200 + Math.random() * 500,
          easing: 'easeInOutSine',
          loop: true,
          direction: 'alternate'
        })
      })
    }
    stopBreathe() {
      anime.remove(this.layers)
    }
  }

  window.Blob = Blob

  const DOM = {}
  let blobs = []
  DOM.svg = document.querySelector('.svg-scene')

  Array.from(DOM.svg.querySelectorAll('g')).forEach((el) => {
    const blob = new Blob(el)

    // console.log(blob)

    blobs.push(blob)
    blob.intro().then(() => {
      blob.breathe()
    })
  })

  DOM.content = document.querySelector('.js-app-content-main')
  DOM.contentInner = Array.from(
    DOM.content.querySelectorAll('.content-section')
  )
  DOM.links = Array.from(document.querySelectorAll('.main-menu__link'))

  DOM.links.forEach((link, pos) => {
    // link.style.pointerEvents = 'none';
    // charming(link);
    //
    // anime({
    //   targets: link.querySelectorAll('span'),
    //   duration: 800,
    //   delay: (t,i) => anime.random(0,600)+500,
    //   easing: 'easeInOutQuad',
    //   opacity: [0,1],
    //   complete: () => {
    //     link.style.pointerEvents = 'auto';
    //     link.classList.add('--decorated');
    //   }
    // });

    link.addEventListener('click', (ev) => {
      ev.preventDefault()
      open(pos)
    })
  })

  const menuToBlobIndex = [0, 1, 2, 3, 4]
  let current

  const open = (pos) => {
    isOpen.value = true
    animationInProgress.value = true

    current = pos
    const blobIndex = menuToBlobIndex[pos]
    const currentBlob = blobs[blobIndex]
    const contentInner = DOM.contentInner[pos]
    const currentCloseBtn = contentInner.querySelector(
      '.content-section__close'
    )

    // Stop breathing animation before expand
    currentBlob.stopBreathe()

    currentBlob.expand().then(() => {
      animationInProgress.value = false
      DOM.content.style.pointerEvents = 'auto'
      contentInner.style.pointerEvents = 'auto'
      contentInner.style.opacity = 1
      const toShow = [
        contentInner.querySelector('.content-section__title'),
        contentInner.querySelector('.content-section__subtitle'),
        contentInner.querySelector('.content-section__body'),
        currentCloseBtn
      ].filter(Boolean)
      anime({
        targets: toShow,
        duration: 300,
        easing: 'easeOutQuad',
        opacity: [0, 1]
      })
    })

    blobs
      .filter((_, i) => i !== blobIndex)
      .forEach((blob) => {
        blob.stopBreathe()
        blob.hide()
      })
  }

  const close = () => {
    if (!isOpen.value) return

    animationInProgress.value = true

    const prevCurrent = current
    const prevBlobIndex = menuToBlobIndex[prevCurrent]
    const blobToCollapse = blobs[prevBlobIndex]

    const contentInner = DOM.contentInner[prevCurrent]
    const currentCloseBtn = contentInner.querySelector(
      '.content-section__close'
    )
    const toHide = [
      contentInner.querySelector('.content-section__title'),
      contentInner.querySelector('.content-section__subtitle'),
      contentInner.querySelector('.content-section__body'),
      currentCloseBtn
    ].filter(Boolean)
    anime({
      targets: toHide,
      duration: 200,
      easing: 'easeInQuad',
      opacity: 0,
      complete: () => {
        contentInner.style.opacity = 0
        contentInner.style.pointerEvents = 'none'
        DOM.content.style.pointerEvents = 'none'
      }
    })

    // Show menu after 1 second delay
    setTimeout(() => {
      isOpen.value = false
    }, 1000)

    // Run collapse and intro in PARALLEL
    const collapsePromise = blobToCollapse.collapse()
    const showPromises = blobs
      .filter((_, i) => i !== prevBlobIndex)
      .map((blob) => blob.show())

    current = -1

    // Wait for ALL animations to complete before allowing clicks
    Promise.all([collapsePromise, ...showPromises]).then(() => {
      animationInProgress.value = false
      blobs.forEach((blob) => blob.breathe())
    })
  }

  closeHandler.value = close
})
</script>

<style lang="scss">
.app-content {
  position: relative;
  z-index: 1;
  height: 100vh;

  &__hero {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    min-height: 100%;
    width: 100%;
    padding-left: 60%;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
    }
  }

  &__main {
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
  }
}
</style>
