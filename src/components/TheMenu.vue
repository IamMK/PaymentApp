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
  @include position(fixed, 0, $l: 0, $z: 10);
  @include shape(0px, 100%);
  background-color: $main-color;
  padding: 6px 14px;
  text-align: left;
  transform: translateX(-100%);
  transition: all 0.5s ease;

  & &__hamburger {
    @include shape(2rem, 55px);
    @include position(absolute, $t: 5px, $l: 50%);
    color: $text-color;
    cursor: pointer;
    font-size: 20px;
    line-height: 55px;
    text-align: center;
    transform: translateX(100%);
    transition: all 0.5s ease;
  }

  & .icon {
    @include shape(100%, 50px, 12px);
    display: none;
    line-height: 50px;
    min-width: 50px;
    text-align: center;
    transition: all 0.5s ease;
  }

  &__item {
    min-height: 50px;
    line-height: 50px;
    list-style: none;
    position: relative;
    width: 100%;
    transition: all 0.5s ease;
  }

  &__link {
    border-radius: 12px;
    align-items: center;
    color: $text-color;
    display: flex;
    text-decoration: none;
    transition: all 0.5s ease;
    white-space: nowrap;

    &:hover {
      background: $text-color;
      color: $main-color;
    }
  }

  &__linkName {
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s ease;
    width: 0;
  }

  & .logo {
    transform: scale(0);
    transition: all 0.5s ease;
    &__icon {
      @include shape(100%, 50px);
      align-items: center;
      color: $text-color;
      display: flex;
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

    &__tooltip {
      display: none;
    }
  }

  &__wrapper {
    height: calc(90% - 100px);
    margin-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &--active {
    transform: translateX(0);
    width: 100%;
    & .icon {
      display: initial;
      margin-left: 0;
      width: 50px;
    }
    & .logo {
      transform: scale(1);
      &__icon {
        opacity: 1;
        pointer-events: none;
      }
    }
    & .navigation {
      &__item {
        margin: 0 5px;
      }
      &__linkName {
        opacity: 1;
        pointer-events: auto;
        width: calc(100% - 50px);
      }
      &__hamburger {
        left: 90%;
        transform: translateX(-50%);
      }
    }
  }
}
@media (min-width: $breakpoint-tablet) {
  .navigation {
    width: 78px;
    transform: translateX(0);

    & &__hamburger {
      transform: translateX(-50%);
    }

    & .icon {
      display: initial;
    }

    &__item {
      &:hover .navigation__tooltip {
        opacity: 1;
        top: 50%;
        transition: 0.5s ease;
      }
    }

    &__tooltip {
      @include position(absolute, $t: 0, $l: 100px, $z: 10);
      @include shape(122px, 35px, 6px);
      background: $text-color;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      color: $main-color;
      display: block;
      line-height: 35px;
      opacity: 0;
      pointer-events: none;
      text-align: center;
      transform: translateY(-50%);
      transition: 0.5s;
    }

    &__wrapper {
      height: auto;
      overflow-y: initial;
      overflow-x: initial;
    }

    &--active {
      transform: translateX(0);
      width: 240px;
      & .navigation {
        &__hamburger {
          transform: translateX(100%);
        }
        &__tooltip {
          display: none;
        }
      }
    }
  }
}
</style>
