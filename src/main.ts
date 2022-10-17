import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";

import "@fortawesome/fontawesome-free/css/all.css";

import BaseDialog from "@/components/UI/BaseDialog.vue";

createApp(App)
  .component("base-dialog", BaseDialog)
  .use(createPinia())
  .use(router)
  .mount("#app");
