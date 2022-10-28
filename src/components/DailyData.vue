<template>
  <section class="daily__data">
    <h2>Wykaz dnia {{ date.day }}.{{ date.month }}.{{ date.year }}:</h2>
    <h3>Dzienna aktywność: {{ dayInfo.value }}</h3>
    <p>Ilość przepracowanych godzin: {{ dayInfo.hours }}</p>
    <p>Ilość godzin nadliczbowych: {{ dayInfo.hours }}</p>
    <p>Brutto za dzień: {{ dayPayment.toFixed(2) }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useUserDaysStore } from "@/store/userDays";
import { useUserInfo } from "@/store/userInfo";
import { useCalendarStore } from "@/store/calendar";

const userDays = useUserDaysStore();
const userInfo = useUserInfo();
const calendarStore = useCalendarStore();

const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
});

const dayInfo = computed(() => {
  const info = userDays.dailyInfo.filter((el) => {
    return el.day === props.date.day.value;
  });
  return info[0];
});

const dayPayment = computed(() => {
  console.log("Ilość tygodni:", calendarStore.daysAtWork);
  // console.log();

  return userInfo.salaryAmount / calendarStore.daysAtWork;
});
</script>
