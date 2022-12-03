import { defineStore } from "pinia";
import { userInfo, ProfileField, SalaryType, Currency } from "@/types/userInfo";
// import { useLangStore } from "./lang";
// import { appConfig } from "@/config/appconfig";
// import { useAuthStore } from "./auth";

export const useUserInfo = defineStore("userinfo", {
  state: () => ({
    userInfo: {
      [ProfileField.NICKNAME]: {
        name: "Nickname",
        value: "Malk",
        type: "string",
      },
      [ProfileField.SALARYTYPE]: {
        name: "Typ wynagrodzenia",
        value: null,
        type: "select",
        allowed: Object.values(SalaryType),
      },
      [ProfileField.SALARYAMOUNT]: {
        name: "Wysokość wynagrodzenia",
        value: null,
        type: "number",
      },
      [ProfileField.CURRENCY]: {
        name: "Waluta",
        value: null,
        type: "select",
        allowed: Object.keys(Currency),
      },
    } as userInfo,
  }),
  getters: {
    getEmpty(state: { userInfo: userInfo }) {
      const emptyProperties = Object.fromEntries(
        Object.entries(state.userInfo).filter(
          ([, field]) => field.value === null
        )
      );

      return emptyProperties;
    },
    isProfileFinished(state) {
      const emptyKeys = Object.keys(state.userInfo).filter((key) => {
        if (state.userInfo[key as ProfileField].value === null) {
          return true;
        }
      });

      if (emptyKeys.length > 0) return false;
      return true;
    },

    // translateAllowed() {
    //   const emptyKeys =
    // },
  },
  // actions: {
  //   async sendUserData() {
  //     return "ToDo";
  //     const userId = useAuthStore().userId;
  //     const response = await fetch(
  //       `${appConfig.database}/profiles/${userId}.json`,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (!response.ok) {
  //       const error = new Error("Failed to fetch Request");
  //       throw error;
  //     }
  //   },
  //   setUserData() {
  //     return "ToDo";
  //   },
  // },
});
