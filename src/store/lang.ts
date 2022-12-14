import { defineStore } from "pinia";
import { messages } from "@/config/lang";
import { appConfig } from "@/config/appconfig";
import { lang } from "@/types/lang";

export const useLangStore = defineStore("lang", {
  state: () => {
    return {
      lang: appConfig.lang,
      messages: {} as lang,
    };
  },
  getters: {
    getLangName(state) {
      let langName = "";
      switch (state.lang) {
        case "pl":
          langName = "Polski";
          break;
        case "en":
          langName = "Angielski";
          break;
      }
      return langName;
    },
  },
  actions: {
    changeLang() {
      switch (this.lang) {
        case "pl":
          this.messages = messages.pl;
          break;
        case "en":
          this.messages = messages.en;
          break;
        default:
          this.messages = messages.pl;
          break;
      }
    },
  },
});
