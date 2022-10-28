import { defineStore } from "pinia";
import { userInfo, SalaryType } from "@/types/userInfo";

export const useUserInfo = defineStore("userinfo", {
  state: (): userInfo => ({
    nickname: "Malk",
    salaryType: SalaryType.MONTHLY,
    salaryAmount: 4100,
  }),
});
