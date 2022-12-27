<template>
  <base-notecard class="profile__notecard">
    <h1>{{ messages.titleText }}</h1>
    <form @submit.prevent="" class="profile__form">
      <div v-for="item in emptyFields" :key="item.name" class="profile__item">
        <label :for="item.name">{{ item.name }}</label>
        <input
          v-if="item.type === 'string'"
          :type="item.type"
          :name="item.name"
          class="profile__input"
          v-model="item.value"
        />
        <select
          v-else-if="item.type === 'select'"
          :name="item.name"
          class="profile__input"
          v-model="item.value"
        >
          <option
            v-for="value in item.allowed"
            :key="value"
            :value="value"
            class="profile__input"
          >
            {{ value }}
          </option>
        </select>
        <input
          v-else-if="item.type === 'number'"
          :type="item.type"
          @keypress="isNumber"
          class="profile__input"
          v-model="item.value"
        />
      </div>
      <base-button class="profile__button" @click="setProfileInfo">
        {{ messages.saveText }}
      </base-button>
    </form>
  </base-notecard>
</template>

<script setup lang="ts">
import BaseNotecard from "./UI/BaseNotecard.vue";
import { useUserInfo } from "@/store/userInfo";
import { useLangStore } from "@/store/lang";
import { SalaryType, userInfo } from "@/types/userInfo";
import { computed } from "vue";

const userInfoStore = useUserInfo();
const langStore = useLangStore();

const messages = computed(() => {
  return langStore.messages.profileSet;
});

const emptyFields = computed((): userInfo => {
  const empty = JSON.parse(JSON.stringify(userInfoStore.getEmpty));
  if (empty.salaryType)
    empty.salaryType.allowed = langStore.messages.salaryType;
  return empty;
});

const isNumber = (ev: { charCode: number; preventDefault: () => void }) => {
  if (ev.charCode < 48 || ev.charCode > 57) {
    ev.preventDefault();
    return true;
  }
  return true;
};

const setProfileInfo = () => {
  const info = Object.fromEntries(
    Object.entries(emptyFields.value).map(([key, item]) => {
      return [key, item.value];
    })
  );

  if (info.salaryType) {
    switch (info.salaryType) {
      case langStore.messages.salaryType.monthly:
        info.salaryType = SalaryType.MONTHLY;
        break;
      case langStore.messages.salaryType.hourly:
        info.salaryType = SalaryType.HOURLY;
        break;
    }
  }

  userInfoStore.sendUserData(info);
};
</script>

<style lang="scss">
.profile {
  &__button {
    margin-top: 20px;
  }
  &__form {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__item {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &__input {
    text-align: center;
    text-align-last: center;

    display: block;
    border: 1px solid #ccc;
    padding: 0.15rem;
    border-radius: 10px;
    font-size: large;
    font-weight: 400;
    width: 100%;
    &:focus {
      border-color: $text-color;
      background-color: $background-color;
      outline: none;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .profile {
    &__notecard {
      width: 40%;
      // padding: 2rem;
      & .notecard__wrapper {
        padding: 2em;
      }
    }
  }
}
</style>
