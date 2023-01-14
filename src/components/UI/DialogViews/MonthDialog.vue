<template>
  <base-dialog @close="closeDialog">
    <section class="dateSet">
      <section class="year">
        <i @click="yearDecrease" class="fa-solid fa-arrow-left"></i>
        <span>{{ year }}</span>
        <i @click="yearIncrease" class="fa-solid fa-arrow-right"></i>
      </section>
      <section class="month">
        <div
          class="month__item"
          v-for="item in months"
          :key="item.value"
          @click="confirm(item.value)"
        >
          {{ item.name }}
        </div>
      </section>
    </section>
  </base-dialog>
</template>

<script setup lang="ts">
import { useCalculatorStore } from "@/store/calculator";
import { useCalendarStore } from "@/store/calendar";
import { reactive, toRefs } from "vue";

const calendarStore = useCalendarStore();
const calculatorStore = useCalculatorStore();

const emit = defineEmits(["close"]);

const props = defineProps({
  calculator: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const year = props.calculator
  ? toRefs(calculatorStore).year
  : toRefs(calendarStore).year;

const confirm = (value: number) => {
  if (props.calculator) calculatorStore.month = value;
  else calendarStore.month = value;
  closeDialog();
};

const closeDialog = () => {
  emit("close");
};

const yearDecrease = () => {
  if (props.calculator) calculatorStore.year = calculatorStore.year - 1;
  else calendarStore.year = calculatorStore.year - 1;
};

const yearIncrease = () => {
  if (props.calculator) calculatorStore.year = calculatorStore.year + 1;
  else calendarStore.year = calculatorStore.year + 1;
};

const months = reactive({
  januar: { name: "Sty", value: 1 },
  februar: { name: "Lut", value: 2 },
  march: { name: "Mar", value: 3 },
  april: { name: "Kwi", value: 4 },
  may: { name: "Maj", value: 5 },
  june: { name: "Cze", value: 6 },
  july: { name: "Lip", value: 7 },
  august: { name: "Sie", value: 8 },
  september: { name: "Wrz", value: 9 },
  october: { name: "Paź", value: 10 },
  november: { name: "Lis", value: 11 },
  december: { name: "Gru", value: 12 },
});
</script>

<style lang="scss">
.dateSet {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  & .month {
    color: $main-color;
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    &__item {
      @include shape(calc(100vw / 7), calc(100vw / 7));
      text-align: center;
      margin: 5px;
      background-color: $calendar-empty;
      justify-self: center;
    }
  }
  & .year {
    width: 60%;
    display: flex;
    justify-content: space-around;
    color: $calendar-empty;
    padding-bottom: 10px;
  }
}

@media (min-width: $breakpoint-tablet) {
  .dateSet {
    & .month {
      width: 50%;
      &__item {
        @include shape(100px, 100px);
      }
    }
  }
}
</style>
