"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeWordpress;

var _applyToOneOrMany = _interopRequireDefault(require("../util/applyToOneOrMany"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeWordpress(data) {
  return (0, _applyToOneOrMany.default)(_normalizeWordpressPost, data);
}

function _normalizeWordpressPost(post) {
  if (post.title && post.title.rendered) post.title = post.title.rendered;
  post.content = post.content && post.content.rendered ? post.content.rendered : false;
  return post;
}