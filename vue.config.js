const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/scss/main.scss";`,
      },
    },
  },
  pwa: {
    name: "PaymentApp",
    themeColor: "#FFFAE7",
    manifestOptions: {
      background_color: "#D2001A",
      relatedApplications: [
        {
          platform: "webapp",
          url: "https://paymentapp-e4f92.web.app/manifest.json",
        },
      ],
      start_url: "/auth",
    },
  },
});
