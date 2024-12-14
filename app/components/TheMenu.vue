<script setup lang="ts">

</script>

<template>
  <nav class="main-menu">
    <div class="main-menu__item">
      <a href="#" class="main-menu__link">About me</a>
    </div>
    <div class="main-menu__item">
      <a href="#" class="main-menu__link">Skills</a>
    </div>
    <div class="main-menu__item">
      <a href="#" class="main-menu__link">Certificates</a>
    </div>
    <div class="main-menu__item">
      <a href="#" class="main-menu__link">Portfolio</a>
    </div>
    <div class="main-menu__item">
      <a href="#" class="main-menu__link">Contacts</a>
    </div>
  </nav>
</template>

<style lang="scss">
.main-menu {
  position: relative;
  z-index: 11;
  font-size: 4vw;

  &__item {
    &:nth-child(2) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #0947db, #07d89d);
        }
      }
    }

    &:nth-child(3) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #ee2d29, #f8ae2c);
        }
      }
    }

    &:nth-child(4) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #3a3d98, #6f22b9);
        }
      }
    }

    &:nth-child(5) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #9d316e, #de2d3e);
        }
      }
    }

    &:nth-child(6) {
      .main-menu__link {
        &:before {
          background: linear-gradient(45deg, #00ac53, #23c3e0);
        }
      }
    }
  }

  &__link {
    display: inline-block;
    color: white;
    line-height: 1.25;
    letter-spacing: -0.025em;
    text-indent: -0.025em;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    position: relative;

    &:hover,
    &:focus {
      color: var(--color-menu-hover);
    }

    &.--decorated {
      &:before {
        transition: transform 0.8s cubic-bezier(0.2,1,0.3,1);
        transform: scale3d(1,1,1);
      }

      &:hover {
        &:before {
          transition: transform 0.8s cubic-bezier(0.2,1,0.3,1);
          transform: scale3d(1.2,1,1);
        }
      }
    }

    &:before {
      content: '';
      width: 60%;
      height: 25px;
      background: linear-gradient(45deg, #f19872, #e86c9a);
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: 0 0;
      transform: scale3d(0,1,1);
    }
  }
}
</style>
