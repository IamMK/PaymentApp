const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/config/variables.scss";`,
      },
    },
  },
  pwa: {
    name: "PaymentApp",
    themeColor: "#FFFAE7"
  }
});
