export type lang = {
  dailyData: {
    daySummaryText: string;
    dayActivityText: string;
    hoursAtWorkText: string;
    overhoursText: string;
    bruttoText: string;
    changeText: string;
    deleteText: string;
    functions: string;
  };
  dailyInfo: {
    hoursCountText: string;
    saveText: string;
  };
  dayInfoFields: {
    atWorkText: string;
    notFullDayText: string;
    fiftyText: string;
    hundertText: string;
    vacationText: string;
    requestText: string;
    nonPaidText: string;
    l4Text: string;
    l4FullPaidText: string;
    occassional: string;
    babycare: string;
    training: string;
  };
  holidays: {
    newYear: string;
    epiphany: string;
    labourDay: string;
    constitution: string;
    army: string;
    saintsDay: string;
    indepence: string;
    firstChrismas: string;
    secondChristmas: string;
  };
  menu: {
    home: string;
    profile: string;
    calendar: string;
    calc: string;
    logout: string;
    auth: string;
  };
  authView: {
    signin: string;
    signup: string;
    buttonLogin: string;
    buttonSignUp: string;
    email: string;
    password: string;
    wrongData: string;
    registerOk: string;
    emailOk: string;
    digits8: string;
    capital: string;
    lowercase: string;
    numbers: string;
    specialDigit: string;
    errorTitle: string;
    login: string;
    register: string;
  };
  calendarView: {
    year: string;
    month: string;
    dailyInfoTitle: string;
    weekDays: string[];
  };
  mainView: {
    payment: string;
    hello: string;
    introduce: string;
    desc1: string;
    desc2: string;
    download: string;
    login: string;
  };
  profileSet: {
    nickname: string;
    salaryType: string;
    salaryAmount: string;
    currency: string;
    salaryTypes: { name: string; value: string }[];
  };
};
