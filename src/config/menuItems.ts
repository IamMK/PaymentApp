import { ItemVisibility } from "@/types/menuTypes";

export const menuItems = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    tooltip: "Home",
    href: "home",
    visible: ItemVisibility.always,
  },
  {
    name: "Profil",
    icon: "fa-solid fa-user",
    tooltip: "Profil",
    href: "profile",
    visible: ItemVisibility.auth,
  },
  {
    name: "Kalendarz",
    icon: "fa-regular fa-calendar-days",
    tooltip: "Kalendarz",
    href: "calendar",
    visible: ItemVisibility.auth,
  },
  {
    name: "Kalkulator",
    icon: "fa-solid fa-sack-dollar",
    tooltip: "Kalkulator",
    href: "home",
    visible: ItemVisibility.auth,
  },
  {
    name: "Wyloguj",
    icon: "fa-solid fa-right-from-bracket",
    tooltip: "Wyloguj",
    href: "logout",
    visible: ItemVisibility.auth,
  },
  {
    name: "Autoryzacja",
    icon: "fa-solid fa-user",
    tooltip: "Autoryzacja",
    href: "auth",
    visible: ItemVisibility.unauth,
  },
];
