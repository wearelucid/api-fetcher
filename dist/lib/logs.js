'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bows = require('bows');

var _bows2 = _interopRequireDefault(_bows);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bows2.default.config({
  padding: false,
  separator: ''
});

function printText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Lucid';
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Isometric1';

  console.log('');
  console.log('\x1b[32m%s\x1b[0m', _figlet2.default.textSync(text, { font: font }));
  console.log('');
  console.log('');
}

function printConfig(config, configName) {
  console.log('Config: ' + (configName || ''));
  var maxLength = Object.keys(config).reduce(function (n, k) {
    return k.length > n ? k.length : n;
  }, 0);
  Object.keys(config).forEach(function (c) {
    if (c === 'languages') return console.log('\uD83D\uDD27 \x1B[36m ' + c.padEnd(maxLength + 1) + ': \x1B[0m ' + config[c].map(function (l) {
      return l.lang + ' (' + l.locale + ')';
    }).join(', '));
    console.log('\uD83D\uDD27 \x1B[36m ' + c.padEnd(maxLength + 1) + ': \x1B[0m ' + config[c] + ' ');
  });
  console.log('');
}

var log = {
  printText: printText,
  printConfig: printConfig,
  info: (0, _bows2.default)('fetcher 👉'),
  request: (0, _bows2.default)('fetcher 🚀'),
  error: (0, _bows2.default)('fetcher ❌'),
  success: (0, _bows2.default)('fetcher ✅')
};

exports.default = log;