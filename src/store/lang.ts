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
