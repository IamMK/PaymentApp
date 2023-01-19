import { useCalculatorStore } from "@/store/calculator";

export const insurance = (salary: number, tax: number) => {
  const insurance = salary * (tax / 100);
  return Number(insurance.toFixed(2));
};

export const nightAllowance = (year: number, month: number) => {
  return Number(
    (
      useCalculatorStore().monthlyNightAllowance /
      useCalculatorStore().getDaysToWork(year, month) /
      8
    ).toFixed(2)
  );
};
