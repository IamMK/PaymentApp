<template>
  <section class="calendar">
    <top-bar class="calendar__header">
      <section class="calendar__section">
        <span @click="openMonthDialog">{{ checkedMonth }}</span>
        <MonthDialog
          @close="closeMonthDialog"
          v-if="monthDialog"
          title="Wybór miesiąca"
        />
      </section>
    </top-bar>
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
        <day-summary
          title="Podsumowanie dnia"
          @close="closeDayDialog"
          @close-day-summary="closeDayDialog"
          @edit-mode="openSetDay"
          v-if="dayDialog && dayIsDone(checkedDate.day.value)"
          :date="checkedDate"
        />
        <setday-dialog
          title="Ustawienia dnia"
          @close="closeSetDay"
          @close-set-day-dialog="closeSetDay"
          v-if="
            setDayDialog || (dayDialog && !dayIsDone(checkedDate.day.value))
          "
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
import MonthDialog from "@/components/UI/DialogViews/MonthDialog.vue";
import SetdayDialog from "@/components/UI/DialogViews/SetdayDialog.vue";
import DaySummary from "@/components/UI/DialogViews/DaySummary.vue";
import TopBar from "@/components/TopBar.vue";

const calendarStore = useCalendarStore();
const userDaysStore = useUserDaysStore();

const year = toRefs(calendarStore).year;
const month = toRefs(calendarStore).month;
const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
const monthDialog = ref(false);
const dayDialog = ref(false);
const setDayDialog = ref(false);
const checkedDay = ref(0);
const checkedMonth = computed(() => {
  const months = [
    "",
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  return `${months[month.value]} ${year.value}`;
});

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
const openSetDay = () => {
  setDayDialog.value = true;
};
const closeDayDialog = () => {
  dayDialog.value = false;
};
const closeMonthDialog = () => {
  monthDialog.value = false;
};
const closeSetDay = () => {
  closeDayDialog();
  setDayDialog.value = false;
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
    color: $text-color;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    padding: 10px;
    background: $main-color;
  }
  &__section {
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
  }
}
.dayCount {
  width: 100%;
  padding: 40px 10px;
  font-weight: 800;
  color: $main-color;
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
    background: $calendar-empty;
    align-items: center;
    margin: 2px;
    justify-content: center;
    &--sunday {
      color: #f1c40f !important;
    }
    &--presence {
      background-color: $calendar-presence;
    }
    &--overhours {
      background-color: $calendar-overhours;
    }
    &--vacation {
      background-color: $calendar-vacation;
    }
    &:first-child {
      grid-column-start: v-bind(monthStartDay);
    }
  }
  &__names {
    padding-bottom: 10px;
  }
  &__name {
    font-weight: 800;
    background: $calendar-empty;
    padding: 5px;
    margin: 2px;
  }
}
@media (min-width: $breakpoint-tablet) {
  .dayCount {
    width: auto;
    height: 100%;
    padding-left: 0;
    &__item {
      @include shape(100px, 100px);
    }
    &__name {
      width: 100px;
    }
    &__days,
    &__names {
      max-width: 700px;
      margin: auto;
    }
  }
  .calendar {
    &__header {
      margin: 0;
      border-radius: 0;
      box-shadow: none;
    }
  }
}
</style>
