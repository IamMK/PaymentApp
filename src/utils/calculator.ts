export const insurance = (salary: number, tax: number) => {
  const insurance = salary * (tax / 100);
  return Number(insurance.toFixed(2));
};
