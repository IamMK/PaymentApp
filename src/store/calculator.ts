import { appConfig } from "@/config/appconfig";
import { Presence } from "@/types/dailyInfo";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserInfo } from "./userInfo";
import { holidays } from "@/config/dayInfoFields";

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    baseBrutto: 0,
  }),
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
      holidaysAtMonth[0].days.forEach((el) => {
        if (![0, 6].includes(new Date(year, month - 1, el.day).getDay()))
          holidaysAtWorkWeek++;
      });

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
      const daysAtWork = daysToCalc.filter((item: { value: Presence }) => {
        if (item && item.value === Presence.atwork) {
          return true;
        }
        return false;
      });
      return daysAtWork.length;
    },
    async getBaseBrutto(year: number, month: number) {
      const daysAtWork = await this.getDaysAtWork(year, month);
      console.log(this.getDaysToWork(year, month));

      const dailyPayment =
        (useUserInfo().userInfo.salaryAmount.value as number) /
        this.getDaysToWork(year, month);

      this.baseBrutto = Number((daysAtWork * dailyPayment).toFixed(2));
    },
  },
});
