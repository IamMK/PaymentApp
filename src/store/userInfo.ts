import { defineStore } from "pinia";
import {
  userInfo,
  Property,
  SalaryType,
  Currency,
  profile,
} from "@/types/userInfo";
import { useLangStore } from "./lang";

export const useUserInfo = defineStore("userinfo", {
  state: () => ({
    userInfo: [
      {
        property: Property.NICKNAME,
        name: "Nickname",
        value: null,
        type: "string",
      },
      {
        property: Property.SALARYTYPE,
        name: "Typ wynagrodzenia",
        value: null,
        type: "select",
        allowed: Object.keys(SalaryType),
      },
      {
        property: Property.SALARYAMOUNT,
        name: "Wysokość wynagrodzenia",
        value: null,
        type: "number",
      },
      {
        property: Property.CURRENCY,
        name: "Waluta",
        value: null,
        type: "select",
        allowed: Object.keys(Currency),
      },
    ] as userInfo[],
  }),
  getters: {
    getEmpty(state) {
      const emptyItems = state.userInfo.filter((item) => {
        if (item.value === null) {
          item.allowed = this.translateAllowed;
          return true;
        }
      });
      return emptyItems;
    },
    getProfile(state): profile {
      let profile: profile = {
        nickname: null,
        salaryType: null,
        salaryAmount: null,
        currency: null,
      };
      for (const item of state.userInfo) {
        // profile[item.property] = item.value;
        profile = { ...profile, [item.property]: item.value };
      }
      return profile;
    },
    isProfileFinished() {
      if (this.getEmpty.length > 0) return false;
      return true;
    },

    translateAllowed(state) {
      const transtlations = [];
      const salaryTypes = useLangStore().messages.profileSet.salaryTypes;
      // const currencyTypes = useLangStore().messages.profileSet.currency;

      for (const item of state.userInfo) {
        if (item.allowed && item.property === Property.SALARYTYPE) {
          for (const type of item.allowed) {
            const typeName = salaryTypes.filter((stype) => {
              return stype.name === type.toLowerCase();
            });
            if (typeName[0]) {
              transtlations.push(typeName[0].value);
            }
          }
        }
      }

      return transtlations;
    },
  },
});
