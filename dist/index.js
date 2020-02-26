"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fetcher = void 0;

var _bundle = _interopRequireDefault(require("./lib/bundle"));

var _paginate = _interopRequireDefault(require("./lib/paginate"));

var _eachItem = _interopRequireDefault(require("./lib/eachItem"));

var _logs = _interopRequireDefault(require("./lib/logs"));

var _makeRequest = _interopRequireDefault(require("./lib/makeRequest"));

var _getWPMenus = _interopRequireDefault(require("./lib/wp/getWPMenus"));

var _getWPCategories = _interopRequireDefault(require("./lib/wp/getWPCategories"));

var _getWPCustomTaxonomy = _interopRequireDefault(require("./lib/wp/getWPCustomTaxonomy"));

var _getWPPostType = _interopRequireDefault(require("./lib/wp/getWPPostType"));

var _getWPOptionsPage = _interopRequireDefault(require("./lib/wp/getWPOptionsPage"));

var _applyToOneOrMany = _interopRequireDefault(require("./lib/util/applyToOneOrMany"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetcher = {
  bundle: _bundle["default"],
  paginate: _paginate["default"],
  eachItem: _eachItem["default"],
  log: _logs["default"],
  makeRequest: _makeRequest["default"],
  getWPMenus: _getWPMenus["default"],
  getWPCategories: _getWPCategories["default"],
  getWPCustomTaxonomy: _getWPCustomTaxonomy["default"],
  getWPPostType: _getWPPostType["default"],
  getWPOptionsPage: _getWPOptionsPage["default"],
  applyToOneOrMany: _applyToOneOrMany["default"]
};
exports.fetcher = fetcher;
var _default = fetcher;
exports["default"] = _default;