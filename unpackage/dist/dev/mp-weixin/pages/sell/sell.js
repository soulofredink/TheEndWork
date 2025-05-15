"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useUserStore = require("../../store/useUserStore.js");
const config = require("../../config.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "sell",
  setup(__props) {
    let isType = common_vendor.ref(false);
    let isName = common_vendor.ref(false);
    let isPrice = common_vendor.ref(false);
    let isDescription = common_vendor.ref(false);
    const good = common_vendor.reactive({
      userId: "",
      // computed(() => userStore.currentUser?.id || ""),
      name: "",
      price: null,
      description: "",
      image: "",
      type: null
    });
    let type = common_vendor.ref("");
    const userStore = store_useUserStore.useUserStore();
    const isText = common_vendor.ref(true);
    const src = common_vendor.ref("");
    common_vendor.ref();
    let isFocus = common_vendor.ref(false);
    function showError(title) {
      common_vendor.index.showToast({
        title,
        icon: "none",
        duration: 3e3
      });
    }
    function isVaild(Type) {
      switch (Type) {
        case "type":
          if (type.value != "游戏" && type.value != "图书" && type.value != "生活用品") {
            showError("商品类型错误");
            isType.value = false;
          } else {
            isType.value = true;
          }
          break;
        case "name":
          if (good.name == "" || good.name.length > 20) {
            showError("商品名字长度1-20");
            isName.value = false;
          } else {
            isName.value = true;
          }
          break;
        case "price":
          const pricePattern = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
          if (!pricePattern.test(good.price)) {
            showError("价钱格式有误");
            isPrice.value = false;
          } else {
            isPrice.value = true;
          }
          break;
        case "description":
          if (good.description.length < 12 || good.description.length > 140) {
            showError("商品介绍长度有误(12-144)");
            isDescription.value = false;
          } else {
            isDescription.value = true;
          }
          break;
      }
    }
    function changeIsFocus() {
      isFocus.value = true;
    }
    function onBlur() {
      isFocus.value = false;
      isVaild("description");
    }
    const itemList = ["图书", "游戏", "生活用品"];
    function chooseType() {
      common_vendor.index.showActionSheet({
        itemList,
        success: (res) => {
          type.value = itemList[res.tapIndex];
        }
      });
    }
    function addImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          if (res.tempFilePaths[0]) {
            isText.value = false;
            src.value = res.tempFilePaths[0];
            good.image = src.value;
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "图片选择失败",
            icon: "none"
          });
        }
      });
    }
    function deleteImage() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这张图片吗？",
        success: (res) => {
          if (res.confirm) {
            isText.value = true;
            src.value = "";
            good.image = "";
          }
        }
      });
    }
    async function submitForm() {
      if (!isName || !isPrice || !isType || !isDescription) {
        common_vendor.index.showToast({
          title: "输入项有误,请点击每项并退出焦点查看错误原因",
          icon: "none",
          duration: 3e3
        });
        return;
      }
      if (!good.image) {
        return common_vendor.index.showToast({ title: "请上传商品图片", icon: "none" });
      }
      common_vendor.index.showLoading({
        title: "正在发布中...."
      });
      good.userId = userStore.currentUser.id;
      try {
        const res = await uploadToServer(good.image);
        good.image = res;
      } catch (err) {
        common_vendor.index.__f__("log", "at pages/sell/sell.vue:213", err);
      }
      if (type.value == "图书") {
        good.type = 0;
      } else if (type.value == "游戏") {
        good.type = 1;
      } else {
        good.type = 2;
      }
      common_vendor.index.request({
        url: config.ServerURL + "/sending/goods",
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(good),
        success: (res) => {
          common_vendor.index.hideLoading();
          if (res.statusCode == 200) {
            common_vendor.index.showModal({
              title: "发布成功",
              confirmText: "确认"
            });
            isText.value = true;
            src.value = "";
            good.image = "";
            good.name = "";
            good.price = null;
            good.type = null;
            type.value = "";
            good.description = "";
          }
        }
      });
    }
    function handleImageTap() {
      common_vendor.index.previewImage({
        urls: [src.value],
        current: 0
      });
    }
    const uploadToServer = async (filePath) => {
      const { statusCode, data } = await common_vendor.index.uploadFile({
        url: "http://192.168.43.78:8080/" + type.value,
        filePath,
        name: "file"
      });
      if (statusCode === 200) {
        let res = JSON.parse(data);
        return res.data;
      } else {
        common_vendor.index.showToast({
          title: "图片上传失败"
        });
        throw new Error("上传失败");
      }
    };
    common_vendor.onLoad(() => {
      userStore.currentUser = common_vendor.index.getStorageSync("userInfo");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isText.value
      }, isText.value ? {} : {}, {
        b: !isText.value
      }, !isText.value ? {
        c: src.value,
        d: common_vendor.o(handleImageTap)
      } : {}, {
        e: !isText.value
      }, !isText.value ? {
        f: common_vendor.o(deleteImage)
      } : {}, {
        g: common_vendor.o(addImage),
        h: !isText.value ? 1 : "",
        i: common_vendor.o(($event) => isVaild("name")),
        j: good.name,
        k: common_vendor.o(($event) => good.name = $event.detail.value),
        l: common_vendor.p({
          label: "名称",
          name: "name"
        }),
        m: common_vendor.o(($event) => isVaild("price")),
        n: good.price,
        o: common_vendor.o(($event) => good.price = $event.detail.value),
        p: common_vendor.p({
          label: "价格",
          name: "price"
        }),
        q: common_vendor.o(chooseType),
        r: common_vendor.o(($event) => isVaild("type")),
        s: common_vendor.unref(type),
        t: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = $event.detail.value : type = $event.detail.value),
        v: common_vendor.p({
          required: true,
          name: "type",
          label: "类型"
        }),
        w: common_vendor.o(changeIsFocus),
        x: common_vendor.o(onBlur),
        y: common_vendor.unref(isFocus) ? 1 : "",
        z: good.description,
        A: common_vendor.o(($event) => good.description = $event.detail.value),
        B: common_vendor.t(good.description.length),
        C: common_vendor.p({
          required: true,
          name: "description",
          label: "描述"
        }),
        D: common_vendor.p({
          modelValue: good
        }),
        E: common_vendor.o(submitForm)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a81cc82e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sell/sell.js.map
