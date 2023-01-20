<script setup lang="ts">
import BaseNotecard from "@/components/UI/BaseNotecard.vue";
import TopBar from "@/components/TopBar.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { useCalculatorStore } from "@/store/calculator";
import { useUserInfo } from "@/store/userInfo";
import { computed, onBeforeMount, ref, toRefs } from "vue";
import MonthDialog from "@/components/UI/DialogViews/MonthDialog.vue";
import { Presence } from "@/types/dailyInfo";

const calculatorStore = useCalculatorStore();
const currency = useUserInfo().userInfo.currency.value;

const daysAtWork = ref(0);
const year = toRefs(calculatorStore).year;
const month = toRefs(calculatorStore).month;

const monthDialog = ref(false);

const checkedMonth = computed(() => {
  const months = [
    "",
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  return `${months[month.value]} ${year.value}`;
});

const openMonthDialog = () => {
  monthDialog.value = true;
};

const closeMonthDialog = () => {
  monthDialog.value = false;
};

// const brutto = computed(() => {
//   return calculatorStore.brutto;
// });

const calc = async () => {
  daysAtWork.value = await calculatorStore.getDaysAtWork(
    year.value,
    month.value,
    Presence.atwork
  );
  calculatorStore.getNightAllowance(year.value, month.value);
  calculatorStore.getBaseBrutto(year.value, month.value);
};

onBeforeMount(() => {
  calc();
});
</script>

<template>
  <section class="calendar">
    <top-bar>
      <h1>Kalkulator</h1>
    </top-bar>
    <base-notecard>
      <section class="settings">
        <h1 class="setting__date" @click="openMonthDialog">
          {{ checkedMonth }}
        </h1>
        <MonthDialog
          @close="closeMonthDialog"
          v-if="monthDialog"
          title="Wybór miesiąca"
          calculator
        />
      </section>
      <base-button @click="calc">Sprawdź</base-button>
    </base-notecard>
    <base-notecard>
      <h2>Twoje wynagrodzenie</h2>
      <article>
        <h3>Brutto</h3>
        <p>{{ calculatorStore.brutto }} {{ currency }}</p>
      </article>
      <article>
        <h3>Netto</h3>
        <p>{{ calculatorStore.nettoPayment }}</p>
      </article>
      <article>
        <h3>Składniki wynagrodzenia</h3>
        <article>
          <h4>Dni w pracy</h4>
          <p>{{ daysAtWork }}</p>
          <h4>Podstawa</h4>
          <p>{{ calculatorStore.baseBrutto }} {{ currency }}</p>
          <h4>Wynagrodzenie za godziny nocne</h4>
          <p>{{ calculatorStore.nightAllowance }}</p>
        </article>
        <h3>Podatki</h3>
        <article>
          <h4>Ubezpieczenie emerytalne (9,76%)</h4>
          <p>{{ calculatorStore.pensionInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie rentowe (1,5%)</h4>
          <p>{{ calculatorStore.disabilityInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie chorobowe (2,45%)</h4>
          <p>{{ calculatorStore.sickInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie zdrowotne (9%)</h4>
          <p>{{ calculatorStore.healthInsurance }} {{ currency }}</p>
          <h4>Zaliczka na podatek</h4>
          <p>{{ calculatorStore.incomeTax }}</p>
        </article>
      </article>
    </base-notecard>
  </section>
</template>

<style lang="scss">
.calendar {
  & h4,
  & h3 {
    margin-top: 5px;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__input {
    text-align: center;
    text-align-last: center;

    display: block;
    border: 1px solid $button-background;
    padding: 0.15rem;
    font-size: large;
    font-weight: 400;
    width: 100%;
    &:focus {
      border-color: $text-color;
      background-color: $background-color;
      outline: none;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}

.setting {
  &__date {
    font-size: 20px;
  }
}
</style>
