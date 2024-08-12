"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_titledetail = require("../../stores/titledetail.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const user_store = stores_titledetail.useUserStore();
    common_vendor.ref(true);
    let itemsdetail = common_vendor.ref({});
    common_vendor.onLoad(() => {
      itemsdetail.value = user_store.detail_title;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(itemsdetail).image_url, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.unref(itemsdetail).user_image,
        c: common_vendor.t(common_vendor.unref(itemsdetail).user_name),
        d: common_vendor.t(common_vendor.unref(itemsdetail).name),
        e: common_vendor.t(common_vendor.unref(itemsdetail).created_at),
        f: common_vendor.t(common_vendor.unref(itemsdetail).content)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77240552"], ["__file", "D:/前端资料/文件/毕设/小蓝书/subpkg/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
