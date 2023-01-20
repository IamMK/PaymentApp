import { appConfig } from "@/config/appconfig";
import { Presence } from "@/types/dailyInfo";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserInfo } from "./userInfo";
import { holidays } from "@/config/dayInfoFields";
import { insurance, isIncomeTax, nightAllowance } from "@/utils/calculator";

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    // brutto: 0,
    baseBrutto: 0,
    nightAllowance: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    minimumWages: null,
    minimumWage: null as number | null,
  }),
  getters: {
    pensionInsurance() {
      const brutto: number = this.brutto;
      return insurance(brutto, 9.76);
    },
    disabilityInsurance() {
      const brutto: number = this.brutto;
      return insurance(brutto, 1.5);
    },
    sickInsurance() {
      const brutto: number = this.brutto;
      return insurance(brutto, 2.45);
    },
    healthInsurance() {
      const taxBase: number =
        this.brutto -
        useCalculatorStore().pensionInsurance -
        useCalculatorStore().disabilityInsurance -
        useCalculatorStore().sickInsurance;
      return insurance(taxBase, 9);
    },
    incomeTax() {
      const taxBase: number =
        this.brutto -
        300 - //profil - czy pracujesz w miejscu zamieszkania
        this.pensionInsurance -
        this.disabilityInsurance -
        this.sickInsurance;

      const incomeTax = Math.round(Math.round(taxBase) * 0.12 - 300);
      if (incomeTax > 0) return Number(incomeTax.toFixed(2));
      else return 0;
    },
    nettoPayment(state) {
      let nettoPayment: number =
        this.brutto -
        this.pensionInsurance -
        this.disabilityInsurance -
        this.sickInsurance -
        this.healthInsurance;
      if (
        isIncomeTax(
          useUserInfo().userInfo.birthdate.value as string,
          10,
          state.year,
          state.month
        )
      )
        nettoPayment = nettoPayment - this.incomeTax;
      return nettoPayment.toFixed(2);
    },
    monthlyNightAllowance(state) {
      // MNTHLY
      const minimumWage = state.minimumWage || 0;
      return minimumWage * 0.2;
    },
    brutto(state) {
      return Number((state.baseBrutto + state.nightAllowance).toFixed(2));
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
    async getDaysAtWork(year: number, month: number, presenceType: Presence) {
      const daysToCalc = await this.getDaysFromMonth(year, month);
      if (daysToCalc) {
        const daysAtWork = daysToCalc.filter((item: { value: Presence }) => {
          if (item && item.value === presenceType) {
            return true;
          }
          return false;
        });
        return daysAtWork.length;
      }
      return 0;
    },
    getDailyPayment(year: number, month: number) {
      const dailyPayment =
        (useUserInfo().userInfo.salaryAmount.value as number) /
        this.getDaysToWork(year, month);
      return dailyPayment;
    },
    async getBaseBrutto(year: number, month: number) {
      const daysAtWork = await this.getDaysAtWork(year, month, Presence.atwork);

      const dailyPayment = this.getDailyPayment(year, month);
      this.baseBrutto = Number((daysAtWork * dailyPayment).toFixed(2));
    },
    async getNightAllowance(year: number, month: number) {
      const nightShiftDays = await this.getDaysAtWork(
        year,
        month,
        Presence.nightfullday
      );

      if (nightShiftDays > 0) {
        const dailyPayment = this.getDailyPayment(year, month);
        const currentAllowance = nightAllowance(year, month) * nightShiftDays;

        this.nightAllowance = Number(
          (currentAllowance + dailyPayment).toFixed(2)
        );
      } else this.nightAllowance = 0;
    },
    async getMinimumWage(year: number, month: number, day: number) {
      const unixDate = Number(new Date(year, month, day)) / 1000;

      if (!this.minimumWages) {
        const response = await fetch(`${appConfig.database}/minimumwage.json`);
        if (!response.ok) {
          const error = new Error("Failed to get MinimumWage");
          throw error;
        }

        this.minimumWages = await response.json();
      }

      const minimumwage = Object.entries(this.minimumWages || {}).filter(
        ([key]) => {
          return Number(key) <= unixDate;
        }
      );

      this.minimumWage = Number(minimumwage[minimumwage.length - 1][1]);
    },
  },
});
