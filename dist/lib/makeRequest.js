'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create basic GET request
 */
function makeRequest(config, path) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _axios2.default.get(config.apiUrl + path).then(function (response) {
    _logs2.default.request(response.status, ' ' + response.request.path);
    if (options.transforms) {
      var transformedData = options.transforms.reduce(function (data, transform) {
        return transform(data);
      }, response.data);
      response.data = transformedData;
    }
    if (options.filters) {
      var filteredData = options.filters.reduce(function (data, filter) {
        return filter(data);
      }, response.data);
      response.data = filteredData;
    }
    return response.data;
  }).catch(function (error) {
    _logs2.default.error(error);
    _logs2.default.error(error.response.status, ' ' + error.request.path);
    // log.error(error.response.statusText, error.response.data)
  });
}