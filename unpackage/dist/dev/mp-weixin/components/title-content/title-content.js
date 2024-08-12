"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_titledetail = require("../../stores/titledetail.js");
const API_main_page_index = require("../../API/main_page/index.js");
const _sfc_main = {
  __name: "title-content",
  props: ["datas"],
  setup(__props) {
    const userStore = stores_titledetail.useUserStore();
    const titlesList = common_vendor.ref();
    const titlesListCount = common_vendor.ref(0);
    const titlesLeftList = common_vendor.reactive([]);
    const titlesLeftListHeight = common_vendor.ref(0);
    const titlesRightList = common_vendor.reactive([]);
    const titlesRightListHeight = common_vendor.ref(0);
    const waterfallImage = function() {
      titlesLeftList.push(titlesList.value[0]);
      console.log("第一张");
    };
    const onImageLoad = function(e) {
      console.log("继续加载");
      let divWidth = 320;
      let oImgW = e.detail.width;
      let oImgH = e.detail.height;
      let rImgH = divWidth * oImgH / oImgW;
      if (rImgH > 600) {
        rImgH = 600;
      }
      console.log(titlesListCount.value);
      if (titlesListCount.value == 0) {
        titlesLeftListHeight.value += rImgH;
        titlesListCount.value++;
        titlesRightList.push(titlesList.value[titlesListCount.value]);
        console.log(titlesListCount.value, "第二张");
      } else {
        titlesListCount.value++;
        if (titlesLeftListHeight.value > titlesRightListHeight.value) {
          titlesRightListHeight.value += rImgH;
        } else {
          titlesLeftListHeight.value += rImgH;
        }
        if (titlesListCount.value < titlesList.value.length) {
          if (titlesLeftListHeight.value > titlesRightListHeight.value) {
            titlesRightList.push(titlesList.value[titlesListCount.value]);
            console.log(titlesListCount.value, "放右边");
          } else {
            titlesLeftList.push(titlesList.value[titlesListCount.value]);
            console.log(titlesListCount.value, "放左边");
          }
        }
      }
    };
    const goToDetail = function(item) {
      console.log(item, "跳转之前的数据");
      userStore.setDetailTitle(item);
      common_vendor.index.navigateTo({
        url: "/subpkg/detail/detail"
      });
    };
    const props = __props;
    const getTitleList = function(key) {
      console.log(key, "wwwwwwwww");
      API_main_page_index.mainApi.getListGoods(key).then((res) => {
        console.log(res, "商品列表");
        console.log(res.data, "res数据");
        titlesList.value = res.data;
        console.log(titlesList.value, "list数据");
        waterfallImage();
      });
    };
    const keyWord = common_vendor.reactive(
      {
        keys: props.datas
      }
    );
    common_vendor.watch(props, (newprops) => {
      console.log(`新数据 ${newprops.datas}`);
      const newkeyWord = common_vendor.reactive(
        {
          keys: newprops.datas
        }
      );
      console.log(newkeyWord, "关键字");
      getTitleList(newkeyWord);
    });
    common_vendor.onMounted(() => {
      getTitleList(keyWord);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(titlesLeftList, (item, k0, i0) => {
          return {
            a: item.image_url[0],
            b: common_vendor.o(onImageLoad, item),
            c: common_vendor.t(item.name),
            d: item.user_image,
            e: common_vendor.t(item.user_name),
            f: item,
            g: common_vendor.o(($event) => goToDetail(item), item)
          };
        }),
        b: common_vendor.f(titlesRightList, (item, k0, i0) => {
          return {
            a: item.image_url[0],
            b: common_vendor.o(onImageLoad, item),
            c: common_vendor.t(item.name),
            d: item.user_image,
            e: common_vendor.t(item.user_name),
            f: item,
            g: common_vendor.o(($event) => goToDetail(item), item)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6b839e3"], ["__file", "D:/前端资料/文件/毕设/小蓝书/components/title-content/title-content.vue"]]);
wx.createComponent(Component);
