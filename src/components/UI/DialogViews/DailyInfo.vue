<template>
  <form class="form" @submit.prevent="setDailyInfo">
    <div class="form__fields">
      <fieldset
        v-for="field in fields"
        :key="field.description"
        class="form__info"
      >
        <legend class="form__desc">{{ field.description }}</legend>
        <label
          class="form__field"
          v-for="item in field.items"
          :key="item.description"
        >
          <input
            type="radio"
            name="presence"
            :value="item.value"
            v-model="checked"
            class="form__radio"
            @click="uncheck(item.value)"
          />
          {{ item.description }}
        </label>
        <label v-if="field.numberfield">
          {{ messages.hoursCountText }}
          <input
            type="number"
            v-model="field.hours"
            min="1"
            max="24"
            class="form__textfield"
            :disabled="
              (field.group === Group.Overhours &&
                !(
                  checked === Overhours.fifty || checked === Overhours.hundert
                )) ||
              (field.group === Group.Presence &&
                checked !== Presence.notfullday)
            "
          />
        </label>
      </fieldset>
    </div>
    <base-button>{{ messages.saveText }}</base-button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { presence, vacation, overhours } from "@/config/dayInfoFields";
import { Group, Overhours, Presence, userDay } from "@/types/dailyInfo";
import { useUserDaysStore } from "@/store/userDays";
import { useLangStore } from "@/store/lang";

const userDaysStore = useUserDaysStore();
const langStore = useLangStore();

const messages = computed(() => {
  return langStore.messages.dailyInfo;
});

const emits = defineEmits(["close"]);

const props = defineProps({
  date: {
    type: Object,
    default: () => {
      return { day: 0, month: 0, year: 0 };
    },
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

const checked = ref("");
const previousCheck = ref("");

const fields = ref([
  {
    description: "Obecność",
    group: Group.Presence as Group,
    numberfield: true,
    hours: 0,
    items: presence,
  },
  {
    description: "Nadgodziny",
    group: Group.Overhours as Group,
    numberfield: true,
    hours: 0,
    items: overhours,
  },
  {
    description: "Urlopy",
    group: Group.Vacation as Group,
    numberfield: false,
    hours: 0,
    items: vacation,
  },
]);

const changeDayInfo = () => {
  const checkedDay = userDaysStore.dailyInfo.filter((el) => {
    return el.day === props.date.day.value;
  });
  checked.value = checkedDay[0].value;
  const group = fields.value.find((el) => el.group === checkedDay[0].group);
  if (group)
    fields.value[fields.value.indexOf(group)].hours = checkedDay[0].hours;
};

const setDailyInfo = () => {
  const fieldsFiltered = fields.value.filter((el) => {
    for (const item of el.items) {
      if (item.value === checked.value) {
        emits("close");
        return true;
      }
    }
  });

  const dailyData = {
    year: props.date.year.value,
    month: props.date.month.value,
    day: props.date.day.value,
    group: fieldsFiltered[0].group,
    value: checked.value,
    hours: fieldsFiltered[0].hours,
  } as userDay;
  userDaysStore.addInfo(dailyData);
};

const uncheck = (val: string) => {
  previousCheck.value = checked.value;
  if (val === previousCheck.value) {
    checked.value = "";
  }
};

onMounted(() => {
  if (props.edit) changeDayInfo();
});
</script>

<style lang="scss">
.form {
  width: 100%;
  max-height: 100%;
  &__info {
    display: flex;
    flex-direction: column;
    background-color: #00000020;
    border: none;
    width: 100%;
    border-radius: 12px;
    padding: 1rem;
  }
  &__desc {
    color: $text-color;
    background-color: #d2001a80;
    box-shadow: 0 5px 10px $main-color;
    border-radius: 12px;
    padding: 3px;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
    transform: translateY(50%);
  }
  &__field {
    padding: 0.1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    // justify-content: ;
  }
  &__fields {
    max-height: 100%;
    overflow-y: auto;
    border-radius: 12px;
  }
  &__textfield {
    background-color: #ffde0080;
    padding: 5px;
    font-size: medium;
    width: 100%;
    text-align: center;
    border: 2px solid #121212;
    border-radius: 12px;
  }
  &__radio {
    appearance: none;
    background-color: transparent;
    margin-right: 5px;
    cursor: pointer;

    font: inherit;
    width: 1rem;
    height: 1rem;
    border: 2px solid #121212;
    transition: all 0.3s ease;

    &:checked {
      // color: blue;
      background-color: #d2001a80;
      outline: max(1px, 0.15em) solid currentColor;
      // outline-offset: max(2px, 0.15em);
    }
  }
}
</style>
