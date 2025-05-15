"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useUserStore = require("../../store/useUserStore.js");
const store_chatStore = require("../../store/chatStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "MyInfo",
  setup(__props) {
    let username = common_vendor.ref("请登录");
    let id = common_vendor.ref("");
    let userStore = store_useUserStore.useUserStore();
    let chatStore = store_chatStore.useChatStore();
    const services = common_vendor.reactive([
      { id: 1, icon: "shop", color: "#00C853", label: "我发布的", path: "/pages/PublishedGoods/PublishedGoods" },
      { id: 2, icon: "cart", color: "#0091EA", label: "我卖出的", path: "/pages/SoldGoods/SoldGoods" },
      { id: 3, icon: "gift", color: "#FF6D00", label: "我买到的", path: "/pages/BoughtGoods/BoughtGoods" }
    ]);
    const settings = common_vendor.reactive([
      { id: 1, icon: "gear", color: "#666", label: "账户安全", path: "/pages/security" },
      { id: 2, icon: "notification", color: "#666", label: "消息通知", path: "/pages/notify" },
      { id: 3, icon: "clear", color: "#666", label: "清理缓存", path: "clearCache" }
    ]);
    const toProfile = (path) => {
      if (!userStore.meta.isLoggedin) {
        common_vendor.index.redirectTo({ url: "/pages/SignIn/SignIn" });
      } else {
        common_vendor.index.navigateTo({ url: path });
      }
    };
    const handleSetting = (item) => {
      if (item.path != "clearCache") {
        common_vendor.index.navigateTo({
          url: item.path
        });
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要清除缓存吗？",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.removeStorageSync("token");
              common_vendor.index.removeStorageSync("userInfo");
              chatStore.clearLocalData();
            }
          }
        });
      }
    };
    common_vendor.onLoad(() => {
      const t = common_vendor.index.getStorageSync("token");
      if (t == true) {
        common_vendor.index.__f__("log", "at pages/MyInfo/MyInfo.vue:137", 123);
        userStore.meta.isLoggedin = true;
        let userInfo = common_vendor.index.getStorageSync("userInfo");
        userStore.currentUser = common_vendor.index.getStorageSync("userInfo");
        username.value = userInfo.username;
        id.value = userInfo.id;
      } else {
        username.value = userStore.currentUser.username;
        id.value = userStore.currentUser.id;
      }
    });
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出当前账号吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("userInfo");
            userStore.$reset();
            common_vendor.index.reLaunch({
              url: "/pages/SignIn/SignIn"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(username)),
        b: common_vendor.t(common_vendor.unref(id)),
        c: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#999"
        }),
        d: common_vendor.o(($event) => toProfile("/pages/ProfileSet/ProfileSet")),
        e: common_vendor.f(services, (item, index, i0) => {
          return {
            a: "35112905-1-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "36",
              color: item.color
            }),
            c: common_vendor.t(item.label),
            d: index,
            e: common_vendor.o(($event) => handleSetting(item), index)
          };
        }),
        f: common_vendor.f(settings, (item, k0, i0) => {
          return {
            a: "35112905-2-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "20",
              color: item.color
            }),
            c: common_vendor.t(item.label),
            d: "35112905-3-" + i0,
            e: item.id,
            f: common_vendor.o(($event) => handleSetting(item), item.id)
          };
        }),
        g: common_vendor.p({
          type: "forward",
          size: "16",
          color: "#ccc"
        }),
        h: common_vendor.o(handleLogout)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35112905"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/MyInfo/MyInfo.js.map
