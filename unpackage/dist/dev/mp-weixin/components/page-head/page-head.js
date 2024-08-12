"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "page-head",
  emits: ["change_search"],
  setup(__props, { emit: __emit }) {
    common_vendor.onBeforeMount(() => {
      setNavSize();
    });
    let status = common_vendor.ref(0);
    let icon = common_vendor.ref(" 搜索你感兴趣的东西...");
    const emits = __emit;
    const change_search = () => {
      emits("change_search");
    };
    const setNavSize = () => {
      const status_bar = common_vendor.index.getSystemInfoSync();
      status.value = status_bar.statusBarHeight + 10;
    };
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(icon),
        b: common_vendor.o(($event) => change_search()),
        c: common_vendor.s("padding-top:" + common_vendor.unref(status) + "px;"),
        d: common_vendor.s("padding-top:" + (common_vendor.unref(status) + 30) + "px;")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e80b2f0b"], ["__file", "D:/前端资料/文件/毕设/小蓝书/components/page-head/page-head.vue"]]);
wx.createComponent(Component);
