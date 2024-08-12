"use strict";
const common_vendor = require("../../common/vendor.js");
const API_main_page_index = require("../../API/main_page/index.js");
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  const _easycom_title_content2 = common_vendor.resolveComponent("title-content");
  (_easycom_page_head2 + _easycom_title_content2)();
}
const _easycom_page_head = () => "../../components/page-head/page-head.js";
const _easycom_title_content = () => "../../components/title-content/title-content.js";
if (!Math) {
  (_easycom_page_head + _easycom_title_content)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const change_search = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/main_search/main_search"
      });
    };
    const list = common_vendor.ref();
    const act = common_vendor.ref(0);
    const lietKey = common_vendor.ref("推荐");
    const changeAct = (item) => {
      act.value = item.id;
      lietKey.value = item.name;
      console.log(lietKey.value, "传过去的数据");
    };
    common_vendor.onLoad(() => {
      API_main_page_index.mainApi.getList().then((res) => {
        console.log(res, "123445644");
        list.value = res.data;
        console.log(list.value);
      }).catch((err) => {
        console.log(err);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(change_search),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(act.value == item.id ? "name" : ""),
            c: common_vendor.n(act.value == index ? "line" : ""),
            d: index,
            e: common_vendor.o(($event) => changeAct(item), index)
          };
        }),
        c: common_vendor.p({
          datas: lietKey.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/前端资料/文件/毕设/小蓝书/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
