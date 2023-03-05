<template>
  <section class="profile">
    <top-bar>
      <h1>Profil</h1>
    </top-bar>
    <section class="profile__logo">
      <figure class="profile__nick">
        <img src="@/assets/emotka.png" />
        <h1>{{ userInfoStore.userInfo[ProfileField.NICKNAME].value }}</h1>
      </figure>
    </section>
    <section class="profile__data" v-if="userInfoStore.isProfileFinished">
      <article class="profile__item">
        <h4>Data urodzenia:</h4>
        <p>{{ userInfoStore.userBirthDate }}</p>
      </article>
      <article class="profile__item">
        <h4>Typ wynagrodzenia:</h4>
        <p>
          {{ salaryType }}
        </p>
      </article>
      <article class="profile__item">
        <h4>Wynagrodzenie na umowie:</h4>
        <p>
          {{ userInfoStore.userInfo[ProfileField.SALARYAMOUNT].value }}
          {{ userInfoStore.userInfo[ProfileField.CURRENCY].value
          }}{{
            userInfoStore.userInfo[ProfileField.SALARYTYPE].value ===
            SalaryType.HOURLY
              ? "/h"
              : ""
          }}
        </p>
      </article>
      <article class="profile__item">
        <h4>Wykonywana praca</h4>
        <p>{{ isSameCity }}znajduje się w miejscu zamieszkania</p>
      </article>
      <article class="profile__item">
        <h4>Język, jakiego używasz to:</h4>
        <p>{{ langStore.getLangName }}</p>
      </article>
    </section>
    <profile-set v-else></profile-set>
  </section>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import { useUserInfo } from "@/store/profile/userInfo";
// import BaseNotecard from "@/components/UI/BaseNotecard.vue";
import { IsSameCity, ProfileField, SalaryType } from "@/types/userInfo";
import { computed } from "vue";
import ProfileSet from "@/components/ProfileSet.vue";
import { useLangStore } from "@/store/lang";

const userInfoStore = useUserInfo();
const langStore = useLangStore();

const salaryType = computed(() => {
  let salaryTypeText = "";

  switch (userInfoStore.userInfo[ProfileField.SALARYTYPE].value) {
    case SalaryType.HOURLY:
      salaryTypeText = langStore.messages.salaryType.hourly;
      break;
    case SalaryType.MONTHLY:
      salaryTypeText = langStore.messages.salaryType.monthly;
      break;
    default:
      salaryTypeText = userInfoStore.userInfo[ProfileField.SALARYTYPE]
        .value as string;
  }
  return salaryTypeText;
});

const isSameCity = computed(() => {
  let sameCityText = "";

  if (userInfoStore.userInfo.issamecity.value === IsSameCity.NO) {
    sameCityText = "nie ";
  }
  return sameCityText;
});
</script>

<style lang="scss">
.profile {
  &__data {
    margin-top: 10px;
    & h3 {
      padding: 25px;
    }
  }
  &__item {
    border-bottom: 1px solid $calendar-vacation;
    width: 80%;
    margin: auto;
    padding: 5px;
    & h4 {
      color: $calendar-presence;
    }
    & p {
      color: $calendar-overhours;
    }
  }
  &__logo {
    background-color: $main-color;
    color: $calendar-presence;
    padding: 10px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    & figure {
      & h1 {
        margin: auto;
      }
      & img {
        width: 100px;
        height: 100px;
      }
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .profile {
    &__data,
    &__nick {
      padding-left: 78px;
    }
  }
}
</style>
