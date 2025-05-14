"use strict";
const common_vendor = require("../../common/vendor.js");
const store_chatStore = require("../../store/chatStore.js");
const store_useUserStore = require("../../store/useUserStore.js");
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
    const chatStore = store_chatStore.useChatStore();
    const userStore = store_useUserStore.useUserStore();
    let searchValue = common_vendor.ref("");
    let navList = common_vendor.ref(["推荐", "新发", "附近"]);
    let currentIndex = common_vendor.ref(0);
    common_vendor.index.getSystemInfoSync();
    let swiperHeight = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const systemInfo2 = common_vendor.index.getWindowInfo();
      common_vendor.index.__f__("log", "at pages/index/index.vue:72", "index:", userStore.meta.isLoggedin);
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
      common_vendor.index.__f__("log", "at pages/index/index.vue:94", "input--", res);
    }
    function cancel(res) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:98", "cacel", res);
    }
    function change(res) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:102", "change", res);
    }
    const test = (contactId) => {
      chatStore.createSession(contactId);
      const chat = common_vendor.ref({
        id: "",
        username: "",
        avatar: ""
      });
      try {
        const res = common_vendor.index.request({
          url: `https://192.168.43.78/${contactId}`,
          method: "POST",
          data: ""
        });
        if (res.statusCode === 200) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:122", "用户信息获取成功：", res);
          chat.value.id = res.data.id;
          chat.value.avatar = res.data.img;
          chat.value.username = res.data.username;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:128", "用户信息获取失败:", error);
      }
      chatStore.updatereceiverId(contactId);
      common_vendor.index.navigateTo({
        url: `/pages/communicateDetails/communicateDetails?id=${chat.value.id}&username=${chat.value.username}&avatar=${chat.value.avatar}`
      });
    };
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
            b: common_vendor.o(($event) => test("1"), index),
            c: common_vendor.o(($event) => test("3"), index)
          } : {}, {
            d: index === 1
          }, index === 1 ? {} : {}, {
            e: index === 2
          }, index === 2 ? {} : {}, {
            f: index
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
