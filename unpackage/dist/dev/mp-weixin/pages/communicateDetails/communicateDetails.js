"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_useUserStore = require("../../store/useUserStore.js");
const store_chatStore = require("../../store/chatStore.js");
const script_webSocket = require("../../script/webSocket.js");
const config = require("../../config.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "communicateDetails",
  setup(__props) {
    const chatStore = store_chatStore.useChatStore();
    const userStore = store_useUserStore.useUserStore();
    const inputText = common_vendor.ref("");
    const scrollId = common_vendor.ref("");
    const chatId = common_vendor.ref("");
    const username = common_vendor.ref("");
    const avatar = common_vendor.ref("");
    let websocket = null;
    const initWebSocket = () => {
      var _a;
      if (!((_a = userStore.currentUser) == null ? void 0 : _a.id))
        return;
      websocket = new script_webSocket.websocketUtil(
        config.url1 + `${userStore.currentUser.id}`,
        5e3
      );
      websocket.getMessage((res) => {
        common_vendor.index.__f__("log", "at pages/communicateDetails/communicateDetails.vue:73", "有人来消息了：", res.sender);
        if (chatStore.sessions.find((s2) => s2.id === res.sender)) {
          common_vendor.index.__f__("log", "at pages/communicateDetails/communicateDetails.vue:75", "此消息的会话存在，不需要创建新的");
        } else
          chatStore.createSession(res.sender);
        const a = Date.now();
        const s = a.toString();
        chatStore.handleIncomingMessage({
          id: s,
          content: res.content,
          sender: res.sender,
          receiver: userStore.currentUser.id,
          timestamp: a
        });
        common_vendor.index.__f__("log", "at pages/communicateDetails/communicateDetails.vue:87", res);
      });
    };
    const messages = common_vendor.computed(
      () => chatStore.currentMessages.map((msg) => {
        var _a;
        return {
          ...msg,
          isMe: msg.sender === ((_a = userStore.currentUser) == null ? void 0 : _a.id)
        };
      })
    );
    const sendMessage = () => {
      if (!inputText.value.trim())
        return;
      chatStore.sendMessage(inputText.value.trim(), chatId.value);
      const msg = {
        sender: userStore.currentUser.id,
        message: inputText.value,
        sendTime: Date.now(),
        receiver: chatId.value
      };
      websocket.send(JSON.stringify(msg));
      inputText.value = "";
      scrollToBottom();
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        if (chatStore.currentMessages.length > 0) {
          scrollId.value = `msg${chatStore.currentMessages.length - 1}`;
        }
      });
    };
    common_vendor.onMounted(() => {
      initWebSocket();
      scrollToBottom();
    });
    common_vendor.onUnmounted(() => {
      websocket == null ? void 0 : websocket.close();
      common_vendor.index.__f__("log", "at pages/communicateDetails/communicateDetails.vue:141", "关闭成功");
      chatStore.clearUnreadCount(chatStore.currentSessionId);
      chatStore.currentSessionId = "";
    });
    common_vendor.onLoad((chat) => {
      chatId.value = chat.id || "未知ID";
      username.value = chat.username || "匿名用户";
      avatar.value = chat.avatar ? decodeURIComponent(chat.avatar) : "/static/default-avatar.png";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (msg, index, i0) => {
          return common_vendor.e({
            a: !msg.isMe
          }, !msg.isMe ? {
            b: common_assets._imports_0
          } : {}, {
            c: common_vendor.t(msg.content),
            d: msg.isMe
          }, msg.isMe ? {
            e: common_assets._imports_1
          } : {}, {
            f: msg.id,
            g: "msg" + index,
            h: common_vendor.n(msg.isMe ? "me" : "other")
          });
        }),
        b: scrollId.value,
        c: common_vendor.o(sendMessage),
        d: inputText.value,
        e: common_vendor.o(($event) => inputText.value = $event.detail.value),
        f: common_vendor.o(sendMessage)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-748d2dfb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/communicateDetails/communicateDetails.js.map
