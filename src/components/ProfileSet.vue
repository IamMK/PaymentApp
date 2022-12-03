<template>
  <base-notecard class="profile__notecard">
    <h1>Brakuje mi o Tobie następujących informacji</h1>
    <form @submit.prevent="" class="profile__form">
      <div
        v-for="item in userInfo.getEmpty"
        :key="item.name"
        class="profile__item"
      >
        <label :for="item.name">{{ item.name }}</label>
        <input
          v-if="item.type === 'string'"
          :type="item.type"
          :name="item.name"
          class="profile__input"
        />
        <select
          v-else-if="item.type === 'select'"
          :name="item.name"
          class="profile__input"
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
        />
      </div>
      <base-button class="profile__button">Zapisz profil</base-button>
    </form>
  </base-notecard>
</template>

<script setup lang="ts">
// import { reactive } from "vue";
import BaseNotecard from "./UI/BaseNotecard.vue";
import { useUserInfo } from "@/store/userInfo";

const userInfo = useUserInfo();

const isNumber = (ev: { charCode: number; preventDefault: () => void }) => {
  if (ev.charCode < 48 || ev.charCode > 57) {
    ev.preventDefault();
    return true;
  }
  return true;
};

// const setProfileInfo = userInfo.sendUserData()
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
