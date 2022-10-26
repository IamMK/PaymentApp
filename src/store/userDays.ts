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

      this.dailyInfo.push(data);
    },
    async fetchDailyData() {
      const response = await fetch(
        `${appConfig.database}/days/${useCalendarStore().year}/${
          useCalendarStore().month
        }.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }
      console.log(responseData);

      this.dailyInfo.push(responseData);
    },
  },
});
