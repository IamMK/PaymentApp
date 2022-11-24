<template>
  <base-notecard>
    <form @submit.prevent="" class="profile__form">
      <div class="profile__item">
        <label for="nickname">Nickname:</label>
        <input type="text" name="nickname" class="profile__input" />
      </div>
      <div class="profile__item">
        <label for="salaryType">Typ wynagrodzenia:</label>
        <select name="salaryType" class="profile__input">
          <option value="hourly" class="profile__input">Godzinowe</option>
          <option value="monthly">Miesięczne</option>
        </select>
      </div>
      <div class="profile__item">
        <label for="currency">Waluta</label>
        <select name="currency" class="profile__input">
          <option value="pln">PLN</option>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
        </select>
      </div>
      <div class="profile__item">
        <label for="salary">Wysokość wynagrodzenia</label>
        <input
          type="number"
          @keypress="isNumber"
          v-model.number="formData.salary"
          class="profile__input"
        />
      </div>
    </form>
  </base-notecard>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseNotecard from "./UI/BaseNotecard.vue";

const isNumber = (ev: { charCode: number; preventDefault: () => void }) => {
  if (ev.charCode < 48 || ev.charCode > 57) {
    ev.preventDefault();
    return true;
  }
  return true;
};

const formData = reactive({
  nickname: "",
  salaryType: "",
  currency: "",
  salary: 0,
});
</script>

<style lang="scss">
.profile {
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__item {
    width: 70%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &__input {
    text-align: center;
    text-align-last: center;
  }
}
</style>
