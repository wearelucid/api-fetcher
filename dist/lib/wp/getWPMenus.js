"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWPMenus;

var _axios = _interopRequireDefault(require("axios"));

var _makeRequest = _interopRequireDefault(require("../makeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
function getWPMenus(config, lang) {
  return _axios.default.all([(0, _makeRequest.default)(config, "/wp-api-menus/v2/menus".concat(lang ? "?lang=".concat(lang) : '')), (0, _makeRequest.default)(config, "/wp-api-menus/v2/menu-locations".concat(lang ? "?lang=".concat(lang) : ''))]).then(_axios.default.spread(function (menuList, locations) {
    return _axios.default.all(menuList.map(function (m) {
      return (0, _makeRequest.default)(config, "/wp-api-menus/v2/menus/".concat(m.ID).concat(lang ? "?lang=".concat(lang) : ''));
    })).then(_axios.default.spread(function () {
      for (var _len = arguments.length, menus = new Array(_len), _key = 0; _key < _len; _key++) {
        menus[_key] = arguments[_key];
      }

      var menuListWithChildren = menuList.map(function (m) {
        var matchMenu = menus.find(function (detailedMenu) {
          return detailedMenu.ID === m.ID;
        });
        return _objectSpread({}, m, {
          items: matchMenu ? matchMenu.items : []
        });
      });
      var obj = {};
      Object.keys(locations).map(function (l) {
        obj[l] = _objectSpread({}, locations[l]);
        delete obj[l].meta;
        obj[l].menu = menuListWithChildren.find(function (m) {
          return m.ID === obj[l].ID;
        }) || false;
      });
      return obj;
    }));
  }));
}