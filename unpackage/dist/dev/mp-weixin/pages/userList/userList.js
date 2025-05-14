"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userList",
  setup(__props) {
    let userList = common_vendor.reactive([{ img: "../../static/img/墨染红魂.jpg", username: "小王" }]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(userList), (user, k0, i0) => {
          return {
            a: user.img,
            b: common_vendor.t(user.username)
          };
        }),
        b: common_vendor.o(() => {
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2da3ca3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userList/userList.js.map
