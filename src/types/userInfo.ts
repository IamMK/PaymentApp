export enum SalaryType {
  HOURLY = "hourly",
  MONTHLY = "monthly",
}

export enum Currency {
  PLN = "PLN",
  EUR = "€",
  DOL = "$",
}

export type userInfo = {
  nickname: string;
  salaryType: SalaryType;
  salaryAmount: number;
  currency: Currency;
};
