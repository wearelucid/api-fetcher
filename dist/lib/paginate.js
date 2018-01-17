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
      datas.forEach(saveDataToFile);
      _logs2.default.success('DONE.');
    });
  } else {
    (0, _fetchData2.default)(config, false, fetchOptions).then(function (data) {
      saveDataToFile(data);
      _logs2.default.success('DONE.');
    });
  }
  // fetchAllLanguages(config)

  function saveDataToFile(data) {
    var dataClone = (0, _lodash2.default)(data);
    var count = 10;
    var total = dataClone.posts.length;
    var slice = Math.ceil(total / count);
    var from = 0;
    for (var i = 1; i <= slice; i++) {
      (0, _saveFiles2.default)({
        total: total,
        from: from,
        count: count,
        language: data.language,
        posts: data.posts.slice(from, i * 10)
      }, bundleName, config, i);
      _logs2.default.info(from + ', ' + count * i + ' neu');
      from = from + count;
    }

    // creates json for every single post
    // data.posts.forEach(function(post, i) {
    //  saveFiles(data, bundleName, config, i)
    // })
  }
}