"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetchData;

var _axios = _interopRequireDefault(require("axios"));

var _makeRequest = _interopRequireDefault(require("./makeRequest"));

var _logs = _interopRequireDefault(require("./logs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Fetch data
 */
function fetchData(config, language, fetchRoutes) {
  var lang = language && language.lang ? language.lang : false;
  var locale = language && language.locale ? language.locale : '';
  /**
   * Make All Requests
   */

  return _axios["default"].all(Object.keys(fetchRoutes).map(function (f) {
    var _fetchRoutes$f = fetchRoutes[f],
        method = _fetchRoutes$f.method,
        endpoint = _fetchRoutes$f.endpoint;

    if (typeof method === 'function') {
      return method(config, lang, fetchRoutes[f]);
    } else if (endpoint) {
      return (0, _makeRequest["default"])(config, endpoint);
    } else {
      return _logs["default"].error("No route found for: \"".concat(f, "\""));
    }
  })).then(function (_results) {
    var results = {};
    Object.keys(fetchRoutes).map(function (f, i) {
      results[f] = _results[i];
    });
    return _objectSpread({
      dateGenerated: Date.now(),
      dateGeneratedHuman: new Date().toISOString().slice(0, 19).replace('T', ' '),
      apiUrl: config.apiUrl,
      language: lang,
      locale: locale
    }, results);
  });
}