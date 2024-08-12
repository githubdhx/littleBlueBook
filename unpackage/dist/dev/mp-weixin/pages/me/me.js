"use strict";
const common_vendor = require("../../common/vendor.js");
const API_user_page_index = require("../../API/user_page/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_cell = common_vendor.resolveComponent("cell");
  const _component_list = common_vendor.resolveComponent("list");
  (_easycom_uni_icons2 + _component_cell + _component_list)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const myvalue = common_vendor.reactive({
      name: "张三",
      id: "1234567890",
      image: "/static/myimage.png"
    });
    const islogin = common_vendor.ref(false);
    const localtoken = common_vendor.ref("");
    common_vendor.onShow(() => {
      localtoken.value = common_vendor.index.getStorageSync("token");
      if (localtoken.value) {
        islogin.value = true;
      }
    });
    const inlogin = async () => {
      common_vendor.index.showLoading({
        // 展示加载框
        title: "加载中"
      });
      console.log("11111111111111111");
      common_vendor.index.getUserProfile({
        //获取到用户信息
        desc: "登录后可同步数据",
        success: async (obj) => {
          myvalue.name = obj.userInfo.nickName;
          myvalue.image = obj.userInfo.avatarUrl;
          console.log("用户名", myvalue.name);
          console.log("用户头像", myvalue.image);
          common_vendor.index.login({
            provider: "weixin",
            success: (res) => {
              myvalue.id = res.code;
              if (res.errMsg == "login:ok") {
                console.log("登录成功");
                const params = common_vendor.reactive(
                  {
                    code: myvalue.id,
                    nickname: myvalue.name,
                    avatar: myvalue.image
                  }
                );
                API_user_page_index.userLogin.getUser(params).then((res2) => {
                  if (res2.statusCode == 200) {
                    common_vendor.index.showToast({
                      title: "登录成功",
                      icon: "success",
                      mask: true
                    });
                    console.log("登录接口", res2);
                    common_vendor.index.setStorageSync("localtoken", myvalue.id);
                    common_vendor.index.setStorageSync("localname", myvalue.name);
                    common_vendor.index.setStorageSync("localimage", myvalue.image);
                    islogin.value = true;
                  } else {
                    console.log("错误");
                  }
                });
              }
            }
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "授权已取消",
            icon: "error",
            mask: true
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
      console.log("登录");
    };
    const leaveLogin = () => {
      common_vendor.index.showModal({
        title: "确定要退出登录吗？",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("localtoken");
            common_vendor.index.removeStorageSync("localname");
            common_vendor.index.removeStorageSync("localimage");
            myvalue.image = "/static/myimage.png";
            islogin.value = false;
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
      console.log("退出登录");
    };
    common_vendor.onLoad(() => {
      console.log(common_vendor.index.getStorageSync("localtoken"), "token");
      if (common_vendor.index.getStorageSync("localtoken")) {
        islogin.value = true;
        myvalue.image = common_vendor.index.getStorageSync("localimage");
        myvalue.name = common_vendor.index.getStorageSync("localname");
        myvalue.id = common_vendor.index.getStorageSync("localtoken");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: myvalue.image,
        b: common_vendor.t(myvalue.name),
        c: common_vendor.t(myvalue.id.substring(0, 10)),
        d: islogin.value,
        e: !islogin.value,
        f: common_vendor.o(($event) => inlogin()),
        g: common_vendor.p({
          type: "right",
          size: "20",
          color: "#CFBABE"
        }),
        h: common_vendor.p({
          type: "right",
          size: "20",
          color: "#CFBABE"
        }),
        i: common_vendor.p({
          type: "right",
          size: "20",
          color: "#CFBABE"
        }),
        j: common_vendor.o(($event) => leaveLogin()),
        k: islogin.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"], ["__file", "D:/前端资料/文件/毕设/小蓝书/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
