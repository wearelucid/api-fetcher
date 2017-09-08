'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = bundle;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

var _fetchData = require('./fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bundle(bundleName, fetchOptions, _config) {
  var config = _extends({
    languages: [{ lang: 'en', locale: 'en_US' }],
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
      datas.forEach(saveFile);
      _logs2.default.success('DONE.');
    });
  } else {
    (0, _fetchData2.default)(config, false, fetchOptions).then(function (data) {
      saveFile(data);
      _logs2.default.success('DONE.');
    });
  }

  function saveFile(data) {
    var json = JSON.stringify(data, null, config.compressJSON ? null : 2);
    var jsonSizeKB = Math.round(Buffer.byteLength(json, 'utf8') / 1024 * 100) / 100;
    var fileName = '' + bundleName + (data.language ? '.' + data.language : '') + '.json';

    _logs2.default.info('Writing ' + fileName + ' (Length: ' + json.length + ', Size: ' + jsonSizeKB + 'kB)');

    _fs2.default.writeFile(config.savePath + '/' + fileName, json, 'utf-8', function (err) {
      if (err) return console.error(err);
      _logs2.default.success('Wrote to ' + config.savePath + '/' + fileName + ' successfully!');
    });
  }
}