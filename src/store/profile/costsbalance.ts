import { COSTSTYPE, costsArray } from "@/types/costs";
import { defineStore } from "pinia";

export const useCostsStore = defineStore("costsbalance", {
  state: () => ({
    costsArray: [
      {
        name: "MultiSport",
        type: COSTSTYPE.MONTHLY,
        cost: 30,
      },
    ] as costsArray[],
  }),
});
