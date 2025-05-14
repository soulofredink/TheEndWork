"use strict";
const common_vendor = require("../../../common/vendor.js");
function useShowHidden() {
  let isPassword = common_vendor.ref(true);
  let isView = common_vendor.ref(false);
  function show_hide_password() {
    isPassword.value = !isPassword.value;
    isView.value = !isView.value;
  }
  let isPasswordTwo = common_vendor.ref(true);
  let isViewTwo = common_vendor.ref(false);
  function show_hide_passwordTwo() {
    isPasswordTwo.value = !isPasswordTwo.value;
    isViewTwo.value = !isViewTwo.value;
  }
  return { isPassword, isView, isPasswordTwo, isViewTwo, show_hide_password, show_hide_passwordTwo };
}
exports.useShowHidden = useShowHidden;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/SignUp/hooks/useShowHidden.js.map
