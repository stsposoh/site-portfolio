<template>
  <div ref="rootEl" class="about">
    <aside class="about__aside">
      <div
        v-if="heading?.image"
        class="about__photo"
        data-reveal
        @pointermove="applyTilt"
        @pointerleave="resetTilt"
      >
        <img
          :src="heading.image.url"
          :alt="heading.image.alternativeText ?? ''"
          width="320"
          height="320"
          loading="lazy"
        />
      </div>
      <h2 v-if="heading?.title" class="about__name" data-reveal>
        {{ heading.title }}
      </h2>
      <p v-if="heading?.description" class="about__role" data-reveal>
        {{ heading.description }}
      </p>

      <ul class="about__stats">
        <li
          v-for="stat in stats"
          :key="stat.label"
          class="about__stat"
          :title="stat.title"
          data-reveal
        >
          <span class="about__stat-value">
            <span :data-count="stat.value">{{ stat.value }}</span
            >{{ stat.suffix }}
          </span>
          <span class="about__stat-label">{{ stat.label }}</span>
        </li>
      </ul>
    </aside>

    <div class="about__main">
      <p v-if="aboutBlock?.shortText" class="about__lead" data-reveal>
        {{ aboutBlock.shortText }}
      </p>

      <div
        v-if="aboutBlock?.stackItems?.length"
        class="about__stack"
        data-reveal
      >
        <span v-if="aboutBlock.stackText" class="about__stack-label">
          {{ aboutBlock.stackText }}
        </span>
        <span
          v-for="stackItem in aboutBlock.stackItems"
          :key="stackItem.id"
          class="about__pill"
          data-reveal-pill
          >{{ stackItem.item }}</span
        >
      </div>

      <div v-if="contentNodes.length" class="about__text" data-reveal>
        <StrapiBlocksText :nodes="contentNodes" />
      </div>

      <div v-if="aboutBlock?.infoCards?.length" class="about__timeline">
        <span class="about__timeline-line" aria-hidden="true" />
        <ol class="about__events">
          <li
            v-for="card in aboutBlock.infoCards"
            :key="card.id"
            class="about__event"
            data-reveal-event
          >
            <span class="about__event-dot" aria-hidden="true" />
            <h3
              v-if="card.description?.[0]?.key"
              class="about__event-kind"
            >
              {{ card.description[0].key }}
            </h3>
            <p class="about__event-org">
              <img
                v-if="card.image"
                :src="card.image.url"
                alt=""
                class="about__event-logo"
                width="36"
                height="36"
              />
              <a
                v-if="card.link?.slug"
                :href="card.link.slug"
                target="_blank"
                rel="noopener noreferrer"
                >{{ card.link.label }}</a
              >
              <template v-else>{{ card.link?.label }}</template>
            </p>
            <p v-if="card.years" class="about__event-years">
              {{ card.years }}
            </p>
            <p
              v-for="item in card.description?.filter((entry) => entry.value)"
              :key="item.id"
              class="about__event-detail"
            >
              <strong v-if="item.key">{{ item.key }}: </strong>{{ item.value }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import anime from 'animejs'
import { portfolioItems } from '~/data/portfolio'
import { pluralWord } from '~/utils/pluralize'
import { prefersReducedMotion } from '~/utils/motion'
import { applyTilt, resetTilt } from '~/utils/tilt'

const { aboutBlock } = useLandingPage()
const { experienceText, experienceYears } = useExperience()
const { certificates } = useCertificates()
const isActive = useSectionActive()

const rootEl = ref<HTMLElement | null>(null)

const heading = computed(() => aboutBlock.value?.heading)

const contentNodes = computed(() => {
  const content = aboutBlock.value?.content
  return Array.isArray(content) ? content : []
})

const stats = computed(() => [
  {
    value: experienceYears.value,
    suffix: '+',
    label: `${pluralWord(experienceYears.value, ['год', 'года', 'лет'])} опыта`,
    title: experienceText.value
  },
  {
    value: portfolioItems.length,
    suffix: '',
    label: `${pluralWord(portfolioItems.length, ['проект', 'проекта', 'проектов'])} в портфолио`
  },
  {
    value: certificates.value.length,
    suffix: '',
    label: pluralWord(certificates.value.length, [
      'сертификат',
      'сертификата',
      'сертификатов'
    ])
  }
])

const REVEAL_TARGETS =
  '[data-reveal], [data-reveal-pill], [data-reveal-event], .about__timeline-line'

function reveal() {
  const root = rootEl.value
  if (!root || prefersReducedMotion()) return

  const select = (selector: string) => root.querySelectorAll(selector)
  anime.remove(select(REVEAL_TARGETS))

  anime
    .timeline({ easing: 'easeOutCubic' })
    .add({
      targets: select('[data-reveal]'),
      opacity: [0, 1],
      translateY: [24, 0],
      delay: anime.stagger(60),
      duration: 600
    })
    .add(
      {
        targets: select('[data-reveal-pill]'),
        opacity: [0, 1],
        scale: [0.6, 1],
        delay: anime.stagger(60),
        duration: 500,
        easing: 'easeOutBack'
      },
      '-=400'
    )
    .add(
      {
        targets: select('.about__timeline-line'),
        opacity: [0, 1],
        scaleY: [0, 1],
        duration: 900,
        easing: 'easeInOutCubic'
      },
      '-=300'
    )
    .add(
      {
        targets: select('[data-reveal-event]'),
        opacity: [0, 1],
        translateX: [-16, 0],
        delay: anime.stagger(180),
        duration: 500
      },
      '-=700'
    )

  select('[data-count]').forEach((el) => {
    const counter = { value: 0 }
    anime({
      targets: counter,
      value: Number((el as HTMLElement).dataset.count),
      round: 1,
      delay: 300,
      duration: 1400,
      easing: 'easeOutExpo',
      update: () => {
        el.textContent = String(counter.value)
      }
    })
  })
}

function reset() {
  const root = rootEl.value
  if (!root || prefersReducedMotion()) return

  const targets = root.querySelectorAll(REVEAL_TARGETS)
  anime.remove(targets)
  anime.set(targets, { opacity: 0 })
}

watch(isActive, (active) => (active ? reveal() : reset()))
</script>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @include m.min-width(lg) {
    flex-direction: row;
    align-items: flex-start;
    gap: 5rem;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.4rem;
    text-align: center;

    @include m.min-width(lg) {
      padding-top: 0;
      position: sticky;
      top: 0;
      flex: 0 0 30rem;
    }
  }

  &__photo {
    width: 18rem;
    aspect-ratio: 1;
    margin-bottom: 2rem;
    padding: 0.3rem;
    border-radius: 2.4rem;
    background: linear-gradient(135deg, var(--accent), #3a3d98);
    box-shadow: 0 2rem 6rem color-mix(in srgb, var(--accent) 30%, transparent);

    @include m.min-width(lg) {
      width: 100%;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 2.1rem;
      object-fit: cover;
      transform: perspective(60rem) rotateX(var(--tilt-x, 0deg))
        rotateY(var(--tilt-y, 0deg));
      transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
    }
  }

  &__name {
    margin: 0 0 0.6rem;
    font-size: clamp(2.6rem, 4vw, 3.4rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #fff;
  }

  &__role {
    margin: 0 0 2.4rem;
    font-size: 1.5rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.65);
  }

  &__stats {
    @include m.normalize-list;
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  &__stat {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1.4rem 0.8rem;
    border-radius: 1.4rem;
    background-color: rgba(255, 255, 255, 0.06);
    border: 0.1rem solid rgba(255, 255, 255, 0.1);
  }

  &__stat-value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    color: var(--accent);
  }

  &__stat-label {
    font-size: 1.2rem;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.6);
  }

  &__main {
    flex: 1;
    min-width: 0;

    @include m.min-width(lg) {
      padding-top: 2.4rem;
    }
  }

  &__lead {
    margin: 0 0 2rem;
    font-size: clamp(1.7rem, 2vw, 2rem);
    font-weight: 500;
    line-height: 1.5;
    color: #fff;
  }

  &__stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8rem;
    margin: 0 0 2.4rem;
  }

  &__stack-label {
    margin-right: 0.4rem;
    color: rgba(255, 255, 255, 0.6);
  }

  &__pill {
    padding: 0.5rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
    border-radius: 99rem;
    background-color: color-mix(in srgb, var(--accent) 18%, transparent);
    border: 0.1rem solid color-mix(in srgb, var(--accent) 45%, transparent);
  }

  &__text {
    margin-bottom: 3.2rem;
    color: rgba(255, 255, 255, 0.78);
  }

  &__timeline {
    position: relative;
    padding-left: 2.8rem;
  }

  &__timeline-line {
    position: absolute;
    top: 0.6rem;
    bottom: 0.6rem;
    left: 0.5rem;
    width: 0.2rem;
    background: linear-gradient(var(--accent), transparent);
    transform-origin: top;
  }

  &__events {
    @include m.normalize-list;
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
  }

  &__event {
    position: relative;
  }

  &__event-dot {
    position: absolute;
    top: 0.3rem;
    left: -2.8rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: var(--accent);
    box-shadow: 0 0 0 0.4rem color-mix(in srgb, var(--accent) 25%, transparent);
  }

  &__event-kind {
    margin: 0 0 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  &__event-org {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 0 0.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3;
    color: #fff;

    a {
      color: #fff;
      border-bottom-color: color-mix(in srgb, var(--accent) 60%, transparent);

      &:hover {
        color: var(--accent);
      }
    }
  }

  &__event-logo {
    flex-shrink: 0;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 1rem;
    object-fit: cover;
  }

  &__event-years {
    margin: 0 0 0.8rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--accent);
  }

  &__event-detail {
    margin: 0 0 0.2rem;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.75);

    strong {
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
