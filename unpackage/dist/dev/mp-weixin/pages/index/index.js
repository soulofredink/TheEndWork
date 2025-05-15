"use strict";
const common_vendor = require("../../common/vendor.js");
const store_chatStore = require("../../store/chatStore.js");
const store_useUserStore = require("../../store/useUserStore.js");
const config = require("../../config.js");
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
    store_chatStore.useChatStore();
    const userStore = store_useUserStore.useUserStore();
    const searchValue = common_vendor.ref("");
    const navList = common_vendor.ref(["图书", "游戏", "生活用品"]);
    const currentIndex = common_vendor.ref(0);
    const swiperHeight = common_vendor.ref(0);
    const bookList = common_vendor.ref([]);
    const gameList = common_vendor.ref([]);
    const lifeUtilList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      fetchBookData();
      fetchGame();
      fetchLifeUtil();
      const t = common_vendor.index.getStorageSync("token");
      if (t == true) {
        userStore.meta.isLoggedin = true;
        userStore.currentUser = common_vendor.index.getStorageSync("userInfo");
      }
      const systemInfo = common_vendor.index.getWindowInfo();
      swiperHeight.value = systemInfo.windowHeight - 50;
      common_vendor.index.__f__("log", "at pages/index/index.vue:108", "index:", userStore.meta.isLoggedin);
    });
    const switchTab = (index) => {
      currentIndex.value = index;
    };
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const search = (res) => {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    };
    const input = (res) => common_vendor.index.__f__("log", "at pages/index/index.vue:163", "input--", res);
    const cancel = (res) => common_vendor.index.__f__("log", "at pages/index/index.vue:164", "cancel", res);
    const change = (res) => common_vendor.index.__f__("log", "at pages/index/index.vue:165", "change", res);
    const fetchBookData = async () => {
      try {
        let random = Date.now() % 10;
        const res = await common_vendor.index.request({
          url: config.ServerURL + "/get/goods/图书",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: { page: random, size: 20 }
        });
        if (res.statusCode === 200) {
          let resVal = res.data;
          let date = resVal.data;
          bookList.value = date.list;
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "图书商品加载失败", icon: "none" });
      }
    };
    const fetchGame = async () => {
      try {
        let random = Date.now() % 10;
        const res = await common_vendor.index.request({
          url: config.ServerURL + "/get/goods/游戏",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: { page: random, size: 20 }
        });
        if (res.statusCode === 200) {
          let resVal = res.data;
          let date = resVal.data;
          gameList.value = date.list;
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "游戏商品加载失败", icon: "none" });
      }
    };
    const fetchLifeUtil = async () => {
      try {
        let random = Date.now() % 10;
        const res = await common_vendor.index.request({
          url: config.ServerURL + "/get/goods/生活用品",
          method: "POST",
          data: { page: random, size: 20 }
        });
        if (res.statusCode === 200) {
          let resVal = res.data;
          let date = resVal.data;
          lifeUtilList.value = date.list;
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "生活用品商品加载失败", icon: "none" });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.o(input),
        c: common_vendor.o(cancel),
        d: common_vendor.o(change),
        e: common_vendor.o(($event) => searchValue.value = $event),
        f: common_vendor.p({
          focus: true,
          modelValue: searchValue.value
        }),
        g: common_vendor.f(navList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: currentIndex.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        h: common_vendor.f(navList.value, (item, index, i0) => {
          return common_vendor.e({
            a: index === 0
          }, index === 0 ? {
            b: common_vendor.f(bookList.value, (goods, k1, i1) => {
              return {
                a: goods.image,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id
              };
            })
          } : {}, {
            c: index === 1
          }, index === 1 ? {
            d: common_vendor.f(gameList.value, (goods, k1, i1) => {
              return {
                a: goods.image,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id
              };
            })
          } : {}, {
            e: index === 2
          }, index === 2 ? {
            f: common_vendor.f(lifeUtilList.value, (goods, k1, i1) => {
              return {
                a: goods.image,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id
              };
            })
          } : {}, {
            g: index
          });
        }),
        i: swiperHeight.value + "rpx",
        j: currentIndex.value,
        k: common_vendor.o(onSwiperChange),
        l: swiperHeight.value + "rpx"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
