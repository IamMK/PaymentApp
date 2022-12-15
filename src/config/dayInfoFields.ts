import { dayField, Presence, Overhours, Vacation } from "@/types/dailyInfo";

export const presence = [
  {
    value: Presence.atwork,
    description: "8 godzin",
  },
  { value: Presence.hundertday, description: "Dzień 100%" },
  {
    value: Presence.notfullday,
    description: "Inna ilość godzin",
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

export const holidays = [
  {
    month: 1,
    days: [
      {
        day: 1,
        name: "Nowy Rok",
      },
      {
        day: 6,
        name: "Trzech Króli",
      },
    ],
  },
  {
    month: 5,
    days: [
      {
        day: 1,
        name: "Święto Pracy",
      },
      {
        day: 3,
        name: "Święto Konstytucji",
      },
    ],
  },
  {
    month: 8,
    days: [
      {
        day: 15,
        name: "Święto Wojska Polskiego",
      },
    ],
  },
  {
    month: 11,
    days: [
      {
        day: 1,
        name: "Wszystkich Świętych",
      },
      {
        day: 11,
        name: "Święto Niepodległości",
      },
    ],
  },
  {
    month: 12,
    days: [
      {
        day: 25,
        name: "Pierwszy Dzień Świąt Bożego Narodzenia",
      },
      {
        day: 26,
        name: "Drugi Dzień Świąt Bożego Narodzenia",
      },
    ],
  },
];
