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

var inquirer = require('inquirer');
var ol = require('common-tags').oneLine;

var assertValidSwSrc = require('../assert-valid-sw-src');

// The key used for the question/answer.
var name = 'swSrc';

/**
 * @return {Promise<Object>} The answers from inquirer.
 */
function askQuestion() {
  return inquirer.prompt([{
    name,
    message: ol`Where's your existing service worker file? To be used with
      injectManifest, it should include a call to
      'workbox.precaching.precacheAndRoute([])'`,
    type: 'input'
  }]);
}

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var answers, swSrc;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return askQuestion();

        case 2:
          answers = _context.sent;
          swSrc = answers[name].trim();
          _context.next = 6;
          return assertValidSwSrc(swSrc);

        case 6:
          return _context.abrupt('return', swSrc);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));