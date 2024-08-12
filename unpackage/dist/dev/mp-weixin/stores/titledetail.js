"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("title", {
  state: () => ({
    detail_title: {}
  }),
  actions: {
    setDetailTitle(title) {
      this.detail_title = title;
    }
  }
});
exports.useUserStore = useUserStore;
