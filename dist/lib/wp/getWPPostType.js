"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWPPostType;

var _normalizeWordpress = _interopRequireDefault(require("./normalizeWordpress"));

var _makeRequest = _interopRequireDefault(require("../makeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getWPPostType(config, lang, options) {
  var additionalQueryParams = '';

  if (options.additionalQueryParams) {
    additionalQueryParams = options.additionalQueryParams.reduce(function (acc, cur) {
      return "".concat(acc, "&").concat(cur.key, "=").concat(cur.value);
    }, '');
  }

  var requestUrl = "/wp/v2/".concat(options.postType, "?per_page=").concat(config.perPage).concat(lang ? "&lang=".concat(lang) : '').concat(additionalQueryParams);
  return (0, _makeRequest.default)(config, requestUrl, _objectSpread({}, options, {
    transforms: [_normalizeWordpress.default].concat(_toConsumableArray(options.transforms || []))
  }));
}