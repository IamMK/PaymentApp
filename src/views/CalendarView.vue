<template>
  <section class="calendar">
    <header class="calendar__header">
      <p>Rok:</p>
      <section class="calendar__section">
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
          :class="{ 'dayCount__item--sunday': item === 'Nd' }"
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
            { 'dayCount__item--sunday': isHoliday(n) },
            `dayCount__item--${dayClass(n)}`,
          ]"
          v-for="n in calendarStore.daysCount"
          :key="n"
        >
          {{ n }}
        </div>
        <base-dialog
          title="Informacja dzienna"
          @close="closeDayDialog"
          :show="dayDialog"
          mode="day"
          :done="dayIsDone(checkedDate.day.value)"
          :date="checkedDate"
        />
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";

import { useCalendarStore } from "@/store/calendar";
import { onMounted, watch } from "@vue/runtime-dom";
import { useUserDaysStore } from "@/store/userDays";
// import { userDay } from "@/types/dailyInfo";

const calendarStore = useCalendarStore();
const userDaysStore = useUserDaysStore();

const year = toRefs(calendarStore).year;
const month = toRefs(calendarStore).month;
const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
const yearDialog = ref(false);
const monthDialog = ref(false);
const dayDialog = ref(false);
const checkedDay = ref(0);

const daysLoading = ref(false);

const checkedDate = computed(() => {
  return { year, month, day: checkedDay };
});

const monthStartDay = computed(() => {
  return calendarStore.monthStartDay;
});
const isHoliday = (day: number) => {
  const dayOfWeek = new Date(year.value, month.value - 1, day).getDay();
  const holidays = calendarStore.holidaysAtMonth;
  if (dayOfWeek === 0 || holidays.includes(day)) return true;
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

const dayClass = (day: number) => {
  const usedDays = [];
  for (const item of userDaysStore.dailyInfo) {
    usedDays.push(Number(item.day));
  }
  const isChecked = usedDays.includes(day);
  let checkedDay;

  if (isChecked) {
    checkedDay = userDaysStore.dailyInfo.filter((el) => {
      return el.day === day;
    });
  } else return;

  return checkedDay[0].group;
};

const dayIsDone = (day: number) => {
  const usedDays = [];
  for (const item of userDaysStore.dailyInfo) {
    usedDays.push(Number(item.day));
  }

  return usedDays.includes(day);
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
    await userDaysStore.fetchMonhlyData();
  } catch (error: string | unknown) {
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
    margin: 5px;
    background-color: $main-color;
    color: $text-color;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    font-size: 25px;
    padding: 20px;
    box-shadow: $main-color 0 5px 10px;
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
  padding: 10px;
  font-weight: 800;
  &__days,
  &__names {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    transition: all 0.3s ease;
  }
  &__item {
    display: flex;
    height: calc(100vw / 7);
    outline: 1px solid black;
    align-items: center;
    margin: 2px;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    &--sunday {
      color: red;
    }
    &--presence {
      background: radial-gradient(
        circle,
        $background-color 0%,
        $background-color 10%,
        #1d7b00 100%
      );
    }
    &--overhours {
      background-color: yellow;
      background: radial-gradient(
        circle,
        $background-color 0%,
        $background-color 10%,
        #2802b1 100%
      );
    }
    &--vacation {
      background-color: yellow;
      background: radial-gradient(
        circle,
        $background-color 0%,
        $background-color 10%,
        #b10202 100%
      );
    }
    &:first-child {
      grid-column-start: v-bind(monthStartDay);
    }
  }
  &__name {
    font-weight: 800;
    background: #00000010;
    padding: 5px;
    margin: 2px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
}
</style>
