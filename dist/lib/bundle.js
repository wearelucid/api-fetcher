'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = bundle;

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

var _saveFiles = require('./saveFiles');

var _saveFiles2 = _interopRequireDefault(_saveFiles);

var _fetchData = require('./fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bundle(bundleName, fetchOptions, _config) {
  var config = _extends({
    savePath: './data'
  }, _config);

  /**
   * Create directory (synchronously)
   */
  (0, _mkdirp2.default)(config.savePath, function (err) {
    if (err) return console.error(err);
    _logs2.default.success(config.savePath + ' created successfully!');
  });

  /**
   * Fetch all languages
   */
  if (config.languages && config.languages.length) {
    Promise.all(config.languages.map(function (language) {
      return (0, _fetchData2.default)(config, language, fetchOptions);
    })).then(function (datas) {
      // for each lang save files
      datas.forEach(saveDataToFile);
      _logs2.default.success('DONE.');
    });
  } else {
    (0, _fetchData2.default)(config, false, fetchOptions).then(function (data) {
      // if one language, only save this lang
      saveDataToFile(data);
      _logs2.default.success('DONE.');
    });
  }

  /**
   * Save files (in this case as a bundle)
   */
  function saveDataToFile(data) {
    (0, _saveFiles2.default)(data, bundleName, config);
  }
}