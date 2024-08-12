"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_title_content2 = common_vendor.resolveComponent("title-content");
  _easycom_title_content2();
}
const _easycom_title_content = () => "../../components/title-content/title-content.js";
if (!Math) {
  _easycom_title_content();
}
const _sfc_main = {
  __name: "main_search",
  setup(__props) {
    const inputSearchValue = common_vendor.ref("");
    const sendInputSearchValue = common_vendor.ref("");
    const placeholder = common_vendor.ref("请输入搜索内容");
    const isshow = common_vendor.ref(true);
    const isshowtitle = common_vendor.ref(false);
    const isSame = common_vendor.ref(false);
    const searchHistory = common_vendor.reactive(["头像", "穿搭", "家常菜", "文案", "数码", "旅游", "健身"]);
    const isshowsearch = () => {
      isshow.value = !isshow.value;
    };
    const noshowsearch = () => {
      isshow.value = !isshow.value;
    };
    const searchInput = (event) => {
      console.log(event.target.value);
      if (event.target.value.length == 0) {
        isshowtitle.value = false;
      }
    };
    const btnSearch = () => {
      console.log(inputSearchValue.value, "qqqqqqqqqqq");
      if (inputSearchValue.value.length > 0) {
        isshowtitle.value = true;
      }
      isSame.value = false;
      searchHistory.forEach((item) => {
        if (item == inputSearchValue.value) {
          isSame.value = true;
        }
      });
      console.log("22222" + isSame.value);
      if (!isSame.value) {
        if (searchHistory.length < 8) {
          searchHistory.unshift(inputSearchValue.value);
        } else {
          searchHistory.pop();
          searchHistory.unshift(inputSearchValue.value);
        }
      }
      sendInputSearchValue.value = inputSearchValue.value;
    };
    const quickHistorySearch = (e) => {
      inputSearchValue.value = e;
      btnSearch();
    };
    common_vendor.onLoad(() => {
      noshowsearch();
    });
    return (_ctx, _cache) => {
      return {
        a: placeholder.value,
        b: common_vendor.o([common_vendor.m(($event) => inputSearchValue.value = $event.detail.value, {
          value: true
        }), searchInput]),
        c: common_vendor.o(($event) => isshowsearch()),
        d: common_vendor.o(($event) => noshowsearch()),
        e: inputSearchValue.value,
        f: isshow.value,
        g: common_vendor.o(($event) => btnSearch()),
        h: isshowtitle.value,
        i: common_vendor.p({
          datas: sendInputSearchValue.value
        }),
        j: common_vendor.f(searchHistory, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => quickHistorySearch(item), index)
          };
        }),
        k: !isshowtitle.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4cfe9715"], ["__file", "D:/前端资料/文件/毕设/小蓝书/subpkg/main_search/main_search.vue"]]);
wx.createPage(MiniProgramPage);
