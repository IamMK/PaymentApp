// jakoś trza zrobić żeby automatycznie brało i tłumaczyło salaryType...
export enum Currency {
  PLN = "PLN",
  EUR = "€",
  USD = "$",
}

export enum SalaryType {
  HOURLY = "HOURLY",
  MONTHLY = "MONTHLY",
}

export enum IsSameCity {
  YES = "YES",
  NO = "NO",
}

export enum ProfileField {
  NICKNAME = "nickname",
  SALARYTYPE = "salaryType",
  SALARYAMOUNT = "salaryAmount",
  CURRENCY = "currency",
  BIRTHDATE = "birthdate",
  ISSAMECITY = "issamecity",
}

export type userInfo = {
  [x in ProfileField]: {
    name: string;
    value: SalaryType | Currency | number | string | Date | null;
    type: string;
    allowed?: string[];
  };
};
