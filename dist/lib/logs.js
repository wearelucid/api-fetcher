"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bows = _interopRequireDefault(require("bows"));

var _figlet = _interopRequireDefault(require("figlet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_bows["default"].config({
  padding: false,
  separator: ''
});

function printText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Lucid';
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Isometric1';
  console.log('');
  console.log('\x1b[32m%s\x1b[0m', _figlet["default"].textSync(text, {
    font: font
  }));
  console.log('');
  console.log('');
}

function printConfig(config, configName) {
  console.log("Config: ".concat(configName || ''));
  var maxLength = Object.keys(config).reduce(function (n, k) {
    return k.length > n ? k.length : n;
  }, 0);
  Object.keys(config).forEach(function (c) {
    if (c === 'languages' && config[c] && config[c].length) {
      return console.log("\uD83D\uDD27 \x1B[36m ".concat(c.padEnd(maxLength + 1), ": \x1B[0m ").concat(config[c].map(function (l) {
        return "".concat(l.lang, " (").concat(l.locale, ")");
      }).join(', ')));
    }

    console.log("\uD83D\uDD27 \x1B[36m ".concat(c.padEnd(maxLength + 1), ": \x1B[0m ").concat(config[c], " "));
  });
  console.log('');
}

var log = {
  printText: printText,
  printConfig: printConfig,
  info: (0, _bows["default"])('fetcher 👉'),
  request: (0, _bows["default"])('fetcher 🚀'),
  error: (0, _bows["default"])('fetcher ❌'),
  success: (0, _bows["default"])('fetcher ✅')
};
var _default = log;
exports["default"] = _default;