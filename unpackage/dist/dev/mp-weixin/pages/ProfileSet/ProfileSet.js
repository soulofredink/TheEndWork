"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useUserStore = require("../../store/useUserStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ProfileSet",
  setup(__props) {
    let userStore = store_useUserStore.useUserStore();
    let { currentUser } = common_vendor.storeToRefs(userStore);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(currentUser).username,
        b: common_vendor.o(($event) => common_vendor.unref(currentUser).username = $event.detail.value),
        c: common_vendor.t(common_vendor.unref(currentUser).id),
        d: common_vendor.unref(currentUser).name,
        e: common_vendor.o(($event) => common_vendor.unref(currentUser).name = $event.detail.value),
        f: common_vendor.unref(currentUser).sex,
        g: common_vendor.o(($event) => common_vendor.unref(currentUser).sex = $event.detail.value),
        h: common_vendor.unref(currentUser).address,
        i: common_vendor.o(($event) => common_vendor.unref(currentUser).address = $event.detail.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3f86eaf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ProfileSet/ProfileSet.js.map
