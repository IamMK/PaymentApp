<template>
  <section class="daily__data">
    <h2>Wykaz dnia {{ date.day }}.{{ date.month }}.{{ date.year }}:</h2>
    <h2 v-if="isHoliday">{{ isHoliday }}</h2>
    <h3>Dzienna aktywność: {{ dayDescription }}</h3>
    <p v-if="showHoursAtWorkField">
      Ilość przepracowanych godzin: {{ hoursAtWork }}
    </p>
    <p v-if="showOverhoursField">Ilość godzin nadliczbowych: {{ overHours }}</p>
    <p>Brutto za dzień: {{ dayPayment }}</p>

    <base-button @click="editMode">Zmień</base-button>
    <base-button mode="flat" @click="deleteDayInfo">Usuń</base-button>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { useUserDaysStore } from "@/store/userDays";
import { useCalendarStore } from "@/store/calendar";

import { presence, vacation, overhours } from "@/config/dayInfoFields";
import { Group, Overhours, Presence } from "@/types/dailyInfo";
import { useUserInfo } from "@/store/userInfo";

const userDays = useUserDaysStore();
const userInfo = useUserInfo();
const calendarStore = useCalendarStore();

const emits = defineEmits(["editMode"]);

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
  return (
    Number(userInfo.userInfo.salaryAmount.value) / calendarStore.daysAtWork
  ).toFixed(2);
});

const dayDescription = computed(() => {
  const compared = [...presence, ...vacation, ...overhours];
  const infoField = compared.filter((item) => {
    return item.value === dayInfo.value.value;
  });
  return infoField[0].description;
});

const deleteDayInfo = () => {
  userDays.deleteDayInfo({
    year: props.date.year.value,
    month: props.date.month.value,
    day: props.date.day.value,
  });
};

const editMode = () => {
  emits("editMode");
};

const hoursAtWork = computed(() => {
  let hours = 0;
  if (
    (dayInfo.value.group === Group.Overhours &&
      dayInfo.value.value === Overhours.fifty) ||
    dayInfo.value.value === Presence.atwork
  )
    hours += 8;
  if (dayInfo.value.value === Presence.notfullday) hours += dayInfo.value.hours;
  return hours;
});

const isHoliday = computed(() => {
  const holiday: { [k: string]: { day: number; name: string } }[] = [];
  calendarStore.holidays.forEach((obj) => {
    if (obj.month === props.date.month.value)
      holiday.push(
        Object.fromEntries(
          Object.entries(obj.days).filter(([, val]) => {
            return val.day === props.date.day.value;
          })
        )
      );
  });
  if (holiday[0][1]) return holiday[0][1].name;
  return false;
});

const overHours = computed(() => {
  let hours = 0;
  if (dayInfo.value.value === Overhours.fifty) hours += dayInfo.value.hours;
  if (dayInfo.value.value === Overhours.hundert) hours += dayInfo.value.hours;
  return hours;
});

const showHoursAtWorkField = computed(() => {
  return (
    dayInfo.value.group != Group.Vacation &&
    dayInfo.value.group != Group.Overhours
  );
});
const showOverhoursField = computed(() => {
  return dayInfo.value.group === Group.Overhours;
});
</script>
