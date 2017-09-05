'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcher = undefined;

var _bundle = require('./lib/bundle');

var _bundle2 = _interopRequireDefault(_bundle);

var _logs = require('./lib/logs');

var _logs2 = _interopRequireDefault(_logs);

var _makeRequest = require('./lib/makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

var _getWPMenus = require('./lib/wp/getWPMenus');

var _getWPMenus2 = _interopRequireDefault(_getWPMenus);

var _getWPPostType = require('./lib/wp/getWPPostType');

var _getWPPostType2 = _interopRequireDefault(_getWPPostType);

var _getWPOptionsPage = require('./lib/wp/getWPOptionsPage');

var _getWPOptionsPage2 = _interopRequireDefault(_getWPOptionsPage);

var _applyToOneOrMany = require('./lib/util/applyToOneOrMany');

var _applyToOneOrMany2 = _interopRequireDefault(_applyToOneOrMany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetcher = exports.fetcher = {
  bundle: _bundle2.default,
  log: _logs2.default,
  makeRequest: _makeRequest2.default,
  getWPMenus: _getWPMenus2.default,
  getWPPostType: _getWPPostType2.default,
  getWPOptionsPage: _getWPOptionsPage2.default,
  applyToOneOrMany: _applyToOneOrMany2.default,
  test: true
};

exports.default = fetcher;