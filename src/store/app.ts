import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      theme: localStorage.getItem("theme") || ("" as string),
      isMenuActive: false,
    };
  },
  actions: {
    toogleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
});
