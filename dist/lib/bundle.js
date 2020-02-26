"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bundle;

var _fs = _interopRequireDefault(require("fs"));

var _logs = _interopRequireDefault(require("./logs"));

var _saveFiles = _interopRequireDefault(require("./saveFiles"));

var _fetchData = _interopRequireDefault(require("./fetchData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function bundle(bundleName, fetchOptions, _config) {
  var config = _objectSpread({
    savePath: './data'
  }, _config);
  /**
   * Create directory (synchronously)
   */


  try {
    _fs["default"].mkdirSync(config.savePath, {
      recursive: true
    });

    _logs["default"].success("".concat(config.savePath, " created successfully!"));
  } catch (e) {
    console.error(e);
  }
  /**
   * Fetch all languages
   */


  if (config.languages && config.languages.length) {
    Promise.all(config.languages.map(function (language) {
      return (0, _fetchData["default"])(config, language, fetchOptions);
    })).then(function (datas) {
      // for each lang save files
      return Promise.all( // resolves an array of promises
      datas.map(function (data) {
        // returns array of all promises from all saveDataToFile()-calls
        return saveDataToFile(data);
      })).then(function () {
        return _logs["default"].success('DONE.');
      }); // is called when all promises are resolved (here: all files are saved)
      // for each lang save files
    });
  } else {
    (0, _fetchData["default"])(config, false, fetchOptions).then(function (data) {
      // if one language, only save this lang
      return saveDataToFile(data);
    });
  }
  /**
   * Save files (in this case as a bundle)
   */


  function saveDataToFile(data) {
    return (0, _saveFiles["default"])(data, bundleName, config);
  }
}