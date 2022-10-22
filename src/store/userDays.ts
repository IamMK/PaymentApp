import { defineStore } from "pinia";
import { userDay } from "@/types/dailyInfo";

export const useUserDaysStore = defineStore("userDays", {
  state: () => ({
    dailyInfo: [] as userDay[],
  }),
  actions: {
    addInfo(data: userDay) {
      this.dailyInfo.push(data);
    },
  },
});
