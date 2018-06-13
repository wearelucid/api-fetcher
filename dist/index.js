'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcher = undefined;

var _bundle = require('./lib/bundle');

var _bundle2 = _interopRequireDefault(_bundle);

var _paginate = require('./lib/paginate');

var _paginate2 = _interopRequireDefault(_paginate);

var _eachItem = require('./lib/eachItem');

var _eachItem2 = _interopRequireDefault(_eachItem);

var _logs = require('./lib/logs');

var _logs2 = _interopRequireDefault(_logs);

var _makeRequest = require('./lib/makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

var _getWPMenus = require('./lib/wp/getWPMenus');

var _getWPMenus2 = _interopRequireDefault(_getWPMenus);

var _getWPCategories = require('./lib/wp/getWPCategories');

var _getWPCategories2 = _interopRequireDefault(_getWPCategories);

var _getWPCustomTaxonomy = require('./lib/wp/getWPCustomTaxonomy');

var _getWPCustomTaxonomy2 = _interopRequireDefault(_getWPCustomTaxonomy);

var _getWPPostType = require('./lib/wp/getWPPostType');

var _getWPPostType2 = _interopRequireDefault(_getWPPostType);

var _getWPOptionsPage = require('./lib/wp/getWPOptionsPage');

var _getWPOptionsPage2 = _interopRequireDefault(_getWPOptionsPage);

var _applyToOneOrMany = require('./lib/util/applyToOneOrMany');

var _applyToOneOrMany2 = _interopRequireDefault(_applyToOneOrMany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetcher = exports.fetcher = {
  bundle: _bundle2.default,
  paginate: _paginate2.default,
  eachItem: _eachItem2.default,
  log: _logs2.default,
  makeRequest: _makeRequest2.default,
  getWPMenus: _getWPMenus2.default,
  getWPCategories: _getWPCategories2.default,
  getWPCustomTaxonomy: _getWPCustomTaxonomy2.default,
  getWPPostType: _getWPPostType2.default,
  getWPOptionsPage: _getWPOptionsPage2.default,
  applyToOneOrMany: _applyToOneOrMany2.default,
  test: true
};

exports.default = fetcher;