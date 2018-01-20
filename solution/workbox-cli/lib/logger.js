'use strict';

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

var chalk = require('chalk');

module.exports = {
  debug: function debug() {
    return console.log(chalk.gray.apply(chalk, arguments));
  },
  log: function log() {
    var _console;

    return (_console = console).log.apply(_console, arguments);
  },
  warn: function warn() {
    return console.warn(chalk.yellow.apply(chalk, arguments));
  },
  error: function error() {
    var _chalk$red;

    return console.error((_chalk$red = chalk.red).bold.apply(_chalk$red, arguments));
  }
};