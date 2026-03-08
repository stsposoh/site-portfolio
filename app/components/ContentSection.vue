<template>
  <div class="content-section">
    <button
      :class="['content-section__close', `--${color}`]"
      type="button"
      aria-label="Back to menu"
      @click="$emit('close')"
    >
      <span class="content-section__close-icon" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </span>
      <span class="content-section__close-text">Back</span>
    </button>
    <h2 class="content-section__title">{{ title }}</h2>
    <p class="content-section__subtitle">{{ subtitle }}</p>
    <div class="content-section__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  color: 'purple' | 'teal' | 'orange' | 'coral' | 'mint'
  title: string
  subtitle: string
}>()

defineEmits<{
  close: []
}>()
</script>

<style lang="scss">
.content-section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 3.2rem);
  max-width: 120rem;
  max-height: 88vh;
  padding: 5.5rem 2.5rem 2.5rem;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  background: #fff;
  border-radius: 2rem;
  box-shadow:
    0 2.4rem 4.8rem rgba(0, 0, 0, 0.18),
    0 0.8rem 1.6rem rgba(0, 0, 0, 0.1);
  border-left: 0.4rem solid #6f22b9;

  &__close {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    left: auto;
    margin: 0;
    transform: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem 1rem 1.4rem;
    width: auto;
    height: auto;
    min-height: 4.8rem;
    font-size: 1.5rem;
    border-radius: 100rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #fff;
    border: none;
    border-radius: 100rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      .content-section__close-icon {
        transform: translateX(-0.3rem);
      }
    }

    &:focus {
      outline: none;
    }

    // Modifiers by color
    &.--purple {
      background: linear-gradient(135deg, #6f22b9, #3a3d98);
      box-shadow: 0 0.4rem 1.2rem rgba(111, 34, 185, 0.3);

      &:hover {
        background: linear-gradient(135deg, #8a3dd9, #4b52b8);
        box-shadow: 0 0.6rem 2rem rgba(111, 34, 185, 0.4);
      }

      &:active {
        box-shadow: 0 0.2rem 0.8rem rgba(111, 34, 185, 0.3);
      }

      &:focus {
        box-shadow:
          0 0 0 0.3rem rgba(111, 34, 185, 0.3),
          0 0.4rem 1.2rem rgba(111, 34, 185, 0.3);
      }
    }

    &.--teal {
      background: linear-gradient(135deg, #07d89d, #0947db);
      box-shadow: 0 0.4rem 1.2rem rgba(7, 216, 157, 0.3);

      &:hover {
        background: linear-gradient(135deg, #08f5b8, #0b5aff);
        box-shadow: 0 0.6rem 2rem rgba(7, 216, 157, 0.4);
      }

      &:active {
        box-shadow: 0 0.2rem 0.8rem rgba(7, 216, 157, 0.3);
      }

      &:focus {
        box-shadow:
          0 0 0 0.3rem rgba(7, 216, 157, 0.3),
          0 0.4rem 1.2rem rgba(7, 216, 157, 0.3);
      }
    }

    &.--orange {
      background: linear-gradient(135deg, #f8ae2c, #ee2d29);
      box-shadow: 0 0.4rem 1.2rem rgba(238, 45, 41, 0.3);

      &:hover {
        background: linear-gradient(135deg, #ffc44d, #ff3e3a);
        box-shadow: 0 0.6rem 2rem rgba(238, 45, 41, 0.4);
      }

      &:active {
        box-shadow: 0 0.2rem 0.8rem rgba(238, 45, 41, 0.3);
      }

      &:focus {
        box-shadow:
          0 0 0 0.3rem rgba(238, 45, 41, 0.3),
          0 0.4rem 1.2rem rgba(238, 45, 41, 0.3);
      }
    }

    &.--coral {
      background: linear-gradient(135deg, #de2d3e, #9d316e);
      box-shadow: 0 0.4rem 1.2rem rgba(222, 45, 62, 0.3);

      &:hover {
        background: linear-gradient(135deg, #ff3e4f, #b83c85);
        box-shadow: 0 0.6rem 2rem rgba(222, 45, 62, 0.4);
      }

      &:active {
        box-shadow: 0 0.2rem 0.8rem rgba(222, 45, 62, 0.3);
      }

      &:focus {
        box-shadow:
          0 0 0 0.3rem rgba(222, 45, 62, 0.3),
          0 0.4rem 1.2rem rgba(222, 45, 62, 0.3);
      }
    }

    &.--mint {
      background: linear-gradient(135deg, #07d89d, #1d6449);
      box-shadow: 0 0.4rem 1.2rem rgba(7, 216, 157, 0.3);

      &:hover {
        background: linear-gradient(135deg, #08f5b8, #247a5a);
        box-shadow: 0 0.6rem 2rem rgba(7, 216, 157, 0.4);
      }

      &:active {
        box-shadow: 0 0.2rem 0.8rem rgba(7, 216, 157, 0.3);
      }

      &:focus {
        box-shadow:
          0 0 0 0.3rem rgba(7, 216, 157, 0.3),
          0 0.4rem 1.2rem rgba(7, 216, 157, 0.3);
      }
    }
  }

  &__close-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    svg {
      filter: drop-shadow(0 0.1rem 0.2rem rgba(0, 0, 0, 0.1));
    }
  }

  &__close-text {
    line-height: 1;
  }

  &__title,
  &__subtitle,
  &__body {
    opacity: 0;
  }

  &__title {
    margin: 0 0 0.35em;
    font-size: clamp(2.6rem, 4vw, 3.6rem);
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    margin: 0 0 1.5rem;
    font-size: clamp(1.5rem, 2vw, 1.7rem);
    font-weight: 600;
    color: #555;
    line-height: 1.4;
  }

  &__body {
    font-size: 1.5rem;
    line-height: 1.65;
    color: #333;

    :deep(p) {
      margin: 0 0 1em;
    }

    :deep(a) {
      color: #6f22b9;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 0.1rem solid currentColor;

      &:hover {
        color: #3a3d98;
      }
    }
  }

  &__list {
    margin: 0 0 1em;
    padding-left: 2.2rem;
    list-style: none;

    :deep(li) {
      position: relative;
      margin-bottom: 0.5em;
      padding-left: 0.8rem;

      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.9rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #6f22b9;
      }
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__card {
    padding: 1.6rem 2rem;
    background: #f5f4f8;
    border-radius: 1.2rem;
    border: 0.1rem solid #e8e6ef;
    font-size: 1.4rem;
    color: #444;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:hover {
      border-color: #d0cce0;
      box-shadow: 0 0.2rem 0.8rem rgba(111, 34, 185, 0.06);
    }

    :deep(strong) {
      color: #1a1a1a;
    }
  }
}
</style>
