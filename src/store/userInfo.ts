import { defineStore } from "pinia";
import { userInfo, SalaryType, Currency } from "@/types/userInfo";

export const useUserInfo = defineStore("userinfo", {
  state: (): userInfo => ({
    nickname: "",
    salaryType: SalaryType.HOURLY,
    salaryAmount: 4100,
    currency: Currency.PLN,
  }),
  getters: {
    isProfileFinished() {
      if (
        this.nickname === "" ||
        this.salaryAmount === 0 ||
        (this.salaryType !== SalaryType.HOURLY &&
          this.salaryType !== SalaryType.MONTHLY)
      )
        return false;
      return true;
    },
  },
});
