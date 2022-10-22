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
  background-color: #000;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin: 0.5rem;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  &:hover,
  &:active {
    background-color: #fff;
    border-color: #000;
    color: #fff;
  }
  &--flat {
    background-color: transparent;
    color: #fff;
    border: 1px solid transparent;
    &:hover,
    &:active {
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    }
  }
  &--outline {
    background-color: transparent;
    border-color: #000;
    color: #000;
    border: 1px solid #000;
    &:hover,
    &:active {
      background-color: #fff;
    }
  }
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
