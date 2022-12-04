export enum SalaryType {
  HOURLY = "Godzinowe",
  MONTHLY = "Miesięczne",
}

export enum Currency {
  PLN = "PLN",
  EUR = "€",
  USD = "$",
}

export enum ProfileField {
  NICKNAME = "nickname",
  SALARYTYPE = "salaryType",
  SALARYAMOUNT = "salaryAmount",
  CURRENCY = "currency",
}

export type userInfo = {
  [x in ProfileField]: {
    name: string;
    value: SalaryType | Currency | number | string | null;
    type: string;
    allowed?: string[];
  };
};
