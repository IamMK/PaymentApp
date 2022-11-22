<template>
  <section class="daily__data">
    <h2>Wykaz dnia {{ date.day }}.{{ date.month }}.{{ date.year }}:</h2>
    <!-- Święto do dopisania jeśli będzie -->
    <h3>Dzienna aktywność: {{ dayDescription }}</h3>
    <p v-if="showHoursAtWorkField">
      Ilość przepracowanych godzin: {{ hoursAtWork }}
    </p>
    <p v-if="showOverhoursField">Ilość godzin nadliczbowych: {{ overHours }}</p>
    <!-- <p>Brutto za dzień: {{ dayPayment.toFixed(2) }}</p> -->

    <base-button @click="editMode">Zmień</base-button>
    <base-button mode="flat" @click="deleteDayInfo">Usuń</base-button>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { useUserDaysStore } from "@/store/userDays";
// import { useUserInfo } from "@/store/userInfo";
// import { useCalendarStore } from "@/store/calendar";

import { presence, vacation, overhours } from "@/config/dayInfoFields";
import { Group, Overhours, Presence } from "@/types/dailyInfo";

const userDays = useUserDaysStore();
// const userInfo = useUserInfo();
// const calendarStore = useCalendarStore();

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

// const dayPayment = computed(() => {
//   return userInfo.salaryAmount / calendarStore.daysAtWork;
// });

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

const overHours = computed(() => {
  let hours = 0;
  if (dayInfo.value.value === Overhours.fifty) hours += dayInfo.value.hours;
  if (dayInfo.value.value === Overhours.hundert) hours += dayInfo.value.hours;
  return hours;
});

const showHoursAtWorkField = computed(() => {
  return dayInfo.value.group != Group.Vacation;
});
const showOverhoursField = computed(() => {
  return dayInfo.value.group === Group.Overhours;
});
</script>
