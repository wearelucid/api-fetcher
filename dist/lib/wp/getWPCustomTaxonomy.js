"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWPCustomTaxonomy;

var _makeRequest = _interopRequireDefault(require("../makeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWPCustomTaxonomy(config, lang) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _makeRequest.default)(config, "/wp/v2/".concat(options.taxonomy));
}