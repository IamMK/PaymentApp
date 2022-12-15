<script setup lang="ts">
const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  authPadding: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const modeClass = props.mode != null ? "base__container--" + props.mode : "";
</script>

<template>
  <section
    class="base__container"
    :class="[modeClass, { 'base__container--auth': authPadding }]"
  >
    <slot></slot>
  </section>
</template>

<style lang="scss">
.base__container {
  background-color: $background-color;
  box-shadow: 8px 8px 24px 0px rgba(0, 0, 0, 1);
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: justify;
  &--auth {
    padding: 20px;
  }
  &--flat {
    background-color: none;
  }
  & h1 {
    text-align: center;
  }
}
</style>
