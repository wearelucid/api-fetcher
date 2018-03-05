'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = paginate;

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

var _saveFiles = require('./saveFiles');

var _saveFiles2 = _interopRequireDefault(_saveFiles);

var _fetchData = require('./fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function paginate(bundleName, fetchOptions, _config) {
  var config = _extends({
    savePath: './posts'
  }, _config);

  /**
   * Create directory (synchronously)
   */
  (0, _mkdirp2.default)(config.savePath, function (err) {
    if (err) return console.error(err);
    _logs2.default.success(config.savePath + ' created successfully!');
  });

  /**
   * Fetch all languages
   */
  if (config.languages && config.languages.length) {
    Promise.all(config.languages.map(function (language) {
      return (0, _fetchData2.default)(config, language, fetchOptions);
    })).then(function (datas) {
      // for each lang save files
      return Promise.all( // resolves an array of promises
      datas.map(function (data) {
        // returns array of all promises from all saveDataToFile()-calls
        return saveDataToFile(data);
      })).then(function () {
        return _logs2.default.success('DONE.');
      }); // is called when all promises are resolved (here: all files are saved)
      // for each lang save files
    });
  } else {
    (0, _fetchData2.default)(config, false, fetchOptions).then(function (data) {
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
      return (0, _saveFiles2.default)({
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
      }, bundleName, config, data[bundleName][index - 1].slug);
      // iterate from value (like: 0, 10, 20, …)
      // the form/itemCount values will be like (0-10, 10-20, 20-30, …)
    })).then(function () {
      return _logs2.default.success('DONE.');
    });
  }
}