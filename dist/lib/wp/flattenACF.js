'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = flattenACF;

var _applyToOneOrMany = require('../util/applyToOneOrMany');

var _applyToOneOrMany2 = _interopRequireDefault(_applyToOneOrMany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flattenACF(data) {
  return (0, _applyToOneOrMany2.default)(_flattenPost, data);
}

function _flattenPost(post) {
  var flatPost = _extends({}, post, post.acf);
  delete flatPost.acf;
  return flatPost;
}