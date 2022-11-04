import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";

import "@fortawesome/fontawesome-free/css/all.css";

import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";

createApp(App)
  .component("base-dialog", BaseDialog)
  .component("base-button", BaseButton)
  .component("base-spinner", BaseSpinner)
  .component("base-container", BaseContainer)
  .use(createPinia())
  .use(router)
  .mount("#app");
