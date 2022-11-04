<template>
  <router-view />
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
</style>

<script setup lang="ts">
import { onBeforeMount } from "@vue/runtime-core";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.tryLogin();
});
</script>
