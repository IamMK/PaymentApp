export enum SalaryType {
  HOURLY = "hourly",
  MONTHLY = "monthly",
}

export enum Currency {
  PLN = "PLN",
  EUR = "€",
  USD = "$",
}

export enum Property {
  NICKNAME = "nickname",
  SALARYTYPE = "salaryType",
  SALARYAMOUNT = "salaryAmount",
  CURRENCY = "currency",
}

export type userInfo = {
  property: Property;
  name: string;
  value: SalaryType | Currency | number | string | null;
  type: string;
  allowed?: string[];
};

export type profile = {
  nickname: "string" | null;
  salaryType: SalaryType | null;
  salaryAmount: number | null;
  currency: Currency | null;
};
