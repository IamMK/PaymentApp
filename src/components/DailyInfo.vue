<template>
  <form>
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
  </form>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { presence, vacation, overhours } from "@/config/dayInfoFields";

const checked = ref("");
// const overhoursCount = ref(0);

const fields = ref([
  {
    description: "Obecność",
    group: "presence",
    numberfield: true,
    hours: 0,
    items: presence,
  },
  {
    description: "Nadgodziny",
    group: "overhours",
    numberfield: true,
    hours: 0,
    items: overhours,
  },
  {
    description: "Urlopy",
    group: "vacation",
    numberfield: false,
    hours: 0,
    items: vacation,
  },
]);

const checkHours = (value: number) => (value < 0 ? (value = 0) : value);
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
