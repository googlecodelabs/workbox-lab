#! /usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var meow = require('meow');
var updateNotifier = require('update-notifier');

var app = require('./app.js');
var cleanupStackTrace = require('./lib/cleanup-stack-trace.js');
var helpText = require('./lib/help-text');
var logger = require('./lib/logger');

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var params;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = meow(helpText);

          updateNotifier({ pkg: params.pkg }).notify();

          _context.prev = 2;
          _context.next = 5;
          return app.apply(undefined, (0, _toConsumableArray3.default)(params.input).concat([params.flags]));

        case 5:
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](2);

          // Show the full error and stack trace if we're run with --debug.
          if (params.flags.debug) {
            logger.error(`\n${_context.t0.stack}`);
          } else {
            logger.error(`\n${_context.t0.message}`);
            logger.debug(`${cleanupStackTrace(_context.t0, 'app.js')}\n`);
          }

          process.exit(1);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[2, 7]]);
}))();