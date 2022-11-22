<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  background-color: $main-color;
  color: $text-color;
  padding: 1em;
  letter-spacing: 1px;
}

@media (min-width: $breakpoint-tablet) {
  .header {
    padding-left: calc(1em + 78px);
  }
}
</style>
