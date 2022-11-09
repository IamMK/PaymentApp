<template>
  <the-menu />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Oxygen&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Oxygen", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $background-color;
  min-height: 100vh;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup lang="ts">
import { onBeforeMount, watch } from "@vue/runtime-core";

import TheMenu from "./components/TheMenu.vue";

import { useAuthStore } from "@/store/auth";
import { RouterView, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  authStore.tryLogin();
});

watch(
  () => authStore.didAutoLogout,
  async (curVal, oldVal) => {
    if (curVal && curVal !== oldVal) {
      router.replace("/coaches");
    }
  }
);
</script>
