#!/usr/bin/env node
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Commands = require('./lib/commands');

require("yargs")
    .scriptName('cronus')
    .usage('$0 <cmd> [args]')
    .demandCommand(1, '# Please specify a command')
    .recommendCommands()
    .strict()
    .command('generate-pem','generate public and private keys', (yargs) => {})
    .command('sign', 'generate digital signatures from the required pem files', (yargs) => {})
    .command('archive', 'create a signature archive', (yargs) => {})
    .option('verbose', {
        alias: 'v',
        default: false
    })
    .help()
    .argv;

// console.log(options)