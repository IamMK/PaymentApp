<template>
  <section class="main">
    <top-bar
      ><h1>{{ messages.payment }}</h1></top-bar
    >
    <main class="main__welcome">
      <base-notecard>
        <h2>{{ messages.hello }}</h2>
        <article>
          <p>
            {{ messages.desc1 }}
          </p>
          <p>
            {{ messages.desc2 }}
          </p>
          <base-button class="button" @click="installApp">{{
            messages.download
          }}</base-button>
          <base-button class="button" mode="flat" link to="auth">{{
            messages.login
          }}</base-button>
        </article>
      </base-notecard>
    </main>
  </section>
</template>

<script setup lang="ts">
import { APP } from "@/pwa";
import { useLangStore } from "@/store/lang";
import { computed } from "vue";
import TopBar from "@/components/TopBar.vue";
import BaseNotecard from "@/components/UI/BaseNotecard.vue";

const lang = useLangStore();

const messages = computed(() => {
  return lang.messages.mainView;
});

const installApp = () => {
  APP.startChromeInstall();
};
</script>

<style lang="scss">
.main {
  color: $button-background;
  & .button {
    margin-top: 1em;
  }
  & h2 {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  & h3 {
    color: $main-color;
    text-shadow: 2px 2px 2px $button-text;
    letter-spacing: 1px;
  }
  & p {
    margin-top: 1em;
    text-align: justify;
  }
}
</style>
