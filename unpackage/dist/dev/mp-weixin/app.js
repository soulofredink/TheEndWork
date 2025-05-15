"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/SignIn/SignIn.js";
  "./pages/MyInfo/MyInfo.js";
  "./pages/forgetPassword/forgetPassword.js";
  "./pages/SignUp/SignUp.js";
  "./pages/ProfileSet/ProfileSet.js";
  "./pages/communication/communication.js";
  "./pages/communicateDetails/communicateDetails.js";
  "./pages/sell/sell.js";
  "./pages/goodDetails/goodDetails.js";
  "./pages/BoughtGoods/BoughtGoods.js";
  "./pages/PublishedGoods/PublishedGoods.js";
  "./pages/SoldGoods/SoldGoods.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:23", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:26", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
