'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * @param {string} globDirectory The directory used for the root of globbing.
 * @return {Promise<Array<string>>} The unique file extensions corresponding
 * to all of the files under globDirectory.
 */
var getAllFileExtensions = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(globDirectory) {
    var files, extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, extension;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _promise2.default(function (resolve, reject) {
              // Use a pattern to match any file that contains a '.', since that signifies
              // the presence of a file extension.
              glob('**/*.*', {
                cwd: globDirectory,
                nodir: true,
                ignore: ignoredDirectories.map(function (directory) {
                  return `**/${directory}/**`;
                })
              }, function (error, files) {
                if (error) {
                  reject(error);
                } else {
                  resolve(files);
                }
              });
            });

          case 2:
            files = _context.sent;
            extensions = new _set2.default();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;

            for (_iterator = (0, _getIterator3.default)(files); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              file = _step.value;
              extension = path.extname(file);

              if (extension) {
                // Get rid of the leading . character.
                extensions.add(extension.replace(/^\./, ''));
              }
            }

            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 15:
            _context.prev = 15;
            _context.prev = 16;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 18:
            _context.prev = 18;

            if (!_didIteratorError) {
              _context.next = 21;
              break;
            }

            throw _iteratorError;

          case 21:
            return _context.finish(18);

          case 22:
            return _context.finish(15);

          case 23:
            return _context.abrupt('return', [].concat((0, _toConsumableArray3.default)(extensions)));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 11, 15, 23], [16,, 18, 22]]);
  }));

  return function getAllFileExtensions(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @param {string} globDirectory The directory used for the root of globbing.
 * @return {Promise<Object>} The answers from inquirer.
 */


var askQuestion = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(globDirectory) {
    var spinner, fileExtensions;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // We need to get a list of extensions corresponding to files in the directory
            // to use when asking the next question. That could potentially take some
            // time, so we show a spinner and explanatory text.
            spinner = ora({
              text: `Examining files in ${globDirectory}...`,
              stream: process.stdout
            }).start();
            _context2.next = 3;
            return getAllFileExtensions(globDirectory);

          case 3:
            fileExtensions = _context2.sent;

            spinner.stop();

            assert(fileExtensions.length > 0, errors['no-file-extensions-found']);

            return _context2.abrupt('return', inquirer.prompt([{
              name,
              message: 'Which file types would you like to precache?',
              type: 'checkbox',
              choices: fileExtensions,
              default: fileExtensions
            }]));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function askQuestion(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var assert = require('assert');
var glob = require('glob');
var inquirer = require('inquirer');
var ora = require('ora');
var path = require('path');

var errors = require('../errors');

var _require = require('../constants'),
    ignoredDirectories = _require.ignoredDirectories;

// The key used for the question/answer.


var name = 'globPatterns';

module.exports = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(globDirectory) {
    var answers, extensions, extensionsPattern;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return askQuestion(globDirectory);

          case 2:
            answers = _context3.sent;
            extensions = answers[name];

            assert(extensions.length > 0, errors['no-file-extensions-selected']);

            // glob isn't happy with a single option inside of a {} group, so use a
            // pattern without a {} group when there's only one extension.
            extensionsPattern = extensions.length === 1 ? extensions[0] : `{${extensions.join(',')}}`;
            return _context3.abrupt('return', [`**/*.${extensionsPattern}`]);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();