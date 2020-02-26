"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getWPMenus;

var _axios = _interopRequireDefault(require("axios"));

var _makeRequest = _interopRequireDefault(require("../makeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
function getWPMenus(config, lang) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _axios["default"].all([(0, _makeRequest["default"])(config, "/menus/v1/menus".concat(lang ? "?lang=".concat(lang) : '')), (0, _makeRequest["default"])(config, "/menus/v1/locations".concat(lang ? "?lang=".concat(lang) : ''))]).then(_axios["default"].spread(function (menuList, locations) {
    return _axios["default"].all(menuList.map(function (m) {
      return (0, _makeRequest["default"])(config, "/menus/v1/menus/".concat(m.slug).concat(lang ? "?lang=".concat(lang) : ''), _objectSpread({}, options, {
        transforms: _toConsumableArray(options.transforms || [])
      }));
    })).then(_axios["default"].spread(function () {
      for (var _len = arguments.length, menus = new Array(_len), _key = 0; _key < _len; _key++) {
        menus[_key] = arguments[_key];
      }

      var menuListWithChildren = menuList.map(function (m) {
        var matchMenu = menus.find(function (detailedMenu) {
          return detailedMenu.slug === m.slug;
        });
        return _objectSpread({}, m, {
          items: matchMenu ? matchMenu.items : []
        });
      });
      var menuToBeReturned = {};
      Object.keys(locations).map(function (l) {
        menuToBeReturned[l] = _objectSpread({}, locations[l]);
        delete menuToBeReturned[l].meta; // Find the matching menu.
        // Otherwise fall back to match a localized menu like 'main_de' or 'main_fr' by providing the `lang` separated with an underscore. Menu locations in WordPress should be named accordingly!
        // Otherwise return null

        menuToBeReturned[l].menu = menuListWithChildren.find(function (m) {
          return m.slug === menuToBeReturned[l].slug;
        }) || menuListWithChildren.find(function (m) {
          return m.slug.startsWith("".concat(menuToBeReturned[l].slug, "_").concat(lang));
        }) || null;
      });
      return menuToBeReturned;
    }));
  }));
}