import { defineStore } from "pinia";
import { holidays } from "@/config/dayInfoFields";

export const useCalendarStore = defineStore("calendar", {
  state: () => {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      holidays,
    };
  },
  getters: {
    daysCount: (state) => {
      return new Date(state.year, state.month, 0).getDate();
    },
    daysAtWork(state) {
      let weekDays = 0;
      const monthEnd = new Date(state.year, state.month, 0).getDate();
      for (let i = 1; i <= monthEnd; i++) {
        if (
          [0, 6].includes(new Date(state.year, state.month - 1, i).getDay())
        ) {
          weekDays++;
        }
      }

      const workDays = monthEnd - weekDays;
      return workDays;
    },
    holidaysAtMonth(state) {
      const filtered = state.holidays.filter((el) => {
        return el.month === state.month;
      });
      const days = [];
      if (filtered.length > 0) {
        for (const day of filtered[0].days) {
          days.push(day.day);
        }
      }
      return days;
    },
    monthStartDay: (state) => {
      const day = new Date(state.year, state.month - 1, 1).getDay();
      return day === 0 ? 7 : day;
    },
    monthEndDay: (state) => {
      const day = new Date(state.year, state.month, 0).getDay();
      return day === 0 ? 7 : day;
    },
  },
});
