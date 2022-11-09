<template>
  <section class="main">
    <header class="main__header">
      <h1>PaymentApp</h1>
    </header>

    <main class="main__welcome">
      <section>
        <h2>Witaj</h2>
        <article>
          <h3>Pozwól, że się przedstawię.</h3>
          <p>
            Jestem PaymentApp, twój prywatny kalendarz, który pozwoli Ci
            pamiętać o każdym dniu, który przepracowałeś. W przyszłości
            zamierzam również powiedzieć Ci ile zarobiłeś, zanim jeszcze
            otrzymasz pieniędze na konto.
          </p>
          <p>
            Jeśli chcesz mieć mnie zawsze pod ręką, pobierz darmową aplikację.
          </p>
          <base-button class="button" @click="installApp">Pobierz</base-button>
        </article>
      </section>
    </main>
  </section>
</template>

<script setup lang="ts">
import { APP } from "@/pwa";

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
  &__welcome {
    width: 90%;
    margin: 5%;
    background-color: $sub-color;
    box-shadow: 8px 8px 24px 0px rgba(0, 0, 0, 1);
    padding: 1em;
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
</style>
