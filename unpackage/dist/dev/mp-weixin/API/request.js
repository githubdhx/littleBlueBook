"use strict";
const common_vendor = require("../common/vendor.js");
const API_requestUrl = require("./requestUrl.js");
const request = (config) => {
  config.url = API_requestUrl.url.requestUrl + config.url;
  if (!config.data)
    config.data = {};
  config.timeout = 3e5;
  let promise = new Promise(function(resolve, reject) {
    common_vendor.index.request(config).then((responses) => {
      if (responses[0]) {
        reject({ message: "网络超时" });
      } else {
        resolve(responses);
      }
    }).catch((error) => {
      reject(error);
    });
  });
  return promise;
};
exports.request = request;
