'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getWPPostType;

var _flattenACF = require('./flattenACF');

var _flattenACF2 = _interopRequireDefault(_flattenACF);

var _normalizeWordpress = require('./normalizeWordpress');

var _normalizeWordpress2 = _interopRequireDefault(_normalizeWordpress);

var _makeRequest = require('../makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getWPPostType(config, lang, options) {
  return (0, _makeRequest2.default)(config, '/wp/v2/' + options.postType + '?per_page=' + config.perPage + '&lang=' + lang, _extends({}, options, { transforms: [_flattenACF2.default, _normalizeWordpress2.default].concat(_toConsumableArray(options.transforms || [])) }));
}