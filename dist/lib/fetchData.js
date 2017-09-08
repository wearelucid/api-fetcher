'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fetchData;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _makeRequest = require('./makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch data
 */
function fetchData(config, language, fetchRoutes) {
  var lang = language && language.lang ? language.lang : false;
  var locale = language && language.locale ? language.locale : '';

  /**
   * Make All Requests
   */
  return _axios2.default.all(Object.keys(fetchRoutes).map(function (f) {
    var _fetchRoutes$f = fetchRoutes[f],
        method = _fetchRoutes$f.method,
        endpoint = _fetchRoutes$f.endpoint;

    if (typeof method === 'function') {
      return method(config, lang, fetchRoutes[f]);
    } else if (endpoint) {
      return (0, _makeRequest2.default)(config, endpoint);
    } else {
      return _logs2.default.error('No route found for: "' + f + '"');
    }
  })).then(function (_results) {
    var results = {};

    Object.keys(fetchRoutes).map(function (f, i) {
      results[f] = _results[i];
    });

    return _extends({
      dateGenerated: Date.now(),
      dateGeneratedHuman: new Date().toISOString().slice(0, 19).replace('T', ' '),
      apiUrl: config.apiUrl,
      language: lang,
      locale: locale
    }, results);
  });
}