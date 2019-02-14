"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveFiles;

var _logs = _interopRequireDefault(require("./logs"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Save files
 */
function saveFiles(data, bundleName, config, additionalNaming) {
  // additionalNaming can for example be a number or a slug
  var json = JSON.stringify(data, null, config.compressJSON ? null : 2);
  var jsonSizeKB = Math.round(Buffer.byteLength(json, 'utf8') / 1024 * 100) / 100;
  var fileName = "".concat(bundleName).concat(data.language ? ".".concat(data.language) : '').concat(additionalNaming ? ".".concat(additionalNaming) : '', ".json");

  _logs.default.info("Writing ".concat(fileName, " (Length: ").concat(json.length, ", Size: ").concat(jsonSizeKB, "kB)"));

  return _fs.default.writeFile("".concat(config.savePath, "/").concat(fileName), json, 'utf-8', function (err) {
    if (err) {
      throw err;
    } else {
      _logs.default.success("Wrote to ".concat(config.savePath, "/").concat(fileName, " successfully!"));
    }
  });
}