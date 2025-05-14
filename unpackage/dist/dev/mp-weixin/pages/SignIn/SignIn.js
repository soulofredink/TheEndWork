"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_hooks_useCheck = require("../hooks/useCheck.js");
const store_useUserStore = require("../../store/useUserStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SignIn",
  setup(__props) {
    pages_hooks_useCheck.useCheck();
    let isPassword = common_vendor.ref(true);
    let isView = common_vendor.ref(false);
    let isRemeber = common_vendor.ref(false);
    function changeRemeber() {
      isRemeber.value = !isRemeber.value;
    }
    common_vendor.watch(isRemeber, (New) => {
      common_vendor.index.__f__("log", "at pages/SignIn/SignIn.vue:66", New);
    });
    let userStore = store_useUserStore.useUserStore();
    function show_hide_password() {
      isPassword.value = !isPassword.value;
      isView.value = !isView.value;
    }
    let username = common_vendor.ref("");
    let password = common_vendor.ref("");
    let passwordIsFocus = common_vendor.ref(false);
    let usernameIsFocus = common_vendor.ref(false);
    function changeOnPasswordFocus() {
      passwordIsFocus.value = true;
    }
    function changeOnPasswordBlur() {
      if (password.value == "") {
        passwordIsFocus.value = false;
      }
    }
    function changeOnUsernameFocus() {
      usernameIsFocus.value = true;
    }
    function changeOnUsernameBulr() {
      if (username.value == "") {
        usernameIsFocus.value = false;
      }
    }
    const submit = async () => {
      try {
        const success = await userStore.Login({
          username: username.value,
          password: password.value
        });
        if (success) {
          if (isRemeber.value) {
            common_vendor.index.setStorageSync("token", true);
            common_vendor.index.setStorageSync("userInfo", userStore.currentUser);
          }
          await common_vendor.nextTick$1();
          common_vendor.index.switchTab({ url: "/pages/MyInfo/MyInfo" });
        }
      } catch (err) {
        common_vendor.index.showToast({ title: "登录失败", icon: "none" });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeOnUsernameFocus),
        b: common_vendor.o(changeOnUsernameBulr),
        c: common_vendor.unref(username),
        d: common_vendor.o(($event) => common_vendor.isRef(username) ? username.value = $event.detail.value : username = $event.detail.value),
        e: common_vendor.unref(usernameIsFocus) ? 1 : "",
        f: common_vendor.unref(isPassword),
        g: common_vendor.o(changeOnPasswordFocus),
        h: common_vendor.o(changeOnPasswordBlur),
        i: common_vendor.unref(password),
        j: common_vendor.o(($event) => common_vendor.isRef(password) ? password.value = $event.detail.value : password = $event.detail.value),
        k: common_vendor.unref(passwordIsFocus) ? 1 : "",
        l: common_vendor.unref(isView) ? 1 : "",
        m: common_vendor.o(($event) => show_hide_password()),
        n: common_vendor.unref(isRemeber),
        o: common_vendor.o(changeRemeber),
        p: common_vendor.o(submit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb4bb882"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/SignIn/SignIn.js.map
