"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useUserStore = require("../../store/useUserStore.js");
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
    const userStore = store_useUserStore.useUserStore();
    const isText = common_vendor.ref(true);
    const src = common_vendor.ref("");
    const formRef = common_vendor.ref();
    let isFocus = common_vendor.ref(false);
    function changeIsFocus() {
      isFocus.value = true;
    }
    function onBlur() {
      isFocus.value = false;
      isVaild("description");
    }
    common_vendor.watch(good, (New) => {
      common_vendor.index.__f__("log", "at pages/sell/sell.vue:82", New);
    }, { deep: true });
    const itemList = ["图书", "游戏", "生活用品"];
    function chooseType() {
      common_vendor.index.showActionSheet({
        itemList,
        success: (res) => {
          good.type = itemList[res.tapIndex];
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
      try {
        await formRef.value.validate();
        if (!good.image) {
          return common_vendor.index.showToast({ title: "请上传商品图片", icon: "none" });
        }
        good.userId = userStore.currentUser.id;
        common_vendor.index.__f__("log", "at pages/sell/sell.vue:141", good.userId);
        common_vendor.index.showLoading({ title: "提交中..." });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "发布成功" });
          setTimeout(() => common_vendor.index.navigateBack(), 1500);
        }, 1e3);
      } catch (err) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
      }
    }
    function handleImageTap() {
      common_vendor.index.previewImage({
        urls: [src.value],
        current: 0
      });
    }
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
        i: common_vendor.o(($event) => _ctx.isVaild("name")),
        j: _ctx.good.name,
        k: common_vendor.o(($event) => _ctx.good.name = $event.detail.value),
        l: common_vendor.p({
          label: "名称",
          name: "name"
        }),
        m: common_vendor.o(($event) => _ctx.isVaild("price")),
        n: _ctx.good.price,
        o: common_vendor.o(($event) => _ctx.good.price = $event.detail.value),
        p: common_vendor.p({
          label: "价格",
          name: "price"
        }),
        q: common_vendor.o(chooseType),
        r: common_vendor.o(($event) => _ctx.isVaild("type")),
        s: _ctx.good.type,
        t: common_vendor.o(($event) => _ctx.good.type = $event.detail.value),
        v: common_vendor.p({
          required: true,
          name: "type",
          label: "类型"
        }),
        w: common_vendor.o(changeIsFocus),
        x: common_vendor.o(onBlur),
        y: common_vendor.unref(isFocus) ? 1 : "",
        z: _ctx.good.description,
        A: common_vendor.o(($event) => _ctx.good.description = $event.detail.value),
        B: common_vendor.t(_ctx.good.description.length),
        C: common_vendor.p({
          required: true,
          name: "description",
          label: "描述"
        }),
        D: common_vendor.p({
          modelValue: _ctx.good
        }),
        E: common_vendor.o(submitForm)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a81cc82e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sell/sell.js.map
