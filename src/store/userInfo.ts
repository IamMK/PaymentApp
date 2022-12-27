import { defineStore } from "pinia";
import { userInfo, ProfileField, SalaryType, Currency } from "@/types/userInfo";
import { useAuthStore } from "./auth";
import { appConfig } from "@/config/appconfig";

export const useUserInfo = defineStore("userinfo", {
  state: () => ({
    userInfo: {
      [ProfileField.NICKNAME]: {
        name: "Nickname",
        value: null,
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

      // emptyProperties.salaryType.value

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
  },
  actions: {
    async sendUserData(data: { [x: string]: string | number | null }) {
      const userId = useAuthStore().userId;
      const dataForSend = {
        nickname: data.nickname || this.userInfo.nickname.value,
        salaryType: data.salaryType || this.userInfo.salaryType.value,
        salaryAmount: data.salaryAmount || this.userInfo.salaryAmount.value,
        currency: data.currency || this.userInfo.currency.value,
      };
      const response = await fetch(
        `${appConfig.database}/profiles/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(dataForSend),
        }
      );

      if (!response.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }

      this.setUserData(data);
    },
    async setUserData(userData?: { [x: string]: string | number | null }) {
      if (!userData) {
        const response = await fetch(
          `${appConfig.database}/profiles/${useAuthStore().userId}.json`
        );
        if (!response.ok) {
          const error = new Error("Failed to set Profile");
          throw error;
        }
        userData = await response.json();
      }

      if (userData) {
        this.userInfo[ProfileField.NICKNAME].value =
          userData.nickname || this.userInfo[ProfileField.NICKNAME].value;
        this.userInfo[ProfileField.CURRENCY].value =
          userData.currency || this.userInfo[ProfileField.CURRENCY].value;
        this.userInfo[ProfileField.SALARYAMOUNT].value =
          userData.salaryAmount ||
          this.userInfo[ProfileField.SALARYAMOUNT].value;
        this.userInfo[ProfileField.SALARYTYPE].value =
          userData.salaryType || this.userInfo[ProfileField.SALARYTYPE].value;
      }
    },
  },
});
