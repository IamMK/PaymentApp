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
  },
});
