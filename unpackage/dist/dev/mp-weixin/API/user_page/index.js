"use strict";
const API_request = require("../request.js");
function getUser(data) {
  return API_request.request({
    url: "/login",
    method: "POST",
    data
  });
}
const userLogin = {
  getUser
  // getCart,
  // addCart,
  // modifyCart,
  // deleteCart
};
exports.userLogin = userLogin;
