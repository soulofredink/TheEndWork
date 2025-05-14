"use strict";
function useDateTime() {
  function formattedDate() {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const formattedDate2 = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate2;
  }
  return { formattedDate };
}
exports.useDateTime = useDateTime;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/hooks/useDateTime.js.map
