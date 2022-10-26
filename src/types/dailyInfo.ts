export enum Presence {
  atwork = "atwork",
  notfullday = "notfullday",
}

export enum Overhours {
  fifty = "fiftyovertime",
  hundert = "hundertovertime",
}

export enum Vacation {
  vacation = "vacation",
  request = "request",
  nonpaid = "nonpaid",
  l4 = "l4",
  l4fullpaid = "l4fullpaid",
  occassional = "occassional",
  babycare = "babycare",
  training = "training",
}

export enum Group {
  Presence = "presence",
  Overhours = "overhours",
  Vacation = "vacation",
}

export type dayField = {
  value: Presence | Overhours | Vacation;
  description: string;
};

export type userDay = {
  year?: number;
  month?: number;
  day: number;
  group: Group;
  value: Presence | Overhours | Vacation;
  hours: number;
};
