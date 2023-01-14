import { appConfig } from "@/config/appconfig";
import { Presence } from "@/types/dailyInfo";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserInfo } from "./userInfo";
import { holidays } from "@/config/dayInfoFields";
import { insurance } from "@/utils/calculator";

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    baseBrutto: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }),
  getters: {
    pensionInsurance(state) {
      return insurance(state.baseBrutto, 9.76);
    },
    disabilityInsurance(state) {
      return insurance(state.baseBrutto, 1.5);
    },
    sickInsurance(state) {
      return insurance(state.baseBrutto, 2.45);
    },
    healthInsurance(state) {
      const taxBase: number =
        state.baseBrutto -
        useCalculatorStore().pensionInsurance -
        useCalculatorStore().disabilityInsurance -
        useCalculatorStore().sickInsurance;
      return insurance(taxBase, 9);
    },
    nettoPayment(state) {
      const nettoPayment: number =
        state.baseBrutto -
        useCalculatorStore().pensionInsurance -
        useCalculatorStore().disabilityInsurance -
        useCalculatorStore().sickInsurance -
        useCalculatorStore().healthInsurance;
      return nettoPayment.toFixed(2);
    },
  },
  actions: {
    getDaysToWork(year: number, month: number) {
      let weekDays = 0;
      const monthEnd = new Date(year, month, 0).getDate();
      for (let i = 1; i <= monthEnd; i++) {
        if ([0, 6].includes(new Date(year, month - 1, i).getDay())) {
          weekDays++;
        }
      }
      let holidaysAtWorkWeek = 0;
      const holidaysAtMonth = holidays.filter((el) => {
        if (el.month === month) return true;
        return false;
      });
      if (holidaysAtMonth[0]) {
        holidaysAtMonth[0].days.forEach((el) => {
          if (![0, 6].includes(new Date(year, month - 1, el.day).getDay()))
            holidaysAtWorkWeek++;
        });
      }

      const workDays = monthEnd - weekDays - holidaysAtWorkWeek;
      return workDays;
    },
    async getDaysFromMonth(year: number, month: number) {
      const response = await fetch(
        `${appConfig.database}/days/${
          useAuthStore().userId
        }/${year}/${month}.json`
      );
      if (!response.ok) {
        const error = new Error("Failed to set Profile");
        throw error;
      }
      const daysToCalc = await response.json();
      return daysToCalc;
    },
    async getDaysAtWork(year: number, month: number) {
      const daysToCalc = await this.getDaysFromMonth(year, month);
      if (daysToCalc) {
        const daysAtWork = daysToCalc.filter((item: { value: Presence }) => {
          if (item && item.value === Presence.atwork) {
            return true;
          }
          return false;
        });
        return daysAtWork.length;
      }
      return 0;
    },
    async getBaseBrutto(year: number, month: number) {
      const daysAtWork = await this.getDaysAtWork(year, month);

      const dailyPayment =
        (useUserInfo().userInfo.salaryAmount.value as number) /
        this.getDaysToWork(year, month);

      this.baseBrutto = Number((daysAtWork * dailyPayment).toFixed(2));
    },
  },
});
