import { defineStore } from "pinia";
import { userDay } from "@/types/dailyInfo";
import { appConfig } from "@/config/appconfig";

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
        // throw new Error(response.statusText);
      }

      this.dailyInfo.push(data);
    },
  },
});
