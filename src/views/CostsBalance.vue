<template>
  <section class="costsBalance">
    <top-bar>
      <h1>Bilans premii i kosztów</h1>
    </top-bar>
    <base-notecard>
      <h2>Wydatki</h2>
      <section v-for="item in costsStore" :key="item.name">
        <h3>{{ item.name }}</h3>
        <p>Koszt: {{ item.cost }}</p>
        <p>Koszt {{ translateCost(item.type, appConfig.lang) }}</p>
      </section>
    </base-notecard>
  </section>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BaseNotecard from "@/components/UI/BaseNotecard.vue";
import { appConfig } from "@/config/appconfig";

import { useCostsStore } from "@/store/profile/costsbalance";

const costsStore = useCostsStore().costsArray;

const translateCost = (_item: string, lang: string): string => {
  if (lang === "pl") return "miesięczny";
  else return "unknown"; // autotranslation - toDo
};
</script>
