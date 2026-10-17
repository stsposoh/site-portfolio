<template>
  <div class="contacts">
    <TransitionGroup
      v-if="revealCount > 0"
      :key="revealCount"
      tag="ul"
      name="list-item"
      class="contacts__list"
      appear
    >
      <li
        v-for="(contact, index) in contacts"
        :key="contact.id"
        class="contacts__item"
        :class="{ '--link': contact.url }"
        :style="{ '--i': index }"
      >
        <span class="contacts__icon" aria-hidden="true">
          <img
            v-if="contact.icon"
            :src="contact.icon"
            alt=""
            width="24"
            height="24"
          />
        </span>

        <span class="contacts__text">
          <span class="contacts__label">{{ contact.label }}</span>
          <a
            v-if="contact.url"
            :href="contact.url"
            class="contacts__value"
            v-bind="isExternal(contact.url) ? externalLinkAttrs : {}"
            >{{ contact.value }}</a
          >
          <span v-else class="contacts__value">{{ contact.value }}</span>
        </span>

        <button
          v-if="contact.copyable"
          type="button"
          class="contacts__copy"
          :class="{ '--copied': copiedId === contact.id }"
          :aria-label="`Скопировать: ${contact.value}`"
          @click="copy(contact)"
        >
          <svg
            v-if="copiedId === contact.id"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          <span class="contacts__copy-tooltip" role="status">
            {{ copiedId === contact.id ? 'Скопировано' : '' }}
          </span>
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import type { ContactItem } from '~/composables/useContacts'

const COPIED_TIMEOUT = 1600

const { contacts } = useContacts()
const isActive = useSectionActive()

const copiedId = ref<number | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

// Remounting the list on every open replays the cascade
const revealCount = ref(0)

const externalLinkAttrs = { target: '_blank', rel: 'noopener noreferrer' }
const isExternal = (url: string) => /^https?:/.test(url)

async function copy(contact: ContactItem) {
  try {
    await navigator.clipboard.writeText(contact.value)
  } catch {
    return
  }

  copiedId.value = contact.id
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copiedId.value = null), COPIED_TIMEOUT)
}

watch(isActive, (active) => {
  if (active) revealCount.value++
})

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<style lang="scss">
.contacts {
  &__list {
    --columns: 1;
    --gap: 1.2rem;

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
      --gap: 1.6rem;
    }
  }

  &__item {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 1.2rem;
    width: calc(
      (100% - (var(--columns) - 1) * var(--gap)) / var(--columns)
    );
    padding: 1.4rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 0.1rem solid rgba(255, 255, 255, 0.12);
    border-radius: 1.6rem;
    transition:
      transform 0.4s cubic-bezier(0.2, 1, 0.3, 1),
      border-color 0.3s,
      box-shadow 0.4s;

    @include m.min-width(sm) {
      gap: 1.4rem;
      padding: 1.6rem 1.8rem;
    }

    &.--link:hover,
    &.--link:focus-within {
      transform: translateY(-0.3rem);
      border-color: var(--accent);
      box-shadow: 0 1.4rem 3.6rem
        color-mix(in srgb, var(--accent) 22%, transparent);

      .contacts__icon {
        background-color: color-mix(in srgb, var(--accent) 22%, transparent);
      }
    }
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    transition: background-color 0.3s;

    @include m.min-width(sm) {
      width: 4.8rem;
      height: 4.8rem;
    }

    img {
      width: 2.4rem;
      height: 2.4rem;
      object-fit: contain;
    }
  }

  &__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  &__label {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  &__value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    overflow-wrap: anywhere;

    @include m.min-width(sm) {
      font-size: 1.6rem;
    }
  }

  a.contacts__value {
    border-bottom: none;

    // Stretches the link over the whole tile
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    &:hover {
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }

  &__copy {
    position: relative;
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    padding: 0;
    color: rgba(255, 255, 255, 0.75);
    background-color: rgba(255, 255, 255, 0.06);
    border: 0.1rem solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s,
      border-color 0.3s;

    &.--copied {
      color: #fff;
      background-color: color-mix(in srgb, var(--accent) 35%, transparent);
      border-color: var(--accent);

      .contacts__copy-tooltip {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }

    &:hover,
    &:focus-visible {
      color: #fff;
      border-color: var(--accent);
    }

    &:focus {
      outline: none;
    }
  }

  &__copy-tooltip {
    position: absolute;
    bottom: calc(100% + 0.8rem);
    left: 50%;
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    white-space: nowrap;
    color: #0a0816;
    background-color: var(--accent);
    border-radius: 0.6rem;
    opacity: 0;
    transform: translate(-50%, 0.4rem);
    transition:
      opacity 0.2s,
      transform 0.2s;
    pointer-events: none;
  }
}
</style>
