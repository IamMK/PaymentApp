export enum SalaryType {
  HOURLY = "hourly",
  MONTHLY = "monthly",
}

export type userInfo = {
  nickname: string;
  salaryType: SalaryType;
  salaryAmount: number;
};
