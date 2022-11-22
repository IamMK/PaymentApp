import { lang } from "@/types/lang";

// Have to translate

export default {
  dailyData: {
    daySummaryText: "Wykaz dnia",
    dayActivityText: "Dzienna aktywność",
    hoursAtWorkText: "Ilość przepracowanych godzin",
    overhoursText: "Ilość godzin nadliczbowych",
    bruttoText: "Brutto za dzień",
    changeText: "Zmień",
    deleteText: "Usuń",
  },
  dailyInfo: {
    hoursCountText: "Ilość godzin",
  },
  dayInfoFields: {
    atWorkText: "8 godzin",
    notFullDayText: "Inna ilość godzin",
    fiftyText: "Nadgodziny 50%",
    hundertText: "Nadgodziny 100%",
    vacationText: "Urlop wypoczynkowy",
    requestText: "Urlop na żądanie",
    nonPaidText: "Urlop bezpłatny",
    l4Text: "Zwolnienie lekarskie",
    l4FullPaidText: "Zwolnienie lekarskie płatne 100%",
    occassional: "Urlop okazjonalny",
    babycare: "Opieka na dziecko",
    training: "Urlop szkoleniowy",
  },
  holidays: {
    newYear: "Nowy Rok",
    epiphany: "Święto Trzech Króli",
    labourDay: "Święto Pracy",
    constitution: "Święto Konstytucji",
    army: "Święto Wojska Polskiego",
    saintsDay: "Wszystkich Świętych",
    indepence: "Święto Niepodległości",
    firstChrismas: "Pierwszy Dzień Świąt Bożego Narodzenia",
    secondChristmas: "Drugi Dzień Świąt Bożego Narodzenia",
  },
  menu: {
    home: "Home",
    profile: "Profil",
    calendar: "Kalendarz",
    calc: "Kalkulator",
    logout: "Wyloguj",
    auth: "Autoryzacja",
  },
  authView: {
    signin: "Zaloguj",
    signup: "Zarejestruj",
    buttonLogin: "Logowanie",
    buttonSignUp: "Rejestracja",
    email: "E-mail",
    password: "Hasło",
    wrongData: "Wprowadź prawidłowe dane logowania",
    registerOk:
      "Możesz zalogować się używając danych podanych przy rejestracji",
    emailOk: "Email prawidłowy",
    digits8: "Hasło zawiera minimum 8 znaków",
    capital: "Hasło zawiera minumum jedną wielką literę",
    lowercase: "Hasło zawiera minimum jedną małą literę",
    numbers: "Hasło zawiera minimum jedną cyfrę",
    specialDigit: "Hasło zawiera minumum jeden znak specjalny",
    errorTitle: "Błąd Autoryzacji",
    login: "Logowanie",
    register: "Rejestracja",
  },
  calendarView: {
    year: "Rok",
    month: "Miesiąc",
    dailyInfoTitle: "Dzienna Informacja",
    weekDays: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"],
  },
  mainView: {
    payment: "PaymentApp",
    hello: "Witaj",
    introduce: "Pozwól, że się przedstawię",
    desc1:
      "Jestem PaymentApp, twój prywatny kalendarz, który pozwoli Ci pamiętać o każdym dniu, który przepracowałeś.W przyszłości zamierzam również powiedzieć Ci ile zarobiłeś, zanim jeszcze otrzymasz pieniędze na konto.",
    desc2: "Jeśli chcesz mieć mnie zawsze pod ręką, pobierz darmową aplikację.",
    download: "Pobierz",
    login: "Zaloguj się",
  },
} as lang;
