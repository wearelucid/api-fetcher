'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getWPMenus;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _makeRequest = require('../makeRequest');

var _makeRequest2 = _interopRequireDefault(_makeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
function getWPMenus(config, lang) {
  return _axios2.default.all([(0, _makeRequest2.default)(config, '/wp-api-menus/v2/menus?lang=' + lang), (0, _makeRequest2.default)(config, '/wp-api-menus/v2/menu-locations?lang=' + lang)]).then(_axios2.default.spread(function (menuList, locations) {
    return _axios2.default.all(menuList.map(function (m) {
      return (0, _makeRequest2.default)(config, '/wp-api-menus/v2/menus/' + m.ID + '?lang=' + lang);
    })).then(_axios2.default.spread(function () {
      for (var _len = arguments.length, menus = Array(_len), _key = 0; _key < _len; _key++) {
        menus[_key] = arguments[_key];
      }

      var menuListWithChildren = menuList.map(function (m) {
        var matchMenu = menus.find(function (detailedMenu) {
          return detailedMenu.ID === m.ID;
        });
        return _extends({}, m, {
          items: matchMenu ? matchMenu.items : []
        });
      });

      var obj = {};
      Object.keys(locations).map(function (l) {
        obj[l] = _extends({}, locations[l]);
        delete obj[l].meta;
        obj[l].menu = menuListWithChildren.find(function (m) {
          return m.ID === obj[l].ID;
        }) || false;
      });

      return obj;
    }));
  }));
}