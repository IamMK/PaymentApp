<template>
  <section class="calendar">
    <header class="calendar__header">
      <p>Rok:</p>
      <section class="calendar__section">
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="year--" class="fa-solid fa-arrow-left"></i>
        <span @click="openYearDialog">{{ year }}</span>
        <i @click="year++" class="fa-solid fa-arrow-right"></i>
        <base-dialog
          title="Wybór roku"
          @close="closeYearDialog"
          :show="yearDialog"
          mode="year"
          :start="year"
        />
      </section>
      <p>Miesiąc:</p>
      <section class="calendar__section">
        <!-- <input type="number" id="year" name="year" v-model="year" /> -->
        <i @click="monthDecrease" class="fa-solid fa-arrow-left"></i>
        <span @click="openMonthDialog">{{ month }}</span>
        <i @click="monthIncrease" class="fa-solid fa-arrow-right"></i>
        <base-dialog
          title="Wybór miesiąca"
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
        <base-spinner v-if="daysLoading" />
        <div
          v-else
          @click="openDayDialog(n)"
          class="dayCount__item"
          :class="[
            { 'dayCount__item--sunday': isSunday(n) },
            { 'dayCount__item--atwork': dayCheck(n) },
          ]"
          v-for="n in daysCount"
          :key="n"
        >
          {{ n }}
        </div>
        <base-dialog
          title="Informacja dzienna"
          @close="closeDayDialog"
          :show="dayDialog"
          mode="day"
          :date="checkedDate"
        />
      </div>
    </main>
    <!-- <div>{{ userDaysStore.dailyInfo["5"] }}</div> -->
  </section>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";

import { useCalendarStore } from "@/store/calendar";
import { onMounted, watch } from "@vue/runtime-dom";
import { useUserDaysStore } from "@/store/userDays";

const calendarStore = useCalendarStore();
const userDaysStore = useUserDaysStore();

const year = toRefs(calendarStore).year;
const month = toRefs(calendarStore).month;
const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pia", "Sob", "Nied"];
const yearDialog = ref(false);
const monthDialog = ref(false);
const dayDialog = ref(false);
const checkedDay = ref(0);

const daysLoading = ref(false);

const checkedDate = computed(() => {
  return { year, month, day: checkedDay };
});

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

const monthIncrease = () => {
  month.value++;
  if (month.value > 12) {
    month.value = 1;
    year.value++;
  }
};
const monthDecrease = () => {
  month.value--;
  if (month.value <= 0) {
    month.value = 12;
    year.value--;
  }
};

const dayCheck = (day: number) => {
  const usedDays = [];
  for (const item of userDaysStore.dailyInfo) {
    usedDays.push(Number(item.day));
  }
  const filteredDays = usedDays.includes(day);
  // const filteredDays = userDaysStore.dailyInfo.includes({day})

  return filteredDays;
};

const openDayDialog = (day: number) => {
  checkedDay.value = day;
  dayDialog.value = true;
};
const openMonthDialog = () => {
  monthDialog.value = true;
};
const openYearDialog = () => {
  yearDialog.value = true;
};
const closeDayDialog = () => {
  dayDialog.value = false;
};
const closeMonthDialog = () => {
  monthDialog.value = false;
};
const closeYearDialog = () => {
  yearDialog.value = false;
};

const loadDailyInfo = async () => {
  daysLoading.value = true;
  try {
    await userDaysStore.fetchDailyData();
  } catch (error: any) {
    console.log(error);
  }
  daysLoading.value = false;
};

onMounted(() => {
  loadDailyInfo();
});

watch(year, loadDailyInfo);
watch(month, loadDailyInfo);
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    transition: all 0.3s ease;
  }
  &__item {
    // width: calc(100vw / 8);
    height: calc(100vw / 7);
    border: 1px solid black;
    &--sunday {
      color: red;
    }
    &--atwork {
      background-color: green;
    }
    &:first-child {
      grid-column-start: v-bind(monthStartDay);
    }
  }
}
</style>
