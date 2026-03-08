<template>
  <div class="contacts">
    <div class="contacts__info">
      <p class="contacts__row">
        <span class="contacts__icon" aria-hidden="true">
          <img src="/icons/contacts/map.svg" alt="" width="20" height="20" />
        </span>
        Украина
      </p>
      <p class="contacts__row">
        <span class="contacts__icon" aria-hidden="true">
          <img src="/icons/contacts/phone.svg" alt="" width="20" height="20" />
        </span>
        <a href="tel:+380992707615">+38 (099) 270-76-15</a>
      </p>
      <p class="contacts__row">
        <span class="contacts__icon" aria-hidden="true">
          <img
            src="/icons/contacts/gmail_mail.svg"
            alt=""
            width="20"
            height="20"
          />
        </span>
        <a href="mailto:stsposoh@gmail.com">stsposoh@gmail.com</a>
      </p>
      <p class="contacts__row">
        <span class="contacts__icon" aria-hidden="true">
          <img src="/icons/contacts/skype.svg" alt="" width="20" height="20" />
        </span>
        <a href="skype:stas.posohov?chat">stas.posohov</a>
      </p>
      <p class="contacts__row">
        <span class="contacts__icon" aria-hidden="true">
          <img
            src="/icons/contacts/telegram.svg"
            alt=""
            width="20"
            height="20"
          />
        </span>
        <a href="https://t.me/posohov" target="_blank" rel="noopener noreferrer"
          >@posohov</a
        >
      </p>

      <div class="contacts__social">
        <a
          class="contacts__social-link"
          href="https://github.com/stsposoh"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img
            src="/icons/contacts/GitHub%20circle.svg"
            alt="GitHub"
            width="24"
            height="24"
          />
        </a>
        <a
          class="contacts__social-link"
          href="https://ru.linkedin.com/in/sposokhov"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <img
            src="/icons/contacts/Linked%20in.svg"
            alt="LinkedIn"
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>

    <div class="contacts__form-wrap">
      <form
        class="contacts__form"
        action="https://formspree.io/stsposoh@gmail.com"
        method="POST"
        target="_blank"
      >
        <label class="contacts__label">
          <span class="contacts__label-text">Имя</span>
          <input
            type="text"
            name="name"
            class="contacts__input"
            placeholder="Ваше имя"
            required
          />
        </label>
        <label class="contacts__label">
          <span class="contacts__label-text">Email</span>
          <input
            type="email"
            name="email"
            class="contacts__input"
            placeholder="your@email.com"
            required
          />
        </label>
        <label class="contacts__label">
          <span class="contacts__label-text">Сообщение</span>
          <textarea
            name="message"
            class="contacts__input contacts__textarea"
            rows="4"
            placeholder="Ваше сообщение"
            required
          />
        </label>
        <button type="submit" class="contacts__submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Contacts section - static content, form submits to Formspree
</script>

<style lang="scss" scoped>
.contacts {
  display: grid;
  gap: 2rem;

  @include m.min-width(lg) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  &__info {
    a {
      color: inherit;
      text-decoration: none;
      border-bottom: 0.1rem solid transparent;
      transition: color 0.2s, border-color 0.2s;

      &:hover {
        color: v.$color-accent-mint;
        border-bottom-color: v.$color-accent-mint;
      }
    }
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 1rem;
    padding: 0;
    font-size: 1.5rem;
    line-height: 1.4;
    color: #333;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;

    img {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
      filter: brightness(0) saturate(100%);
    }
  }

  &__social {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: #f0eef5;
    border: 0.1rem solid v.$color-border;
    border-radius: 1rem;
    color: #333;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;

    &:hover {
      background: #e8f5f1;
      border-color: rgba(7, 216, 157, 0.35);
      box-shadow: 0 0.2rem 0.8rem rgba(7, 216, 157, 0.12);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(7, 216, 157, 0.3);
    }

    img {
      width: 2.4rem;
      height: 2.4rem;
      object-fit: contain;
      filter: brightness(0) saturate(100%);
    }
  }

  &__form-wrap {
    min-width: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__label-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #555;
  }

  &__input {
    width: 100%;
    min-height: 4.4rem;
    padding: 1rem 1.4rem;
    font-size: 1.6rem;
    color: #1a1a1a;
    background: #fff;
    border: 0.1rem solid v.$color-border;
    border-radius: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      border-color: v.$color-accent-mint;
      box-shadow: 0 0 0 0.3rem rgba(v.$color-accent-mint, 0.15);
    }
  }

  &__textarea {
    min-height: 12rem;
    resize: vertical;
  }

  &__submit {
    min-height: 4.4rem;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #07d89d, #1d6449);
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: filter 0.2s, box-shadow 0.2s;

    &:hover {
      filter: brightness(1.05);
      box-shadow: 0 0.4rem 1.2rem rgba(7, 216, 157, 0.35);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.3rem rgba(v.$color-accent-mint, 0.4);
    }
  }
}
</style>
