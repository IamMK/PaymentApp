<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog class="dialog" open v-if="show">
        <header class="dialog__header">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section class="dialog__container dupa" v-if="mode === 'day'">
          <daily-info></daily-info>
        </section>
        <section class="dialog__container" v-if="mode === 'year'">
          <i @click="startValue--" class="fa-solid fa-arrow-left"></i>
          <div @click="confirm(startValue - 1)">{{ startValue - 1 }}</div>
          <div @click="confirm(startValue)">{{ startValue }}</div>
          <div @click="confirm(startValue + 1)">{{ startValue + 1 }}</div>
          <i @click="startValue++" class="fa-solid fa-arrow-right"></i>
        </section>
        <section
          class="dialog__container dialog__container--months"
          v-if="mode === 'month'"
        >
          <div
            class="dialog__month"
            v-for="n in 12"
            :key="n"
            @click="confirm(n)"
          >
            {{ n }}
          </div>
        </section>
        <menu class="dialog__menu">
          <slot name="actions">
            <base-button @click="tryClose">Zamknij</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { useCalendarStore } from "@/store/calendar";

import DailyInfo from "@/components/DailyInfo.vue";

const calendarStore = useCalendarStore();
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  mode: {
    type: String,
    required: true,
  },
  start: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Object,
    default: () => {
      return { day: 0, month: 0, year: 0 };
    },
  },
  title: {
    type: String,
    required: true,
  },
});

const startValue = ref(props.start);

const emit = defineEmits(["close"]);

const confirm = (value: number) => {
  if (props.mode === "year") calendarStore.year = value;
  if (props.mode === "month") calendarStore.month = value;
  emit("close");
};
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  &__container {
    padding: 1rem;
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
    // height: 2rem;
    justify-self: center;
  }
  &__header {
    background-color: #3a0061;
    color: white;
    width: 100%;
    padding: 1rem;
    & h2 {
      margin: 0;
    }
  }
  &__menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
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
