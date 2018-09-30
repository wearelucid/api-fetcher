"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flattenACF;

var _applyToOneOrMany = _interopRequireDefault(require("../util/applyToOneOrMany"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function flattenACF(data) {
  return (0, _applyToOneOrMany.default)(_flattenPost, data);
}

function _flattenPost(post) {
  if (post.acf) {
    var flatPost = _objectSpread({}, post, post.acf);

    delete flatPost.acf;
    return flatPost;
  }

  return post;
}