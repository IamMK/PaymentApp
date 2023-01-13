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
    themeColor: "#ECF0F1",
    manifestOptions: {
      background_color: "#ECF0F1",
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
