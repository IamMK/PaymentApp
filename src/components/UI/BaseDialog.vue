<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog
        class="dialog"
        :class="{
          'dialog--days': editMode || (!done && mode === 'day'),
        }"
        open
        v-if="show"
      >
        <header class="dialog__header">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <menu class="dialog__menu">
            <i
              @click="tryClose"
              class="fa-sharp fa-solid fa-circle-xmark dialog__close"
            ></i>
          </menu>
        </header>
        <section class="dialog__container" v-if="mode === 'day'">
          <daily-data
            v-if="done && !editMode"
            :date="date"
            @editMode="editDay"
          ></daily-data>
          <daily-info
            @close="tryClose"
            v-else-if="done && editMode"
            :date="date"
            edit
          ></daily-info>
          <daily-info @close="tryClose" v-else :date="date"></daily-info>
        </section>
        <section class="dialog__container" v-else-if="mode === 'year'">
          <year-change :startValue="start" @confirm="confirm"></year-change>
        </section>
        <section
          class="dialog__container dialog__container--months"
          v-else-if="mode === 'month'"
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
        <section v-else class="dialog__container"><slot></slot></section>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCalendarStore } from "@/store/calendar";

import DailyInfo from "@/components/UI/DialogViews/DailyInfo.vue";
import DailyData from "@/components/UI/DialogViews/DailyData.vue";
import YearChange from "./DialogViews/YearChange.vue";

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
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const editMode = ref(false);

const emit = defineEmits(["close"]);

const editDay = () => {
  editMode.value = true;
};

const confirm = (value: number) => {
  if (props.mode === "year") calendarStore.year = value;
  if (props.mode === "month") calendarStore.month = value;
  emit("close");
};
const tryClose = () => {
  editMode.value = false;
  // dayIsDone.value = !props.done;
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
