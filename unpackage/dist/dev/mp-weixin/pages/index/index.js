"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let searchValue = common_vendor.ref("");
    let navList = common_vendor.ref(["图书", "游戏", "生活用品"]);
    let currentIndex = common_vendor.ref(0);
    common_vendor.index.getSystemInfoSync();
    let swiperHeight = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const systemInfo2 = common_vendor.index.getWindowInfo();
      swiperHeight.value = systemInfo2.windowHeight - 50;
    });
    function switchTab(index) {
      currentIndex.value = index;
    }
    function onSwiperChange(e) {
      currentIndex.value = e.detail.current;
    }
    function search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    }
    function input(res) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:76", "input--", res);
    }
    function cancel(res) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:80", "cacel", res);
    }
    function change(res) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:84", "change", res);
    }
    const socketTask = common_vendor.index.connectSocket({
      url: "wss://localhost:8443/websocket/2",
      success: () => {
      }
    });
    socketTask.onOpen(() => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:94", "连接成功"), socketTask.send({ data: JSON.stringify({
        receiver: 1,
        message: "你好"
      }) });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.o(input),
        c: common_vendor.o(cancel),
        d: common_vendor.o(change),
        e: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        f: common_vendor.p({
          focus: true,
          modelValue: common_vendor.unref(searchValue)
        }),
        g: common_vendor.f(common_vendor.unref(navList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.unref(currentIndex) === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        h: common_vendor.f(common_vendor.unref(navList), (item, index, i0) => {
          return common_vendor.e({
            a: index === 0
          }, index === 0 ? {
            b: common_vendor.f(_ctx.list, (item2, k1, i1) => {
              return {
                a: item2.id
              };
            })
          } : {}, {
            c: index === 1
          }, index === 1 ? {} : {}, {
            d: index === 2
          }, index === 2 ? {} : {}, {
            e: index
          });
        }),
        i: common_vendor.unref(swiperHeight) + "rpx",
        j: common_vendor.unref(currentIndex),
        k: common_vendor.o(onSwiperChange),
        l: common_vendor.unref(swiperHeight) + "rpx"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
