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
      var newData = options.transforms.reduce(function (data, t) {
        return t(data);
      }, response.data);
      response.data = newData;
    }
    return response.data;
  }).catch(function (error) {
    _logs2.default.error(error);
    _logs2.default.error(error.response.status, ' ' + error.request.path);
    // log.error(error.response.statusText, error.response.data)
  });
}