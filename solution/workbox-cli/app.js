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
var path = require('path');
var prettyBytes = require('pretty-bytes');
var workboxBuild = require('workbox-build');

var constants = require('./lib/constants');
var errors = require('./lib/errors');
var logger = require('./lib/logger');
var readConfig = require('./lib/read-config');
var runWizard = require('./lib/run-wizard');

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(command, options) {
    var parentDirectory, dirName, fullPath, configPath, config, _ref2, size, count;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assert(command, errors['missing-command-param']);

            _context.t0 = command;
            _context.next = _context.t0 === 'wizard' ? 4 : _context.t0 === 'copyLibraries' ? 7 : _context.t0 === 'generateSW' ? 15 : _context.t0 === 'injectManifest' ? 15 : 42;
            break;

          case 4:
            _context.next = 6;
            return runWizard(options);

          case 6:
            return _context.abrupt('break', 43);

          case 7:
            assert(options, errors['missing-dest-dir-param']);
            parentDirectory = path.resolve(process.cwd(), options);
            _context.next = 11;
            return workboxBuild.copyWorkboxLibraries(parentDirectory);

          case 11:
            dirName = _context.sent;
            fullPath = path.join(parentDirectory, dirName);


            logger.log(`The Workbox libraries were copied to ${fullPath}`);
            return _context.abrupt('break', 43);

          case 15:
            // TODO: Confirm that this works with Windows paths.
            configPath = path.resolve(process.cwd(), options || constants.defaultConfigFile);
            config = void 0;
            _context.prev = 17;

            config = readConfig(configPath);
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context['catch'](17);

            logger.error(errors['invalid-common-js-module']);
            throw _context.t1;

          case 25:

            logger.log(`Using configuration from ${configPath}.`);
            _context.prev = 26;
            _context.next = 29;
            return workboxBuild[command](config);

          case 29:
            _ref2 = _context.sent;
            size = _ref2.size;
            count = _ref2.count;

            logger.log(`The service worker was written to ${config.swDest}\n` + `${count} files will be precached, totalling ${prettyBytes(size)}.`);
            _context.next = 41;
            break;

          case 35:
            _context.prev = 35;
            _context.t2 = _context['catch'](26);

            if (!(typeof _context.t2.annotate === 'function')) {
              _context.next = 39;
              break;
            }

            throw new Error(`${errors['config-validation-failed']}\n${_context.t2.annotate()}`);

          case 39:
            logger.error(errors['workbox-build-runtime-error']);
            throw _context.t2;

          case 41:
            return _context.abrupt('break', 43);

          case 42:
            throw new Error(errors['unknown-command'] + ` ` + command);

          case 43:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[17, 21], [26, 35]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();