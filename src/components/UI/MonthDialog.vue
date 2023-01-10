<template>
  <base-dialog :title="props.title">
    <section class="dialog__container dialog__container--months">
      <div class="dialog__month" v-for="n in 12" :key="n" @click="confirm(n)">
        {{ n }}
      </div>
    </section>
  </base-dialog>
</template>

<script setup lang="ts">
import { useCalendarStore } from "@/store/calendar";

const calendarStore = useCalendarStore();

const emit = defineEmits(["close"]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const confirm = (value: number) => {
  calendarStore.month = value;
  emit("close");
};
</script>
