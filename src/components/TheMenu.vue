<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();

const menuActive = ref(appStore.menuActive);

const state = reactive({
  menuActive: false,
  menuItems: [
    {
      name: "Home",
      icon: "fa-solid fa-house",
      tooltip: "Home",
      href: "home",
    },
    {
      name: "Kalkulator",
      icon: "fa-solid fa-sack-dollar",
      tooltip: "Kalkulator",
      href: "home",
    },
    {
      name: "Wyloguj",
      icon: "fa-solid fa-right-from-bracket",
      tooltip: "Wyloguj",
      href: "logout",
    },
  ],
});

const changeMenu = () => {
  menuActive.value = !menuActive.value;
};
</script>

<template>
  <nav class="navigation" :class="{ 'navigation--active': menuActive }">
    <figure class="logo" :class="{ 'logo--active': menuActive }">
      <div class="logo__icon" :class="{ 'logo__icon--active': menuActive }">
        <i class="fa-solid fa-laptop-code"></i>
        <figcaption class="logo__name">PaymentApp</figcaption>
      </div>
    </figure>

    <i
      @click="changeMenu"
      class="fa-solid navigation__hamburger"
      :class="[
        { 'navigation__hamburger--active': menuActive },
        menuActive ? 'fa-x' : 'fa-bars',
      ]"
      id="btn"
    ></i>

    <ul
      class="navigation__wrapper"
      :class="{ 'navigation__wrapper--active': menuActive }"
    >
      <li
        class="navigation__item"
        :class="{ 'navigation__item--active': menuActive }"
        v-for="item in state.menuItems"
        :key="item.name"
      >
        <router-link
          class="navigation__link"
          :class="{ 'navigation__link--active': menuActive }"
          :to="{ name: item.href }"
        >
          <i
            :class="[item.icon, { 'icon--active': menuActive }]"
            class="icon"
          ></i>
          <span
            class="navigation__linkName"
            :class="{ 'navigation__linkName--active': menuActive }"
            >{{ item.name }}</span
          >
        </router-link>
        <span
          class="navigation__tooltip"
          :class="{ 'navigation__tooltip--active': menuActive }"
          >{{ item.tooltip }}</span
        >
      </li>
    </ul>
    <!-- <i class="logout icon fa-solid fa-right-from-bracket"></i> -->
  </nav>
</template>

<style lang="scss">
.navigation {
  height: 100%;
  width: 78px;
  background-color: $main-color;
  position: fixed;
  top: 0;
  left: 0;
  padding: 6px 14px;
  text-align: left;
  transition: all 0.5s ease;
  z-index: 10;

  .icon {
    height: 50px;
    min-width: 50px;
    width: 100%;
    border-radius: 12px;
    line-height: 50px;
    text-align: center;
    transition: all 0.5s ease;

    &--active {
      margin-left: 0;
      width: 50px;
    }
  }

  & .logo {
    transform: scale(0);
    transition: all 0.5s ease;
    &__icon {
      color: $text-color;
      display: flex;
      height: 50px;
      width: 100%;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s ease;

      &--active {
        opacity: 1;
        pointer-events: none;
      }
    }

    & i {
      font-size: 28px;
      margin-right: 5px;
    }

    &__name {
      font-size: 20px;
      font-weight: 400;
    }
    &--active {
      transform: scale(1);
    }
  }

  & &__hamburger {
    color: $text-color;
    font-size: 20px;
    height: 50px;
    width: 2rem;
    text-align: center;
    line-height: 50px;
    cursor: pointer;

    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s ease;

    &--active {
      left: 90%;
      transform: translateX(100%);
    }
  }

  &__link {
    color: $text-color;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.5s ease;
    border-radius: 12px;
    white-space: nowrap;

    &:hover {
      background: $text-color;
      color: $main-color;
    }
  }

  &__linkName {
    opacity: 0;
    width: 0;
    pointer-events: none;
    transition: all 0.5s ease;

    &--active {
      width: calc(100% - 50px);
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__wrapper {
    margin-top: 20px;
  }
  &__item {
    position: relative;
    list-style: none;
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    transition: all 0.5s ease;

    &:hover .navigation__tooltip {
      top: 50%;
      transition: 0.5s ease;
      opacity: 1;
    }

    &--active {
      margin: 0 5px;
    }
  }
  &__tooltip {
    z-index: 10;
    position: absolute;
    left: 100px;
    top: 0;
    transform: translateY(-50%, -50%);
    height: 35px;
    line-height: 35px;
    width: 122px;
    background: $text-color;
    color: $main-color;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    text-align: center;
    transition: 0.5s;
    pointer-events: none;
    opacity: 0;
    display: block;

    &--active {
      display: none;
    }
  }

  &--active {
    width: 240px;
  }
}

.logout {
  min-width: 50px;

  position: absolute;
  bottom: 6px;
  left: 50%;
  font-size: 20px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
  transition: all 0.5s ease;

  &--active {
    left: 88%;
  }

  & i {
    color: $text-color;
  }
}

@media (max-width: $breakpoint-tablet) {
  .navigation {
    transform: translateX(-100%);
    width: 0px;

    &__wrapper {
      height: calc(90% - 100px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    & &__hamburger {
      transform: translateX(100%);

      &--active {
        transform: translateX(-50%);
      }
    }

    & .icon {
      display: none;
      &--active {
        display: initial;
      }
    }

    &--active {
      transform: translateX(0);
      width: 100%;
    }
  }
}
</style>
