interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

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
        APP.deferredInstall = null;
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
  // async checkInstallation() {
  //   // if ("getInstalledRelatedApps" in navigator) {
  //   //   if (navigator.getInstalledRelatedApps()) {
  //   //     return true;
  //   //   }
  //   //   return false;
  //   // },
  //   // if ("getInstalledRelatedApps" in navigator) {
  //   //   const relatedApps = await navigator["getInstalledRelatedApps"];
  //   //   relatedApps.forEach((app: { id: any; platform: any; url: any; }) => {
  //   //     console.log(app.id, app.platform, app.url);
  //   //   });
  //   // }
  //   console.log(navigator);
  // },
};
document.addEventListener("DOMContentLoaded", APP.init);
