<template>
  <section class="calendar">
    <header class="calendar__header">
      <p>Year:</p>
      <section class="calendar__section">
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="year--" class="fa-solid fa-arrow-left"></i>
        <span @click="openYearDialog">{{ year }}</span>
        <i @click="year++" class="fa-solid fa-arrow-right"></i>
        <base-dialog
          @close="closeYearDialog"
          :show="yearDialog"
          mode="year"
          :start="year"
        />
      </section>
      <p>Month:</p>
      <section class="calendar__section">
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="month--" class="fa-solid fa-arrow-left"></i>
        <span @click="openMonthDialog">{{ month }}</span>
        <i @click="month++" class="fa-solid fa-arrow-right"></i>
        <base-dialog
          @close="closeMonthDialog"
          :show="monthDialog"
          mode="month"
          :start="month"
        />
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
import { computed, ref, toRefs } from "@vue/reactivity";

import { useCalendarStore } from "@/store/calendar";

const calendarStore = useCalendarStore();

const year = toRefs(calendarStore).year;
const month = toRefs(calendarStore).month;
const weekDays = ["Mon", "Thu", "Wed", "Thu", "Fri", "Sat", "Sun"];
const yearDialog = ref(false);
const monthDialog = ref(false);

const daysCount = computed(() => {
  return new Date(year.value, month.value, 0).getDate();
});

const monthStartDay = computed(() => {
  return calendarStore.monthStartDay;
});
const isSunday = (day: number) => {
  const dayOfWeek = new Date(year.value, month.value - 1, day).getDay();
  return dayOfWeek === 0;
};

const openMonthDialog = () => {
  monthDialog.value = true;
};
const openYearDialog = () => {
  yearDialog.value = true;
};
const closeMonthDialog = () => {
  monthDialog.value = false;
};
const closeYearDialog = () => {
  yearDialog.value = false;
};
</script>

<style lang="scss">
.calendar {
  &__header {
    display: flex;
    flex-direction: column;
    font-size: 25px;
    margin: 20px;
  }
  &__section {
    width: 50%;
    margin: auto;
    display: flex;
    justify-content: space-between;
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
      grid-column-start: v-bind(monthStartDay);
    }
  }
}
</style>
