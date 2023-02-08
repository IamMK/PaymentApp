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

const calc = async () => {
  daysAtWork.value = await calculatorStore.getDaysAtWork(
    year.value,
    month.value,
    Presence.atwork
  );
  calculatorStore.getNightAllowance(year.value, month.value);
  calculatorStore.getBaseBrutto(year.value, month.value);
  calculatorStore.getOverhoursPayment(daysAtWork.value); // do dodania obliczanie godzin w miesiącu, nie dni...
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
    <section class="calculator">
      <h2>Twoje wynagrodzenie</h2>
      <section class="calculator__section">
        <h3>Brutto</h3>
        <p>{{ calculatorStore.brutto }} {{ currency }}</p>
        <h3>Netto</h3>
        <p>{{ calculatorStore.nettoPayment }}</p>
      </section>
      <section class="calculator__section">
        <h2>Składniki wynagrodzenia</h2>
        <article>
          <h3>Dni w pracy</h3>
          <p>{{ daysAtWork }}</p>
          <h3>Podstawa</h3>
          <p>{{ calculatorStore.baseBrutto }} {{ currency }}</p>
          <h3>Wynagrodzenie za godziny nocne</h3>
          <p>{{ calculatorStore.nightAllowance }}</p>
        </article>
        <h2>Premie</h2>
        <section class="calculator__section">
          <h3>Nadgodziny 100%</h3>
          <p>{{ calculatorStore.overhoursWage.hundert }}</p>
        </section>
        <h2>Podatki zdrowotne</h2>
        <section class="calculator__section">
          <h3>Ubezpieczenie emerytalne (9,76%)</h3>
          <p>{{ calculatorStore.pensionInsurance }} {{ currency }}</p>
          <h3>Ubezpieczenie rentowe (1,5%)</h3>
          <p>{{ calculatorStore.disabilityInsurance }} {{ currency }}</p>
          <h3>Ubezpieczenie chorobowe (2,45%)</h3>
          <p>{{ calculatorStore.sickInsurance }} {{ currency }}</p>
          <h3>Ubezpieczenie zdrowotne (9%)</h3>
          <p>{{ calculatorStore.healthInsurance }} {{ currency }}</p>
        </section>
        <h2>Podatki PIT</h2>
        <section class="calculator__section">
          <h3>Zaliczka na podatek</h3>
          <p>{{ calculatorStore.incomeTax }}</p>
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss">
.calculator {
  & h2 {
    color: $calendar-vacation;
    font-size: larger;
  }
  &__section {
    border-bottom: 1px solid $calendar-vacation;
    width: 80%;
    margin: auto;
    padding: 5px;
    & h3 {
      color: $calendar-presence;
      font-size: medium;
    }
    & p {
      color: $calendar-overhours;
    }
  }
}

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

@media (min-width: $breakpoint-tablet) {
  .calculator {
    padding-left: 78px;
  }
}
</style>
