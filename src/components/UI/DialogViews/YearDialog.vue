<template>
  <base-dialog @close="closeDialog">
    <section class="year">
      <i
        @click="startValueChange(Operator.decrease)"
        class="fa-solid fa-arrow-left"
      ></i>
      <div @click="confirm(year - 1)">{{ year - 1 }}</div>
      <div @click="confirm(year)">{{ year }}</div>
      <div @click="confirm(year + 1)">{{ year + 1 }}</div>
      <i
        @click="startValueChange(Operator.increase)"
        class="fa-solid fa-arrow-right"
      ></i>
    </section>
  </base-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCalendarStore } from "@/store/calendar";

const calendarStore = useCalendarStore();

const emit = defineEmits(["close"]);

enum Operator {
  decrease = "-",
  increase = "+",
}

const props = defineProps({
  startValue: {
    type: Number,
    required: true,
  },
});

const year = ref(props.startValue);

const startValueChange = (operator: Operator) => {
  if (operator === Operator.decrease) year.value--;
  else year.value++;
};

const closeDialog = () => emit("close");

const confirm = (start: number) => {
  calendarStore.year = start;
  closeDialog();
};
</script>

<style lang="scss">
.year {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
}
</style>
