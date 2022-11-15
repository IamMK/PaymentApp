<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/app";
import { useAuthStore } from "@/store/auth";

import { menuItems } from "@/config/menuItems";
import { ItemVisibility } from "@/types/menuTypes";

const appStore = useAppStore();
const authStore = useAuthStore();

const menuVisibleItems = computed(() => {
  return menuItems.filter((item) => {
    const isAlwaysVisible = item.visible === ItemVisibility.always;
    const forAuthenticated =
      item.visible === ItemVisibility.auth && authStore.isAuthenticated;
    const forUnauthenticated =
      item.visible === ItemVisibility.unauth && !authStore.isAuthenticated;

    if (isAlwaysVisible || forAuthenticated || forUnauthenticated) return true;
    return false;
  });
});
</script>

<template>
  <nav
    class="navigation"
    :class="{ 'navigation--active': appStore.isMenuActive }"
  >
    <figure class="logo">
      <div class="logo__icon">
        <i class="fa-solid fa-laptop-code"></i>
        <figcaption class="logo__name">PaymentApp</figcaption>
      </div>
    </figure>

    <i
      @click="appStore.toogleMenu"
      class="fa-solid navigation__hamburger"
      :class="appStore.isMenuActive ? 'fa-x' : 'fa-bars'"
      id="btn"
    ></i>

    <ul class="navigation__wrapper">
      <li
        class="navigation__item"
        v-for="item in menuVisibleItems"
        :key="item.name"
      >
        <router-link class="navigation__link" :to="{ name: item.href }">
          <i :class="item.icon" class="icon"></i>
          <span class="navigation__linkName">{{ item.name }}</span>
        </router-link>
        <span class="navigation__tooltip">{{ item.tooltip }}</span>
      </li>
    </ul>
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
    }

    & i {
      font-size: 28px;
      margin-right: 5px;
    }

    &__name {
      font-size: 20px;
      font-weight: 400;
    }
  }

  & &__hamburger {
    color: $text-color;
    font-size: 20px;
    height: 55px;
    width: 2rem;
    text-align: center;
    line-height: 55px;
    cursor: pointer;

    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s ease;
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
  }

  &--active {
    width: 240px;
    & .icon {
      margin-left: 0;
      width: 50px;
    }
    & .navigation {
      &__tooltip {
        display: none;
      }
      &__item {
        margin: 0 5px;
      }
      &__linkName {
        width: calc(100% - 50px);
        opacity: 1;
        pointer-events: auto;
      }
      &__hamburger {
        left: 90%;
        transform: translateX(100%);
      }
    }
    & .logo {
      transform: scale(1);
      &__icon {
        opacity: 1;
        pointer-events: none;
      }
    }
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
    }

    & .icon {
      display: none;
    }

    &--active {
      transform: translateX(0);
      width: 100%;
      & .icon {
        display: initial;
      }
      & .navigation {
        &__hamburger {
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
