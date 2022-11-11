import { useRouter } from "vue-router";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const router = useRouter();

export const APP = {
  deferredInstall: null as BeforeInstallPromptEvent | null,
  init(): void {
    if ("serviceWorker" in navigator) {
      //register our service worker
      navigator.serviceWorker
        .register("/sw.js", {
          updateViaCache: "none",
          scope: "/",
        })
        .then(() => {
          //finished registering
        })
        .catch((err) => {
          console.warn("Failed to register", err.message);
        });
      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        console.log(data, "from service worker");
      });

      window.addEventListener("appinstalled", () => {
        router.push({ name: "calendar" });
      });
      window.addEventListener("beforeinstallprompt", (ev) => {
        ev.preventDefault();
        APP.deferredInstall = ev as BeforeInstallPromptEvent;
        console.log("saved the install event");
      });
    }
  },
  startChromeInstall() {
    if (APP.deferredInstall) {
      APP.deferredInstall.prompt();
      APP.deferredInstall.userChoice.then((choice: { outcome: string }) => {
        if (choice.outcome == "accepted") {
          console.log("installed");
        } else {
          console.log("cancel");
        }
      });
    }
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
