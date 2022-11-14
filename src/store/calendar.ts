import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", {
  state: () => {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      holidays: [
        {
          month: 1,
          days: [
            {
              day: 1,
              name: "Nowy Rok",
            },
            {
              day: 6,
              name: "Trzech Króli",
            },
          ],
        },
        {
          month: 5,
          days: [
            {
              day: 1,
              name: "Święto Pracy",
            },
            {
              day: 3,
              name: "Święto Konstytucji",
            },
          ],
        },
        {
          month: 8,
          days: [
            {
              day: 15,
              name: "Święto Wojska Polskiego",
            },
          ],
        },
        {
          month: 11,
          days: [
            {
              day: 1,
              name: "Wszystkich Świętych",
            },
            {
              day: 11,
              name: "Święto Niepodległości",
            },
          ],
        },
        {
          month: 12,
          days: [
            {},
            {
              day: 25,
              name: "Pierwszy Dzień Świąt Bożego Narodzenia",
            },
            {
              day: 26,
              name: "Drugi Dzień Świąt Bożego Narodzenia",
            },
          ],
        },
      ],
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
  },
});
