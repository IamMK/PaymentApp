<template>
  <main class="notecard">
    <section class="notecard__wrapper">
      <slot></slot>
    </section>
  </main>
</template>

<style lang="scss">
.notecard {
  width: 90%;
  margin: 5%;
  color: $text-color;
  &__wrapper {
    background-color: $main-color;
    padding: 1em;
  }
}

@media (min-width: $breakpoint-tablet) {
  .notecard {
    margin: 5% auto;
    padding-left: calc(1em + 78px);
  }
}
</style>
