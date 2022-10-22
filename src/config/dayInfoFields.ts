import { dayField, Presence, Overhours, Vacation } from "@/types/dailyInfo";

export const presence = [
  {
    value: Presence.atwork,
    description: "8 godzin",
  },
  {
    value: Presence.notfullday,
    description: "Niepełna ilość godzin",
  },
] as dayField[];

export const overhours = [
  {
    value: Overhours.fifty,
    description: "Nadgodziny 50%",
  },
  {
    value: Overhours.hundert,
    description: "Nadgodziny 100%",
  },
] as dayField[];

export const vacation = [
  {
    value: Vacation.vacation,
    description: "Urlop wypoczynkowy",
  },
  {
    value: Vacation.request,
    description: "Urlop na żądanie",
  },
  {
    value: Vacation.nonpaid,
    description: "Urlop bezpłatny",
  },
  {
    value: Vacation.l4,
    description: "L4",
  },
  { value: Vacation.l4fullpaid, description: "L4 100%" },
  {
    value: Vacation.occassional,
    description: "Urlop okolicznościowy",
  },
  {
    value: Vacation.babycare,
    description: "Opieka na dziecko",
  },
  {
    value: Vacation.training,
    description: "Urlop szkoleniowy",
  },
] as dayField[];
