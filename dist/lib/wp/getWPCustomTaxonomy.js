'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWPCustomTaxonomy;

var _makeRequest = require('../makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWPCustomTaxonomy(config, lang) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  console.log('options: ', options);
  // TODO: Check if categories can be fetched by language as well
  return (0, _makeRequest2.default)(config, '/wp/v2/' + options.taxonomy).then(function (data) {
    return data;
  });
}