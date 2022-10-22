<template>
  <form @submit.prevent="setDailyInfo">
    <fieldset v-for="field in fields" :key="field.description" class="info">
      <legend>{{ field.description }}</legend>
      <label v-for="item in field.items" :key="item.description">
        <input
          type="radio"
          name="presence"
          :value="item.value"
          v-model="checked"
        />
        {{ item.description }}
      </label>
      <label v-if="field.numberfield"
        ><input
          type="text"
          inputmode="numeric"
          pattern="\d*"
          @change="checkHours(field.hours)"
          v-model="field.hours"
        />
      </label>
    </fieldset>
    <base-button>Zapisz</base-button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { presence, vacation, overhours } from "@/config/dayInfoFields";
import { Group, userDay } from "@/types/dailyInfo";
import { useUserDaysStore } from "@/store/userDays";

const userDaysStore = useUserDaysStore();

const props = defineProps({
  date: {
    type: Object,
    default: () => {
      return { day: 0, month: 0, year: 0 };
    },
  },
});

const checked = ref("");
// const overhoursCount = ref(0);

const fields = ref([
  {
    description: "Obecność",
    group: Group.Presence as Group,
    numberfield: true,
    hours: 0,
    items: presence,
  },
  {
    description: "Nadgodziny",
    group: Group.Overhours as Group,
    numberfield: true,
    hours: 0,
    items: overhours,
  },
  {
    description: "Urlopy",
    group: Group.Vacation as Group,
    numberfield: false,
    hours: 0,
    items: vacation,
  },
]);

const checkHours = (value: number) => (value < 0 ? (value = 0) : value);

const setDailyInfo = () => {
  const dailyData = {
    year: props.date.year,
    month: props.date.month,
    day: props.date.day,
    group: Group.Vacation,
    value: checked.value,
    hours: 4,
  } as userDay;
  userDaysStore.addInfo(dailyData);
};
</script>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;
  &__input {
    margin: 10px;
  }
}
</style>
