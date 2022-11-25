<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    reuired: false,
    default: "/",
  },
});

const modeClass = props.mode != null ? "button--" + props.mode : "";
</script>

<template>
  <button class="button" v-if="!link" :class="modeClass">
    <slot></slot>
  </button>
  <router-link class="button" v-else :to="to" :class="modeClass"
    ><slot></slot
  ></router-link>
</template>

<style lang="scss">
.button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: $button-background;
  border: 1px solid $button-text;
  color: $button-text;
  cursor: pointer;
  border-radius: 30px;
  margin: 0.5rem;
  margin-top: 20px;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: $button-text;
    border-color: $button-background;
    color: $button-background;
  }
  &--flat {
    background-color: transparent;
    color: $button-background;
    border: 1px solid transparent;
    &:hover,
    &:active {
      background-color: transparent;
      border: 1px solid $button-background;
    }
  }
}
</style>
