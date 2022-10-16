<template>
  <section class="calendar">
    <header class="calendar__header">
      <section class="calendar__year">
        <p>Year:</p>
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="year--" class="fa-solid fa-arrow-left"></i>
        <span>{{ year }}</span>
        <i @click="year++" class="fa-solid fa-arrow-right"></i>
      </section>
      <section>
        <p>Year:</p>
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="month--" class="fa-solid fa-arrow-left"></i>
        <span>{{ month }}</span>
        <i @click="month++" class="fa-solid fa-arrow-right"></i>
      </section>
    </header>
    <main class="dayCount">
      <div class="dayCount__names">
        <div
          class="dayCount__name"
          :class="{ 'dayCount__item--sunday': item === 'Sun' }"
          v-for="item in weekDays"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <div class="dayCount__days">
        <div
          class="dayCount__item"
          :class="{ 'dayCount__item--sunday': isSunday(n) }"
          v-for="n in daysCount"
          :key="n"
        >
          {{ n }}
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

const year = ref(2022);
const month = ref(10);
const weekDays = ["Mon", "Thu", "Wed", "Thu", "Fri", "Sat", "Sun"];

const daysCount = computed(() => {
  return new Date(year.value, month.value, 0).getDate();
});

const dayOfWeek = computed(() => {
  const day = new Date(year.value, month.value - 1, 1).getDay();
  return day === 0 ? 7 : day;
});

const isSunday = (day: number) => {
  const dayOfWeek = new Date(year.value, month.value - 1, day).getDay();
  return dayOfWeek === 0;
};
</script>

<style lang="scss">
.calendar {
  &__header {
    display: flex;
    flex-direction: column;
  }
}
.dayCount {
  width: 100%;
  &__days,
  &__names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  &__item {
    // width: calc(100vw / 8);
    height: calc(100vw / 7);
    border: 1px solid black;
    &--sunday {
      color: red;
    }
    &:first-child {
      grid-column-start: v-bind(dayOfWeek);
    }
  }
}
</style>
