export enum COSTSTYPE {
  MONTHLY = "monthly",
  DAILY = "daily",
  WEEKLY = "weekly",
}

export type costsArray = {
  name: string;
  type: COSTSTYPE;
  cost: number;
};
