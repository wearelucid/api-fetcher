"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyToOneOrMany;
function applyToOneOrMany(fn, data) {
  if (Array.isArray(data)) {
    data = data.map(fn);
  } else {
    data = fn(data);
  }
  return data;
}