"use strict";
const API_request = require("../request.js");
function getList(data) {
  return API_request.request({
    url: "/main/list",
    method: "GET",
    data
  });
}
function getListGoods(data) {
  return API_request.request({
    url: "/main/list/goods",
    method: "POST",
    data
  });
}
const mainApi = {
  getList,
  getListGoods
  // getCart,
  // addCart,
  // modifyCart,
  // deleteCart
};
exports.mainApi = mainApi;
