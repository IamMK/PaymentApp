<template>
  <section>
    <top-bar>
      <h1>Profil</h1>
    </top-bar>
    <base-notecard v-if="userInfoStore.isProfileFinished">
      <h2>Hej, {{ userInfoStore.nickname }}</h2>
      <h3>Podsumujmy informacje, jakie o Tobie posiadam:</h3>
      <p>Typ wynagrodzenia: {{ salaryType }}</p>
      <p>
        Wynagrodzenie na umowie: {{ userInfoStore.salaryAmount }}
        {{ userInfoStore.currency
        }}{{ userInfoStore.salaryType === SalaryType.HOURLY ? "/h" : "" }}
      </p>
      <h3>Jeżeli będę czegoś jeszcze potrzebować, odezwę się do Ciebie</h3>
    </base-notecard>
    <profile-set v-else></profile-set>
  </section>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import { useUserInfo } from "@/store/userInfo";
import BaseNotecard from "@/components/UI/BaseNotecard.vue";
import { SalaryType } from "@/types/userInfo";
import { computed } from "vue";
import ProfileSet from "@/components/ProfileSet.vue";

const userInfoStore = useUserInfo();

const salaryType = computed(() => {
  if (userInfoStore.salaryType === SalaryType.MONTHLY) return "Miesięczny";
  if (userInfoStore.salaryType === SalaryType.HOURLY) return "Godzinowe";
  return null;
});
</script>
