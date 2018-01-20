'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var fse = require('fs-extra');
var ol = require('common-tags').oneLine;

var askQuestions = require('./questions/ask-questions');
var logger = require('./logger');

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref2, configLocation, config, contents, command;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return askQuestions(options);

        case 2:
          _ref2 = _context.sent;
          configLocation = _ref2.configLocation;
          config = _ref2.config;
          contents = `module.exports = ${(0, _stringify2.default)(config, null, 2)};`;
          _context.next = 8;
          return fse.writeFile(configLocation, contents);

        case 8:
          command = options.injectManifest ? 'injectManifest' : 'generateSW';

          logger.log(`To build your service worker, run

  workbox ${command} ${configLocation}

as part of a build process. See https://goo.gl/fdTQBf for details.`);

          logger.log(ol`You can further customize your service worker by making changes
    to ${configLocation}. See https://goo.gl/YYPcyY for details.`);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));