'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
var inquirer = require('inquirer');
var path = require('path');

var errors = require('../errors');

// The key used for the question/answer.
var name = 'swDest';

/**
 * @param {string} defaultDir
 * @return {Promise<Object>} The answers from inquirer.
 */
function askQuestion(defaultDir) {
  return inquirer.prompt([{
    name,
    message: `Where would you like your service worker file to be saved?`,
    type: 'input',
    default: path.join(defaultDir, 'sw.js')
  }]);
}

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var defaultDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
  var answers, swDest;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return askQuestion(defaultDir);

        case 2:
          answers = _context.sent;
          swDest = answers[name].trim();


          assert(swDest, errors['invalid-sw-dest']);

          return _context.abrupt('return', swDest);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));