<template>
  <base-dialog>
    <section class="dateSet">
      <section class="year">
        <i @click="year--" class="fa-solid fa-arrow-left"></i>
        <span>{{ year }}</span>
        <i @click="year++" class="fa-solid fa-arrow-right"></i>
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
import { useCalendarStore } from "@/store/calendar";
import { reactive, toRefs } from "vue";

const calendarStore = useCalendarStore();

const year = toRefs(calendarStore).year;

const confirm = (value: number) => {
  calendarStore.month = value;
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
    // width: auto;
    // max-width: 100%;
    color: $main-color;
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    &__item {
      @include shape(calc(100vw / 7), calc(100vw / 7));
      text-align: center;
      // height: calc(100vw / 7);
      // line-height: calc(100vw / 7);
      // width: calc(100vw / 7);
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
</style>
