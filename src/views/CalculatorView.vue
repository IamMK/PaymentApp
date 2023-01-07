<script setup lang="ts">
import BaseNotecard from "@/components/UI/BaseNotecard.vue";
import TopBar from "@/components/TopBar.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { useCalculatorStore } from "@/store/calculator";
import { useUserInfo } from "@/store/userInfo";
import { computed, onBeforeMount, ref } from "vue";

const calculatorStore = useCalculatorStore();
const currency = useUserInfo().userInfo.currency.value;

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const daysAtWork = ref(0);

const years = computed(() => {
  const yearsArr = [];
  const presentYear = new Date().getFullYear();
  for (let i = presentYear; i >= 2000; i--) {
    yearsArr.push(i);
  }
  return yearsArr;
});

const brutto = computed(() => {
  return calculatorStore.baseBrutto;
});

const calc = async () => {
  daysAtWork.value = await calculatorStore.getDaysAtWork(
    year.value,
    month.value
  );
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
      <h1>Kalkulator</h1>
      <form @submit.prevent="calc" class="calendar__form">
        <label for="year">Rok:</label>
        <select v-model="year" class="calendar__input" name="year" id="year">
          <option v-for="n in years" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
        <label for="month">Miesiąc:</label>
        <select v-model="month" class="calendar__input" name="month" id="month">
          <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
        </select>
        <base-button>Sprawdź</base-button>
      </form>
    </base-notecard>
    <base-notecard>
      <h2>Twoje wynagrodzenie</h2>
      <article>
        <h3>Brutto</h3>
        <p>{{ brutto }} {{ currency }}</p>
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
          <h4>Ubezpieczenie emerytalne (9,76%)</h4>
          <p>{{ calculatorStore.pensionInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie rentowe (1,5%)</h4>
          <p>{{ calculatorStore.disabilityInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie chorobowe (2,45%)</h4>
          <p>{{ calculatorStore.sickInsurance }} {{ currency }}</p>
          <h4>Ubezpieczenie zdrowotne (9%)</h4>
          <p>{{ calculatorStore.healthInsurance }} {{ currency }}</p>
        </article>
      </article>
    </base-notecard>
  </section>
</template>

<style lang="scss">
.calendar {
  &__form {
    display: flex;
    flex-direction: column;
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
</style>
