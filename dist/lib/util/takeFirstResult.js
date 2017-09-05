"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = takeFirstResult;
function takeFirstResult(data) {
  if (data.length) {
    data = data[0];
  } else {
    throw new Error("Empty result");
  }
  return data;
}