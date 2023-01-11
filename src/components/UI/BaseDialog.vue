<template>
  <teleport to="body">
    <div @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog class="dialog" open>
        <!-- :class="{
          'dialog--days': editMode || (!done && mode === 'day'),
        }" -->
        <header class="dialog__header">
          <slot name="header">
            <h2>{{ props.title }}</h2>
          </slot>
          <menu class="dialog__menu">
            <i
              @click="tryClose"
              class="fa-sharp fa-solid fa-circle-xmark dialog__close"
            ></i>
          </menu>
        </header>
        <section>
          <slot class="dialog__container"></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const tryClose = () => {
  emit("close");
};
</script>

<style lang="scss">
.dialog {
  position: fixed;
  top: 50px;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px #ffffff;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: $background-color;
  height: auto;
  max-height: 80%;
  &--days {
    height: 80%;
  }
  &__container {
    padding: 1rem;
    max-height: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &--months {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  &__month {
    padding: 2rem;
    justify-self: center;
  }
  &__header {
    background-color: $main-color;
    color: $text-color;
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    & h2 {
      margin: 0;
    }
  }
  &__menu {
    margin: auto 0;
  }
  &__close {
    cursor: pointer;
    font-size: 28px;
    height: 28px;
    line-height: 28px;
  }
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

/* VUE TRANSITION START */

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* VUE TRANSITION END */

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
