<template>
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
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

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

const emit = defineEmits(["confirm"]);

const year = ref(props.startValue);

const startValueChange = (operator: Operator) => {
  if (operator === Operator.decrease) year.value--;
  else year.value++;
};

const confirm = (start: number) => {
  emit("confirm", start);
};
</script>

<style lang="scss">
.year {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // font-size: 44px;
}
</style>
