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

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function paginate(bundleName, fetchOptions, _config) {
  var config = _extends({
    savePath: './data'
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
      datas.forEach(saveDataToFile);
      _logs2.default.success('DONE.');
    });
  } else {
    (0, _fetchData2.default)(config, false, fetchOptions).then(function (data) {
      // if one language, only save this lang
      saveDataToFile(data);
      _logs2.default.success('DONE.');
    });
  }

  /**
   * Save files (in this case paginated)
   */
  function saveDataToFile(data) {
    var dataClone = (0, _lodash2.default)(data); // deep clone the data in order to do calculations
    var count = 10; // how many posts per page
    var total = dataClone.posts.length; // total posts length
    var slice = Math.ceil(total / count); // round up slices (101 posts will be 11 pages – last page with 1 post)
    var from = 0;
    for (var i = 1; i <= slice; i++) {
      // if provied a pagination (i) the file will be saved paginated.
      (0, _saveFiles2.default)({
        // custom attributes we can set here
        total: total,
        from: from,
        count: count,
        language: data.language,
        // slice the posts correctly based on the from/count
        posts: data.posts.slice(from, i * count)
      }, bundleName, config, i);
      // iterate from value (like: 0, 10, 20, …)
      // the form/count values will be like (0-10, 10-20, 20-30, …)
      from = from + count;
    }
  }
}