import { ItemVisibility } from "@/types/menuTypes";
import { useLangStore } from "@/store/lang";
import { defineStore } from "pinia";

// const messages = useLangStore().messages.menu;

export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      menuItems: [
        {
          name: useLangStore().messages.menu.home,
          icon: "fa-solid fa-house",
          href: "home",
          visible: ItemVisibility.always,
        },
        {
          name: useLangStore().messages.menu.profile,
          icon: "fa-solid fa-user",
          href: "profile",
          visible: ItemVisibility.auth,
        },
        {
          name: "Bilans",
          icon: "fa-solid fa-money-bill",
          href: "costsbalance",
          visible: ItemVisibility.auth,
        },
        {
          name: useLangStore().messages.menu.calendar,
          icon: "fa-regular fa-calendar-days",
          href: "calendar",
          visible: ItemVisibility.auth,
        },
        {
          name: useLangStore().messages.menu.calc,
          icon: "fa-solid fa-sack-dollar",
          href: "calculator",
          visible: ItemVisibility.auth,
        },
        {
          name: useLangStore().messages.menu.logout,
          icon: "fa-solid fa-right-from-bracket",
          href: "logout",
          visible: ItemVisibility.auth,
        },
        {
          name: useLangStore().messages.menu.auth,
          icon: "fa-solid fa-user",
          href: "auth",
          visible: ItemVisibility.unauth,
        },
      ],
    };
  },
});
