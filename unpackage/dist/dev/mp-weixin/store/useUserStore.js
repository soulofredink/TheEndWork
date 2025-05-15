"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    currentUser: null,
    //创建一个对象实例
    defaultImg: "/static/OIP-C.jpg",
    //用户状态元数据
    meta: {
      isLoggedin: false,
      tokenExpiresAt: 0
      //token过期时间戳
    }
  }),
  getters: {
    isLogin(state) {
      return state.meta.isLoggedin;
    }
  },
  actions: {
    async Login(card) {
      const res = await common_vendor.index.request({
        url: config.ServerURL + "/signin",
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(card),
        sslVerify: false
      });
      common_vendor.index.__f__("log", "at store/useUserStore.ts:32", res);
      const resVal = res.data;
      if (resVal.code == 200) {
        common_vendor.index.__f__("log", "at store/useUserStore.ts:35", "0k");
        this.meta.isLoggedin = true;
        this.currentUser = resVal.data;
        return true;
      }
      return false;
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/useUserStore.js.map
