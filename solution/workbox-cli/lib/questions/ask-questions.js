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

var askConfigLocation = require('./ask-config-location');
var askExtensionsToCache = require('./ask-extensions-to-cache');
var askRootOfWebApp = require('./ask-root-of-web-app');
var askSWDest = require('./ask-sw-dest');
var askSWSrc = require('./ask-sw-src');

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var globDirectory, globPatterns, swSrc, swDest, configLocation, config;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return askRootOfWebApp();

        case 2:
          globDirectory = _context.sent;
          _context.next = 5;
          return askExtensionsToCache(globDirectory);

        case 5:
          globPatterns = _context.sent;

          if (!options.injectManifest) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return askSWSrc();

        case 9:
          _context.t0 = _context.sent;
          _context.next = 13;
          break;

        case 12:
          _context.t0 = undefined;

        case 13:
          swSrc = _context.t0;
          _context.next = 16;
          return askSWDest(globDirectory);

        case 16:
          swDest = _context.sent;
          _context.next = 19;
          return askConfigLocation();

        case 19:
          configLocation = _context.sent;
          config = {
            globDirectory,
            globPatterns,
            swDest,
            swSrc
          };
          return _context.abrupt('return', {
            config,
            configLocation
          });

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));