import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      theme: localStorage.getItem("theme") || ("" as string),
      menuActive: false,
    };
  },
});
