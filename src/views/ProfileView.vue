<template>
  <section>
    <top-bar>
      <h1>Profil</h1>
    </top-bar>
    <base-notecard class="profile" v-if="userInfoStore.isProfileFinished">
      <h2>
        Hej,
        {{ userInfoStore.userInfo[ProfileField.NICKNAME].value }}
      </h2>
      <h3>Podsumujmy informacje, jakie o Tobie posiadam:</h3>
      <article>
        <h4>Data urodzenia:</h4>
        <p>{{ userInfoStore.userBirthDate }}</p>
        <h4>Typ wynagrodzenia:</h4>
        <p>
          {{ salaryType }}
        </p>
      </article>
      <article>
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
      <article>
        <h4>Wykonywana praca</h4>
        <p>{{ isSameCity }}znajduje się w miejscu zamieszkania</p>
      </article>
      <article>
        <h4>Język, jakiego używasz to:</h4>
        <p>{{ langStore.getLangName }}</p>
      </article>
      <h3>Jeżeli będę czegoś jeszcze potrzebować, odezwę się do Ciebie</h3>
    </base-notecard>
    <profile-set v-else></profile-set>
  </section>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import { useUserInfo } from "@/store/userInfo";
import BaseNotecard from "@/components/UI/BaseNotecard.vue";
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
  & h3 {
    padding: 10px;
  }
}
</style>
