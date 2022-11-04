import { defineStore } from "pinia";
import { userDay } from "@/types/dailyInfo";
import { appConfig } from "@/config/appconfig";
import { useCalendarStore } from "./calendar";

export const useUserDaysStore = defineStore("userDays", {
  state: () => ({
    dailyInfo: [] as userDay[],
  }),
  actions: {
    async addInfo(data: userDay) {
      const dayData = {
        group: data.group,
        value: data.value,
        hours: data.hours,
      };
      const response = await fetch(
        `${appConfig.database}/days/${data.year}/${data.month}/${data.day}.json`,
        {
          method: "PUT",
          body: JSON.stringify(dayData),
        }
      );

      if (!response.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }

      let dayIndex = null;

      for (const [index, item] of this.dailyInfo.entries()) {
        if (item.day === data.day) {
          dayIndex = index;
        }
      }

      if (dayIndex !== null) {
        this.dailyInfo[dayIndex] = { day: data.day, ...dayData };
      } else {
        this.dailyInfo.push({ day: data.day, ...dayData });
      }
    },
    async fetchMonhlyData() {
      const response = await fetch(
        `${appConfig.database}/days/${useCalendarStore().year}/${
          useCalendarStore().month
        }.json`
      );

      const responseData: userDay[] = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }

      const days = [];

      for (const key in responseData) {
        if (responseData[key] != null) {
          const day: userDay = {
            day: Number(key),
            group: responseData[key].group,
            value: responseData[key].value,
            hours: responseData[key].hours,
          };
          days.push(day);
        }
      }

      this.dailyInfo = days;
    },
    deleteDayInfo(data: { year: number; month: number; day: number }) {
      fetch(
        `${appConfig.database}/days/${data.year}/${data.month}/${data.day}.json`,
        {
          method: "DELETE",
        }
      ).then(() => {
        let dayIndex = null;
        for (const [index, item] of this.dailyInfo.entries()) {
          if (item.day === data.day) dayIndex = index;
        }
        if (dayIndex !== null) this.dailyInfo.splice(dayIndex, 1);
      });
    },
  },
});
