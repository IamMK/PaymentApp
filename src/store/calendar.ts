import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", {
  state: () => {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
  },
  getters: {
    monthStartDay: (state) => {
      const day = new Date(state.year, state.month - 1, 1).getDay();
      return day === 0 ? 7 : day;
    },
    monthEndDay: (state) => {
      const day = new Date(state.year, state.month, 0).getDay();
      // console.log(day);
      return day === 0 ? 7 : day;
    },
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
  },
});
