<template>
  <section class="main">
    <header class="main__header">
      <h1>{{ messages.payment }}</h1>
    </header>

    <main class="main__welcome">
      <section class="main__leaf">
        <h2>{{ messages.hello }}</h2>
        <article>
          <h3>{{ messages.introduce }}</h3>
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
      </section>
    </main>
  </section>
</template>

<script setup lang="ts">
import { APP } from "@/pwa";
import { useLangStore } from "@/store/lang";
import { computed } from "vue";

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
  &__header {
    width: 100%;
    background-color: $main-color;
    color: $text-color;
    padding: 1em;
    letter-spacing: 1px;
  }
  &__leaf {
    background-color: $sub-color;
    box-shadow: 8px 8px 24px 0px rgba(0, 0, 0, 1);
    padding: 1em;
  }
  &__welcome {
    width: 90%;
    margin: 5%;
    .button {
      margin-top: 1em;
    }
    h2 {
      font-size: 2rem;
      text-transform: uppercase;
      font-weight: 600;
    }
    h3 {
      color: $main-color;
      text-shadow: 2px 2px 2px $button-text;
      letter-spacing: 1px;
    }
    p {
      margin-top: 1em;
      text-align: justify;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .main {
    &__welcome {
      margin: 5% auto;
      padding-left: calc(1em + 78px);
    }
  }
}
</style>
