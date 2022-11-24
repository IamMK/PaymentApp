export enum SalaryType {
  HOURLY = "hourly",
  MONTHLY = "monthly",
}

export enum Currency {
  PLN = "PLN",
  EUR = "€",
  USD = "$",
}

export type userInfo = {
  nickname: string;
  salaryType: SalaryType;
  salaryAmount: number;
  currency: Currency;
};
