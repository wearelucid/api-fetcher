"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = paginate;

var _fs = _interopRequireDefault(require("fs"));

var _logs = _interopRequireDefault(require("./logs"));

var _saveFiles = _interopRequireDefault(require("./saveFiles"));

var _fetchData = _interopRequireDefault(require("./fetchData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function paginate(bundleName, fetchOptions, _config) {
  var config = _objectSpread({
    savePath: "'./' + bundleName"
  }, _config);
  /**
   * Create directory (synchronously)
   */


  try {
    _fs.default.mkdirSync(config.savePath, {
      recursive: true
    });

    _logs.default.success("".concat(config.savePath, " created successfully!"));
  } catch (e) {
    console.error(e);
  }
  /**
   * Fetch all languages
   */


  if (config.languages && config.languages.length) {
    Promise.all(config.languages.map(function (language) {
      return (0, _fetchData.default)(config, language, fetchOptions);
    })).then(function (datas) {
      // for each lang save files
      return Promise.all( // resolves an array of promises
      datas.map(function (data) {
        // returns array of all promises from all saveDataToFile()-calls
        return saveDataToFile(data);
      })).then(function () {
        return _logs.default.success('DONE.');
      }); // is called when all promises are resolved (here: all files are saved)
      // for each lang save files
    });
  } else {
    (0, _fetchData.default)(config, false, fetchOptions).then(function (data) {
      // if one language, only save this lang
      return saveDataToFile(data);
    });
  }
  /**
   * Save files (in this case paginated)
   */


  function saveDataToFile(data) {
    var itemCount = _config.itemsPerPage ? _config.itemsPerPage : 10; // how many items per page, default 10

    var itemsTotal = data[bundleName].length; // itemsTotal (items length)

    var slices = Math.ceil(itemsTotal / itemCount); // round up slices (101 items will be 11 pages – last page with 1 item)

    var from = 0;
    var slicesToArray = data[bundleName].slice(from, slices); // we need to build an array with the length of our pages, so we can map and return

    var firstIteration = true;
    return Promise.all(slicesToArray.map(function (a, index) {
      // returns array of all promises from all saveDataToFile()-calls
      index += 1;
      firstIteration ? firstIteration = false : from += itemCount;
      return (0, _saveFiles.default)({
        // custom attributes we can set inside paginatedProps
        paginatedProps: {
          pagesTotal: slices,
          page: index,
          from: from,
          itemCount: itemCount,
          itemsTotal: itemsTotal
        },
        // language will only be used to create the file name
        language: data.language,
        // all items as items correctly sliced
        items: data[bundleName].slice(from, index * itemCount)
      }, bundleName, config, data[bundleName][index - 1].slug); // iterate from value (like: 0, 10, 20, …)
      // the form/itemCount values will be like (0-10, 10-20, 20-30, …)
    })).then(function () {
      return _logs.default.success('DONE.');
    });
  }
}