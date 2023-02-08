import { appConfig } from "@/config/appconfig";
import { Overhours, Presence } from "@/types/dailyInfo";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserInfo } from "./userInfo";
import { holidays } from "@/config/dayInfoFields";
import {
  insurance,
  isIncomeTax,
  nightAllowance,
  overhoursPayment,
} from "@/utils/calculator";
import { IsSameCity } from "@/types/userInfo";

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    baseBrutto: 0,
    nightAllowance: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    minimumWages: null,
    minimumWage: null as number | null,
    overhoursWage: {
      fifty: 0,
      hundert: 0,
    },
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
      let costOfRevenue = 0;
      if (useUserInfo().userInfo.issamecity.value === IsSameCity.YES)
        costOfRevenue = 250;
      else costOfRevenue = 300;
      const taxBase: number =
        this.brutto -
        costOfRevenue -
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

      // Odczyt daty do poprawy
      return nettoPayment.toFixed(2);
    },
    monthlyNightAllowance(state) {
      // MONTHLY
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
    async getHoursAtWork(
      year: number,
      month: number,
      presenceType: Presence | Overhours
    ) {
      const daysToCalc = await this.getDaysFromMonth(year, month);
      let hoursToReturn = 0;
      if (daysToCalc) {
        daysToCalc.forEach(
          (el: { value: Presence | Overhours; hours: number }) => {
            if (el && el.value === presenceType) {
              let hoursToAdd = 0;
              if (el.value === Presence.hundertday) hoursToAdd = 8;
              else hoursToAdd = el.hours;
              hoursToReturn = hoursToReturn + hoursToAdd;
            }
          }
        );
      }
      return hoursToReturn;
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
    async getOverhoursPayment(hoursAtWork: number) {
      this.overhoursWage.fifty = overhoursPayment(
        this.baseBrutto,
        hoursAtWork,
        await this.getHoursAtWork(this.year, this.month, Overhours.fifty), // do zmiany żeby liczylo liczbę godzin a nie dni
        Overhours.fifty
      );

      this.overhoursWage.hundert =
        overhoursPayment(
          this.baseBrutto,
          hoursAtWork,
          await this.getHoursAtWork(this.year, this.month, Overhours.hundert),
          Overhours.hundert
        ) +
        overhoursPayment(
          this.baseBrutto,
          hoursAtWork,
          await this.getHoursAtWork(this.year, this.month, Presence.hundertday),
          Presence.hundertday
        );
    },
  },
});
