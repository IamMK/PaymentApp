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
        <h4>Typ wynagrodzenia:</h4>
        <p>
          {{ userInfoStore.userInfo[ProfileField.SALARYTYPE].value }}
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
import { ProfileField, SalaryType } from "@/types/userInfo";
// import { computed } from "vue";
import ProfileSet from "@/components/ProfileSet.vue";
import { useLangStore } from "@/store/lang";

const userInfoStore = useUserInfo();
const langStore = useLangStore();
</script>

<style lang="scss">
.profile {
  & h3 {
    padding: 10px;
  }
}
</style>
