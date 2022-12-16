import { ItemVisibility } from "@/types/menuTypes";
import { useLangStore } from "@/store/lang";

// const messages = useLangStore().messages.menu;

export const menuItems = [
  {
    name: useLangStore().messages.menu.home,
    icon: "fa-solid fa-house",
    href: "home",
    visible: ItemVisibility.always,
  },
  // {
  //   name: messages.profile,
  //   icon: "fa-solid fa-user",
  //   href: "profile",
  //   visible: ItemVisibility.auth,
  // },
  // {
  //   name: messages.calendar,
  //   icon: "fa-regular fa-calendar-days",
  //   href: "calendar",
  //   visible: ItemVisibility.auth,
  // },
  // {
  //   name: messages.calc,
  //   icon: "fa-solid fa-sack-dollar",
  //   href: "home",
  //   visible: ItemVisibility.auth,
  // },
  // {
  //   name: messages.logout,
  //   icon: "fa-solid fa-right-from-bracket",
  //   href: "logout",
  //   visible: ItemVisibility.auth,
  // },
  // {
  //   name: messages.auth,
  //   icon: "fa-solid fa-user",
  //   href: "auth",
  //   visible: ItemVisibility.unauth,
  // },
];
