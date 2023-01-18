<template>
  <base-dialog>
    <section class="dailyData">
      <h2>
        {{ messages.daySummaryText }} {{ date.day }}.{{ date.month }}.{{
          date.year
        }}:
      </h2>
      <h2 v-if="isHoliday">{{ isHoliday }}</h2>
      <h3>{{ messages.dayActivityText }}</h3>
      <h4>{{ dayDescription }}</h4>
      <p v-if="showHoursAtWorkField">
        {{ messages.hoursAtWorkText }} {{ hoursAtWork }}
      </p>
      <p v-if="showOverhoursField">
        {{ messages.overhoursText }} {{ overHours }}
      </p>
      <p>{{ messages.bruttoText }} {{ dayPayment }}</p>

      <base-button @click="editMode">{{ messages.changeText }}</base-button>
      <base-button mode="flat" @click="deleteDayInfo">{{
        messages.deleteText
      }}</base-button>
    </section>
  </base-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useUserDaysStore } from "@/store/userDays";
import { useCalendarStore } from "@/store/calendar";
import { useLangStore } from "@/store/lang";
import { useUserInfo } from "@/store/userInfo";
import { useCalculatorStore } from "@/store/calculator";
import { nightAllowance } from "@/utils/calculator";

import { presence, vacation, overhours } from "@/config/dayInfoFields";
import { Group, Overhours, Presence, Vacation } from "@/types/dailyInfo";

const userDays = useUserDaysStore();
const userInfo = useUserInfo();
const calendarStore = useCalendarStore();
const langStore = useLangStore();
const calculatorStore = useCalculatorStore();

const messages = computed(() => {
  return langStore.messages.dailyData;
});

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

const dayDescription = computed(() => {
  const compared = [...presence, ...vacation, ...overhours];
  const infoField = compared.filter((item) => {
    return item.value === dayInfo.value.value;
  });
  return infoField[0].description;
});

const dayPayment = computed(() => {
  if (userInfo.userInfo.salaryAmount.value === null)
    return messages.value.functions;

  let payment =
    Number(userInfo.userInfo.salaryAmount.value) / calendarStore.daysAtWork;

  if (dayInfo.value.value === Presence.notfullday)
    payment = (payment / 8) * dayInfo.value.hours;
  if (dayInfo.value.value === Presence.nightfullday) {
    payment =
      payment +
      nightAllowance(props.date.year.value, props.date.month.value) * 8;
  }

  if (dayInfo.value.value === Overhours.fifty)
    payment = payment + (payment / 8) * dayInfo.value.hours * 1.5;

  if (dayInfo.value.value === Overhours.hundert)
    payment = payment + (payment / 8) * dayInfo.value.hours * 2;

  if (dayInfo.value.value === Presence.hundertday) payment = payment * 2;

  if (dayInfo.value.value === Vacation.nonpaid) payment = 0;

  return payment.toFixed(2);
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
    dayInfo.value.value === Presence.atwork ||
    dayInfo.value.value === Presence.hundertday
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

  if (holiday[0] && holiday[0][1]) return holiday[0][1].name;
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

onBeforeMount(() => {
  calculatorStore.getMinimumWage(2023, 1, 1);
});
</script>

<style lang="scss">
.dailyData {
  color: $text-color;
  padding: 5px 15px;
}
</style>
