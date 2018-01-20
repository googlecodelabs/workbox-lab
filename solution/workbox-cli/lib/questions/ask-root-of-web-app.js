'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * @return {Promise<Array<string>>} The subdirectories of the current
 * working directory, with hidden and ignored ones filtered out.
 */
var getSubdirectories = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _promise2.default(function (resolve, reject) {
              glob('*/', {
                ignore: ignoredDirectories.map(function (directory) {
                  return `${directory}/`;
                })
              }, function (error, directories) {
                if (error) {
                  reject(error);
                } else {
                  resolve(directories);
                }
              });
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSubdirectories() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @return {Promise<Object>} The answers from inquirer.
 */


var askQuestion = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var subdirectories, manualEntryChoice;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getSubdirectories();

          case 2:
            subdirectories = _context2.sent;

            if (!(subdirectories.length > 0)) {
              _context2.next = 8;
              break;
            }

            manualEntryChoice = 'Manually enter path';
            return _context2.abrupt('return', inquirer.prompt([{
              name,
              type: 'list',
              message: 'What is the root of your web app?',
              choices: subdirectories.concat([new inquirer.Separator(), manualEntryChoice])
            }, {
              name,
              when: function when(answers) {
                return answers[name] === manualEntryChoice;
              },
              message: ROOT_PROMPT
            }]));

          case 8:
            return _context2.abrupt('return', inquirer.prompt([{
              name,
              message: ROOT_PROMPT,
              default: '.'
            }]));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function askQuestion() {
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
var fse = require('fs-extra');
var glob = require('glob');
var inquirer = require('inquirer');

var _require = require('../constants'),
    ignoredDirectories = _require.ignoredDirectories;

var errors = require('../errors');

var ROOT_PROMPT = 'Please enter the path to the root of your web app:';

// The key used for the question/answer.
var name = 'globDirectory';

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
  var answers, globDirectory, stat;
  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return askQuestion();

        case 2:
          answers = _context3.sent;
          globDirectory = answers[name];
          _context3.prev = 4;
          _context3.next = 7;
          return fse.stat(globDirectory);

        case 7:
          stat = _context3.sent;

          assert(stat.isDirectory());
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](4);
          throw new Error(errors['glob-directory-invalid']);

        case 14:
          return _context3.abrupt('return', globDirectory);

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined, [[4, 11]]);
}));