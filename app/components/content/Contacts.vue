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
          <img src="/icons/contacts/gmail_mail.svg" alt="" width="20" height="20" />
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
          <img src="/icons/contacts/telegram.svg" alt="" width="20" height="20" />
        </span>
        <a href="https://t.me/posohov" target="_blank" rel="noopener noreferrer">@posohov</a>
      </p>

      <div class="contacts__social">
        <a
          class="contacts__social-link"
          href="https://github.com/stsposoh"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img src="/icons/contacts/GitHub%20circle.svg" alt="GitHub" width="24" height="24" />
        </a>
        <a
          class="contacts__social-link"
          href="https://ru.linkedin.com/in/sposokhov"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <img src="/icons/contacts/Linked%20in.svg" alt="LinkedIn" width="24" height="24" />
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
        <button type="submit" class="contacts__submit">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup />

<style lang="scss" scoped>
$accent: #6f22b9;
$border: #e8e6ef;

.contacts {
  display: grid;
  gap: 2rem;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.contacts__info {
  .contacts__row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 1rem;
    padding: 0;
    font-size: 15px;
    line-height: 1.4;
    color: #333;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .contacts__icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: $accent;

    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;

    &:hover {
      color: $accent;
      border-bottom-color: $accent;
    }
  }
}

.contacts__social {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.contacts__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f0eef5;
  border: 1px solid $border;
  border-radius: 10px;
  color: #333;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:hover {
    background: #e8e4f0;
    border-color: rgba(111, 34, 185, 0.35);
    box-shadow: 0 2px 8px rgba(111, 34, 185, 0.12);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(111, 34, 185, 0.3);
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) saturate(100%);
  }

  &:hover img {
    filter: brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(3000%) hue-rotate(250deg);
  }
}

.contacts__form-wrap {
  min-width: 0;
}

.contacts__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contacts__label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contacts__label-text {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.contacts__input {
  width: 100%;
  min-height: 44px;
  padding: 0.6rem 0.85rem;
  font-size: 15px;
  font-family: inherit;
  color: #1a1a1a;
  background: #fff;
  border: 1px solid $border;
  border-radius: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: $accent;
    box-shadow: 0 0 0 3px rgba(111, 34, 185, 0.12);
  }
}

.contacts__textarea {
  min-height: 120px;
  resize: vertical;
}

.contacts__submit {
  min-height: 44px;
  padding: 0.65rem 1.25rem;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  color: #fff;
  background: linear-gradient(135deg, #07d89d, #1d6449);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: filter 0.2s, box-shadow 0.2s;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 4px 12px rgba(7, 216, 157, 0.35);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(7, 216, 157, 0.4);
  }
}
</style>
