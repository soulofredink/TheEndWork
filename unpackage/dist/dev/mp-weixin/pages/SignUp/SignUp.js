"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const pages_SignUp_hooks_useShowHidden = require("./hooks/useShowHidden.js");
const hooks_useCheck = require("../../hooks/useCheck.js");
const hooks_useDateTime = require("../../hooks/useDateTime.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SignUp",
  setup(__props) {
    let { account, tryPassword, code, inputCode, isVaildUsername, isVaildPassword, isVaildEmail, isVaildCode } = hooks_useCheck.useCheck();
    let { formattedDate } = hooks_useDateTime.useDateTime();
    let { isPassword, isView, isPasswordTwo, isViewTwo, show_hide_password, show_hide_passwordTwo } = pages_SignUp_hooks_useShowHidden.useShowHidden();
    let usernameIsFocus = common_vendor.ref(false);
    let passwordIsFocus = common_vendor.ref(false);
    let tryagainIsFocus = common_vendor.ref(false);
    let emailIsFocus = common_vendor.ref(false);
    let codeIsFocus = common_vendor.ref(false);
    function changeOnFocus(type) {
      switch (type) {
        case "username":
          usernameIsFocus.value = true;
          break;
        case "password":
          passwordIsFocus.value = true;
          break;
        case "tryagain":
          tryagainIsFocus.value = true;
          break;
        case "email":
          emailIsFocus.value = true;
          break;
        case "code":
          codeIsFocus.value = true;
      }
    }
    function changeOnBlur(_object, type) {
      switch (type) {
        case "username":
          {
            let title = "";
            if ((title = isVaildUsername(_object)) != "success") {
              if (_object == "") {
                usernameIsFocus.value = false;
              } else {
                common_vendor.index.showToast({
                  title,
                  icon: "none",
                  duration: 2e3
                });
              }
            }
          }
          break;
        case "password":
          {
            let title = "";
            if ((title = isVaildPassword(_object, tryPassword.value)) != "success") {
              if (_object == "") {
                passwordIsFocus.value = false;
              } else {
                common_vendor.index.showToast({
                  title,
                  icon: "none",
                  duration: 2e3
                });
              }
            }
          }
          break;
        case "tryagain":
          {
            let title = "";
            if ((title = isVaildPassword(_object, account.password)) != "success") {
              if (_object == "") {
                tryagainIsFocus.value = false;
              } else {
                common_vendor.index.showToast({
                  title,
                  icon: "none",
                  duration: 2e3
                });
              }
            }
          }
          break;
        case "email":
          {
            let title = "";
            if ((title = isVaildEmail(_object)) != "success") {
              if (_object == "") {
                emailIsFocus.value = false;
              } else {
                common_vendor.index.showToast({
                  title,
                  icon: "none",
                  duration: 2e3
                });
              }
            } else {
              common_vendor.index.showModal({
                title: "发送邮箱验证码",
                content: "确定要发送吗?(检查是否为正确邮箱)",
                confirmText: "发送",
                cancelText: "取消",
                success: (res) => {
                  if (res.confirm) {
                    common_vendor.index.request({
                      url: config.ServerURL + "/sendEmail/" + account.email,
                      method: "GET",
                      success: (response) => {
                        if (response.statusCode == 200) {
                          let val = response.data;
                          code.value = val.data;
                          setInterval(() => {
                            code.value = "outtime";
                          }, 1e3 * 60 * 3);
                        } else {
                          common_vendor.index.showToast({
                            title: "邮箱错误",
                            icon: "none",
                            duration: 2e3
                          });
                        }
                      },
                      fail: (err) => {
                        common_vendor.index.showToast({
                          title: err.errMsg,
                          icon: "none",
                          duration: 2e3
                        });
                      }
                    });
                  } else if (res.cancel)
                    ;
                }
              });
            }
          }
          break;
        case "code":
          if (_object == "")
            codeIsFocus.value = false;
          break;
      }
    }
    function isOk(goal) {
      return goal == "success";
    }
    function submit() {
      if (isOk(isVaildUsername(account.username)) && isOk(isVaildPassword(account.password, tryPassword.value)) && isOk(isVaildEmail(account.email)) && isOk(isVaildCode(code.value, inputCode.value))) {
        account.createDateTime = new Date(formattedDate());
        common_vendor.index.request({
          url: "http://192.168.43.78:8080/signup",
          method: "POST",
          data: JSON.stringify(account),
          success: (Response) => {
            if (Response.statusCode == 409) {
              common_vendor.index.showToast({
                title: "用户名已经存在",
                icon: "none",
                duration: 2e3
              });
            } else {
              common_vendor.index.showModal({
                title: "注册成功",
                content: "现在要登录吗?",
                confirmText: "登录",
                cancelText: "取消",
                success: (res) => {
                  if (res.confirm) {
                    common_vendor.index.redirectTo({
                      url: "/pages/SignIn/SignIn"
                    });
                  }
                }
              });
            }
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: err.errMsg,
              icon: "none"
            });
          }
        });
      } else {
        let title = "";
        if ((title = isVaildCode(code.value, inputCode.value)) !== "success") {
          common_vendor.index.showToast({
            title,
            icon: "none",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "验证码无误,请检查其他输入项",
            icon: "none",
            duration: 2e3
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => changeOnFocus("username")),
        b: common_vendor.o(($event) => changeOnBlur(common_vendor.unref(account).username, "username")),
        c: common_vendor.o(() => {
        }),
        d: common_vendor.unref(account).username,
        e: common_vendor.o(($event) => common_vendor.unref(account).username = $event.detail.value),
        f: common_vendor.unref(usernameIsFocus) ? 1 : "",
        g: common_vendor.unref(isPassword),
        h: common_vendor.o(($event) => changeOnFocus("password")),
        i: common_vendor.o(($event) => changeOnBlur(common_vendor.unref(account).password, "password")),
        j: common_vendor.unref(account).password,
        k: common_vendor.o(($event) => common_vendor.unref(account).password = $event.detail.value),
        l: common_vendor.unref(passwordIsFocus) ? 1 : "",
        m: common_vendor.unref(isView) ? 1 : "",
        n: common_vendor.o(($event) => common_vendor.unref(show_hide_password)()),
        o: common_vendor.unref(isPasswordTwo),
        p: common_vendor.o(($event) => changeOnFocus("tryagain")),
        q: common_vendor.o(($event) => changeOnBlur(common_vendor.unref(tryPassword), "tryagain")),
        r: common_vendor.unref(tryPassword),
        s: common_vendor.o(($event) => common_vendor.isRef(tryPassword) ? tryPassword.value = $event.detail.value : tryPassword = $event.detail.value),
        t: common_vendor.unref(tryagainIsFocus) ? 1 : "",
        v: common_vendor.unref(isViewTwo) ? 1 : "",
        w: common_vendor.o(($event) => common_vendor.unref(show_hide_passwordTwo)()),
        x: common_vendor.o(($event) => changeOnFocus("email")),
        y: common_vendor.o(($event) => changeOnBlur(common_vendor.unref(account).email, "email")),
        z: common_vendor.unref(account).email,
        A: common_vendor.o(($event) => common_vendor.unref(account).email = $event.detail.value),
        B: common_vendor.unref(emailIsFocus) ? 1 : "",
        C: common_vendor.o(($event) => changeOnFocus("code")),
        D: common_vendor.o(($event) => changeOnBlur(common_vendor.unref(code), "code")),
        E: common_vendor.unref(inputCode),
        F: common_vendor.o(($event) => common_vendor.isRef(inputCode) ? inputCode.value = $event.detail.value : inputCode = $event.detail.value),
        G: common_vendor.unref(codeIsFocus) ? 1 : "",
        H: common_vendor.o(submit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37225cf7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/SignUp/SignUp.js.map
