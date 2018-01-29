'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveFiles;

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Save files
 */
function saveFiles(data, bundleName, config, pageNumber) {
  var json = JSON.stringify(data, null, config.compressJSON ? null : 2);
  var jsonSizeKB = Math.round(Buffer.byteLength(json, 'utf8') / 1024 * 100) / 100;
  var fileName = '' + bundleName + (data.language ? '.' + data.language : '') + (pageNumber ? '.' + pageNumber : '') + '.json';

  _logs2.default.info('Writing ' + fileName + ' (Length: ' + json.length + ', Size: ' + jsonSizeKB + 'kB)');

  return _fs2.default.writeFile(config.savePath + '/' + fileName, json, 'utf-8', function (err) {
    if (err) return console.error(err);
    _logs2.default.success('Wrote to ' + config.savePath + '/' + fileName + ' successfully!');
  });
}